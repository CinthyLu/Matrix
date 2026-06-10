# 📋 Planning — Portafolio Web Integrador
> **Estado actual:** Fase 1 completada ✅ — Continúa desde la Fase 2

---

## ✅ FASE 1 — Setup Base (COMPLETADA)

- [x] Corregir naming de rutas (Angular 21: `home.ts` → clase `Home`, sin `.component`)
- [x] Implementar lazy loading con `loadComponent` en todas las rutas
- [x] Agregar `authGuard` a la ruta `/solicitudes`
- [x] Crear vistas stub vacías: `profile`, `auth`, `dashboard`
- [x] Crear `src/environments/environment.ts` y `environment.production.ts`
- [x] Crear `src/app/core/models/models.ts` — interfaces de todos los tipos
- [x] Crear `src/app/core/services/strapi.service.ts`
- [x] Crear `src/app/core/services/auth.service.ts`
- [x] Crear `src/app/core/guards/auth.guard.ts`
- [x] Instalar `firebase` y `@angular/fire`
- [x] Actualizar `app.config.ts` con `provideHttpClient`, `provideFirebaseApp`, `provideAuth`, `provideFirestore`

> ⚠️ **Pendiente tú:** Rellena `src/environments/environment.ts` con los datos reales de tu Firebase

---

## 🔧 FASE 2 — Strapi CMS Setup

> Puedes hacer esto en paralelo mientras trabajas en el frontend.
> Strapi puede ejecutarse localmente (`localhost:1337`) o en Strapi Cloud.

### 2.1 — Instalar Strapi (si no lo tienes)
```bash
# En una carpeta SEPARADA al proyecto Angular
npx create-strapi-app@latest portafolio-cms --quickstart
```

### 2.2 — Crear Content Types en el panel de Strapi (`/admin`)

| Content Type | Campos requeridos |
|---|---|
| **Programador** | `nombre` (Text), `apellido` (Text), `email` (Email), `foto` (Media), `bio` (Rich Text), `especialidad` (Text), `tecnologias` (Relation → Tecnología), `proyectos` (Relation → Proyecto) |
| **Proyecto** | `nombre` (Text), `descripcion` (Rich Text), `imagen` (Media), `url` (Text), `destacado` (Boolean), `tecnologias` (Relation → Tecnología), `programadores` (Relation → Programador) |
| **Servicio** | `nombre` (Text), `descripcion` (Text), `icono` (Text — nombre del ícono o SVG) |
| **Tecnologia** | `nombre` (Text), `logo` (Media), `categoria` (Text) |
| **Home** | `titulo_hero` (Text), `subtitulo_hero` (Text), `descripcion_empresa` (Rich Text), `imagen_hero` (Media) |

### 2.3 — Configurar permisos de API en Strapi
- Ir a **Settings → Roles → Public**
- Habilitar `find` y `findOne` para: Programador, Proyecto, Servicio, Tecnologia, Home

### 2.4 — Actualizar `environment.ts` con la URL de Strapi
```typescript
strapiUrl: 'http://localhost:1337/api', // local
// ó
strapiUrl: 'https://tu-proyecto.strapiapp.com/api', // Strapi Cloud
```

### 2.5 — Ingresar contenido de prueba
- Crear 2 programadores reales + 2-3 ficticios
- Crear 4-6 proyectos (al menos 2 con `destacado: true`)
- Crear 3-4 servicios
- Crear 3-5 tecnologías
- Crear 1 registro de Home

---

## 🏠 FASE 3 — Vista Home

> Archivo: `src/app/views/home/home.ts` + `home.html` + `home.scss`

### Secciones a implementar (en orden):

#### 3.1 — Sección Hero
- Datos desde Strapi (`getHome()`)
- Título, subtítulo, descripción de la empresa
- Imagen de fondo o hero image
- Botón CTA → scroll a sección de programadores

#### 3.2 — Cards de Programadores
- Datos desde `getProgramadores()`
- Card con: foto, nombre, apellido, especialidad
- Al hacer click → navega a `/programador/:documentId`

#### 3.3 — Sección de Servicios
- Datos desde `getServicios()`
- Grid de cards con nombre, descripción e icono

