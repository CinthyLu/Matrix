<div align="center">

![Portada del Proyecto](../portada.png)

# INFORME TÉCNICO COMPLETO: PORTAFOLIO WEB
### Sistema de Gestión de Talento y Solicitudes - DevCuenca Solutions

**Materia:** Programación y Plataformas Web  
**Docente:** Ing. Pablo Torres  
**Institución:** Universidad Politécnica Salesiana  
**Ciclo:** Período Académico 2026  

---

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Strapi](https://img.shields.io/badge/Strapi-v5-4945FF?style=for-the-badge&logo=strapi&logoColor=white)

**Portafolio profesional multiusuario para DevCuenca Solutions**

[Ver Demo](#demo) · [Instalación y Configuración](#instalacion-y-configuracion) · [Reportar Bug](https://github.com/macobosf/Portafolio-DevCuencaSolutions/issues)

</div>

---

## Tabla de contenidos

- [1. Resumen Ejecutivo](#1-resumen-ejecutivo)
- [2. Demo](#2-demo)
- [3. Descripción](#3-descripción)
- [4. Arquitectura del sistema](#4-arquitectura-del-sistema)
- [5. Características](#5-características)
- [6. Tecnologías](#6-tecnologías)
- [7. Requisitos previos](#7-requisitos-previos)
- [8. Instalación y configuración](#8-instalación-y-configuración)
- [9. Variables de entorno](#9-variables-de-entorno)
- [10. Configuración de Firebase](#10-configuración-de-firebase)
- [11. Configuración de Strapi](#11-configuración-de-strapi)
- [12. Estructura del proyecto](#12-estructura-del-proyecto)
- [13. Roles y permisos](#13-roles-y-permisos)
- [14. Guía de uso](#14-guía-de-uso)
- [15. Despliegue](#15-despliegue)
- [16. Contribuidores](#16-contribuidores)
- [17. Licencia](#17-licencia)

---

## 1. Resumen Ejecutivo

Este componente representa el portal frontend interactivo de **DevCuenca Solutions**. Ha sido diseñado bajo una estética cyberpunk premium (tonos oscuros con acentos neón cian/teal) utilizando **Angular 21** de alto rendimiento. Integra comunicación bidireccional:
1. **CMS Headless (Strapi):** Carga dinámica de perfiles, tecnologías, servicios y portafolios.
2. **Servicio Cloud (Firebase):** Autenticación segura de usuarios corporativos y almacenamiento/control de solicitudes de proyectos en tiempo real mediante Firestore.

---

## 2. Demo

| Entorno | URL |
|---------|-----|
| App pública | [https://portafolio-54995.web.app](https://portafolio-54995.web.app) |
| Strapi Admin | [https://creative-ducks-5c57b268fa.strapiapp.com/admin](https://creative-ducks-5c57b268fa.strapiapp.com/admin) |

---

## 3. Descripción

**Portafolio DevCuenca Solutions** es una aplicación web profesional que permite a los integrantes de DevCuenca Solutions mostrar sus proyectos, habilidades y servicios al público, y gestionar las solicitudes de contacto de usuarios externos.

### Objetivo académico

Proyecto integrador de la materia **Programación y Plataformas Web**, dictada por el **Ing. Pablo Torres** en la **Universidad Politécnica Salesiana**, período Académico 2026. Aplica conceptos de desarrollo frontend moderno, integración de servicios cloud, autenticación, bases de datos en tiempo real y CMS headless.

---

## 4. Arquitectura del sistema

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

- **Strapi Cloud** -> suministra programadores, proyectos y servicios (lectura pública)
- **Firebase Auth** -> gestiona login/registro de usuarios y programadores
- **Cloud Firestore** -> almacena y consulta solicitudes de contacto en tiempo real
- **Firebase Hosting** -> sirve el bundle de producción de Angular

---

## 5. Características

- **Portafolio multiusuario** — 2 programadores con perfiles independientes.
- **Autenticación con Firebase** — registro, login y sesión persistente.
- **Gestión de solicitudes en Firestore** — envío y seguimiento en tiempo real.
- **Dashboard para programadores** — gestión de solicitudes recibidas con estados.
- **Dashboard para usuarios externos** — historial de solicitudes enviadas.
- **Contenido dinámico con Strapi CMS** — sin necesidad de redeploy para actualizar datos.
- **Diseño responsive** — TailwindCSS v3 + DaisyUI v3, adaptado a todos los dispositivos.
- **Performance** — ChangeDetection OnPush, signals, lazy loading por ruta.
- **Deploy en Firebase Hosting** — HTTPS, CDN global.
- **CMS en Strapi Cloud** — panel de administración en la nube.

---

## 6. Tecnologías

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

## 7. Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v18 o superior)
- pnpm (v10 o superior) -> instalado mediante `npm install -g pnpm`
- Angular CLI (v21 o superior) -> instalado mediante `pnpm add -g @angular/cli`
- Firebase CLI (última versión) -> instalado mediante `pnpm add -g firebase-tools`
- Una cuenta en Firebase con un proyecto configurado.
- Una cuenta en Strapi Cloud (opcional, solo para producción).

---

## 8. Instalación y configuración

### Frontend (Angular)

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno (ver sección siguiente)
#    Editar src/environments/environment.ts

# 3. Iniciar servidor de desarrollo
ng serve --configuration development
```

La aplicación estará disponible en `http://localhost:4200`.

### CMS (Strapi)

```bash
# 1. Acceder al directorio del CMS
cd ../backend-portafolio

# 2. Instalar dependencias
pnpm install

# 3. Iniciar en modo desarrollo
pnpm develop
```

El panel de administración estará disponible en `http://localhost:1337/admin`.

---

## 9. Variables de entorno

Crea o edita el archivo `src/environments/environment.ts` con tus propios valores:

```typescript
export const environment = {
  production: false,
  strapiUrl: 'http://localhost:1337/api',
  strapiToken: 'TU_API_TOKEN_DE_STRAPI',
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

Importante: No subas `environment.ts` con valores reales al repositorio público. Agrégalo a `.gitignore` o usa variables de entorno del CI/CD para producción.

Para producción, edita `src/environments/environment.prod.ts` cambiando `production: true` y apuntando a la URL de Strapi Cloud.

---

## 10. Configuración de Firebase

1. Accede a Firebase Console y crea un nuevo proyecto.

2. **Habilitar Authentication:**
   - Ve a Authentication -> Sign-in method.
   - Activa Email/Password y Google (opcional).

3. **Crear base de datos Firestore:**
   - Ve a Firestore Database -> Crear base de datos.
   - Selecciona modo producción o prueba según tu entorno.

4. **Configurar reglas de seguridad de Firestore (firestore.rules):**

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /solicitudes/{solicitudId} {
         allow create: if request.auth != null;
         
         allow read: if request.auth != null && 
           (resource.data.uid == request.auth.uid || 
            resource.data.correoUsuario == request.auth.token.email ||
            resource.data.correoSolicitante == request.auth.token.email ||
            resource.data.correoProgramador == request.auth.token.email);
            
         allow update: if request.auth != null && 
           (resource.data.uid == request.auth.uid || 
            resource.data.correoUsuario == request.auth.token.email ||
            resource.data.correoSolicitante == request.auth.token.email ||
            resource.data.correoProgramador == request.auth.token.email);
       }
     }
   }
   ```

5. Copia las credenciales desde Configuración del proyecto -> Tus apps y pégalas en `environment.ts`.

---

## 11. Configuración de Strapi

1. **Crear los Content Types** en el panel de administración (/admin/plugins/content-type-builder):

   - **Programador:** `Full_name`, `Specialty`, `Short_description`, `Full_description`, `Contact_Email`, `Profile_picture`, `tecnologias` y `projects` (relaciones).
   - **Proyecto:** `Project_Name`, `Identifier`, `Short_description`, `Full_description`, `tipo_de_proyecto`, `Technologies_used`, `Link_repository`, `Link_demo`, `Featured`, `Main_image` y `programmers` (relación Many-to-Many).
   - **Servicio:** `service_name`, `description`.
   - **Tecnologia:** `nombre`, `logo`, `categoria`.

2. **Configurar permisos públicos** en Settings -> Roles -> Public:
   - Programador: `find`, `findOne`
   - Proyecto: `find`, `findOne`
   - Servicio: `find`, `findOne`
   - Tecnologia: `find`, `findOne`

3. **Configurar API Token:**
   - Crea un token en Settings -> API Tokens con accesos de lectura y escritura para permitir al frontend actualizar perfiles e imágenes multimedia.

---

## 12. Estructura del proyecto

```
portafolio-web/
├── src/
│   ├── app/
│   │   ├── core/                        # Servicios, modelos y guards globales
│   │   │   ├── auth.service.ts          # Control de sesión Firebase Auth
│   │   │   ├── solicitudes.service.ts   # CRUD en Firestore con sanitización
│   │   │   ├── strapi.service.ts        # Peticiones HTTP al CMS Strapi v5
│   │   │   └── models/
│   │   │       └── models.ts            # Interfaces TypeScript compartidas
│   │   ├── guards/
│   │   │   └── auth.guard.ts            # Bloqueo de navegación a no-autenticados
│   │   ├── views/                       # Componentes de página principales
│   │   │   ├── home/                    # Vista principal con 3D Canvas
│   │   │   ├── profile/                 # Perfil del programador (lectura/edición)
│   │   │   ├── dashboard/               # Panel del desarrollador y cliente
│   │   │   ├── auth/                    # Control de Login y Registro
│   │   │   └── programadores/           # Listado del equipo de trabajo
│   │   ├── components/                  # UI modular y reutilizable
│   │   │   ├── header/                  # Barra de navegación adaptable
│   │   │   └── footer/                  # Pie de página institucional
│   │   ├── app.routes.ts                # Sistema de enrutado lazy-loaded
│   │   ├── app.config.ts                # Registro de providers e inyecciones
│   │   └── app.ts                       # Componente contenedor inicial
│   ├── environments/
│   │   ├── environment.ts               # Configuración local
│   │   └── environment.prod.ts          # Configuración producción
│   └── styles.scss                      # Definición de tokens CSS y variables
├── firestore.rules                      # Reglas de seguridad para Firestore
├── firebase.json                        # Definiciones del hosting de Firebase
├── tailwind.config.js                   # Extensiones de diseño del theme
├── tsconfig.json                        # Compilador TypeScript
└── package.json                         # Lista de dependencias del frontend
```

---

## 13. Roles y permisos

| Rol | Acceso | Funcionalidades |
|-----|--------|-----------------|
| Visitante público | Sin autenticación | Ver perfiles de programadores, proyectos y servicios. Navegar por el portafolio. |
| Usuario externo registrado | Firebase Auth (email/password) | Ver portafolio + enviar propuestas de desarrollo de proyectos + ver historial de solicitudes en su dashboard personal. |
| Programador corporativo | Firebase Auth + email coincidente con Strapi | Ver todo + acceso al dashboard administrativo de programador + responder solicitudes y agregar observaciones técnicas + editar su perfil y proyectos directamente desde la UI. |

---

## 14. Guía de uso

### Como visitante público

1. Accede a [https://portafolio-54995.web.app](https://portafolio-54995.web.app).
2. Explora la landing page: equipo, servicios técnicos y proyectos destacados.
3. Navega al perfil de cualquier programador del equipo para conocer sus habilidades.

### Como usuario externo registrado

1. Regístrate en el portal de acceso.
2. Inicia sesión.
3. Desde el perfil de un desarrollador o desde el botón "Iniciar Contrato", llena el formulario.
4. Consulta las respuestas a tus solicitudes desde tu Dashboard personal de usuario.

### Como programador

1. Inicia sesión utilizando las credenciales asignadas en el CMS de Strapi.
2. Serás redirigido al Dashboard del desarrollador donde verás las propuestas técnicas recibidas.
3. Haz clic en "Responder" para cambiar el estado y dejar observaciones.
4. Visita tu perfil para modificar tu biografía, especialidad, foto, o para agregar/editar los proyectos de tu portafolio personal.

---

## 15. Despliegue

### Firebase Hosting

```bash
# 1. Generar empaquetado de producción optimizado
pnpm run build

# 2. Desplegar los archivos estáticos en hosting
npx firebase deploy --only hosting

# 3. Opcional: desplegar reglas actualizadas de Firestore
npx firebase deploy --only firestore:rules
```

El sitio quedará disponible en `https://portafolio-54995.web.app`.

---

## 16. Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/macobosf">
        <img src="https://github.com/macobosf.png" width="80" alt="Marco Cobos"/><br/>
        <sub><b>Marco Antonio Cobos Farfán</b></sub>
      </a><br/>
      <sub>Diseño · Frontend · Integración</sub>
    </td>
    <td align="center">
      <a href="https://github.com/christianastudillo">
        <img src="https://github.com/christianastudillo.png" width="80" alt="Christian Astudillo"/><br/>
        <sub><b>Christian Ismael Astudillo Vásquez</b></sub>
      </a><br/>
      <sub>Modelado · Backend · Base de Datos</sub>
    </td>
  </tr>
</table>

---

## 17. Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

Desarrollado para la **Universidad Politécnica Salesiana**

*Programación y Plataformas Web · Ing. Pablo Torres · 2026*

</div>
