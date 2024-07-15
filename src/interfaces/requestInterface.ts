export interface TipoSolicitud {
  tipo_solicitud_id: number;
  nombre_tipo_solicitud: string;
}

export interface TipoServicio {
  tipo_servicio_id: number;
  nombre_tipo_servicio: string;
  tipo_familia_id: number;
}

export interface TipoEstado {
  tipo_estado_id: number;
  nombre_tipo_estado: string;
}

export interface TipoPrioridad {
  tipo_prioridad_id: number;
  nombre_tipo_prioridad: string;
}

export interface Usuario {
  usuario: UsuarioDetalle;
}

export interface UsuarioDetalle {
  usuario_id: number;
  correo_usuario: string;
  nombre_usuario: string;
}

export interface RequestResponse {
  solicitud_id: number;
  numero_ticket: string;
  asunto_solicitud: string;
  detalle_solicitud: string;
  fecha_asignada: string;
  usuario_id: number;
  token: string;
  tipo_solicitud_id: number;
  tipo_servicio_id: number;
  tipo_estado_id: number;
  tipo_prioridad_id: number;
  fecha_creacion: string;
  fecha_modificacion: Date;
  tipo_solicitud: TipoSolicitud;
  tipo_servicio: TipoServicio;
  tipo_estado: TipoEstado;
  tipo_prioridad: TipoPrioridad;
  solicitud_usuario: Usuario[];
}

export interface RequestFormatted {
  asuntoNombre: string;
  asuntoDetalle: string;
  tipoSolicitud: number;
  tipoFamilia: number;
  tipoServicio: number;
}

export interface RequestType {
  tipo_solicitud_id: number;
  nombre_tipo_solicitud: string;
}

export interface FamilyType {
  tipo_familia_id: number;
  nombre_tipo_familia: string;
}

export interface ServiceType {
  tipo_servicio_id: number;
  nombre_tipo_servicio: string;
}
