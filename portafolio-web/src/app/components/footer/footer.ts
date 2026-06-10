import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  // Variables con la información de tu footer
  year: number = new Date().getFullYear();
  estudio: string = 'Veltrix Studio';
  curso: string = 'PPW P68';

  navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Contacto', href: '/contacto' },
  ];

  
  contacto = {
    email: 'contacto@veltrix.app',
    phone: '+593-969 567 490',
    address: 'Cuenca, Ecuador',
    github: 'https://github.com/CinthyLu/Veltrix',
    linkedin: 'https://www.linkedin.com'
  };


  coautores = [
    {
      name: 'Isaac Mora',
      email: 'isaacalf.135@gmail.com',
      github: 'https://github.com/isaac-315',
     
    },
    {
      name: 'Cinthya Ramon',
      email: 'cramonm12@gmail.com',
      github: 'https://github.com/CinthyLu',
      linkedin: 'https://www.linkedin.com/in/cinthya-ram%C3%B3n-4b821a266/'
    }
  ];
}
