import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendarioEventos';

  public showHeader: boolean = false;

  public routerSubscription: Subscription;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe(event => { 
      if(event instanceof NavigationEnd) {
        this.showHeader =  event.url !== '/';
      }
  });
}

}
