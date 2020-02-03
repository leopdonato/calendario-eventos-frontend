import { Component, OnInit } from '@angular/core';
import { EventosService } from '../services/eventos.service';
import { EventosModel } from '../models/eventos.model';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public listaEventos: EventosModel[];

  public isEmpty: boolean;

  constructor(private eventosService: EventosService) { }

  ngOnInit() {
    this.listarEventos();
  }

  listarEventos(){
    this.eventosService.findAll()
      .subscribe(response => {
        this.listaEventos = response;
        this.isEmpty = false;
      },
      error => {
        console.log(error.message);
        this.isEmpty = true;
      }
      );
  }

  deletar(id:string){
    this.eventosService.delete(id)
    .subscribe(respose => {
      this.listarEventos();
    },
    error => {
      console.log(error.message);
    })
  }

}
