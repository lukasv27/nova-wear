//definen la forma exacta de los datos enviados y recibidos por la API

export interface RegistroDTO {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
  rol: "CLIENTE" | "VENDEDOR" | "ADMINISTRADOR";
}

export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
}

export type Rol = "ADMINISTRADOR" | "VENDEDOR" | "CLIENTE";
