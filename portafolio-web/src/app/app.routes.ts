import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home').then((m) => m.Home),
    title: 'Veltrix Studio - Inicio',
  },
  // Ruta para ver a los programadores
  {
    path: 'programadores',
    loadComponent: () =>
      import('./views/programadores/programadores').then((m) => m.Programadores),
    title: 'Veltrix Studio - Nuestro Equipo',
  },
  // Ruta para ver los proyectos
  {
    path: 'proyectos',
    loadComponent: () =>
      import('./views/proyectos/proyectos').then((m) => m.Proyectos),
    title: 'Veltrix Studio - Proyectos',
  },
  {
    path: 'programador/:id',
    loadComponent: () =>
      import('./views/profile/profile').then((m) => m.Profile),
    title: 'Veltrix Studio - Perfil de Ingeniería',
  },
  {
    path: 'login',
    loadComponent: () => import('./views/auth/auth').then((m) => m.Auth),
    title: 'Veltrix Studio - Autenticación',
  },
  {
    path: 'solicitudes',
    loadComponent: () =>
      import('./views/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    title: 'Veltrix Studio - Panel de Solicitudes',
  },
  // Redireccionar al inicio si la página no existe
  { path: '**', redirectTo: '' },
];