import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {


    //? Método para cargar el usuario autenticado de manera asíncrona
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => { return user ? 
          this.afs.doc<UserInterface>(`usuarios/${user.uid}`).valueChanges() :
          of(null);
      })
    )
   }

  

  
   // ? Iniciar sesión con una cuenta google
  async googleSingIn() {
    // Abre el popup de autenticación
    const provider = new auth.GoogleAuthProvider();
    var credential = await this.afAuth.auth.signInWithPopup(provider)
      
    
      
    // Guardar los datos de cliente nuevo en firebase
    return this.updateUserData(credential.user)

  }

  private async updateUserData({ uid, email, displayName, photoURL }: UserInterface) {
    // Buscar el usuario en la base de datos de firebase
    const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`usuarios/${uid}`);
    const userDoc = await this.afs.collection('usuarios').ref.doc(uid).get()
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


  // ? Obtiene token
  async getToken() {
    const provider = new auth.GoogleAuthProvider();
    var credential = await (await this.afAuth.auth.signInWithPopup(provider))
    // Obtener el token
    var token = await this.afAuth.auth.currentUser.getIdTokenResult(false)
    console.log(token)
    localStorage.setItem('tokenId', token.token)
    
    
    return await this.afAuth.authState.pipe(first()).toPromise() ? true : false
  }



  //? Cerrar sesión

  async singOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('mii')
     return this.router.navigate(['/']);
  }

}


export interface UserInterface {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    
    }