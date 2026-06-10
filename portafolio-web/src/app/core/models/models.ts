// ─────────────────────────────────────────────
// Strapi API Response wrapper
// ─────────────────────────────────────────────
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem<T> {
  id: number;
  documentId: string;
  attributes?: T;
}

// ─────────────────────────────────────────────
// Tecnología
// ─────────────────────────────────────────────
export interface Tecnologia {
  id: number;
  documentId: string;
  nombre: string;
  logo?: string;
  categoria?: string;
}

// ─────────────────────────────────────────────
// Servicio
// ─────────────────────────────────────────────
export interface Servicio {
  id: number;
  documentId: string;
  service_name: string;
  description: string;
}

// ─────────────────────────────────────────────
// Proyecto
// ─────────────────────────────────────────────
export interface Proyecto {
  id: number;
  documentId: string;
  Project_Name: string;
  Short_description: string;
  Full_description?: string;
  Main_image?: any;
  tipo_de_proyecto: 'academico' | 'personal' | 'laboral' | 'simulado';
  Technologies_used: string;
  Link_repository: string;
  Link_demo?: string;
  Featured: boolean;
  programmers?: Programador[];
}

// ─────────────────────────────────────────────
// Programador
// ─────────────────────────────────────────────
export interface Programador {
  id: number;
  documentId: string;
  Full_name: string;
  Specialty: string;
  Short_description: string;
  Full_description: string;
  Contact_Email: string;
  Profile_picture?: any;
  Active_status: boolean;
  Identifier: string;
  Links?: string;
  tecnologias?: Tecnologia[];
  projects?: Proyecto[];
}

// ─────────────────────────────────────────────
// Home Content
// ─────────────────────────────────────────────
export interface HomeContent {
  id: number;
  documentId: string;
  titulo_hero: string;
  subtitulo_hero: string;
  descripcion_empresa: string;
  imagen_hero?: string;
}

// ─────────────────────────────────────────────
// Solicitud de Contacto (Firestore)
// ─────────────────────────────────────────────
export type EstadoSolicitud = 'Pendiente' | 'Respondida';

export interface Solicitud {
  id?: string;
  uid: string;
  correoUsuario: string;
  nombreSolicitante: string;
  correoSolicitante: string;
  descripcionProyecto: string;
  programadorId: string;
  programadorNombre: string;
  correoProgramador?: string;
  fechaCreacion: Date | string | null;
  estado: EstadoSolicitud;
  observacion?: string;
  createdAt?: string;
  updatedAt?: string;
}

