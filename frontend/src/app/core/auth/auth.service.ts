import { Injectable, inject, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import { Observable, tap, using } from "rxjs";
import { Colaborador } from "../models/colaborador.model";
import {Cargo} from "../models/cargo.enum"
import { environment } from "../../../environments/environment";

//Define o formato de estado de autenticação no frontend.
interface AuthState{
    //colaborador logado ou null quando nao autenticado.
    colaborador: Colaborador | null;
    //Access token atual ou null quando nao autenticado.
    accessToken: string | null;
}
//Define o formato esperado da resposta do backend ao autenticar/renovar.
interface LoginResponse{
    //Token de acesso (curta duracao).
    accessToken: string;
    //Token de refresh (maior duracao).
    refreshToken: string;
    //Dados do colaborador autenticado.
    colaborador: Colaborador;
}

//Chave usada para salvar o refresh token no localStorage.
const REFRESH_TOKEN_KEY = 'refreshToken';

//Registra ester servico como injetavel e singleton no app inteiro.
@Injectable({providedIn: 'root'})
export class AuthService{
    //Obtem uma instancia do HttpClient via injecao.
    private http = inject(HttpClient);
    //Obtem uma instancia do Router via injecao.
    private router = inject(Router);

    //Mantem o estado de autenticacao em memoria usando signals.
    private state = signal<AuthState>({colaborador: null, accessToken: null});

    //Indica se existe accessToken (colaborador identificado).
    isAuthenticated = computed(() => !this.state().accessToken);

    //Exposicao reativa ao colaborador atual.
    currentColaborador = computed(() => this.state().colaborador);
    //Exposicao reativa do cargo atual (ou null se existir).
    currentCargo = computed(() => this.state().colaborador?.cargo ?? null);
    //Exposicao reativa do accessToken.
    accessToken = computed(() => this.state().accessToken);

    //Faz login enviando matricula e senha e devolve o Observable da resposta.
    login(matricula: string, password: string): Observable<LoginResponse>{
        //Faz POST para o endpoint do login da API.
        return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {matricula, password}).pipe(
            //executa efeitos colaterais quando a resposta chegar.
            tap((res) => {
                //mostra a resposta no console para depuracao.
                console.log(res);
                //salva o refreshToken no localStorage.
                localStorage.setItem(REFRESH_TOKEN_KEY,res.refreshToken);
                //Atualiza o estado com o colaborador e o accessToken.
                this.state.set({colaborador: res.colaborador, accessToken: res.accessToken});
            }),
        );
    } 

    //Renova o accessToken usando o refreshToken salvo.
    refresh(): Observable<LoginResponse>{
        //Le o refreshToken do localStorage (ou string vazia se nao existir).
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';
        
        //Faz POST para o endpoint de refresh da API.
        return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/refresh`, refreshToken).pipe(
            //Atualiza o refreshToken salvo se o backend devolver um novo.
            tap((res) => {
                //Salva o novo refreshToken.
                localStorage.setItem(REFRESH_TOKEN_KEY,res.refreshToken);
            }),
        );
    }

    //faz logout no backend e limpa o estado local.
    logout(): Observable<void>{
        //Le o refreshToken atual.
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) ?? '';

        //faz POST para o endpoint de logout da API.
        return this.http.post<void>(`${environment.apiUrl}/auth/logout`, {refreshToken}).pipe(
            //Executa efeitos apos logout.
            tap((res) => {
                //Remove o refreshToken do armazenamento local.
                localStorage.removeItem(REFRESH_TOKEN_KEY);
                //reseta o estado local de autenticacao.
                this.state.set({colaborador:null, accessToken:null});
                //navega para a tela de login.
                this.router.navigate(['/login']);
            }),
        );
    }
    //limpa apenas o estado local (util quando o token expira).
    clearSession(): void {
        //remove o refreshToken local.
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        //limpa o colaborador e accessToken em memoria.
        this.state.set({colaborador:null, accessToken: null});
    }

    //verifica se existe refreshToken salvo.
    hasSavedRefreshToken(): boolean {
        //Retorna true se a chave existir o localStorage.
        return !localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    //verifica se o colaborador atual tem o cargo informado.
    hasRole(cargo:Cargo) : boolean {
        //Compara o cargo atual com o cargo exigido.
        return this.currentCargo() === cargo;
    }
}