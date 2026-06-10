import { Component, inject, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { StrapiService } from '../../core/services/strapi.service';
import { SeoService } from '../../core/services/seo.service';
import { Programador, Proyecto, Servicio } from '../../core/models/models';

@Component({
  selector: 'app-home',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly seoService = inject(SeoService);

  programmers = signal<Programador[]>([]);
  services = signal<Servicio[]>([]);
  featuredProjects = signal<Proyecto[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.seoService.generateTags({
      title: 'Veltrix Studio - Desarrollo de Software Premium',
      description: 'Creamos soluciones de software asimétricas y de autor con alto rendimiento y diseño cyber-dark.',
      route: '/'
    });
    this.loadHomeData();
  }

  private loadHomeData() {
    this.loading.set(true);

    forkJoin({
      programmers: this.strapiService.getProgramadores(),
      services: this.strapiService.getServicios(),
      projects: this.strapiService.getProyectosDestacados(),
    }).subscribe({
      next: ({ programmers, services, projects }) => {
        this.programmers.set(programmers);
        this.services.set(services);
        this.featuredProjects.set(projects);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar datos de inicio:', err);
        this.loading.set(false);
      },
    });
  }
}