import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('closeModal', {static: false}) closeModal: ElementRef;

  constructor(private fb: FormBuilder,
    private eventosService: EventosService) {
    
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

  cadastrarEvento(){
    this.eventos = this.formCadastroEvento.getRawValue();
    const inicio = new Date (this.eventos.dataInicio).getUTCDate()+"/"+new Date(this.eventos.dataInicio).getMonth()+"/"+new Date(this.eventos.dataInicio).getFullYear();
    const fim = new Date (this.eventos.dataTermino).getUTCDate()+"/"+new Date(this.eventos.dataTermino).getMonth()+"/"+new Date(this.eventos.dataTermino).getFullYear();
    this.eventos.dataInicio = inicio;
    this.eventos.dataTermino = fim;
    this.eventosService.insert(this.eventos)
      .subscribe(response => {
        this.formCadastroEvento.reset();
        alert('Evento cadastrado com sucesso!');
        this.closeModal.nativeElement.click();
      },
      error => {
        console.log(error.message);
      }
      );
  }

}
