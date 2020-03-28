import { Component, OnInit } from '@angular/core';
import { AgenteModel } from '../agente.model';

@Component({
  selector: 'mii-form-agregar-agente',
  templateUrl: './form-agregar-agente.component.html',
  styleUrls: ['./form-agregar-agente.component.scss']
})
export class FormAgregarAgenteComponent implements OnInit {

  agente
  constructor() {
    this.agente
  }

  ngOnInit() {
  }

}
