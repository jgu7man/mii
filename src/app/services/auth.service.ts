import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  

  async googleSingIn() {
    // Iniciar sesión con una cuenta google
    const provider = new auth.GoogleAuthProvider();
    var credential = await this.afAuth.auth.signInWithPopup(provider)
      
    // Obtener el token
    var token = await this.afAuth.auth.currentUser.getIdToken(true)
    localStorage.setItem('tokenId', token)
      
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
    } else {
      var newData = { uid, email, displayName, photoURL, dateRegist }
      userRef.set(newData, { merge: true })
    }

    
    localStorage.setItem('mii', JSON.stringify(userDoc.data()))
    this.router.navigate(['']);
  }

}


export interface UserInterface {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    
    }