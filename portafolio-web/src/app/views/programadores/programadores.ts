import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../core/services/strapi.service';
import { SeoService } from '../../core/services/seo.service';
import { Programador } from '../../core/models/models';

@Component({
  selector: 'app-programadores',
  imports: [RouterLink],
  templateUrl: './programadores.html',
  styleUrl: './programadores.scss',
})
export class Programadores implements OnInit {
  private readonly strapiService = inject(StrapiService);
  private readonly seoService = inject(SeoService);

  programadores = signal<Programador[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Veltrix Studio - Nuestro Equipo de Ingeniería',
      description: 'Conoce a nuestros ingenieros y arquitectos de software expertos en soluciones escalables.',
      route: '/programadores'
    });

    this.strapiService.getProgramadores().subscribe({
      next: (items) => {
        this.programadores.set(items);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar programadores', error);
        this.loading.set(false);
      },
    });
  }
}
