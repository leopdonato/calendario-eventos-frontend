import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventosModel } from '../models/eventos.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getToken(){
    return this.tokenService.getToken();
  }

  findAll(): Observable<EventosModel[]>{
    return this.http.get<EventosModel[]>('http://localhost:8080/eventos', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.getToken()
      })
    });
  }

  insert(obj: EventosModel): Observable<EventosModel> {
    return this.http.post<EventosModel>('http://localhost:8080/eventos', obj, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.getToken()
      })
    });
  }

  delete(id: number): Observable<EventosModel> {
    return this.http.delete<EventosModel>(`http://localhost:8080/eventos/${id}`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.getToken()
      })
    });
  }
  
  findById(id: number): Observable<EventosModel> {
    return this.http.get<EventosModel>(`http://localhost:8080/eventos/${id}`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.getToken()
      })
    });
  }

  edit(id: number, obj: EventosModel): Observable<EventosModel> {
    return this.http.put<EventosModel>(`http://localhost:8080/eventos/${id}`, obj, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.getToken()
      })
    });
  }

}
