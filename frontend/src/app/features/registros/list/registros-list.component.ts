import { DatePipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../core/auth/auth.service";
import { Cargo } from "../../../core/models/cargo.enum";
import { RegistroAcesso } from "../../../core/models/registroAcesso.model";
import { RegistrosService } from "../registros.service";




@Component({
    selector: 'app-registros-list',
    imports: [RouterLink, DatePipe],
    templateUrl: './registros-list.component.html',
    styleUrls: ['./registros-list.component.css'],
})

export class RegistrosListComponent implements OnInit{

    private service = inject(RegistrosService);
    auth = inject(AuthService);
    readonly Cargo = Cargo;

    registros = signal<RegistroAcesso[]>([]);
    loading = signal(true);
    error = signal<string | null>(null);

    ngOnInit(): void {
        this.service.getAll().subscribe({
            next: (data) => {
                this.registros.set(data);
                this.loading.set(false);
            },
            error: () =>{
                this.error.set('Erro ao carregar os registros.');
                this.loading.set(false);
            },
        });
    }

    //tem que implementar o tipo

}