# Plan de Implementación: Portafolio Web Premium (Angular + Firestore + Strapi)

Este plan detalla las fases necesarias para completar la implementación del Portafolio Web, uniendo los servicios ya configurados en Angular y Firebase con el contenido dinámico de Strapi, cumpliendo a cabalidad con las especificaciones de diseño ("Anti-IA", dark mode profundo, animaciones GSAP y Spline 3D, y ausencia total de emojis).

---

## Lineamientos de Diseño No Negociables ("Anti-IA")

- **Cero Emojis e Iconos Genéricos:** No se permite ningún emoji ni icono comercial estándar en ninguna parte de la aplicación (textos, botones, meta tags, etc.).
- **Diseño de Autor:** La interfaz debe ser asimétrica y con una fuerte personalidad visual. Se usarán tipografías premium como *Space Grotesk* (ya en configuración de Tailwind) y *Syne* o *Clash Display*.
- **Copywriting Técnico:** Todo el texto debe ser sumamente profesional, técnico, sobrio y directo.
- **Modo Oscuro Profundo:** Fondo utilizando `dark-bg` (#0B0C10) y `dark-surface` (#1F2833) con colores acento neón `neon-cyan` (#66FCF1) y `neon-teal` (#45A29E).

---

## Reglas de Negocio en Autenticación

- El registro en la plataforma está **exclusivamente destinado a usuarios externos** que desean enviar solicitudes de contacto.
- Los programadores **NO** se registran a través de la UI pública. Sus perfiles son administrados como contenido dinámico en Strapi, y sus accesos de autenticación se crean directamente en Firebase Auth. Sus correos en Firebase Auth y Strapi deben coincidir para asociar correctamente sus solicitudes.

---

## Fases de Trabajo Faltantes

### Fase 1: Librerías Visuales y Estilo Base (GSAP y Fuentes)
*Preparación estética y carga de tipografías premium para cumplir la directriz de diseño.*

1. **index.html:**
   - Importar tipografías Google Fonts (*Space Grotesk* y *Syne*) en el `<head>`.
   - Configurar metatags dinámicos y base de estilos anti-IA.
   - Integrar la importación del script viewer de Spline si se requiere.
2. **app.scss:**
   - Diseñar el fondo global de "cuadro pintado" usando CSS avanzado y gradientes.
   - Añadir el canvas interactivo global de fondo que responderá a GSAP.
3. **Instalación de Dependencias:**
   - Instalar GSAP (`npm install gsap`).

---

### Fase 2: Arquitectura de Firestore (Servicio de Solicitudes)
*Creación del canal de comunicación para el envío y gestión de solicitudes de contacto.*

1. **Crear `solicitudes.service.ts`:**
   - Implementar el servicio Angular utilizando `@angular/fire/firestore`.
   - Métodos clave a desarrollar:
     - `crearSolicitud(solicitud: Omit<Solicitud, 'id'>)`: Guarda en Firestore la colección `solicitudes` con estado `'Pendiente'` y marca de tiempo (`serverTimestamp()`).
     - `getSolicitudesUsuario(uid: string)`: Retorna un observable con las solicitudes de un usuario externo.
     - `getSolicitudesProgramador(email: string)`: Retorna un observable con las solicitudes enviadas a un programador específico (filtradas por email).
     - `responderSolicitud(id: string, respuesta: string)`: Cambia el estado a `'Respondida'` e introduce la observación técnica del programador.

---

### Fase 3: Home (Vista Pública Principal)
*Construcción de la landing page premium asimétrica basada en datos dinámicos de Strapi y modelo 3D.*

1. **Controlador y Vista (`home.ts` y `home.html`):**
   - Inyectar `StrapiService` para traer textos de Hero de la empresa, listado de programadores, listado de servicios de especialización, y listado de proyectos destacados.
   - Implementar la estructura HTML asimétrica con Tailwind CSS (`grid-cols-1 md:grid-cols-12` con columnas impares y layouts alternados).
   - Integrar la visualización del **Canvas Spline 3D** en el área Hero.
   - Crear las tarjetas de perfil asimétricas de los programadores, con micro-interacciones hover de GSAP. Al pulsar una tarjeta, navegar a `/programador/:documentId`.
   - Crear el grid de proyectos destacados y la sección de llamada a la acción (CTA) de contacto.

---

### Fase 4: Perfil Individual de Programador
*Detalle dinámico de cada programador y listado de sus proyectos (individuales y compartidos).*

1. **Controlador y Vista (`profile.ts` y `profile.html`):**
   - Capturar el `documentId` desde los parámetros de la ruta.
   - Consumir `getProgramadorById(documentId)` de `StrapiService`.
   - Mostrar información técnica del programador: bio sobria, tecnologías (badge neón) y proyectos asociados.
   - **Lógica de Proyectos Compartidos:** Asegurar que si un proyecto incluye a ambos programadores en la respuesta del CMS, este aparezca en el perfil de ambos de manera fluida.
   - Añadir la animación de transición de entrada GSAP modificando el fondo dinámico.

---

### Fase 5: Autenticación de Usuarios (Firebase Auth)
*Login y registro exclusivo para clientes/usuarios externos con estilos Cyber-Dark.*

1. **Controlador y Vista (`auth.ts` y `auth.html`):**
   - Crear un formulario pulido con cambio de pestaña (Login / Registro) con efecto de desenfoque de fondo (*glassmorphism*).
   - Integrar la lógica del `AuthService` para login de usuario con email/contraseña y registro (solo para externos).
   - Agregar botón de inicio de sesión con Google de manera estilizada sin emojis ni logotipos genéricos (utilizar diseño minimalista).
   - Validación estricta y reactiva de formularios con manejo de errores técnico y sobrio.

---

### Fase 6: Dashboard de Solicitudes (Doble Rol)
*Panel interactivo en tiempo real para visualizar y gestionar solicitudes.*

1. **Controlador y Vista (`dashboard.ts` y `dashboard.html`):**
   - Determinar dinámicamente si el usuario autenticado es un **Programador** (verificando si su email coincide con el de un programador en Strapi) o un **Usuario Externo**.
   - **Vista Usuario Externo:**
     - Mostrar una tabla o lista interactiva de sus solicitudes enviadas.
     - Mostrar el estado actual (`Pendiente` / `Respondida`) y la respuesta del programador.
     - Botón o formulario integrado para enviar una nueva solicitud a cualquier programador de la lista (obtenidos dinámicamente de Strapi).
   - **Vista Programador:**
     - Mostrar una bandeja de entrada con solicitudes recibidas dirigidas a su perfil.
     - Cada tarjeta de solicitud tendrá un botón para expandir y un área de texto técnica para escribir observaciones/respuestas.
     - Botón de guardado que actualiza Firestore en tiempo real cambiando el estado a `'Respondida'`.

---

### Fase 7: Estructura Global, SEO y Despliegue
*Unificación de la navegación, inyección de metadatos SEO y despliegue final.*

1. **Layout y Navbar (`app.html` y `app.ts`):**
   - Eliminar el contenido predeterminado y configurar el Layout Global con `<router-outlet />`.
   - Crear una **Navbar superior asimétrica y responsive**:
     - Cambia dinámicamente según el estado de autenticación (Público, Usuario Autenticado, Administrador/Programador).
     - Incluye enlaces a Home, Login, Perfiles y Dashboard de Solicitudes.
   - Implementar transiciones de página suaves y carga dinámica.
2. **SEO dinámico:**
   - Configurar inyección SEO (Titles y Metas descriptivos por ruta mediante el enrutador) usando los servicios `Title` y `Meta` de Angular.
3. **Despliegue:**
   - Configurar y desplegar la aplicación frontend en Firebase Hosting.

---

## Plan de Verificación

1. **Navegación y Flujos:** Validación mediante navegación manual cruzada desde `/` a `/programador/:id`, `/login` y `/solicitudes`.
2. **Integración Firestore:** Enviar una solicitud como usuario externo en la UI y verificar en tiempo real su inserción con la consola Firebase y su despliegue inmediato en la bandeja del Programador.
3. **Verificación Anti-IA:** Búsqueda textual y visual en código de emojis (Unicode/Imágenes) para garantizar un cumplimiento del 100%.
4. **Pruebas de Rendimiento:** Medición de rendimiento FPS del navegador durante el scroll y las transiciones para asegurar la fluidez de la animación de pintura y Spline.
5. **Responsividad:** Probar con resoluciones móviles y de escritorio para asegurar la adaptabilidad de las rejillas asimétricas.
