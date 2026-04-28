import { CreateRegistroAcessoDto, UpdateRegistroAcessoDto } from './../../core/models/registroAcesso.model';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { RegistroAcesso } from "../../core/models/registroAcesso.model";




@Injectable({providedIn: 'root'})
export class RegistrosService {
    private http = inject(HttpClient);
    private base = `${environment.apiUrl}/registros`;
    
    getAll(): Observable<RegistroAcesso[]>{
        return this.http.get<RegistroAcesso[]>(this.base);
    }

    getById(id: string): Observable<RegistroAcesso>{
        return this.http.get<RegistroAcesso>(`${this.base}/${id}`);
    }

    create(dto: CreateRegistroAcessoDto): Observable<RegistroAcesso>{
        return this.http.post<RegistroAcesso>(this.base,dto);
    }

    update(id:string, dto: UpdateRegistroAcessoDto): Observable<RegistroAcesso>{
        return this.http.put<RegistroAcesso>(`${this.base}/${id}`,dto);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.base}/${id}`);
    }
}