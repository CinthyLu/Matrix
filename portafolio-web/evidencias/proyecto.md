<img src="./1vo5lqq3.png"
style="width:1.75003in;height:0.47153in" /><img src="./qw04p4z2.png"
style="width:1.96238in;height:0.52986in" />

> **Resolución** **CS** **N°** **076-04-2016-04-20**

<img src="./cxtivjfo.png"
style="width:1.75003in;height:0.47153in" /><img src="./rhqf1yu5.png"
style="width:5.39653in;height:2.83588in" />

> **Firebase** **Authentication:** permitirá el registro e inicio de
> sesión de usuarios mediante correo electrónico y, opcionalmente,
> mediante cuenta de Google.
>
> **Cloud** **Firestore:** almacenará las solicitudes de contacto
> realizadas por los usuarios externos. Cada solicitud deberá estar
> asociada al usuario autenticado y al programador seleccionado.
>
> **Strapi** **CMS:** permitirá administrar el contenido dinámico del
> portafolio, como programadores, proyectos, tecnologías, servicios,
> imágenes y textos principales de la página.

**2.** **Gestión** **de** **contenido** **dinámico** **con** **Strapi**

Configurar Strapi como CMS Headless para administrar el contenido del
portafolio sin desarrollar un panel administrativo propio en Angular. En
Strapi se deberán definir, como mínimo, los siguientes tipos de
contenido, con campos **sugeridos**:

||
||
||
||

> **Resolución** **CS** **N°** **076-04-2016-04-20**

<img src="./1ihjqplj.png"
style="width:1.75003in;height:0.47153in" />

**3.** **Página** **Home** **del** **portafolio**

La página principal deberá mostrar una presentación general del
portafolio de la pareja. Deberá incluir como **mínimo**:

> • Sección hero o presentación inicial. (de la empresa de desarrollo)
>
> • Cards o componentes visuales con el perfil de ambos programadores. •
> Listado de servicios o áreas de especialización.
>
> • Proyectos destacados obtenidos desde Strapi mediante el atributo
> destacado. • Sección de contacto o botón para crear una solicitud.

Al seleccionar un programador, la aplicación deberá navegar hacia su
perfil individual.

**4.** **Perfil** **individual** **del** **programador**

Cada programador deberá tener una página de perfil individual. Esta
página deberá mostrar toda la infromación del programador y sus
proyectos

Si un proyecto está relacionado con ambos programadores, deberá aparecer
en el perfil de los dos.

Ejemplo: Si el Proyecto 3 pertenece al Programador A y al Programador B,
deberá mostrarse tanto en el perfil del Programador A como en el perfil
del Programador B.

**5.** **Autenticación** **de** **usuarios** **externos** **y**
**programadores**

> • Registro con correo electrónico y contraseña. (SOLO USUARIOS
> EXTERNOS)
>
> • Los programadores serán registrados como contenido en Strapi CMS. La
> cuenta de acceso del programador será creada en Firebase
> Authentication.
>
> • Inicio de sesión con correo electrónico y contraseña. • Cierre de
> sesión.
>
> • Opcional EXTRA: inicio de sesión con cuenta de Google.

El usuario externo podrá **explorar** **el** **portafolio** **sin**
**iniciar** **sesión**, pero deberá **autenticarse** para enviar una
solicitud de contacto.

**6.** **Solicitudes** **de** **contacto**

La aplicación deberá permitir que un usuario autenticado envíe una
solicitud de contacto a uno de los programadores. El formulario de
solicitud deberá incluir como mínimo:

> • Nombre del solicitante. • Correo del solicitante.
>
> • Idea o descripción del proyecto.
>
> • Programador al que se dirige la solicitud (Programadores que estan
> en el CMS). • Fecha de creación automática.
>
> • Estado inicial de la solicitud. ( Pendiente – Respondida)

La solicitud deberá guardarse en Cloud Firestore y quedar asociada a:

> • El usuario autenticado mediante su uid. • El programador
> seleccionado.
>
> **Resolución** **CS** **N°** **076-04-2016-04-20**

<img src="./audehtii.png"
style="width:1.75003in;height:0.47153in" />

> • El correo del usuario autenticado.

**7.** **Gestión** **de** **solicitudes** **por** **parte** **de**
**usuarios** **autenticados** **programador** **y** **usuario**
**externo**

Cada usuario deberá poder iniciar sesión y visualizar las solicitudes
que le han sido dirigidas; podra:.

> • Ver las solicitudes: recibidas (programador); solicitadas (usuario).
> • Cambiar el estado de la solicitud. (programador)
>
> • Registrar una observación o respuesta. (programador) • Guardar la
> actualización en Firestore. (programador)

**8.** **Diseño** **de** **interfaz** **y** **experiencia** **de**
**usuario**

La aplicación deberá contar con una interfaz clara, responsive y
organizada. Se deberá considerar: • Diseño adaptable a escritorio y
dispositivos móviles.

> • Navegación clara entre Home, programadores, proyectos, login y
> solicitudes.
>
> • Diferenciación visual entre vista pública, vista de usuario
> autenticado y vista del programador. • Uso adecuado de cards,
> formularios, botones, mensajes de estado y componentes reutilizables.

**9.** **Despliegue**

La aplicación frontend deberá desplegarse en Firebase Hosting o
githubPAGES. La entrega deberá incluir, y toda la configuración de CEO

Strapi podrá ejecutarse en Strapi Cloud o en otro entorno disponible,
siempre que sus endpoints REST puedan ser consumidos desde Angular.

**ENTREGABLES:**

> 1\. **Código** **Fuente**:
>
> • Subir el código fuente a un repositorio en GitHub. 2. **Prototipo**:
>
> • Presentar un prototipo funcional de la interfaz de usuario,
> incluyendo todas las vistas y flujos principales. 3. **Demo**:
>
> • Proveer un enlace a la aplicación desplegada en Firebase Hosting. 4.
> **Informe** **README** :
>
> • Un informe escrito que describa el proceso de desarrollo, las
> decisiones de diseño y los desafíos enfrentados, adicional
>
> • Incluir documentación detallada sobre cómo configurar y desplegar la
> aplicación. • Proveer una guía de usuario para el administrador y los
> usuarios finales.
>
> • Video de presentación del proyecto, explicación tecnica
>
> **Resolución** **CS** **N°** **076-04-2016-04-20**

<img src="./xocigabu.png"
style="width:1.75003in;height:0.47153in" />

||
||
||
||
||
||

> ***Docente*** ***/*** ***Técnico*** ***Docente*:** Ing. Pablo Torres
>
> ***Firma*:**
> **\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**
>
> **Resolución** **CS** **N°** **076-04-2016-04-20**
