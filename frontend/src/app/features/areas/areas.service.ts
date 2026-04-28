import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Area, CreateAreaDto, UpdateAreaDto } from "../../core/models/area.model";




@Injectable({providedIn: 'root'})
export class AreasService{
    private http = inject(HttpClient);
    private base = `${environment.apiUrl}/areas`;

    getAll():Observable<Area[]> {
        return this.http.get<Area[]>(this.base);
    }

    getById(id: string): Observable<Area> {
        return this.http.get<Area>(`${this.base}/${id}`);
    }

    create(dto: CreateAreaDto): Observable<Area>{
        return this.http.post<Area>(this.base, dto);
    }
    
    update(id: string, dto:UpdateAreaDto): Observable<Area>{
        return this.http.put<Area>(`${this.base}/${id}`, dto);
    }
}