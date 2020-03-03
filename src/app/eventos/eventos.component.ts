import { Component, OnInit, ViewChild } from '@angular/core';
import { EventosService } from '../services/eventos.service';
import { EventosModel } from '../models/eventos.model';
import { faCalendarPlus, faCalendarTimes, faEdit, faFrown } from '@fortawesome/free-regular-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public listaEventos: EventosModel[];

  public isEmpty: boolean = true;

  public p: number = 1;

  public idEvento: number;

  public farCalendarPlus = faCalendarPlus;
  public farCalendarTimes = faCalendarTimes;
  public farEdit = faEdit;
  public fasCalendarDay = faCalendarDay;
  public farFrown = faFrown;

  @ViewChild('excluirComponent', { static: false }) excluirComponent: any;

  @ViewChild('alterarComponent', { static: false }) alterarComponent: any;

  constructor(private eventosService: EventosService) { }
   
  ngOnInit() {
    this.listarEventos();
  }
  
  listarEventos(){
    this.eventosService.findAll()
      .subscribe(response => {
        this.listaEventos = response;
        this.isEmpty = this.listaEventos.length < 1;
      },
        error => {
          console.log(error.message);
        }
      );
  }

  excluirEventos(){
    this.excluirComponent.eventoById(this.idEvento);
  }

  alterarEventos(){
    this.alterarComponent.eventoById(this.idEvento);
  }

}
