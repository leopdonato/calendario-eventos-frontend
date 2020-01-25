import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            if(this.loginService.isLogged()){
                this.router.navigate(['eventos']);
                return false;
            }
            return true;
    }

    constructor(
        private loginService: LoginService,
        private router: Router) {}

}