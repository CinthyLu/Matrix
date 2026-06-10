# INFORME TÉCNICO: PORTAFOLIO WEB
### Sistema de Gestión de Talento y Solicitudes - Veltrix Studio

**Materia:** Programación y Plataformas Web  
**Curso:** PPW P68  
**Docente:** Ing. Pablo Torres  
**Institución:** Universidad Politécnica Salesiana  
**Autores:**  
- Cinthya Ramón (cramonm12@gmail.com)  
- Isaac Mora (isaacalf.135@gmail.com)  
**Fecha:** Junio de 2026  

---

## Tabla de Contenidos

- [1. Resumen del Proyecto](#1-resumen-del-proyecto)
- [2. Descripción General](#2-descripción-general)
- [3. Arquitectura del Sistema](#3-arquitectura-del-sistema)
- [4. Proceso de Desarrollo](#4-proceso-de-desarrollo)
- [5. Decisiones de Diseño y Tecnologías](#5-decisiones-de-diseño-y-tecnologías)
- [6. Desafíos y Soluciones](#6-desafíos-y-soluciones)
- [7. Estructura de Archivos](#7-estructura-de-archivos)
- [8. Guía de Configuración](#8-guía-de-configuración)
  - [8.1. Requisitos](#81-requisitos)
  - [8.2. Variables de Entorno](#82-variables-de-entorno)
  - [8.3. Configuración de Firebase](#83-configuración-de-firebase)
  - [8.4. Configuración de Strapi CMS](#84-configuración-de-strapi-cms)
- [9. Guía de Despliegue](#9-guía-de-despliegue)
- [10. Guía de Usuario](#10-guía-de-usuario)
  - [10.1. Guía para Clientes (Usuario Final)](#101-guía-para-clientes-usuario-final)
  - [10.2. Guía para Programadores (Administrador)](#102-guía-para-programadores-administrador)
- [11. Conclusiones](#11-conclusiones)

---

## 1. Resumen del Proyecto

Este proyecto es una plataforma web para Veltrix Studio. Permite a los desarrolladores del equipo mostrar sus perfiles profesionales y los proyectos que han realizado. Además, los clientes interesados pueden registrarse en la página para enviar propuestas de proyectos directamente a los programadores y realizar el seguimiento en tiempo real. 

El sistema utiliza Angular 21 para la interfaz visual, Strapi CMS v5 para gestionar el contenido de forma dinámica sin tocar código, y Firebase para manejar el registro de usuarios y el almacenamiento de las solicitudes.

---

## 2. Descripción General

La aplicación está diseñada para conectar al equipo de Veltrix Studio con usuarios externos. 

### Enlaces de la Plataforma
- Aplicación Pública (Frontend): https://veltrix-6d976.web.app/
- Strapi Admin (Panel de control del CMS): https://upbeat-chickens-1ee0436960.strapiapp.com/admin

---

## 3. Arquitectura del Sistema

La aplicación está dividida en tres partes que se comunican entre sí:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │               Angular 21 (Frontend)                 │   │
│   │   Interfaz limpia, rápida y responsiva para el      │   │
│   │   usuario.                                          │   │
│   └────────────┬───────────────────┬────────────────────┘   │
│                │                   │                         │
│       ┌────────┴──────┐   ┌────────┴────────────┐           │
│       │ Firebase Auth │   │  Strapi Cloud CMS   │           │
│       │ (Inicio de    │   │ (Datos de perfiles, │           │
│       │  sesión)      │   │  proyectos y webs)  │           │
│       └───────┬───────┘   └─────────────────────┘           │
│               │                                             │
│       ┌───────┴───────────────┐                             │
│       │   Cloud Firestore     │                             │
│       │ (Base de datos de     │                             │
│       │  las solicitudes)     │                             │
│       └───────────────────────┘                             │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │   Firebase Hosting    │
            │  (Publicación web)    │
            └───────────────────────┘
```

1. Strapi CMS: Suministra la información pública de los programadores, sus proyectos y tecnologías.
2. Firebase Authentication: Controla que los usuarios inicien sesión de forma segura con su correo y contraseña.
3. Cloud Firestore: Almacena en tiempo real las propuestas enviadas por los clientes y las respuestas de los programadores.
4. Firebase Hosting: Aloja y sirve la página web en internet.

---

## 4. Proceso de Desarrollo

Para construir esta aplicación se siguieron los siguientes pasos:

1. Planificación: Definición de las necesidades del cliente (enviar solicitudes) y del desarrollador (responderlas y mostrar su portafolio).
2. Diseño de datos: Creación de los esquemas de bases de datos para programadores, proyectos y solicitudes de contacto.
3. Configuración inicial: Creación del proyecto base en Angular y enlace con los servicios de Firebase y Strapi.
4. Creación de los servicios: Programación de la lógica que conecta el código con las bases de datos externas.
5. Diseño visual: Maquetación de las páginas de inicio, perfiles, login y paneles de control usando estilos responsivos.
6. Pruebas y seguridad: Ajuste de las reglas de seguridad en Firebase para evitar que usuarios no autorizados lean solicitudes ajenas.
7. Lanzamiento: Despliegue de los servicios en la nube y publicación del frontend.

---

## 5. Decisiones de Diseño y Tecnologías

Se eligieron las siguientes herramientas por su facilidad de uso y velocidad de desarrollo:

- Angular 21: Framework moderno que permite estructurar la página en componentes independientes y cargarlos rápidamente.
- Angular Signals: Sistema que actualiza la interfaz visual al instante cuando se detecta un cambio en los datos, sin ralentizar la aplicación.
- TailwindCSS: Framework de diseño que facilita la creación de interfaces visuales atractivas, responsivas y consistentes.
- Strapi CMS v5: Permite a los desarrolladores actualizar su información de perfil (como biografía o nuevos proyectos) desde un panel visual intuitivo, sin necesidad de reprogramar la web.
- Firebase Auth y Firestore: Facilitan el registro seguro de usuarios y la actualización de propuestas en tiempo real. Si un desarrollador responde una solicitud, el cliente la ve de inmediato en su pantalla.
- Servicio SEO: Servicio que cambia el título y la descripción de la pestaña del navegador de forma automática según la página donde esté el usuario, mejorando la indexación en buscadores.

---

## 6. Desafíos y Soluciones

### Carga de Modelos 3D (Spline)
- Problema: Los gráficos en 3D del inicio consumían demasiada memoria y a veces daban error de carga.
- Solución: Se optimizaron los scripts de carga para que no bloqueen la página y se configuraron imágenes estáticas alternativas para dispositivos que no soporten 3D.

### Errores de Permisos en la Base de Datos (Firestore)
- Problema: Al activar la seguridad para que los usuarios no puedan ver las solicitudes de otros, la pantalla del panel empezó a fallar con mensajes de acceso denegado.
- Solución: Se ajustó el código del frontend para que las consultas tengan exactamente los mismos filtros de correo y usuario que las reglas de seguridad exigen, permitiendo el acceso correcto.

### Proyectos Vacíos desde el Servidor (Strapi)
- Problema: Al consultar los programadores, la lista de proyectos y tecnologías de cada uno aparecía en blanco.
- Solución: Se configuró el servicio HTTP para añadir el parámetro de lectura completa (`?populate=*`) en las llamadas al servidor de Strapi.

---

## 7. Estructura de Archivos

Los archivos principales del proyecto se organizan de la siguiente manera:

```
portafolio-web/
├── src/
│   ├── app/
│   │   ├── core/                        # Lógica compartida de la aplicación
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts          # Control de usuarios y sesiones
│   │   │   │   ├── solicitudes.service.ts   # Guardar y consultar solicitudes
│   │   │   │   ├── strapi.service.ts        # Obtener datos del CMS
│   │   │   │   └── seo.service.ts           # Control de títulos de la página
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts            # Protege páginas que requieren login
│   │   │   └── models/
│   │   │       └── models.ts            # Definición de estructuras de datos
│   │   ├── views/                       # Vistas de la aplicación
│   │   │   ├── home/                    # Página de bienvenida
│   │   │   ├── profile/                 # Perfil del programador
│   │   │   ├── dashboard/               # Panel para gestionar propuestas
│   │   │   ├── auth/                    # Pantallas de login y registro
│   │   │   └── programadores/           # Lista de integrantes del equipo
│   │   ├── components/                  # Elementos visuales reutilizables
│   │   │   ├── header/                  # Menú de navegación
│   │   │   └── footer/                  # Pie de página
│   │   ├── app.routes.ts                # Configuración de las rutas
│   │   └── app.ts                       # Componente principal
│   ├── environments/
│   │   ├── environment.ts               # Configuración para pruebas locales
│   │   └── environment.prod.ts          # Configuración para la web publicada
│   └── styles.scss                      # Estilos visuales generales
├── firestore.rules                      # Reglas de seguridad de la base de datos
└── package.json                         # Lista de dependencias del proyecto
```

---

## 8. Guía de Configuración

Siga estos pasos para ejecutar el proyecto en su computadora.

### 8.1. Requisitos

Debe tener instalado:
- Node.js (versión 18 o superior)
- pnpm (instalador de paquetes)
- Angular CLI
- Firebase CLI

### 8.2. Variables de Entorno

Cree o configure el archivo `src/environments/environment.ts` con sus credenciales:

```typescript
export const environment = {
  production: false,
  strapiUrl: 'http://localhost:1337/api',
  strapiToken: 'SU_TOKEN_DE_STRAPI',
  firebase: {
    apiKey: 'SU_API_KEY',
    authDomain: 'SU_PROYECTO.firebaseapp.com',
    projectId: 'SU_ID_DEL_PROYECTO',
    storageBucket: 'SU_PROYECTO.firebasestorage.app',
    messagingSenderId: 'SU_SENDER_ID',
    appId: 'SU_APP_ID',
  },
};
```

### 8.3. Configuración de Firebase

1. Ingrese a Firebase Console y cree un proyecto nuevo.
2. Vaya a Authentication y active el inicio de sesión con Correo electrónico y contraseña.
3. Cree una base de datos Cloud Firestore en modo de prueba.
4. Remplace las reglas en la pestaña Reglas o use este archivo `firestore.rules`:

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

### 8.4. Configuración de Strapi CMS

1. Crear tablas (Content Types):
   Ingrese al panel de control y cree las tablas con los siguientes campos:
   - Programador: `Full_name`, `Specialty`, `Short_description`, `Full_description`, `Contact_Email`, `Profile_picture` (imagen), `Identifier` y relaciones con Proyectos y Tecnologías.
   - Proyecto: `Project_Name`, `Identifier`, `Short_description`, `Full_description`, `tipo_de_proyecto`, `Technologies_used`, `Link_repository`, `Link_demo`, `Featured` (sí/no) e imagen principal.
   - Servicio: `service_name`, `description`.
   - Tecnologia: `nombre`, `logo` (imagen), `categoria`.

2. Activar accesos públicos:
   Vaya a Settings -> Roles -> Public y marque las opciones `find` y `findOne` de todas las tablas creadas para que la web pueda leerlas.

3. Crear token:
   En Settings -> API Tokens cree un token con permisos de lectura y escritura para copiarlo en su configuración.

---

## 9. Guía de Despliegue

Para subir la página a internet ejecute los siguientes comandos en la consola:

1. Compilar la aplicación:
   ```bash
   pnpm run build
   ```
2. Iniciar sesión en Firebase (si no lo ha hecho):
   ```bash
   npx firebase login
   ```
3. Subir la página web compilada:
   ```bash
   npx firebase deploy --only hosting
   ```
4. Subir las reglas de base de datos actualizadas:
   ```bash
   npx firebase deploy --only firestore:rules
   ```

---

## 10. Guía de Usuario

### 10.1. Guía para Clientes (Usuario Final)

1. Explorar la web:
   - Entre a la página de inicio. Verá los servicios y el equipo de trabajo.
   - Ingrese a la sección del equipo para ver los perfiles de Isaac Mora o Cinthya Ramón.
   - Haga clic en cualquiera de ellos para ver su experiencia y proyectos anteriores.

2. Crear cuenta e iniciar sesión:
   - Haga clic en el botón "Iniciar Sesión".
   - Si no tiene cuenta, haga clic en el botón de registro, ingrese sus datos y confírmelos.

3. Enviar una solicitud de proyecto:
   - En el perfil de un desarrollador, presione "Iniciar Contrato" o vaya a la opción "Dashboard" del menú superior.
   - Complete el formulario escribiendo su nombre, seleccionando al programador y describiendo qué tipo de proyecto necesita.
   - Presione el botón de enviar.

4. Ver el estado de sus solicitudes:
   - En la sección "Dashboard", podrá ver todas las solicitudes que ha enviado.
   - El estado de la propuesta cambiará de "Pendiente" a "Respondida" cuando el desarrollador la revise.
   - Podrá leer las notas u observaciones de respuesta escritas por el programador en esa misma sección.

### 10.2. Guía para Programadores (Administrador)

1. Ingreso al panel:
   - Inicie sesión con el correo electrónico asociado a su perfil de Strapi (como `cramonm12@gmail.com` para Cinthya o `isaacalf.135@gmail.com` para Isaac). El sistema lo reconocerá como miembro del equipo.

2. Responder a clientes:
   - Entre a su "Dashboard". Verá la lista de solicitudes enviadas por clientes directamente a usted.
   - Escriba una respuesta u observación en el campo de texto de la solicitud pendiente y haga clic en "Responder". El cliente recibirá la actualización inmediatamente.

3. Editar información y proyectos:
   - Mientras tenga la sesión abierta, en su perfil público verá botones para editar sus datos personales.
   - Puede modificar su biografía, cambiar su foto de perfil cargándola desde su computadora o agregar nuevos proyectos a su catálogo rellenando el formulario técnico (nombre, enlaces de GitHub y demostraciones, tecnologías y tipo de proyecto). Al guardar, los cambios se actualizarán al instante.

---

## 11. Conclusiones

La combinación de Angular 21, Strapi y Firebase permite ofrecer una plataforma rápida y segura para Veltrix Studio. 

Los programadores del equipo (Cinthya Ramón e Isaac Mora) pueden actualizar sus portafolios y responder a clientes sin necesidad de editar código fuente, mientras que los clientes externos disponen de un portal fluido para realizar solicitudes y comunicarse directamente con el equipo en tiempo real.
