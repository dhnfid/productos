import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localidad } from '../models/localiadad.model';

@Injectable({
    providedIn: 'root'
})
export class LocalidadService {
    apiUrl: string = 'http://158.69.204.80:3000/localidad';
    constructor(private http: HttpClient) { }


    getLocalidades(): Observable<Localidad[]> {
        return this.http.get<Localidad[]>(this.apiUrl);
    }


}
