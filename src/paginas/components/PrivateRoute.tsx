import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const { token, rol } = useAuth();

  // Si no hay sesión
  if (!token) return <Navigate to="/auth/login" replace />;

  // Si hay roles permitidos y el rol no coincide
  if (allowedRoles && !allowedRoles.includes(rol || "")) {
    return <Navigate to="/auth/login" replace />;
  }

  return children; // ✅ Devuelve directamente el JSX de los hijos
}
