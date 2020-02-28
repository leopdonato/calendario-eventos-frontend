import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventosComponent } from './eventos/eventos.component';
import { AuthGuard } from './services/auth.guard';
import { EventGuard } from './services/event.guard';
import { CalendarioComponent } from './calendario/calendario.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'agendamentos', canActivate: [EventGuard], children: [
    {path: '', pathMatch: 'full', redirectTo: 'eventos'},
    {path: 'eventos', component: EventosComponent},
    {path: 'calendario', component: CalendarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
