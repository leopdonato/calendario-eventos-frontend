import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { EventosComponent } from './eventos/eventos.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { EventosService } from './services/eventos.service';
import { CadastrarEventoComponent } from './cadastrar-evento/cadastrar-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventosComponent,
    HeaderComponent,
    CadastrarEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    EventosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
