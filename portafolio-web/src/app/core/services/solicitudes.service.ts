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

  private cleanUndefined(obj: any): any {
    const clean: any = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined) {
        clean[key] = obj[key];
      }
    });
    return clean;
  }

  getSolicitudesUsuario(uid: string): Observable<Solicitud[]> {
    const solicitudesQuery = query(
      this.solicitudesRef,
      where('uid', '==', uid)
    );

    return collectionData(solicitudesQuery, { idField: 'id' }).pipe(
      map((items) => {
        const mapped = items.map((item) => this.mapSolicitud(item as SolicitudFirestore));
        return mapped.sort((a, b) => {
          const dateA = a.fechaCreacion ? new Date(a.fechaCreacion).getTime() : 0;
          const dateB = b.fechaCreacion ? new Date(b.fechaCreacion).getTime() : 0;
          return dateB - dateA;
        });
      })
    );
  }

  getSolicitudesProgramador(email: string): Observable<Solicitud[]> {
    const solicitudesQuery = query(
      this.solicitudesRef,
      where('correoProgramador', '==', email.toLowerCase())
    );

    return collectionData(solicitudesQuery, { idField: 'id' }).pipe(
      map((items) => {
        const mapped = items.map((item) => this.mapSolicitud(item as SolicitudFirestore));
        return mapped.sort((a, b) => {
          const dateA = a.fechaCreacion ? new Date(a.fechaCreacion).getTime() : 0;
          const dateB = b.fechaCreacion ? new Date(b.fechaCreacion).getTime() : 0;
          return dateB - dateA;
        });
      })
    );
  }

  crearSolicitud(solicitud: Partial<Solicitud>): Observable<Solicitud> {
    const createdAt = new Date().toISOString();
    const payload: SolicitudFirestore = {
      uid: solicitud.uid ?? '',
      correoUsuario: (solicitud.correoUsuario ?? '').toLowerCase(),
      nombreSolicitante: solicitud.nombreSolicitante ?? '',
      correoSolicitante: (solicitud.correoSolicitante ?? '').toLowerCase(),
      descripcionProyecto: solicitud.descripcionProyecto ?? '',
      programadorId: solicitud.programadorId ?? '',
      programadorNombre: solicitud.programadorNombre ?? '',
      correoProgramador: (solicitud.correoProgramador ?? '').toLowerCase(),
      estado: (solicitud.estado ?? 'Pendiente') as EstadoSolicitud,
      observacion: solicitud.observacion ?? '',
      createdAt,
      updatedAt: createdAt,
    };

    return from(addDoc(this.solicitudesRef, this.cleanUndefined(payload))).pipe(
      map((reference) => this.mapSolicitud({ ...payload, id: reference.id }))
    );
  }

  actualizarSolicitud(id: string, cambios: Partial<Solicitud>): Observable<void> {
    const reference = doc(this.firestore, 'solicitudes', id);
    const payload = this.cleanUndefined({
      ...cambios,
      updatedAt: new Date().toISOString(),
    });
    return from(updateDoc(reference, payload));
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
