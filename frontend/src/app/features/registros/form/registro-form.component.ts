import { AreasService } from './../../areas/areas.service';
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { RegistrosService } from "../registros.service";
import { AuthService } from '../../../core/auth/auth.service';
import { Tipo } from '../../../core/models/tipo.enum';
import { Area } from '../../../core/models/area.model';




@Component({
    selector: 'app-registro-form',
    imports: [FormsModule, RouterLink],
    templateUrl: './registro-form.component.html',
    styleUrls: ['./registro-form.component.css'],
})

export class RegistroFormComponent implements OnInit{

    private service = inject(RegistrosService);
    private areasService = inject(AreasService);
    private auth = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    readonly Tipo = Tipo;

    editId = signal<string | null>(null);
    areas = signal<Area[]>([]);

    numero = '';
    tipo = Tipo.ENTRADA;
    id_area = '';
    id_colaborador = '';
    timestamp ='';
    registrado_por = '';

    loading = signal(false);
    error = signal<string | null>(null);

    ngOnInit(): void {
        this.areasService.getAll().subscribe({
            next: (data) => this.areas.set(data),
        });
        
        const id = this.route.snapshot.paramMap.get(`id`);
        if(id){
            this.editId.set(id);
            this.service.getById(id).subscribe({
                next: (r) => {
                    this.numero = r.numero;
                    this.tipo = r.tipo;
                    this.id_area = r.area?.id_area ?? '';
                    this.id_colaborador = r.solicitante?.id_colaborador ?? '';
                    this.timestamp = r.timestamp.split('T')[0];
                    this.registrado_por = r.registrador?.id_colaborador ?? '';
                },
                error: () => this.error.set('Erro ao carregar registro'),
            });
        }
    }

    onSubmit(): void {
        if(!this.numero || !this.tipo || !this.id_area || !this.id_colaborador || !this.timestamp ||!this.registrado_por) return;
        this.loading.set(true);
        this.error.set(null);

        const user = this.auth.currentColaborador();
        
        if(this.editId()){
            this.service.update(this.editId()!, {
                numero: this.numero,
                tipo: this.tipo,
                id_area: this.id_area,
                id_colaborador: this.id_colaborador,
                timestamp: this.timestamp,
                registrador_por: this.registrado_por,
            }).subscribe({
                next: () => this.router.navigate(['/registros', this.editId()]),
                error: () =>{
                    this.error.set('Erro ao atualizar requisição.');
                    this.loading.set(false);
                },
            });
        }else{
            this.service.create({
                numero: this.numero,
                tipo: this.tipo,
                id_area: this.id_area,
                id_colaborador: this.id_colaborador,
                timestamp: this.timestamp,
                registrador_por: this.registrado_por,
            }).subscribe({
                next: (r) => this.router.navigate(['/registros', r.id_registro]),
                error: () => {
                    this.error.set('Erro ao criar o registro.')
                    this.loading.set(false);
                },
            });
        }
    }
}