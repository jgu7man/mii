import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, UserInterface } from 'src/app/admin/auth/auth.service';
import { AgenteModel } from '../agente.model';
import { HistoryService } from 'src/app/global/history/history.service';
import { EventHistoryModel } from 'src/app/global/history/event-historiy.model';
import { AlertService } from 'src/app/global/alert/alert.service';
import { AlertMsgModel } from 'src/app/global/alert/models/alert-msg.model';

@Injectable({
  providedIn: 'root'
})
export class AgregarAgenteService {

  user: UserInterface
  constructor (
    private afs: AngularFirestore,
    private auth: AuthService,
    private _history: HistoryService,
    private _alert: AlertService
  ) { 
    this.auth.user$.pipe().subscribe( user => {
      if ( user ) { this.user = user }
    })
  }
  

  async agregarAgente(agente: AgenteModel) {
    var userRef = this.afs.collection( 'usuarios' ).ref.doc( this.user.uid )
    var agentesCol = userRef.collection( 'agentes' )
    var agenteAgregado = await agentesCol.add( {
      clientToken: agente.clientToken,
      developerToken: agente.developerToken
    } )
    
    var historyEvent: EventHistoryModel =
      new EventHistoryModel( 'usuarios', this.user.uid, 'create', 'Agente agregado' );
    await this._history.setEvent( historyEvent );

    var alertMsg: AlertMsgModel = new AlertMsgModel( 'Agente agregado con éxito' )
    this._alert.sendAlertMessage( alertMsg ).subscribe( () => {
      console.log('Ir a seccion de agentes')
    })
  }

}
