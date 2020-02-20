import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  public isInvalid: boolean = false;

  public changeEye: boolean = false;

  public changeButton: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.formLogin = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      senha: [null, [Validators.minLength(6), Validators.required]]
    });
  }

  ngOnInit() {
  }

  login() {
    const email = this.formLogin.get('email').value;
    const senha = this.formLogin.get('senha').value;
    this.changeButton = true;
    this.authService
    .authenticate(email, senha)
    .subscribe(
      () => {
        this.router.navigate(['eventos']);
        this.changeButton = false;
      },
      err => {
        console.log(err);
        this.formLogin.reset();
        this.changeButton = false;
        this.isInvalid = true;
        setTimeout(() => {
          this.isInvalid = false
        }, 4000);
      }
    )
  }

  showPassword(password: any){
    if(password.type === 'password'){
      password.type = 'text';
      this.changeEye = true;
    } else{
      password.type = 'password';
      this.changeEye = false;
    }
  }

}
