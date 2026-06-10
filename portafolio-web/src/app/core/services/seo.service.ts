import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  /**
   * Genera y actualiza dinámicamente las etiquetas meta para SEO
   * @param config Configuración de títulos, descripción, imagen y ruta
   */
  generateTags(config: {
    title: string;
    description: string;
    image?: string;
    route?: string;
  }) {
    // Título de la página
    this.titleService.setTitle(config.title);

    // Meta Descripción estándar
    this.metaService.updateTag({ name: 'description', content: config.description });

    // Open Graph / Facebook / LinkedIn
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    if (config.image) {
      this.metaService.updateTag({ property: 'og:image', content: config.image });
    }
    if (config.route) {
      this.metaService.updateTag({ property: 'og:url', content: `https://veltrix-6d976.web.app${config.route}` });
    }

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    if (config.image) {
      this.metaService.updateTag({ name: 'twitter:image', content: config.image });
    }
  }
}
