import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Programador, Proyecto, Servicio, HomeContent, StrapiResponse, Solicitud } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.strapiUrl;

  /** Obtiene todos los programadores */
  getProgramadores(): Observable<Programador[]> {
    return this.http
      .get<StrapiResponse<Programador[]>>(`${this.apiUrl}/programers?populate=*`)
      .pipe(map((res) => res.data));
  }

  /** Obtiene un programador por su documentId */
  getProgramadorById(documentId: string): Observable<Programador> {
    return this.http
      .get<StrapiResponse<Programador>>(`${this.apiUrl}/programers/${documentId}?populate=*`)
      .pipe(map((res) => res.data));
  }

  /** Obtiene todos los proyectos */
  getProyectos(): Observable<Proyecto[]> {
    return this.http
      .get<StrapiResponse<Proyecto[]>>(`${this.apiUrl}/projects?populate=*`)
      .pipe(map((res) => res.data));
  }

  /** Obtiene los proyectos destacados */
  getProyectosDestacados(): Observable<Proyecto[]> {
    return this.http
      .get<StrapiResponse<Proyecto[]>>(`${this.apiUrl}/projects?filters[Featured][$eq]=true&populate=*`)
      .pipe(map((res) => res.data));
  }

  /** Obtiene todos los servicios */
  getServicios(): Observable<Servicio[]> {
    return this.http
      .get<StrapiResponse<Servicio[]>>(`${this.apiUrl}/servicios?populate=*`)
      .pipe(map((res) => res.data));
  }

  /** Obtiene el contenido de la página de inicio (Home) */
  getHome(): Observable<HomeContent> {
    return this.http
      .get<StrapiResponse<HomeContent>>(`${this.apiUrl}/home?populate=*`)
      .pipe(map((res) => res.data));
  }

  // ─────────────────────────────────────────────
  // Métodos de Solicitudes (CRUD en Strapi)
  // ─────────────────────────────────────────────

  /** Mapea la respuesta de Strapi a la interfaz Solicitud del frontend */
  private mapSolicitud(s: any): Solicitud {
    return {
      id: s.documentId,
      uid: s.uid,
      correoUsuario: s.correoUsuario,
      nombreSolicitante: s.nombreSolicitante,
      correoSolicitante: s.correoSolicitante,
      descripcionProyecto: s.descripcionProyecto,
      programadorId: s.programer?.documentId || '',
      programadorNombre: s.programer?.Full_name || 'Desconocido',
      fechaCreacion: s.createdAt ? new Date(s.createdAt) : null,
      estado: s.estado,
      observacion: s.observacion
    };
  }

  /** Obtiene las solicitudes enviadas por un usuario (cliente) */
  getSolicitudesDeUsuario(uid: string): Observable<Solicitud[]> {
    return this.http
      .get<StrapiResponse<any[]>>(`${this.apiUrl}/solicitudes?filters[uid][$eq]=${uid}&populate=*`)
      .pipe(
        map((res) => res.data.map((s) => this.mapSolicitud(s)))
      );
  }

  /** Obtiene las solicitudes recibidas por un programador mediante su email */
  getSolicitudesDeProgramador(email: string): Observable<Solicitud[]> {
    return this.http
      .get<StrapiResponse<any[]>>(`${this.apiUrl}/solicitudes?filters[programer][Contact_Email][$eq]=${email}&populate=*`)
      .pipe(
        map((res) => res.data.map((s) => this.mapSolicitud(s)))
      );
  }

  /** Crea una nueva solicitud en Strapi */
  crearSolicitud(solicitud: Partial<Solicitud>): Observable<Solicitud> {
    const payload = {
      data: {
        uid: solicitud.uid,
        correoUsuario: solicitud.correoUsuario,
        nombreSolicitante: solicitud.nombreSolicitante,
        correoSolicitante: solicitud.correoSolicitante,
        descripcionProyecto: solicitud.descripcionProyecto,
        estado: 'Pendiente',
        programer: solicitud.programadorId // Vincular con el programador seleccionado
      }
    };
    return this.http
      .post<StrapiResponse<any>>(`${this.apiUrl}/solicitudes`, payload)
      .pipe(map((res) => this.mapSolicitud(res.data)));
  }

  /** Responde a una solicitud (actualiza estado y observaciones) */
  responderSolicitud(documentId: string, observacion: string): Observable<Solicitud> {
    const payload = {
      data: {
        estado: 'Respondida',
        observacion: observacion
      }
    };
    return this.http
      .put<StrapiResponse<any>>(`${this.apiUrl}/solicitudes/${documentId}`, payload)
      .pipe(map((res) => res.data));
  }

  /** Sube una imagen a la biblioteca de medios de Strapi */
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', file);
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  /** Crea un nuevo proyecto en Strapi y lo publica de inmediato */
  crearProyecto(proyectoData: any): Observable<any> {
    const payload = {
      data: {
        Project_Name: proyectoData.Project_Name,
        Identifier: proyectoData.Identifier,
        Short_description: proyectoData.Short_description,
        Full_description: proyectoData.Full_description || '',
        tipo_de_proyecto: proyectoData.tipo_de_proyecto,
        Technologies_used: proyectoData.Technologies_used,
        Link_repository: proyectoData.Link_repository,
        Link_demo: proyectoData.Link_demo || null,
        Featured: proyectoData.Featured || false,
        programmers: proyectoData.programmers || [], // Lista de programadores del proyecto
        Main_image: proyectoData.Main_image || null, // Identificador de la imagen seleccionada
        publishedAt: new Date().toISOString() // Hacer visible el proyecto de inmediato
      }
    };
    return this.http.post<any>(`${this.apiUrl}/projects`, payload);
  }

  /** Actualiza un programador en Strapi */
  actualizarProgramador(documentId: string, programadorData: any): Observable<any> {
    const payload = {
      data: programadorData
    };
    return this.http.put<any>(`${this.apiUrl}/programers/${documentId}`, payload);
  }

  /** Actualiza un proyecto en Strapi */
  actualizarProyecto(documentId: string, proyectoData: any): Observable<any> {
    const payload = {
      data: {
        Project_Name: proyectoData.Project_Name,
        Identifier: proyectoData.Identifier,
        Short_description: proyectoData.Short_description,
        Full_description: proyectoData.Full_description || '',
        tipo_de_proyecto: proyectoData.tipo_de_proyecto,
        Technologies_used: proyectoData.Technologies_used,
        Link_repository: proyectoData.Link_repository,
        Link_demo: proyectoData.Link_demo || null,
        Featured: proyectoData.Featured || false,
        programmers: proyectoData.programmers || [],
        Main_image: proyectoData.Main_image
      }
    };
    return this.http.put<any>(`${this.apiUrl}/projects/${documentId}`, payload);
  }
}
