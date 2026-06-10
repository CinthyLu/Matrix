import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home').then((m) => m.Home),
    title: 'Veltrix Studio - Inicio',
  },
  // ─── NUEVA RUTA: PROGRAMADORES ───
  {
    path: 'programadores',
    loadComponent: () =>
      import('./views/programadores/programadores').then((m) => m.Programadores),
    title: 'Veltrix Studio - Nuestro Equipo',
  },
  // ─── NUEVA RUTA: PROYECTOS ───
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
  // Redirección en caso de ruta no encontrada
  { path: '**', redirectTo: '' },
];