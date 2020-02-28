import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventosModel } from '../models/eventos.model';
import { EventosService } from '../services/eventos.service';
import { faTimesCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck, faGrinTongueWink } from '@fortawesome/free-regular-svg-icons';

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

  public fasTimesCircle = faTimesCircle;
  public fasSyncAlt = faSyncAlt;
  public farCalendarCheck = faCalendarCheck;
  public farGrinTongueWink = faGrinTongueWink;


  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @ViewChild('exitModal', { static: false }) exitModal: ElementRef;

  @Output() public attEventos: EventEmitter<any> = new EventEmitter<any>();

  @Input() public idEvento: number;

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService
  ) {
  }

  ngOnInit(){
    this.formCadastroEvento = this.fb.group({
      descricao: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataTermino: [null, [Validators.required]],
      horarioInicio: [null, [Validators.required]],
      horarioTermino: [null, [Validators.required]],
    });
  }

  cadastrarAlterarEvento() {
    this.changeButton = true;
    this.eventos = this.formCadastroEvento.getRawValue();
    const inicio = new Date(this.eventos.dataInicio).getUTCDate() + "/" + (new Date(this.eventos.dataInicio).getUTCMonth() + 1) + "/" + new Date(this.eventos.dataInicio).getFullYear();
    const fim = new Date(this.eventos.dataTermino).getUTCDate() + "/" + (new Date(this.eventos.dataTermino).getUTCMonth() + 1) + "/" + new Date(this.eventos.dataTermino).getFullYear();
    this.eventos.dataInicio = inicio;
    this.eventos.dataTermino = fim;
    (this.idEvento!==null && this.idEvento!==undefined ? this.eventosService.edit(this.idEvento, this.eventos) : this.eventosService.insert(this.eventos))
      .subscribe(response => {
        //this.formCadastroEvento.reset();
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

  eventoById(eventoId) {
    this.eventosService.findById(eventoId)
      .subscribe(response => {
        this.eventos = response;
        const anoInicio = this.eventos.dataInicio.substring(6);
        const mesInicio = this.eventos.dataInicio.substring(3,5);
        const diaInicio = this.eventos.dataInicio.substring(0,2);
        const inicioFormatado = anoInicio+'-'+mesInicio+'-'+diaInicio;
        const anoTermino = this.eventos.dataTermino.substring(6);
        const mesTermino = this.eventos.dataTermino.substring(3,5);
        const diaTermino = this.eventos.dataTermino.substring(0,2);
        const terminoFormatado = anoTermino+'-'+mesTermino+'-'+diaTermino;
        this.eventos.dataInicio = inicioFormatado;
        this.eventos.dataTermino = terminoFormatado;
        this.formCadastroEvento.controls['descricao'].setValue(this.eventos.descricao);
        this.formCadastroEvento.controls['dataInicio'].setValue(this.eventos.dataInicio);
        this.formCadastroEvento.controls['dataTermino'].setValue(this.eventos.dataTermino);
        this.formCadastroEvento.controls['horarioInicio'].setValue(this.eventos.horarioInicio);
        this.formCadastroEvento.controls['horarioTermino'].setValue(this.eventos.horarioTermino);
      },
        error => {
          console.log(error.message);
        }
      );
  }
}
