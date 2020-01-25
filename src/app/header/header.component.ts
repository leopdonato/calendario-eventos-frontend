import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$: Observable<LoginModel>;
  public user: LoginModel;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) {
}

  ngOnInit() {
    this.user$ = this.loginService.getUser();
    this.user$.subscribe(user => this.user = user);
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
