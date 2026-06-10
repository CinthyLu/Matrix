import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StrapiService } from '../../core/services/strapi.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// Ampliamos la interfaz para incluir el rol, el nombre y el ID
interface UserDisplay {
  name: string;
  email: string | null;
  isProgrammer: boolean;
  programmerId?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.html',
})
export class Header {
  private authService = inject(AuthService);
  private strapiService = inject(StrapiService);

  currentUser$: Observable<UserDisplay | null> = this.authService.currentUser$.pipe(
    switchMap((user) => {
      if (!user) return of(null);
      
      return this.strapiService.getProgramadores().pipe(
        map((programmers) => {
          const matchingProg = programmers.find(
            (p) => p.Contact_Email.toLowerCase() === user.email?.toLowerCase()
          );
          return {
            name: user.displayName || user.email?.split('@')[0] || 'Usuario',
            email: user.email,
            isProgrammer: !!matchingProg,
            programmerId: matchingProg?.documentId,
          };
        })
      );
    })
  );

  logout() {
    this.authService.logout();
  }
}