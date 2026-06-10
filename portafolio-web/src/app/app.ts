import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { Header } from './components/header/header';
import { FooterComponent } from './components/footer/footer'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portafolio-web');
  protected readonly authService = inject(AuthService);

  logout() {
    this.authService.logout().subscribe();
  }
}

