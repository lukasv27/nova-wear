import api from "../axios";
import type { RegistroDTO, LoginDTO, Persona } from "../types";

// Registro de usuario
export async function registro(dto: RegistroDTO): Promise<Persona> {
  try {
    const res = await api.post<Persona>("/autentificacion/registro", dto);
    return res.data;
  } catch (err) {
    throw parseError(err);
  }
}

// Login de usuario
export interface LoginResponse {
  token: string;
  email: string;
  rol: "ADMINISTRADOR" | "VENDEDOR" | "CLIENTE";
}

export async function login(dto: LoginDTO): Promise<LoginResponse> {
  try {
    const res = await api.post<LoginResponse>("/autentificacion/login", dto);
    return res.data;
  } catch (err) {
    throw parseError(err);
  }
}

// Obtener usuario por email
export async function obtenerUsuarioPorEmail(email: string): Promise<Persona> {
  try {
    const res = await api.get<Persona>(
      `/autentificacion/usuario/${encodeURIComponent(email)}`
    );
    return res.data;
  } catch (err) {
    throw parseError(err);
  }
}

// Manejo de errores
function parseError(err: unknown): Error {
  const anyErr = err as {
    response?: { data: unknown; status: number };
    request?: unknown;
    message?: string;
  };

  if (anyErr.response) {
    const data = anyErr.response.data;
    const msg =
      typeof data === "string" ? data : `Error ${anyErr.response.status}`;
    return new Error(msg);
  }

  if (anyErr.request) {
    return new Error("No hay respuesta del servidor");
  }

  return new Error(anyErr.message || "Error desconocido");
}
