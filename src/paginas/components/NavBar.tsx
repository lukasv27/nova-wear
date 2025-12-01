import { ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartProvider";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Estado local para token
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  // Función logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("rol");
    localStorage.removeItem("email");
    setToken(null); // ✅ fuerza re-render
    clearCart();
    toast.success("Sesión finalizada");
    navigate("/home", { replace: true });
  };

  // Detecta cambios en localStorage desde otras pestañas
  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("jwt"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="navbar-client">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-vibrant-pink via-vibrant-purple to-vibrant-orange bg-clip-text text-black">
              NOVA WEAR STORE
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Button
              variant="link"
              className="drop-down-select border-0"
              onClick={() => navigate("/home")}
            >
              Inicio
            </Button>

            <Button
              variant="link"
              className="drop-down-select border-0"
              onClick={() => navigate("/productos")}
            >
              Productos
            </Button>

            <Button
              variant="link"
              className="drop-down-select border-0"
              onClick={() => navigate("/historial")}
            >
              Historial de compra
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Dropdown del usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="icon_navbar drop-down-select"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="drop-down w-48 border-2 border-black rounded-md shadow-lg mt-2 bg-white z-50">
                {!token && (
                  <>
                    <DropdownMenuItem
                      className="drop-down-select"
                      onClick={() => navigate("/registro")}
                    >
                      Registro
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="drop-down-select"
                      onClick={() => navigate("/login")}
                    >
                      Iniciar sesión
                    </DropdownMenuItem>
                  </>
                )}

                {token && (
                  <DropdownMenuItem
                    className="drop-down-select"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Carrito */}
            <Button
              className="icon_navbar drop-down-select"
              variant="ghost"
              size="icon"
              onClick={() => navigate("/shoppingcart")}
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
