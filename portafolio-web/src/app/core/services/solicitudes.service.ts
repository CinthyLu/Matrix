import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { EstadoSolicitud, Solicitud } from '../models/models';

type SolicitudFirestore = Omit<Solicitud, 'fechaCreacion'> & {
  createdAt?: string;
  updatedAt?: string;
};

@Injectable({ providedIn: 'root' })
export class SolicitudesService {
  private readonly firestore = inject(Firestore);

  private readonly solicitudesRef = collection(this.firestore, 'solicitudes');

  getSolicitudesUsuario(uid: string): Observable<Solicitud[]> {
    const solicitudesQuery = query(
      this.solicitudesRef,
      where('uid', '==', uid),
      orderBy('createdAt', 'desc')
    );

    return collectionData(solicitudesQuery, { idField: 'id' }).pipe(
      map((items) => items.map((item) => this.mapSolicitud(item as SolicitudFirestore)))
    );
  }

  getSolicitudesProgramador(email: string): Observable<Solicitud[]> {
    const solicitudesQuery = query(
      this.solicitudesRef,
      where('correoProgramador', '==', email),
      orderBy('createdAt', 'desc')
    );

    return collectionData(solicitudesQuery, { idField: 'id' }).pipe(
      map((items) => items.map((item) => this.mapSolicitud(item as SolicitudFirestore)))
    );
  }

  crearSolicitud(solicitud: Partial<Solicitud>): Observable<Solicitud> {
    const createdAt = new Date().toISOString();
    const payload: SolicitudFirestore = {
      uid: solicitud.uid ?? '',
      correoUsuario: solicitud.correoUsuario ?? '',
      nombreSolicitante: solicitud.nombreSolicitante ?? '',
      correoSolicitante: solicitud.correoSolicitante ?? '',
      descripcionProyecto: solicitud.descripcionProyecto ?? '',
      programadorId: solicitud.programadorId ?? '',
      programadorNombre: solicitud.programadorNombre ?? '',
      correoProgramador: solicitud.correoProgramador ?? '',
      estado: (solicitud.estado ?? 'Pendiente') as EstadoSolicitud,
      observacion: solicitud.observacion ?? '',
      createdAt,
      updatedAt: createdAt,
    };

    return from(addDoc(this.solicitudesRef, payload)).pipe(
      map((reference) => this.mapSolicitud({ ...payload, id: reference.id }))
    );
  }

  actualizarSolicitud(id: string, cambios: Partial<Solicitud>): Observable<void> {
    const reference = doc(this.firestore, 'solicitudes', id);
    return from(
      updateDoc(reference, {
        ...cambios,
        updatedAt: new Date().toISOString(),
      })
    );
  }

  private mapSolicitud(item: SolicitudFirestore): Solicitud {
    return {
      id: item.id,
      uid: item.uid,
      correoUsuario: item.correoUsuario,
      nombreSolicitante: item.nombreSolicitante,
      correoSolicitante: item.correoSolicitante,
      descripcionProyecto: item.descripcionProyecto,
      programadorId: item.programadorId,
      programadorNombre: item.programadorNombre,
      correoProgramador: item.correoProgramador,
      fechaCreacion: item.createdAt ? new Date(item.createdAt) : null,
      estado: item.estado,
      observacion: item.observacion,
    };
  }
}
