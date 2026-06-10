<div align="center">

![Portada del Proyecto](../portada.png)

# INFORME TÉCNICO: CMS HEADLESS (BACKEND)
### Servidor de Contenidos y Base de Datos Relacional - Veltrix Studio

**Materia:** Programación y Plataformas Web  
**Curso:** PPW P68  
**Docente:** Ing. Pablo Torres  
**Institución:** Universidad Politécnica Salesiana  

**Autores:**  
- Cinthya Ramón (cramonm12@gmail.com)  
- Isaac Mora (isaacalf.135@gmail.com)  
**Fecha:** Junio de 2026  

---

![Estado](https://img.shields.io/badge/componente-backend-blueviolet?style=for-the-badge)
![Strapi](https://img.shields.io/badge/Strapi-v5-4945FF?style=for-the-badge&logo=strapi&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

---

## Enlaces de la Plataforma
- Aplicación Pública (Frontend): https://veltrix-6d976.web.app/
- Strapi Admin (Panel de control del CMS): https://upbeat-chickens-1ee0436960.strapiapp.com/admin
- API REST URL: https://upbeat-chickens-1ee0436960.strapiapp.com/api

---

## 1. Resumen Ejecutivo
Este componente representa el backend desacoplado (Headless CMS) del **Portafolio Veltrix Studio**, construido sobre la plataforma **Strapi v5**. Su propósito es gestionar y estructurar de manera centralizada la información institucional, perfiles de los desarrolladores, portafolios de proyectos individuales y tecnologías utilizadas.
Al exponer una API REST segura mediante tokens Bearer, permite al cliente frontend consultar y actualizar datos en tiempo real de forma dinámica.

---

## 2. Arquitectura de Contenidos (Esquema del CMS)
El backend utiliza los siguientes modelos de contenido (Content-Types) estructurados de forma relacional:

### A. Colecciones (Collection Types)
1. **Programers (api::programer.programer):**
   - `Full_name` (Text, requerido): Nombre y apellido del desarrollador.
   - `Specialty` (Text): Área de enfoque del desarrollador.
   - `Short_description` (Text): Resumen introductorio del perfil.
   - `Full_description` (Rich Text): Experiencia y conocimientos extendidos.
   - `Contact_Email` (Email, único): Correo corporativo del programador (clave de autenticación).
   - `Profile_picture` (Media, single image): Foto del programador.
   - `tecnologias` (Relación Many-to-Many con Tecnologias).
   - `projects` (Relación Many-to-Many con Projects).
2. **Projects (api::project.project):**
   - `Project_Name` (Text, requerido): Nombre de la aplicación o software.
   - `Identifier` (UID): Identificador amigable (slug) autogenerado.
   - `Short_description` (Text): Descripción breve.
   - `Full_description` (Rich Text): Retos y arquitectura del proyecto.
   - `tipo_de_proyecto` (Enumeración): `personal` | `empresa` | `colaborativo`.
   - `Technologies_used` (Text): Tecnologías separadas por comas.
   - `Link_repository` (Text): Enlace de código de GitHub/GitLab.
   - `Link_demo` (Text): Demo en vivo.
   - `Featured` (Boolean): Marca para mostrar en la sección destacada de inicio.
   - `Main_image` (Media, single image): Portada del proyecto.
3. **Servicios (api::servicio.servicio):**
   - `service_name` (Text): Nombre del servicio brindado.
   - `description` (Text): Detalle del servicio.
4. **Tecnologias (api::tecnologia.tecnologia):**
   - `nombre` (Text): Nombre del lenguaje o framework.
   - `logo` (Media): Imagen del logotipo.
   - `categoria` (Text): Categoría (Frontend, Backend, Database).

### B. Páginas Únicas (Single Types)
1. **Home (api::home.home):**
   - `titulo_hero` (Text), `subtitulo_hero` (Text), `descripcion_empresa` (Rich Text) e `imagen_hero` (Media).

---

## 3. Instalación y Configuración Local

### Requisitos Previos
* Node.js v18.0 o superior.
* Gestor de paquetes npm o pnpm.

### Pasos de Inicialización

1. Accede al directorio del servidor:
   ```bash
   cd backend-portafolio
   ```

2. Instala los módulos y dependencias:
   ```bash
   pnpm install
   ```

3. Configura el archivo de entorno `.env` en la raíz de `backend-portafolio` basándote en el archivo `.env.example`:
   ```env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=llaves_aleatorias_de_encriptacion
   API_TOKEN_SALT=salt_aleatorio
   ADMIN_JWT_SECRET=secret_jwt_admin
   TRANSFER_TOKEN_SALT=salt_transfer
   DATABASE_CLIENT=sqlite
   DATABASE_FILENAME=.tmp/data.db
   ```

4. Ejecuta el servidor en modo desarrollo (con recarga automática):
   ```bash
   pnpm run develop
   ```
   El panel de administración estará disponible en: http://localhost:1337/admin. Crea tu usuario administrador inicial para comenzar a ingresar contenido de prueba.

---

## 4. Configuración de Roles y Permisos de la API
Para permitir que el frontend se comunique correctamente, ve a Settings -> Users & Permissions Plugin -> Roles en tu Panel de Administración:

1. **Rol Public (Público):**
   - Habilita las acciones de consulta (find y findOne) para: Programer, Project, Servicio, Tecnologia y Home.
2. **Token de la API (API Token):**
   - Genera un token de tipo Full Access o Custom con permisos de lectura (find, findOne) y de escritura (create, update, upload) para que el frontend de Angular pueda actualizar los datos de perfil y registrar proyectos en la biblioteca de medios desde la interfaz.

---

## 5. Comandos de Producción
* **Compilar el panel administrativo:**
  ```bash
  pnpm run build
  ```
* **Arrancar en modo producción:**
  ```bash
  pnpm run start
  ```
* **Exportar/Importar base de datos y recursos:**
  ```bash
  npx strapi export
  ```

---

<div align="center">

Desarrollado para la **Universidad Politécnica Salesiana**

*Programación y Plataformas Web  · 2026*

</div>
