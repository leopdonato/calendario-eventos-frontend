import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService) { }

  authenticate(email: string, senha: string) {
    return this.http
      .post('http://localhost:8080/login', { email, senha }, { observe: 'response', responseType: 'text' })
      .pipe(tap(res => {
        const authToken = res.headers.get('Authorization');
        this.loginService.setToken(authToken);
      }))

  }
}
