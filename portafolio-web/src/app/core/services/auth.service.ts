import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  updateProfile,
  connectAuthEmulator,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { Firestore, connectFirestoreEmulator } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  /** Usuario conectado actualmente (es null si no ha iniciado sesión) */
  readonly currentUser$ = user(this.auth);



  /** Registrar un nuevo usuario con su nombre, correo y contraseña */
   register(nombre: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).then(
        async (credential) => {
          await updateProfile(credential.user, { displayName: nombre });
          return credential;
        }
      )
    );
  }

  /** Iniciar sesión con correo y contraseña */
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  /** Iniciar sesión con cuenta de Google */
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  /** Cerrar sesión */
  logout() {
    return from(signOut(this.auth));
  }
}
