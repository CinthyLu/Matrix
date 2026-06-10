import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StrapiService } from '../../core/services/strapi.service';
import { SolicitudesService } from '../../core/services/solicitudes.service';
import { SeoService } from '../../core/services/seo.service';
import { Programador, Solicitud } from '../../core/models/models';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, UpperCasePipe, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  protected readonly authService = inject(AuthService);
  private readonly strapiService = inject(StrapiService);
  private readonly solicitudesService = inject(SolicitudesService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);

  // Control de pantallas y vistas
  isProgrammer = signal<boolean>(false);
  loading = signal<boolean>(true);
  programmersList = signal<Programador[]>([]);

  // Listas de solicitudes de proyectos
  solicitudesEnviadas = signal<Solicitud[]>([]);
  solicitudesRecibidas = signal<Solicitud[]>([]);

  // Datos del usuario conectado
  currentUserEmail: string | null = null;
  currentUserUid: string | null = null;
  currentUserName: string | null = null;
  currentProgrammerId: string | null = null;

  // Formulario para crear una nueva propuesta
  solicitudForm = this.fb.nonNullable.group({
    programadorId: ['', Validators.required],
    nombreSolicitante: ['', [Validators.required, Validators.minLength(3)]],
    descripcionProyecto: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit() {
    // Configurar etiquetas SEO para el panel
    this.seoService.generateTags({
      title: 'Veltrix Studio - Panel de Gestión de Solicitudes',
      description: 'Consulta tus solicitudes de proyectos, envía nuevas propuestas técnicas o responde observaciones del equipo.',
      route: '/solicitudes'
    });

    // Cargar la lista de programadores desde Strapi
    this.strapiService.getProgramadores().subscribe({
      next: (progs) => {
        this.programmersList.set(progs);
        this.checkUserRole(progs);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private checkUserRole(programmers: Programador[]) {
    // Validar el rol del usuario conectado
    this.authService.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          this.currentUserEmail = user.email || null;
          this.currentUserUid = user.uid;

          // Completar el nombre automáticamente con los datos de Firebase
          this.solicitudForm.patchValue({
            nombreSolicitante: user.displayName || ''
          });

          // Seleccionar programador automáticamente si venimos desde su perfil
          this.route.queryParams.subscribe(params => {
            const progId = params['progId'];
            if (progId) {
              this.solicitudForm.patchValue({
                programadorId: progId
              });
            }
          });

          // Si el correo coincide con un programador, activar la vista de desarrollador
          const matchedProgrammer = programmers.find(p => p.Contact_Email.toLowerCase() === user.email?.toLowerCase());
          const isProg = Boolean(matchedProgrammer);
          this.currentProgrammerId = matchedProgrammer?.documentId ?? null;
          this.isProgrammer.set(isProg);

          // Cargar las solicitudes del usuario
          this.cargarSolicitudes();
        } else {
          this.loading.set(false);
        }
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  cargarSolicitudes() {
    this.loading.set(true);
    if (this.isProgrammer() && this.currentUserEmail) {
      this.solicitudesService.getSolicitudesProgramador(this.currentUserEmail).subscribe({
        next: (sols) => {
          this.solicitudesRecibidas.set(sols);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    } else if (this.currentUserUid) {
      this.solicitudesService.getSolicitudesUsuario(this.currentUserUid).subscribe({
        next: (sols) => {
          this.solicitudesEnviadas.set(sols);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    } else {
      this.loading.set(false);
    }
  }

  // Enviar una nueva propuesta de proyecto
  onEnviarSolicitud() {
    if (this.solicitudForm.invalid || !this.currentUserUid || !this.currentUserEmail) return;

    const { programadorId, nombreSolicitante, descripcionProyecto } = this.solicitudForm.getRawValue();

    const programadorSeleccionado = this.programmersList().find((prog) => prog.documentId === programadorId);

    const nuevaSol: Partial<Solicitud> = {
      uid: this.currentUserUid,
      correoUsuario: this.currentUserEmail,
      nombreSolicitante,
      correoSolicitante: this.currentUserEmail,
      descripcionProyecto,
      programadorId,
      programadorNombre: programadorSeleccionado?.Full_name ?? '',
      correoProgramador: programadorSeleccionado?.Contact_Email ?? ''
    };

    this.solicitudesService.crearSolicitud(nuevaSol).subscribe({
      next: (created) => {
        this.solicitudesEnviadas.update(sols => [created, ...sols]);
        this.solicitudForm.reset({
          programadorId: '',
          nombreSolicitante: this.currentUserName ?? nombreSolicitante,
          descripcionProyecto: ''
        });
      },
      error: (err) => {
        console.error('Error al enviar la solicitud a Firestore', err);
      }
    });
  }

  // Registrar la respuesta del programador
  onResponder(solId: string, observacion: string) {
    if (!observacion.trim()) return;

    this.solicitudesService.actualizarSolicitud(solId, {
      estado: 'Respondida',
      observacion: observacion.toUpperCase(),
    }).subscribe({
      next: () => {
        // Actualizar la solicitud en la lista que se muestra en pantalla
        this.solicitudesRecibidas.update(sols =>
          sols.map(s => s.id === solId ? { ...s, estado: 'Respondida', observacion: observacion.toUpperCase() } : s)
        );
      },
      error: (err) => {
        console.error('Error al responder la solicitud en Firestore', err);
      }
    });
  }
}
