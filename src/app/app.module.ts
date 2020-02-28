import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EventosComponent } from './eventos/eventos.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { EventosService } from './services/eventos.service';
import { CadastrarEventoComponent } from './cadastrar-evento/cadastrar-evento.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';
import { CalendarioComponent } from './calendario/calendario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventosComponent,
    HeaderComponent,
    CadastrarEventoComponent,
    ExcluirEventoComponent,
    CalendarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FullCalendarModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    EventosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
