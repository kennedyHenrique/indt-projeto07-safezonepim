import { FormsModule } from "@angular/forms";
import {Component, inject, signal} from '@angular/core';
import { AuthService } from "../../../core/auth/auth.service";
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'], 
})

export class LoginComponent{
    private auth = inject(AuthService);
    private router = inject(Router);

    matricula = '';
    password = '';

    loading = signal(false);
    error = signal<string | null>(null);

    onSubmit(): void {
        const matricula = this.matricula.trim();
        
        if(!matricula || !this.password) return;

        this.loading.set(true);
        this.error.set(null);

        this.auth.login(matricula, this.password).subscribe({
            next: () => this.router.navigate(['./registros']),
            error: (err) => {
                const message = err?.error?.message ?? 'Credenciais invalidas. Verifique matricula e senha.';
                this.error.set(message);
                this.loading.set(false); 
            },
        });
    }
}
