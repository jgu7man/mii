
import { Injectable, OnInit, NgZone, AfterViewInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'
import { Router } from '@angular/router';
import { of, Observable, from, BehaviorSubject } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { promise } from 'protractor';
import { reject } from 'q';
import { resolve } from 'url';

/// <reference types="gapi"/>
declare var gapi:any;

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public auth2: any;
  currentApiRequest: object;
  GoogleAuth:any;
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private _http: HttpClient,
    private ngZone: NgZone,

  ) {
    //? Método para cargar el usuario autenticado de manera asíncrona
   }

   // ? Iniciar sesión con una cuenta google
  async googleSingIn():Promise<void>{
    // // Abre el popup de autenticación
    // let provider = new firebase.auth.GoogleAuthProvider();
    // var credential = await this.afAuth.auth.signInWithPopup(provider)
    // console.log(credential.user);
    let scope = "https://www.googleapis.com/auth/cloud-platform";
    try {
      let googleUser = await this.auth2.signIn({scope});
      let token = await googleUser.getAuthResponse().id_token;

      //si se va a usar firebase Auth se llama metodo authWithFirebase
    
    } catch (error) {
      console.log("Error en googleSignIn", error);
    }

    // Guardar los datos de cliente nuevo en firebase

  }
  private async authWithFirebase(token: string): Promise<void>{
    let credential = firebase.auth.GoogleAuthProvider.credential(token);
    let profile = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    if(profile.user){
      console.log('User:', profile.user.displayName + 'Succefully logged in');
    }
  }
  
  private async updateUserData({ uid, email, displayName, photoURL }: UserInterface) {
    // Buscar el usuario en la base de datos de firebase
    const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`usuarios/${uid}`);
    const userDoc = await this.afs.collection('usuarios').ref.doc(uid).get();
    const dateRegist = new Date()
    
    // Si no existe, se agrega fecha de registro
    if (userDoc.exists) {
      var data = { uid, email, displayName, photoURL }
      userRef.set(data, { merge: true })
      localStorage.setItem('mii', JSON.stringify(userDoc.data()))
    } else {
      var newData = { uid, email, displayName, photoURL, dateRegist }
      userRef.set(newData, { merge: true })
      localStorage.setItem('mii', JSON.stringify(newData))
    }

    
    this.router.navigate(['']);
  }

  public getCurrentUser():firebase.User{
    return this.afAuth.auth.currentUser;
  }
  async loadClientWithDiscovery(urlDiscovery:object | string): Promise<void>{
    gapi.client.setApiKey(environment.firebaseConfig.apiKey);
    return await gapi.client.load(urlDiscovery)
      .then(() => {
        console.log('Client for ' + urlDiscovery + " Loaded with success");
      }, err =>{
        console.log(err);
      });
  }
  async createProject():Promise<void>{
    let scopesToCheck = ['https://www.googleapis.com/auth/cloud-platform '];

    return new Promise( (resolve, reject) => {
      let googleUser = this.auth2.currentUser.get();
      if(googleUser.hasGrantedScopes(scopesToCheck[0])){
        console.log('OK you may do the request now');
        gapi.client.cloudresourcemanager.projects.create({
          "resource": {
            "name": "holaMUndo",
            "projectId": "algonuevo-2492"
          }
        }).then((response) => {
          console.log('All good: ', response);
        }, err => {
          console.error("Error occurred:", err);
        })
      }else {
        //lets get permission
        //not suppose to be happend yet
      }
    });
  }
  private updateSignInStatus(isSignedIn: boolean): void{
    let googleUser = this.auth2.currentUser.get();
    this.user$.next(googleUser);
    console.log("User Logged In", this.user$);
    console.log("User is signed In?:"+ isSignedIn);
    this.isLoggedIn$.next(isSignedIn);
  }
  // // ? Obtiene token
  // async getToken() {
  //   const provider = new firebase.auth.GoogleAuthProvider();

  //   var authed = await this.afAuth.authState.pipe(first()).toPromise() ? true : false;

  //   console.log({authed})

  //   // if (!authed) {

  //   var credential = await (await this.afAuth.auth.signInWithPopup(provider))
  //   console.log(credential)
  //   var json = await credential.credential.toJSON()
  //   console.log(json)
  //     var accessToken = json['oauthAccessToken']

  //     // localStorage.setItem('accessToken', accessToken )
  //   // } else {
      
  //     // var accessToken = localStorage.getItem('accessToken')
  //     // if(!accessToken){
  //     //   var credential = await (await this.afAuth.auth.signInWithPopup(provider))
  //     //   var json = await credential.credential.toJSON()
  //     //   var accessToken = json['oauthAccessToken']
  //     //   localStorage.setItem('accessToken', accessToken)
  //     // }

  //   // }
  //   // Obtener el token
  //   // var token = await this.afAuth.auth.currentUser.getIdTokenResult(false)
  //   // console.log(token)


  //   // console.log({accessToken})
  //   return false
    
  // }

  //? Cerrar sesión
  signOut(): void {
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.isLoggedIn$.next(false);
        this.user$ .next(null);
      });
    }, (err) => {
      console.error(err);
    });
  }
  async singOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('mii')
     return this.router.navigate(['/']);
  }


  async googleApis() {
    // const url = await oauth2Client.generateAuthUrl( {
    //   access_type: 'offline',
    //   scope: [
    //     'https://www.googleapis.com/auth/cloud-platform',
    //     'https://www.googleapis.com/auth/cloudplatformprojects'
    //   ]
    // } );

    // const { tokens } = await oauth2Client.getToken( code )
    // oauth2Client.setCredentials( tokens );
    return
  }

  // openPopup () {
  //   const name = 'Authorization'
  //   const options = `width=${ 500 },height=${ 600 },left=${ 0 },top=${ 0 }`;
  //   const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=683912406589-acc9kkbnqu7qgao221kuk6aqanqli01b.apps.googleusercontent.com&response_type=code&include_granted_scopes=true&scope=https%3A//www.googleapis.com/auth/cloud-platform&redirect_uri=http://localhost&access_type=offline`;

  //   console.log( url )

  //   return window.open( url, name, options );
  // }

  authApi (): Observable<any> {

    let headers = new HttpHeaders( {
      'Content-Type': 'application/x-www-form-urlencoded'
    } )

    let body = `code=4%2FywHm6ijVW1UcYKgZM8iu-StiIEs_-caQOoafqlcRQMIVTMc8nNpbOzjQj__c5eb-WX76lMEwADnEHhpMLS0ixR8&client_id=683912406589-acc9kkbnqu7qgao221kuk6aqanqli01b.apps.googleusercontent.com&client_secret=FsTiRJz155vCC0CE3HRu-v0u&grant_type=authorization_code&redirect_uri=http://localhost`


    return this._http.post( `https://www.googleapis.com/oauth2/v4/token`,
      body, { headers: headers } )
  }



  initClient():Promise<void>{
    console.log('Iniciando cliente..');
    var SCOPES = [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/dialogflow',
    ];
    var discovery: [
      'https://dialogflow.googleapis.com/$discovery/rest?version=v2',
      'https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v2',
      "https://content.googleapis.com/discovery/v1/apis/cloudresourcemanager/v1/rest"
    ];
    const CLIENT_ID = '927151841695-526cs18mcq491eknl293ndlaeut0385s.apps.googleusercontent.com';
    
    var initObject: Object = {
      clientId: CLIENT_ID,
      scope: `${SCOPES}`
    };

    return new Promise( (resolve, reject) => {
      this.ngZone.run(() => {

        console.log(initObject);
        gapi.auth2.init(initObject)
          .then( async resolve => {
            
            console.log('client initialized');
          },reject);
      })
    });     
  }

  loadAuth2(): Promise<void>{
    const CLIENT_ID = '927151841695-526cs18mcq491eknl293ndlaeut0385s.apps.googleusercontent.com';

    return new Promise( (resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.auth2.init({ 
            client_id: CLIENT_ID ,
            fetch_basic_profile: true
        })
         .then((auth) => {
            this.ngZone.run(() => {
              //now i can use resourcemanager api
              this.loadClientWithDiscovery('https://content.googleapis.com/discovery/v1/apis/cloudresourcemanager/v1/rest');
              this.isLoaded$.next(true);
              console.log('Library Loaded');
              //equals to getAuthInstance I belive so, lol
              this.auth2 = auth;
              this.auth2.isSignedIn.listen(this.updateSignInStatus);
            });
          })
         .then(resolve, reject);
      });
    });
  }
    // }
  // private updateSigninStatus(isSignedIn) {
  //   if (isSignedIn) {
  //     this.isAuthorized = true;
  //     if (this.currentApiRequest) {
  //       // sendAuthorizedApiRequest(this.currentApiRequest);
  //     }
  //   } else {
  //     this.isAuthorized = false;
  //   }
  // }

}


export interface UserInterface {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    
    }