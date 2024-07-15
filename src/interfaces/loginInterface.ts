export interface LoginFormRequest {
  nombre_usuario: string;
  contrasenia: string;
}

export interface User {
  usuario_id: number;
  nombre_usuario: string;
  correo: string;
  rol: string;
}

export interface LoginResponse {
  accessToken: string;
  message: string;
  statusCode: number;
  user: User;
}
