import { useCart } from "@/paginas/components/CartProvider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function useLogout() {
  const { logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  return () => {
    logout();
    clearCart();
    navigate("/login", { replace: true }); // redirige al login
  };
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt")
  );
  const [rol, setRol] = useState<string | null>(localStorage.getItem("rol"));
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );

  const login = (newToken: string, newRol: string, newEmail: string) => {
    localStorage.setItem("jwt", newToken);
    localStorage.setItem("rol", newRol);
    localStorage.setItem("email", newEmail);
    setToken(newToken);
    setRol(newRol);
    setEmail(newEmail);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("rol");
    localStorage.removeItem("email");
    setToken(null);
    setRol(null);
    setEmail(null);
  };

  // ✅ Agregar isAuthenticated
  const isAuthenticated = () => !!token;

  return { token, rol, email, login, logout, isAuthenticated };
}