#### 3.4 — Proyectos Destacados
- Datos desde `getProyectosDestacados()` (filtra `destacado: true`)
- Cards con imagen, nombre, descripción, tecnologías usadas

#### 3.5 — Sección de Contacto / CTA
- Botón "Enviar Solicitud"
- Si no está autenticado → redirige a `/login`
- Si está autenticado → abre modal/formulario de solicitud

### Componentes reutilizables a crear en `src/app/components/`:
- `programmer-card/` → card de programador
- `project-card/` → card de proyecto  
- `service-card/` → card de servicio
- `navbar/` → barra de navegación
- `footer/` → pie de página

---

## 👤 FASE 4 — Vista Perfil del Programador

> Archivo: `src/app/views/profile/profile.ts`

### Pasos:

#### 4.1 — Obtener ID desde la ruta
```typescript
const route = inject(ActivatedRoute);
const id = route.snapshot.paramMap.get('id'); // documentId de Strapi
```

#### 4.2 — Cargar datos del programador
- Llamar `strapiService.getProgramadorById(id)`
- Mostrar: foto, nombre, apellido, bio, especialidad, tecnologías

#### 4.3 — Listar proyectos del programador
- Los proyectos vienen relacionados desde Strapi
- Si un proyecto tiene 2 programadores → aparece en ambos perfiles

#### 4.4 — Botón de solicitud
- "Contratar / Enviar solicitud"
- Requiere autenticación → redirige a `/login` si no está logueado
- Si está logueado → abre el formulario de contacto con el programador pre-seleccionado

---

## 🔐 FASE 5 — Autenticación Firebase

> Archivo: `src/app/views/auth/auth.ts`

### Pasos:

#### 5.1 — Completar `AuthService`
- El servicio ya está creado en `src/app/core/services/auth.service.ts`
- Verifica que los métodos funcionen con tu proyecto Firebase

#### 5.2 — Construir el formulario de Auth
- Tabs o toggle entre **Iniciar Sesión** y **Registrarse**
- **Login:** email + contraseña → `authService.login()`
- **Registro (solo usuarios externos):** email + contraseña → `authService.register()`
- **Google (opcional extra):** botón → `authService.loginWithGoogle()`

#### 5.3 — Manejo de errores
- `auth/email-already-in-use` → "El correo ya está registrado"
- `auth/wrong-password` → "Contraseña incorrecta"
- `auth/user-not-found` → "Usuario no encontrado"

#### 5.4 — Post-login
- Redirigir a la página anterior (si venía de guardar solicitud)
- O redirigir a `/` por defecto

#### 5.5 — Actualizar Navbar
- Sin sesión: mostrar botón "Iniciar Sesión"
- Con sesión: mostrar nombre de usuario + botón "Cerrar Sesión"

#### 5.6 — Crear cuentas de programadores en Firebase
- Ir a Firebase Console → Authentication → Users → "Add user"
- Crear cuenta con el mismo email que tienen en Strapi

---

## 📩 FASE 6 — Solicitudes de Contacto (Firestore)

### Pasos:

#### 6.1 — Crear `SolicitudesService`
> Archivo: `src/app/core/services/solicitudes.service.ts`

```typescript
// Métodos necesarios:
crearSolicitud(data: Solicitud): Promise<DocumentReference>
getSolicitudesDeUsuario(uid: string): Observable<Solicitud[]>
getSolicitudesDeProgramador(programadorId: string): Observable<Solicitud[]>
actualizarSolicitud(id: string, cambios: Partial<Solicitud>): Promise<void>
```

#### 6.2 — Crear componente de formulario de solicitud
> Archivo: `src/app/components/contact-form/`

Campos del formulario:
- `nombreSolicitante` (pre-llenado desde Firebase Auth)
- `correoSolicitante` (pre-llenado desde Firebase Auth)
- `descripcionProyecto` (textarea)
- `programadorId` + `programadorNombre` (puede venir pre-seleccionado desde el perfil)

#### 6.3 — Integrar con Home y Perfil
- El botón "Enviar solicitud" en Home → abre el form (usuario elige programador)
- El botón en Perfil → abre el form con programador pre-seleccionado

