# Guía Maestra y Checklist: Frontend Portafolio Web

## 1. Lineamientos Estrictos de Diseño (No Negociables)
- [ ] **Estilo General:** Dark mode profundo (tonos como gris carbón o azul medianoche, evitar el negro puro) con una paleta de colores de acento neón/llamativos.
- [ ] **Prohibición Total de Emojis:** Cero uso de emojis en el código, textos, botones, placeholders o meta-etiquetas.
- [ ] **Estética "Anti-IA" (Diseño de Autor):** - Evitar la simetría perfecta; aplicar asimetría controlada en la disposición de los contenedores y grids.
  - Uso de tipografías con fuerte personalidad (ej. *Space Grotesk*, *Syne*, *Clash Display*) en lugar de fuentes estándar.
  - El copywriting debe ser netamente técnico, sobrio y directo.
- [ ] **Animaciones Core (GSAP):** Implementar un fondo con textura de "cuadro pintado" que reaccione al scroll o cambie mediante transiciones fluidas entre vistas.
- [ ] **Elementos 3D:** Integración de un modelo interactivo (diseñado y exportado desde Spline) para la sección inicial.

---

## 2. Configuración Inicial del Framework
- [ ] [cite_start]Inicializar el proyecto base: `ng new portafolio-web --routing --style=scss`[cite: 31].
- [ ] Instalar Tailwind CSS y dependencias: `npm install -D tailwindcss postcss autoprefixer`.
- [ ] Inicializar Tailwind: `npx tailwindcss init`.
- [ ] Configurar `tailwind.config.js` (definir colores personalizados, tipografías y habilitar modo oscuro).
- [ ] Instalar librería de animaciones: `npm install gsap`.

---

## 3. Estructura de Componentes y Vistas
### [cite_start]Home (Página Principal) [cite: 108]
- [ ] [cite_start]**Hero Section:** Presentación inicial de la empresa de desarrollo[cite: 109]. Integrar aquí el canvas 3D de Spline.
- [ ] [cite_start]**Tarjetas de Perfil:** Componentes visuales asimétricos con el perfil de ambos programadores[cite: 110].
- [ ] [cite_start]**Servicios:** Listado sobrio de áreas de especialización[cite: 111].
- [ ] [cite_start]**Proyectos:** Grid para mostrar los proyectos destacados[cite: 112].
- [ ] [cite_start]**CTA Contacto:** Sección o botón estilizado para crear una solicitud[cite: 113].

### [cite_start]Perfil Individual del Programador [cite: 115]
- [ ] [cite_start]Vista dinámica que renderiza toda la información del programador[cite: 116].
- [ ] [cite_start]Lógica para mostrar proyectos asociados (tanto individuales como compartidos con el otro programador)[cite: 117].
- [ ] Implementar la transición GSAP de entrada (modificación del fondo de cuadro pintado).

### [cite_start]Autenticación y Accesos [cite: 119]
- [ ] [cite_start]Vista de Login (correo/contraseña)[cite: 122].
- [ ] [cite_start]Vista de Registro exclusiva para usuarios externos[cite: 120].

### [cite_start]Dashboard de Gestión de Solicitudes [cite: 145]
- [ ] [cite_start]**Vista Usuario Externo:** Tabla o lista para ver el estado de las solicitudes enviadas[cite: 147].
- [ ] [cite_start]**Vista Programador:** Interfaz para revisar solicitudes recibidas[cite: 147].
- [ ] [cite_start]**Acciones del Programador:** Lógica UI para cambiar el estado de la solicitud y registrar observaciones/respuestas[cite: 148, 149].

---

## 4. Experiencia de Usuario (UX) e Interfaz (UI)
- [ ] [cite_start]Validar que el diseño sea completamente adaptable (escritorio y dispositivos móviles) en todas las rutas[cite: 152].
- [ ] Implementar microinteracciones personalizadas (por ejemplo, hovers complejos en botones y cards usando Tailwind y CSS, evitando los efectos estándar).
- [ ] [cite_start]Asegurar una diferenciación visual clara y evidente entre la vista pública, la vista del usuario autenticado y la vista administrativa del programador[cite: 153].
- [ ] [cite_start]Uso adecuado de componentes reutilizables de Angular (cards, formularios, mensajes de estado)[cite: 154].

---

## 5. Control de Calidad Pre-Despliegue
- [ ] Revisión de limpieza de código y modularidad de SCSS.
- [ ] Comprobación cruzada: Confirmar la ausencia total de emojis e iconos genéricos.
- [ ] Comprobación de rendimiento: Asegurar que el modelo 3D y las animaciones del fondo de pintura no bloqueen el hilo principal del navegador.