import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

/**
 * Guard que protege rutas que requieren autenticación.
 * Redirige a /login si el usuario no está autenticado.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    take(1),
    map((currentUser) => {
      if (currentUser) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  );
};
