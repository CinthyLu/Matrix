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

  /** usuario actual (null si no autenticado) */
  readonly currentUser$ = user(this.auth);



  /** Registra un nuevo usuario externo con nombre, email y contraseña */
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

  /** Inicia sesión con email y contraseña */
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  /** Inicio de sesión con cuenta de Google (opcional extra) */
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  /** Cierra la sesión del usuario actual */
  logout() {
    return from(signOut(this.auth));
  }
}
