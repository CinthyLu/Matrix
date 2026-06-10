<div align="center">

# 🖥️ Portafolio DevCuenca Solutions

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Strapi](https://img.shields.io/badge/Strapi-v5-4945FF?style=for-the-badge&logo=strapi&logoColor=white)

**Portafolio profesional multiusuario para DevCuenca Solutions**

*Universidad Politécnica Salesiana — Programación y Plataformas Web · Marzo – Agosto 2026*

[🚀 Ver Demo](#-demo) · [📖 Documentación](#️-instalación-y-configuración) · [🐛 Reportar Bug](https://github.com/macobosf/Portafolio-DevCuencaSolutions/issues)

</div>

---

## 📋 Tabla de contenidos

- [🚀 Demo](#-demo)
- [📝 Descripción](#-descripción)
- [🏗️ Arquitectura del sistema](#️-arquitectura-del-sistema)
- [✅ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [📦 Requisitos previos](#-requisitos-previos)
- [⚙️ Instalación y configuración](#️-instalación-y-configuración)
- [🔐 Variables de entorno](#-variables-de-entorno)
- [🔥 Configuración de Firebase](#-configuración-de-firebase)
- [🎛️ Configuración de Strapi](#️-configuración-de-strapi)
- [📁 Estructura del proyecto](#-estructura-del-proyecto)
- [👥 Roles y permisos](#-roles-y-permisos)
- [📖 Guía de uso](#-guía-de-uso)
- [🚢 Despliegue](#-despliegue)
- [👨‍💻 Contribuidores](#-contribuidores)
- [📄 Licencia](#-licencia)

---

## 🚀 Demo

| Entorno | URL |
|---------|-----|
| 🌐 App pública | [https://portafolio-54995.web.app](https://portafolio-54995.web.app) |
| 🎛️ Strapi Admin | [https://creative-ducks-5c57b268fa.strapiapp.com/admin](https://creative-ducks-5c57b268fa.strapiapp.com/admin) |

---

## 📝 Descripción

**Portafolio DevCuenca Solutions** es una aplicación web profesional que permite a los integrantes de DevCuenca Solutions mostrar sus proyectos, habilidades y servicios al público, y gestionar las solicitudes de contacto de usuarios externos.

### Objetivo académico

Proyecto integrador de la materia **Programación y Plataformas Web**, dictada por el **Ing. Pablo Torres** en la **Universidad Politécnica Salesiana**, período Marzo–Agosto 2026. Aplica conceptos de desarrollo frontend moderno, integración de servicios cloud, autenticación, bases de datos en tiempo real y CMS headless.

### Arquitectura general

La aplicación separa claramente las responsabilidades: el frontend en Angular 21 consume datos del CMS (Strapi) para el contenido dinámico y usa Firebase para la autenticación y el almacenamiento de solicitudes. Toda la infraestructura está desplegada en la nube.

---

## 🏗️ Arquitectura del sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │               Angular 21 (SPA)                      │   │
│   │   Signals · Standalone Components · OnPush · RxJS   │   │
│   └────────────┬───────────────────┬────────────────────┘   │
│                │                   │                         │
│       ┌────────┴──────┐   ┌────────┴────────────┐           │
│       │ Firebase Auth │   │  Strapi Cloud CMS   │           │
│       │ (autenticación│   │ (contenido público  │           │
│       │  de usuarios) │   │   vía REST API)     │           │
│       └───────┬───────┘   └─────────────────────┘           │
│               │                                             │
│       ┌───────┴───────────────┐                             │
│       │   Cloud Firestore     │                             │
│       │ (solicitudes/contacto)│                             │
│       └───────────────────────┘                             │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │   Firebase Hosting    │
            │  (deploy automático)  │
            └───────────────────────┘
```

**Flujo de datos:**

- 📡 **Strapi Cloud** → suministra programadores, proyectos y servicios (lectura pública)
- 🔐 **Firebase Auth** → gestiona login/registro de usuarios y programadores
- 🗄️ **Cloud Firestore** → almacena y consulta solicitudes de contacto en tiempo real
- 🌐 **Firebase Hosting** → sirve el bundle de producción de Angular

---

## ✅ Características

- ✅ **Portafolio multiusuario** — 2 programadores con perfiles independientes
- ✅ **Autenticación con Firebase** — registro, login y sesión persistente
- ✅ **Gestión de solicitudes en Firestore** — envío y seguimiento en tiempo real
- ✅ **Dashboard para programadores** — gestión de solicitudes recibidas con estados
- ✅ **Dashboard para usuarios externos** — historial de solicitudes enviadas
- ✅ **Contenido dinámico con Strapi CMS** — sin necesidad de redeploy para actualizar datos
- ✅ **Diseño responsive** — TailwindCSS v3 + DaisyUI v3, adaptado a todos los dispositivos
- ✅ **Performance** — ChangeDetection OnPush, signals, lazy loading por ruta
- ✅ **Deploy en Firebase Hosting** — HTTPS, CDN global
- ✅ **CMS en Strapi Cloud** — panel de administración en la nube

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| [Angular](https://angular.dev) | 21 | Framework frontend (SPA) |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Lenguaje principal |
| [TailwindCSS](https://tailwindcss.com) | 3 | Estilos utilitarios |
| [DaisyUI](https://daisyui.com) | 3 | Componentes UI sobre Tailwind |
| [Firebase Authentication](https://firebase.google.com/products/auth) | 11 | Autenticación de usuarios |
| [Cloud Firestore](https://firebase.google.com/products/firestore) | 11 | Base de datos NoSQL en tiempo real |
| [AngularFire](https://github.com/angular/angularfire) | 19 | SDK Angular para Firebase |
| [Strapi](https://strapi.io) | v5 | CMS headless (REST API) |
| [Strapi Cloud](https://cloud.strapi.io) | — | Hosting del CMS |
| [Firebase Hosting](https://firebase.google.com/products/hosting) | — | Deploy del frontend |
| [pnpm](https://pnpm.io) | 10 | Gestor de paquetes |
| [RxJS](https://rxjs.dev) | 7 | Programación reactiva |

---

## 📦 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- ![Node.js](https://img.shields.io/badge/Node.js-24+-339933?style=flat&logo=nodedotjs&logoColor=white) — [Descargar](https://nodejs.org)
- ![pnpm](https://img.shields.io/badge/pnpm-10+-F69220?style=flat&logo=pnpm&logoColor=white) — `npm install -g pnpm`
- ![Angular CLI](https://img.shields.io/badge/Angular_CLI-21+-DD0031?style=flat&logo=angular&logoColor=white) — `pnpm add -g @angular/cli`
- ![Firebase CLI](https://img.shields.io/badge/Firebase_CLI-latest-FFCA28?style=flat&logo=firebase&logoColor=black) — `pnpm add -g firebase-tools`
- Una cuenta en [Firebase](https://firebase.google.com) con un proyecto configurado
- Una cuenta en [Strapi Cloud](https://cloud.strapi.io) *(opcional, solo para producción)*

---

## ⚙️ Instalación y configuración

### Frontend (Angular)

```bash
# 1. Clonar el repositorio
git clone https://github.com/macobosf/Portafolio-DevCuencaSolutions.git
cd Portafolio-DevCuencaSolutions

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno (ver sección siguiente)
#    Editar src/environments/environment.ts

# 4. Iniciar servidor de desarrollo
ng serve --configuration development
```

La aplicación estará disponible en `http://localhost:4200`.

### CMS (Strapi)

```bash
# 1. Clonar el repositorio del CMS
git clone https://github.com/macobosf/portafolio-cms.git
cd portafolio-cms

# 2. Instalar dependencias
pnpm install

# 3. Iniciar en modo desarrollo
pnpm develop
```

El panel de administración estará disponible en `http://localhost:1337/admin`.

---

## 🔐 Variables de entorno

Crea o edita el archivo `src/environments/environment.ts` con tus propios valores:

```typescript
export const environment = {
  production: false,
  strapiUrl: 'http://localhost:1337/api',
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROJECT.firebaseapp.com',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_PROJECT.firebasestorage.app',
    messagingSenderId: 'TU_SENDER_ID',
    appId: 'TU_APP_ID',
  },
};
```

> ⚠️ **Importante:** No subas `environment.ts` con valores reales al repositorio. Agrégalo a `.gitignore` o usa variables de entorno del CI/CD para producción.

Para producción, edita `src/environments/environment.prod.ts` cambiando `production: true` y apuntando a la URL de Strapi Cloud.

---

## 🔥 Configuración de Firebase

1. Accede a [Firebase Console](https://console.firebase.google.com) y crea un nuevo proyecto.

2. **Habilitar Authentication:**
   - Ve a *Authentication → Sign-in method*
   - Activa **Email/Password**

3. **Crear base de datos Firestore:**
   - Ve a *Firestore Database → Crear base de datos*
   - Selecciona modo producción o prueba según tu entorno

4. **Crear la colección `programadores`** con un documento por cada programador:

   ```json
   {
     "nombre": "Marco Antonio Cobos Farfán",
     "email": "marcocobos15@gmail.com"
   }
   ```

   Esta colección es consultada al iniciar sesión para determinar si el usuario tiene rol de programador.

5. **Configurar reglas de seguridad de Firestore** (`firestore.rules`):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Programadores — solo lectura autenticada
       match /programadores/{doc} {
         allow read: if request.auth != null;
       }
       // Solicitudes — lectura y escritura autenticada
       match /solicitudes/{doc} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

6. Copia las credenciales desde *Configuración del proyecto → Tus apps* y pégalas en `environment.ts`.

---

## 🎛️ Configuración de Strapi

1. **Crear los Content Types** en el panel de administración (`/admin/plugins/content-type-builder`):

   | Content Type | Campos principales |
   |---|---|
   | **Programador** | `nombre`, `especialidad`, `descripcionBreve`, `descripcionCompleta`, `correo`, `github`, `linkiden`, `activo`, `slug`, `tecnologias` (JSON) |
   | **Proyecto** | `nombre`, `slug`, `descripcionBreve`, `descripcionCompleta`, `tipo`, `tecnologias` (JSON), `repoUrl`, `demoUrl`, `destacado`, `programadores` (relación Many-to-Many) |
   | **Servicio** | `nombre`, `descripcion`, `icono`, `orden` |

2. **Configurar permisos públicos** en *Settings → Roles → Public*:
   - Programador: `find`, `findOne`
   - Proyecto: `find`, `findOne`
   - Servicio: `find`, `findOne`

3. **Cargar datos de ejemplo** desde el panel o mediante la API con un token de administrador.

---

## 📁 Estructura del proyecto

```
Portafolio-DevCuencaSolutions/
├── src/
│   ├── app/
│   │   ├── core/                        # Servicios y datos globales
│   │   │   ├── auth.service.ts          # Lógica de autenticación Firebase
│   │   │   ├── auth.guard.ts            # Guardia de rutas protegidas
│   │   │   ├── firestore.service.ts     # CRUD de solicitudes en Firestore
│   │   │   ├── strapi.service.ts        # Consumo de la API de Strapi
│   │   │   └── mock-data.ts             # Interfaces TypeScript del dominio
│   │   ├── pages/                       # Vistas / rutas lazy
│   │   │   ├── home/                    # Página de inicio
│   │   │   ├── programmer-profile/      # Perfil de programador
│   │   │   ├── projects/                # Listado de proyectos
│   │   │   ├── project-detail/          # Detalle de proyecto
│   │   │   ├── contact-request/         # Formulario de solicitud
│   │   │   ├── dashboard-programmer/    # Panel del programador
│   │   │   ├── dashboard-user/          # Panel del usuario externo
│   │   │   ├── login/                   # Login
│   │   │   ├── register/                # Registro
│   │   │   └── not-found/               # 404
│   │   ├── shared/
│   │   │   ├── components/              # Componentes reutilizables
│   │   │   │   ├── navbar/
│   │   │   │   ├── footer/
│   │   │   │   ├── programmer-card/
│   │   │   │   ├── project-card/
│   │   │   │   ├── service-card/
│   │   │   │   ├── loading-spinner/
│   │   │   │   └── request-badge/
│   │   │   └── directives/
│   │   │       └── fade-in.directive.ts # Animación de entrada
│   │   ├── app.routes.ts                # Definición de rutas
│   │   ├── app.config.ts                # Providers de la aplicación
│   │   └── app.ts                       # Componente raíz
│   ├── environments/
│   │   ├── environment.ts               # Desarrollo (local)
│   │   └── environment.prod.ts          # Producción
│   └── styles.css                       # Estilos globales + Tailwind
├── .firebaserc                          # Proyecto Firebase activo
├── firebase.json                        # Configuración de Firebase Hosting
├── tailwind.config.js                   # Configuración de Tailwind
├── angular.json                         # Configuración Angular CLI
├── package.json
└── pnpm-lock.yaml
```

---

## 👥 Roles y permisos

| Rol | Acceso | Funcionalidades |
|-----|--------|-----------------|
| 🌐 **Visitante público** | Sin autenticación | Ver perfiles de programadores, proyectos y servicios. Navegar por el portafolio. |
| 👤 **Usuario externo registrado** | Firebase Auth (email/password) | Todo lo del visitante + enviar solicitudes de contacto a programadores + ver historial de solicitudes en el dashboard de usuario. |
| 💻 **Programador** | Firebase Auth + email en colección `programadores` | Todo lo anterior + acceso al dashboard de programador + ver y gestionar solicitudes recibidas + actualizar estado y agregar observaciones. |

> El rol de programador se determina automáticamente al iniciar sesión: si el email del usuario coincide con un documento en la colección `programadores` de Firestore, se le asigna ese rol.

---

## 📖 Guía de uso

### Como visitante público

1. Accede a [https://portafolio-54995.web.app](https://portafolio-54995.web.app)
2. Explora la página de inicio: equipo, servicios y proyectos destacados
3. Navega a **Proyectos** para ver el portafolio completo con filtros por tipo
4. Haz clic en cualquier proyecto para ver su detalle
5. Haz clic en el perfil de un programador para ver sus proyectos y tecnologías

### Como usuario externo registrado

1. Regístrate en **/registro** con tu email y contraseña
2. Inicia sesión en **/login**
3. Desde el perfil de un programador, haz clic en **"Solicitar servicio"**
4. Completa el formulario de solicitud y envíalo
5. Consulta el estado de tus solicitudes en tu **Dashboard de usuario**

### Como programador

1. Inicia sesión con el email registrado en la colección `programadores` de Firestore
2. Accedes automáticamente al **Dashboard de programador**
3. Visualiza todas las solicitudes recibidas con sus estados
4. Actualiza el estado de cada solicitud (*Pendiente / Atendida*) y agrega observaciones
5. Gestiona tu contenido (proyectos, descripción, tecnologías) desde el **panel de Strapi**

---

## 🚢 Despliegue

### Firebase Hosting (Frontend)

```bash
# 1. Build de producción
ng build --configuration production

# 2. Login en Firebase (primera vez)
firebase login

# 3. Deploy
firebase deploy --only hosting
```

El sitio quedará disponible en `https://portafolio-54995.web.app` en pocos segundos.

### Strapi Cloud (CMS)

El CMS se despliega automáticamente desde GitHub. Cualquier push a la rama `main` del repositorio del CMS dispara un nuevo build en Strapi Cloud:

```bash
git add .
git commit -m "feat: actualizar contenido"
git push origin main
# → deploy automático en Strapi Cloud
```

---

## 👨‍💻 Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/macobosf">
        <img src="https://github.com/macobosf.png" width="80" alt="Marco Cobos"/><br/>
        <sub><b>Marco Antonio Cobos Farfán</b></sub>
      </a><br/>
      <sub>Redes · Frontend · Arquitectura</sub>
    </td>
    <td align="center">
      <a href="https://github.com/christianastudillo">
        <img src="https://github.com/christianastudillo.png" width="80" alt="Christian Astudillo"/><br/>
        <sub><b>Christian Ismael Astudillo Vásquez</b></sub>
      </a><br/>
      <sub>Backend · Java · Sistemas</sub>
    </td>
  </tr>
</table>

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

Desarrollado con ❤️ para la **Universidad Politécnica Salesiana**

*Programación y Plataformas Web · Ing. Pablo Torres · 2026*

</div>
