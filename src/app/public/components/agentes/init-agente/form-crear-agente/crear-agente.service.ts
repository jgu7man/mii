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
  
  
  // * Guardar datos en base de datos
  async saveAgent(agente: AgenteModel) {

    // * Tomar los datos del usuario autentincado
      this._auth.user$.pipe().subscribe(async (user: UserInterface) => {
    
        // Eliminar campos vacios
        Object.keys( agente ).forEach( key => {
            if ( agente[ key ] == '' || agente[ key ] == undefined )
            delete agente[ key ]
        })
        agente = { ...agente }


        // Guardado a Firestore
        const userRef = this.afs.collection('usuarios').ref.doc(user.uid)
        const agentesColl = userRef.collection('agentes')
        const agenteNuevo = await agentesColl.add(agente)

      
        // * Transformar id para generar un string único
        // Juntar el nombre del agente sin espacios más 6 dígitos del ID generado
        // por el Firebase
        var sufixId = agente.displayName.split(' ').join('-')
        var codeId = agenteNuevo.id.slice(0, 6)


        agente['agenteId'] = `${sufixId}-${codeId}`
        console.log({ agenteId: agente.agenteId })
    

        this.waitFor(5000)
        

        // * Espera la creación del proyecto
        // await this.createProject(agente).toPromise()

        // * Crear el agente
        await this.createAgent(agente).subscribe(() => {
          console.log('creado')
        })
        
      })
    
      

  }

  
  
  
  
  
  // ? Crear proyecto
  createProject(agente?: AgenteModel, token?): Observable<any>{

    console.log('creando proyecto')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'scope': 'https://www.googleapis.com/auth/cloud-platform',
      'Authorization': 'Bearer ya29.a0Ae4lvC0t_7pftEmBPxLxJ613siFpWWOswXMH8f_dcwMHvYEMcKLz9V5jstINNEuEljdbhrttSCbCeZ25b4PV-EJ_eetnbdLEAtXKyRJRFgLG61_zoE5T1CuHDYClve_sLcBeUNp-8kwHashiTSmgeYvUGEvx32IEjlQ'
    })

    

    // * Asignar datos del proyecto
    const body = {
      "name": 'agenteNuevo',
      "projectId": 'agenteNuevo1234',
      "labels": {
        "agenteMii": 'prueba'
      }
    }


    return this._http.post(`https://cloudresourcemanager.googleapis.com/v1/projects`,
      body,
      { headers: headers }
    )
  }



  // ? Crear Agente
  createAgent(agente: AgenteModel): Observable<any> {


    // * Asignar datos del agente
    const parent = `${agente.displayName}-${agente.agenteId}`
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
    return this._http.post(`https://dialogflow.googleapis.com/v2/projects/${parent}`, body)


  }


  
  

}


