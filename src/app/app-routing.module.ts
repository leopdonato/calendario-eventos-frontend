import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventosComponent } from './eventos/eventos.component';
import { AuthGuard } from './services/auth.guard';
import { EventGuard } from './services/event.guard';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'eventos', component: EventosComponent, canActivate: [EventGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
