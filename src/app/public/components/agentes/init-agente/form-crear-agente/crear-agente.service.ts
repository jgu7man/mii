import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgenteModel } from '../agente.model';
import { AuthService } from 'src/app/admin/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInterface } from 'src/app/admin/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AgenteService {
  
  constructor(
    private _http: HttpClient,
    private _auth: AuthService,
    private afs: AngularFirestore
  ) { }

  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  
  
  // ? Guardar datos en base de datos
  async saveAgent(agente: AgenteModel) {

    
    
    if ( agente)
    {

      console.log('token obtenido, guardar agente');
      
      this._auth.user$.pipe().subscribe( async ( user ) => {
        // var user: UserInterface = authUser.user
    
        // Eliminar campos vacios
        Object.keys( agente ).forEach( key => {
          if ( agente[ key ] == '' || agente[ key ] == undefined ) delete agente[ key ]
        } )

        agente = { ...agente }


        // Guardado a Firestore
        const userRef = this.afs.collection( 'usuarios' ).ref.doc( user.uid )
        const agentesColl = userRef.collection( 'agentes' )
        const agenteNuevo = await agentesColl.add( agente )

      
        // Transformar id para generar un string único
        // Juntar el nombre del agente sin espacios más 6 dígitos del ID generado
        // por el Firebase
        var sufixId = agente.displayName.split( ' ' ).join( '-' )
        var codeId = agenteNuevo.id.slice( 0, 6 )


        agente[ 'agenteId' ] = `${ sufixId.toLowerCase() }-${ codeId.toLowerCase() }`
        console.log( { agenteId: agente.agenteId } )
    

        this.waitFor( 5000 )
        
        this.createProject( agente ).subscribe( () => {
          console.log( 'creado' )
        } )

        return

        // * Espera la creación del proyecto

          this.createProject( agente ).subscribe( res => {
          

            console.log( 'proyecto creado' )
            this._auth.getAccessToken()
            this._auth.authenticated$.subscribe( () => {
              this.waitFor( 5000 )
              
              // * Crear el agente
              this.createAgent( agente ).subscribe( () => {
                  console.log( 'creado' )
                } )
            })
          })


      })
      
    } else {
      console.log('no se autenticó')
    }
      

  }

  
  
  
  
  
  // ? Crear proyecto
  createProject( agente?: AgenteModel): Observable<any>{

    console.log( 'creando proyecto' )
    var access_token = localStorage.getItem('access_token')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + access_token
    } )


    
    console.log(agente);
    // * Asignar datos del proyecto
    const body = {
      "name": agente.displayName,
      "projectId": agente.agenteId,
      "labels": {
        "tipo": "prueba"
      }
    }


    return this._http.post(`https://cloudresourcemanager.googleapis.com/v1/projects`,
      body,
      { headers: headers }
      )
      
  }



  // ? Crear Agente
  createAgent( agente: AgenteModel ): Observable<any> {
    
    var access_token = JSON.parse( localStorage.getItem( 'access_token' ) )
    const headers = new HttpHeaders( {
      'Authorization': 'Bearer ' + access_token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    } )


    // * Asignar datos del agente
    const parent = `asesor-ini3ac`
    const body = {
      "displayName": agente.displayName,
      "parent": parent,
      "defaultLanguageCode": agente.defaultLanguageCode,
      "timeZone": agente.timeZone,
      "description": agente.description,
      "avatarUri": agente.avatarUri,
      "enableLogging": true,
      "matchMode": 'MATCH_MODE_HYBRID',
      "classificationThreshold": 0.3,
      "apiVersion": 'API_VERSION_V2',
    }


    
    // * Crear el agente de dialogflow
    return this._http.post(`https://dialogflow.googleapis.com/v2/projects/${parent}?key=`, body, {headers: headers})


  }


  
  

}


