import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventosModel } from '../models/eventos.model';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-cadastrar-evento',
  templateUrl: './cadastrar-evento.component.html',
  styleUrls: ['./cadastrar-evento.component.css']
})
export class CadastrarEventoComponent implements OnInit {

  public formCadastroEvento: FormGroup;

  public eventos: EventosModel;

  public isSuccesful: boolean = false;
  public changeButton: boolean = false;

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  @Output() public attEventos: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService
    ) {

  }

  ngOnInit() {
    this.formCadastroEvento = this.fb.group({
      descricao: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataTermino: [null, [Validators.required]],
      horarioInicio: [null, [Validators.required]],
      horarioTermino: [null, [Validators.required]],
    });
  }

  cadastrarEvento() {
    this.changeButton = true;
    this.eventos = this.formCadastroEvento.getRawValue();
    const inicio = new Date(this.eventos.dataInicio).getUTCDate() + "/" + (new Date(this.eventos.dataInicio).getUTCMonth() + 1) + "/" + new Date(this.eventos.dataInicio).getFullYear();
    const fim = new Date(this.eventos.dataTermino).getUTCDate() + "/" + (new Date(this.eventos.dataTermino).getUTCMonth() + 1) + "/" + new Date(this.eventos.dataTermino).getFullYear();
    this.eventos.dataInicio = inicio;
    this.eventos.dataTermino = fim;
    this.eventosService.insert(this.eventos)
      .subscribe(response => {
        this.formCadastroEvento.reset();
        this.closeModal.nativeElement.hidden = true;
        this.isSuccesful = true;
        setTimeout(response => {
          this.closeModal.nativeElement.click();
          this.attEventos.emit();
          this.closeModal.nativeElement.hidden = false;
          this.isSuccesful = false;
          this.changeButton = false;
        }, 4000)
      },
        error => {
          alert('Erro ao cadastrar evento, tente novamente mais tarde - ' + error.message);
          this.changeButton = false;
          this.formCadastroEvento.reset();
        }
      );
  }

}
