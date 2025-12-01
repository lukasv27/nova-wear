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
    navigate("/login", { replace: true });
  };
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [rol, setRol] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
    setRol(localStorage.getItem("rol"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const login = (token: string, rol: string, email: string) => {
    localStorage.setItem("jwt", token);
    localStorage.setItem("rol", rol);
    localStorage.setItem("email", email);
    setToken(token);
    setRol(rol);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("rol");
    localStorage.removeItem("email");
    setToken(null);
    setRol(null);
    setEmail(null);
  };

  // 👉 FUNCIÓN QUE TE FALTABA
  const isAuthenticated = () => !!localStorage.getItem("jwt");

  return { token, rol, email, login, logout, isAuthenticated };
}
