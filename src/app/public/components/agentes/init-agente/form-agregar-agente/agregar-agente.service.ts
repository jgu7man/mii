import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, UserInterface } from 'src/app/admin/auth/auth.service';
import { AgenteModel } from '../agente.model';
import { HistoryService } from 'src/app/global/history/history.service';
import { EventHistoryModel } from 'src/app/global/history/event-historiy.model';
import { AlertService } from 'src/app/global/alert/alert.service';
import { AlertMsgModel } from 'src/app/global/alert/models/alert-msg.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgregarAgenteService {

  user: UserInterface
  constructor (
    private afs: AngularFirestore,
    private auth: AuthService,
    private _history: HistoryService,
    private _alert: AlertService,
    private _http: HttpClient
  ) { 
    this.auth.user$.pipe().subscribe( user => {
      if ( user ) { this.user = user }
    })
  }
  

  async agregarAgente( agente: AgenteModel ) {

    this.getAgentFullfillment( 'nuevecito' ).subscribe( agent => {
      console.log( agent )

    })
    return
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


  // ? Crear proyecto
  getAgentFullfillment( agente: string): Observable<any> {

    var apires = JSON.parse( localStorage.getItem( 'authApiResp' ))
    var access_token = apires.access_token

    console.log( 'creando proyecto' )

    const headers = new HttpHeaders( {
      'Authorization':'Bearer '+ access_token,
      'Accept':'application/json'
    } )

    


    return this._http.get( `https://dialogflow.googleapis.com/v2/projects/nuevecito/agent`,
      { headers: headers }
    )
  }

}
