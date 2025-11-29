import api from "../axios";
import type { LoginDTO, Persona } from "../types";

// Login de usuario
export async function login(dto: LoginDTO): Promise<Persona> {
  try {
    // Suponemos que el backend devuelve { token: string, ...usuario }
    const res = await api.post<Persona & { token: string }>(
      "/autentificacion/login",
      dto
    );

    // Guardar token en localStorage
    if (res.data.token) {
      localStorage.setItem("jwt", res.data.token);
      console.log("Token guardado:", res.data.token);
    } else {
      console.warn("No se recibió token en el login");
    }

    // Retornar datos del usuario
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

  if (anyErr.request) return new Error("No hay respuesta del servidor");
  return new Error(anyErr.message || "Error desconocido");
}