#### 6.4 — Configurar reglas de seguridad en Firestore
```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /solicitudes/{solicitudId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        (resource.data.uid == request.auth.uid || 
         resource.data.programadorId == request.auth.token.email);
      allow update: if request.auth != null;
    }
  }
}
```

---

## 📊 FASE 7 — Dashboard de Solicitudes

> Archivo: `src/app/views/dashboard/dashboard.ts`

### Pasos:

#### 7.1 — Detectar el rol del usuario
```typescript
// Lógica:
// 1. Obtener email del usuario autenticado
// 2. Obtener lista de programadores desde Strapi
// 3. Si el email coincide con algún programador → rol = 'programador'
// 4. Si no → rol = 'usuario'
```

#### 7.2 — Vista de Usuario Externo
- Tabla/lista de sus solicitudes enviadas
- Columnas: programador, fecha, estado, descripción
- Estados con colores: 🟡 Pendiente, 🟢 Respondida

#### 7.3 — Vista de Programador
- Tabla/lista de solicitudes recibidas
- Por cada solicitud: nombre del solicitante, descripción, fecha, estado actual
- Acciones:
  - Cambiar estado → `actualizarSolicitud(id, { estado: 'Respondida' })`
  - Agregar observación → `actualizarSolicitud(id, { observacion: '...' })`

---

## 🎨 FASE 8 — Diseño, Responsive y UX

### Pasos:

#### 8.1 — Navbar final
```
Sin sesión:    [Logo] [Home] [Iniciar Sesión]
Usuario:       [Logo] [Home] [Mis Solicitudes] [Cerrar Sesión]
Programador:   [Logo] [Home] [Solicitudes Recibidas] [Cerrar Sesión]
```

#### 8.2 — Responsive (TailwindCSS)
- Mobile first (`sm:`, `md:`, `lg:` breakpoints)
- Grid de cards: 1 col mobile → 2 cols tablet → 3 cols desktop
- Navbar → menú hamburguesa en mobile

#### 8.3 — Estados de carga y errores
- Skeleton loaders mientras se carga Strapi
- Mensajes de error si la API no responde
- Toast/snackbar para confirmaciones (solicitud enviada, estado actualizado)

#### 8.4 — Animaciones
- Transiciones de entrada para cards (fade-in, slide-up)
- Hover effects en cards de programadores y proyectos
- Transición suave entre rutas

---

## 🚀 FASE 9 — Despliegue

### Pasos:

#### 9.1 — SEO (usando Angular SSR)
```typescript
// En cada componente/vista:
import { Title, Meta } from '@angular/platform-browser';

// En ngOnInit o constructor:
title.setTitle('Home | Portafolio Dev');
meta.updateTag({ name: 'description', content: '...' });
```

#### 9.2 — Archivos estáticos SEO
- `public/robots.txt`
- `public/sitemap.xml`

#### 9.3 — Build de producción
```bash
ng build --configuration production
```

#### 9.4 — Deploy en Firebase Hosting
```bash
pnpm add -D firebase-tools
npx firebase login
npx firebase init hosting
# dist dir: dist/portafolio-web/browser
npx firebase deploy
```

#### 9.5 — Configurar Strapi Cloud (o mantener local con túnel)
- Opción A: Subir a **Strapi Cloud** (plan gratuito disponible)
- Opción B: Usar **ngrok** para exponer el local temporalmente en demo

---

## 📦 Entregables Finales

- [ ] Repositorio en GitHub con el código fuente
- [ ] Link de la app en Firebase Hosting
- [ ] README con:
  - Descripción del proyecto
  - Guía de instalación y configuración
  - Variables de entorno requeridas
  - Guía de usuario (admin y usuario final)
- [ ] Video de presentación técnica

---

## 🗺️ Orden de Trabajo Resumido

```
Fase 1 ✅ → Fase 2 (Strapi) → Fase 3 (Home) → Fase 4 (Perfil)
                                     ↓
                              Fase 5 (Auth)
                                     ↓
                              Fase 6 (Solicitudes)
                                     ↓
                              Fase 7 (Dashboard)
                                     ↓
                              Fase 8 (Diseño/UX)
                                     ↓
                              Fase 9 (Deploy)
```
