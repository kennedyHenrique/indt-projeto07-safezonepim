import { DatePipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { RegistrosService } from "../registros.service";
import { AuthService } from "../../../core/auth/auth.service";
import { Cargo } from "../../../core/models/cargo.enum";
import { Tipo } from "../../../core/models/tipo.enum";
import { RegistroAcesso } from "../../../core/models/registroAcesso.model";




@Component({
    selector: 'app-registro-detail',
    imports: [RouterLink, DatePipe, FormsModule],
    templateUrl: './registro-detail.component.html',
    styleUrls: ['./registro-detail.component.css'],
})

export class RegistroDetailComponent implements OnInit{
    private service = inject(RegistrosService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    auth = inject(AuthService);

    readonly Cargo = Cargo;
    readonly Tipo = Tipo;

    req = signal<RegistroAcesso | null>(null);
    loading = signal(true);
    error = signal<string | null>(null);
    actionError = signal<string | null>(null);
    
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.load(id);
    }

    load(id: string): void {
        this.loading.set(true);
        this.service.getById(id).subscribe({
            next: (r) => {
                this.req.set(r);
                this.loading.set(false);
            },

            error: () => {
                this.error.set('Erro ao carregar registro.');
                this.loading.set(false);
            },
        });
    }

    aprovar(): void {
        const r = this.req();
        
        if(!r) return;
        this.actionError.set(null);
        this.service.update(r.id_registro, {
            //id_colaborador: this.auth.currentColaborador()?.id_colaborador ?? null,
            timestamp: new Date().toISOString(),
        }).subscribe({
            next: () => {
                this.load(r.id_registro);
            },
            error: () => this.actionError.set('Erro ao aprovar registro.'),
        });
    }



}