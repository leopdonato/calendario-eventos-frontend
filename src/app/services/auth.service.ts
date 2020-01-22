import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }

  authenticate(email: string, senha: string){
    return this.http.post('http://localhost:8080/login', {email, senha})
  }
}
