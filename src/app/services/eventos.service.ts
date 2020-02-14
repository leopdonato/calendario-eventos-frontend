import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventosModel } from '../models/eventos.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.getToken()
    })
  };

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getToken(){
    return this.tokenService.getToken();
  }

  findAll(): Observable<EventosModel[]>{
    return this.http.get<EventosModel[]>('http://localhost:8080/eventos', this.httpOptions);
  }

  insert(obj: EventosModel): Observable<EventosModel> {
    return this.http.post<EventosModel>('http://localhost:8080/eventos', obj, this.httpOptions);
  }

  delete(id: number): Observable<EventosModel> {
    return this.http.delete<EventosModel>(`http://localhost:8080/eventos/${id}`, this.httpOptions);
  }
  
  findById(id: number): Observable<EventosModel> {
    return this.http.get<EventosModel>(`http://localhost:8080/eventos/${id}`, this.httpOptions);
  }

}
