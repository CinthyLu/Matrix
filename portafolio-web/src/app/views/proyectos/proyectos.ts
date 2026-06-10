import { Component, inject, OnInit, signal } from '@angular/core';
import { StrapiService } from '../../core/services/strapi.service';
import { SeoService } from '../../core/services/seo.service';
import { Proyecto } from '../../core/models/models';

@Component({
  selector: 'app-proyectos',
  imports: [],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.scss',
})
export class Proyectos implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly seoService = inject(SeoService);

  proyectos = signal<Proyecto[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Veltrix Studio - Casos de Éxito y Proyectos',
      description: 'Explora nuestro portafolio de proyectos de desarrollo a medida y soluciones web premium.',
      route: '/proyectos'
    });

    this.strapiService.getProyectos().subscribe({
      next: (items) => {
        this.proyectos.set(items);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar proyectos', error);
        this.loading.set(false);
      },
    });
  }
}
