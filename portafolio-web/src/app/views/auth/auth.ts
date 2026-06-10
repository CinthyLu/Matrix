import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Modo: 'login' | 'registro'
  mode = signal<'login' | 'registro'>('login');
  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  // Formulario reactivo
  authForm = this.fb.nonNullable.group({
    nombre: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  setMode(newMode: 'login' | 'registro') {
    this.mode.set(newMode);
    this.errorMessage.set(null);
    this.authForm.reset();

    const nombreControl = this.authForm.get('nombre');
    if (newMode === 'registro') {
      nombreControl?.setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      nombreControl?.clearValidators();
    }
    nombreControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    const { nombre, email, password } = this.authForm.getRawValue();

    if (this.mode() === 'login') {
      this.authService.login(email, password).subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/solicitudes']);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set(this.getReadableError(err.code));
        },
      });
    } else {
      this.authService.register(nombre, email, password).subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/solicitudes']);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set(this.getReadableError(err.code));
        },
      });
    }
  }

  onGoogleLogin() {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/solicitudes']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(this.getReadableError(err.code));
      },
    });
  }

  private getReadableError(code: string): string {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'CREDANCIALES NO VÁLIDAS. VERIFIQUE SU CORREO Y CONTRASEÑA.';
      case 'auth/email-already-in-use':
        return 'EL CORREO ELECTRÓNICO YA SE ENCUENTRA EN USO POR OTRO USUARIO.';
      case 'auth/weak-password':
        return 'LA CONTRASEÑA ES DEMASIADO DÉBIL. MÍNIMO 6 CARACTERES.';
      case 'auth/invalid-email':
        return 'EL FORMATO DEL CORREO ELECTRÓNICO NO ES VÁLIDO.';
      case 'auth/popup-closed-by-user':
        return 'EL PROCESO DE INICIO DE SESIÓN CON GOOGLE FUE CANCELADO POR EL USUARIO.';
      default:
        return 'HA OCURRIDO UN ERROR TÉCNICO INESPERADO. INTENTE NUEVAMENTE.';
    }
  }
}
