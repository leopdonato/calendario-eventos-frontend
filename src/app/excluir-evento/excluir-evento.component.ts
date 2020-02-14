import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { EventosService } from '../services/eventos.service';
import { EventosModel } from '../models/eventos.model';

@Component({
  selector: 'app-excluir-evento',
  templateUrl: './excluir-evento.component.html',
  styleUrls: ['./excluir-evento.component.css']
})
export class ExcluirEventoComponent implements OnInit {

  @Input()
  public idEvento: number;

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  public isSuccesful: boolean = false;

  public evento: EventosModel;

  public isCharging: boolean = true;

  @Output() public attEventos: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit() {
  }

  eventoById(eventoId) {
    this.eventosService.findById(eventoId)
      .subscribe(response => {
        this.evento = response;
        this.isCharging = false;
      },
        error => {
          console.log(error.message);
        }
      );
  }

  deletarEvento() {
    //this.isCharging = true;
    this.eventosService.delete(this.idEvento)
      .subscribe(respose => {
        //this.isCharging = false;
        this.isSuccesful = true;
        this.closeModal.nativeElement.hidden = true;
        setTimeout(response => {
          this.closeModal.nativeElement.click();
          this.attEventos.emit();
          this.closeModal.nativeElement.hidden = false;
          this.isSuccesful = false;
        }, 4000)
      },
        error => {
          alert('Erro ao excluir evento, tente novamente mais tarde - ' + error.message);
          this.isCharging = false;
        })
  }

}
