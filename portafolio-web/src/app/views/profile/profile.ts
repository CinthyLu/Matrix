import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { StrapiService } from '../../core/services/strapi.service';
import { SeoService } from '../../core/services/seo.service';
import { AuthService } from '../../core/services/auth.service';
import { Programador } from '../../core/models/models';
import gsap from 'gsap';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, UpperCasePipe, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly strapiService = inject(StrapiService);
  private readonly seoService = inject(SeoService);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly fb = inject(FormBuilder);

  programmer = signal<Programador | null>(null);
  loading = signal<boolean>(true);

  // Estados de rol y del modal de adición de proyectos
  isOwnProfile = signal<boolean>(false);
  showAddProjectModal = signal<boolean>(false);
  savingProject = signal<boolean>(false);
  selectedFile: File | null = null;
  editingProjectId = signal<string | null>(null);

  // Estados de edición de perfil
  showEditProfileModal = signal<boolean>(false);
  savingProfile = signal<boolean>(false);
  selectedProfileFile: File | null = null;

  // Formulario reactivo para registrar nuevos proyectos
  projectForm = this.fb.nonNullable.group({
    Project_Name: ['', [Validators.required, Validators.minLength(3)]],
    tipo_de_proyecto: ['personal', Validators.required],
    Short_description: ['', [Validators.required, Validators.minLength(10)]],
    Full_description: [''],
    Technologies_used: ['', Validators.required], // Ej. "Angular, Tailwind"
    Link_repository: ['', Validators.required],
    Link_demo: [''],
    Featured: [false]
  });

  // Formulario reactivo para editar perfil
  profileForm = this.fb.nonNullable.group({
    Full_name: ['', [Validators.required, Validators.minLength(3)]],
    Specialty: ['', Validators.required],
    Short_description: ['', [Validators.required, Validators.minLength(10)]],
    Full_description: ['', [Validators.required, Validators.minLength(10)]],
    Links: ['']
  });

  ngOnInit() {
    const documentId = this.route.snapshot.paramMap.get('id');
    if (documentId) {
      this.loadProgrammerDetails(documentId);
    }
  }

  private loadProgrammerDetails(docId: string) {
    this.loading.set(true);
    this.strapiService.getProgramadorById(docId).subscribe({
      next: (prog) => {
        this.programmer.set(prog);
        this.loading.set(false);
        this.checkIfOwnProfile(prog);

        // SEO dinámico por programador
        const photoUrl = prog.Profile_picture?.url
          ? (prog.Profile_picture.url.startsWith('/') 
              ? 'https://upbeat-chickens-1ee0436960.strapiapp.com' + prog.Profile_picture.url 
              : prog.Profile_picture.url)
          : '';
        this.seoService.generateTags({
          title: `Veltrix Studio - Perfil de ${prog.Full_name}`,
          description: `${prog.Full_name} es especialista en ${prog.Specialty}. ${prog.Short_description}`,
          image: photoUrl,
          route: `/programador/${docId}`
        });

        // Ejecutamos la animación en el siguiente tick del event loop
        setTimeout(() => {
          this.animateProfile();
        }, 50);
      },
      error: (err) => {
        console.error('Error al cargar detalles del programador:', err);
        this.loading.set(false);
      }
    });
  }

  private checkIfOwnProfile(prog: Programador) {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        if (user && prog) {
          this.isOwnProfile.set(
            user.email?.toLowerCase() === prog.Contact_Email.toLowerCase()
          );
        } else {
          this.isOwnProfile.set(false);
        }
      },
      error: () => this.isOwnProfile.set(false)
    });
  }

  // Captura el archivo seleccionado del input
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onNewProject() {
    this.editingProjectId.set(null);
    this.projectForm.reset({
      tipo_de_proyecto: 'personal',
      Featured: false
    });
    this.selectedFile = null;
    this.showAddProjectModal.set(true);
  }

  onEditProject(proj: any) {
    this.editingProjectId.set(proj.documentId);
    this.projectForm.patchValue({
      Project_Name: proj.Project_Name,
      tipo_de_proyecto: proj.tipo_de_proyecto,
      Short_description: proj.Short_description,
      Full_description: proj.Full_description || '',
      Technologies_used: proj.Technologies_used,
      Link_repository: proj.Link_repository,
      Link_demo: proj.Link_demo || '',
      Featured: proj.Featured
    });
    this.selectedFile = null;
    this.showAddProjectModal.set(true);
  }

  // Enviar el nuevo proyecto o actualización a Strapi
  onSubmitProject() {
    if (this.projectForm.invalid || !this.programmer()) return;
    this.savingProject.set(true);

    const formValues = this.projectForm.getRawValue();
    // Generar un identificador slug simple del nombre del proyecto
    const slug = formValues.Project_Name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const saveProject = (imageId: number | null | undefined) => {
      const docId = this.programmer()?.documentId || '';
      
      // Si estamos editando y no subimos imagen nueva, conservamos la actual
      let finalImageId = imageId;
      if (this.editingProjectId() && imageId === undefined) {
        const existingProj = this.programmer()?.projects?.find(p => p.documentId === this.editingProjectId());
        finalImageId = existingProj?.Main_image?.id || null;
      } else if (imageId === undefined) {
        finalImageId = null;
      }

      const projPayload = {
        Project_Name: formValues.Project_Name,
        Identifier: slug,
        Short_description: formValues.Short_description,
        Full_description: formValues.Full_description,
        tipo_de_proyecto: formValues.tipo_de_proyecto,
        Technologies_used: formValues.Technologies_used,
        Link_repository: formValues.Link_repository,
        Link_demo: formValues.Link_demo || null,
        Featured: formValues.Featured,
        programmers: [docId], // Relación con el programador dueño del perfil
        Main_image: finalImageId
      };

      const request$ = this.editingProjectId()
        ? this.strapiService.actualizarProyecto(this.editingProjectId()!, projPayload)
        : this.strapiService.crearProyecto(projPayload);

      request$.subscribe({
        next: () => {
          this.savingProject.set(false);
          this.showAddProjectModal.set(false);
          this.projectForm.reset({
            tipo_de_proyecto: 'personal',
            Featured: false
          });
          this.selectedFile = null;
          this.editingProjectId.set(null);
          // Recargar el perfil para mostrar el nuevo proyecto en la lista
          this.loadProgrammerDetails(docId);
        },
        error: (err) => {
          console.error('Error al guardar el proyecto en Strapi:', err);
          this.savingProject.set(false);
        }
      });
    };

    if (this.selectedFile) {
      this.strapiService.uploadImage(this.selectedFile).subscribe({
        next: (res: any) => {
          const imageId = res[0]?.id || null;
          saveProject(imageId);
        },
        error: (err) => {
          console.error('Error al subir la imagen:', err);
          saveProject(undefined);
        }
      });
    } else {
      saveProject(undefined);
    }
  }

  onEditProfile() {
    const prog = this.programmer();
    if (!prog) return;
    this.profileForm.patchValue({
      Full_name: prog.Full_name,
      Specialty: prog.Specialty,
      Short_description: prog.Short_description,
      Full_description: prog.Full_description,
      Links: prog.Links || ''
    });
    this.selectedProfileFile = null;
    this.showEditProfileModal.set(true);
  }

  onProfileFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedProfileFile = file;
    }
  }

  onSubmitProfile() {
    if (this.profileForm.invalid || !this.programmer()) return;
    this.savingProfile.set(true);

    const formValues = this.profileForm.getRawValue();
    const docId = this.programmer()!.documentId;

    const saveProfile = (imageId: number | null | undefined) => {
      const updatedProg: any = {
        Full_name: formValues.Full_name,
        Specialty: formValues.Specialty,
        Short_description: formValues.Short_description,
        Full_description: formValues.Full_description,
        Links: formValues.Links || null
      };

      if (imageId !== undefined) {
        updatedProg.Profile_picture = imageId;
      }

      this.strapiService.actualizarProgramador(docId, updatedProg).subscribe({
        next: () => {
          this.savingProfile.set(false);
          this.showEditProfileModal.set(false);
          this.selectedProfileFile = null;
          this.loadProgrammerDetails(docId);
        },
        error: (err) => {
          console.error('Error al actualizar el programador en Strapi:', err);
          this.savingProfile.set(false);
        }
      });
    };

    if (this.selectedProfileFile) {
      this.strapiService.uploadImage(this.selectedProfileFile).subscribe({
        next: (res: any) => {
          const imageId = res[0]?.id || null;
          saveProfile(imageId);
        },
        error: (err) => {
          console.error('Error al subir la imagen de perfil:', err);
          saveProfile(undefined);
        }
      });
    } else {
      saveProfile(undefined);
    }
  }

  private animateProfile() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.profile-card', {
        duration: 0.8,
        x: -30,
        opacity: 0,
        ease: 'power3.out'
      });

      gsap.from('.profile-content', {
        duration: 0.8,
        x: 30,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.project-card', {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power2.out'
      });
    }
  }
}
