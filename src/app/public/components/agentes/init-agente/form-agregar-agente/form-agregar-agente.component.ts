import { Component, OnInit } from '@angular/core';
import { AgenteModel } from '../agente.model';
import { AgregarAgenteService } from './agregar-agente.service';

@Component({
  selector: 'mii-form-agregar-agente',
  templateUrl: './form-agregar-agente.component.html',
  styleUrls: ['./form-agregar-agente.component.scss']
})
export class FormAgregarAgenteComponent implements OnInit {

  public agente
  constructor ( public add_agente: AgregarAgenteService ) {
    this.agente = new AgenteModel('','','','')
  }

  ngOnInit() {
  }

  submit() {
    this.add_agente.agregarAgente( this.agente )
  }



}
