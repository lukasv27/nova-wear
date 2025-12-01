import { ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const handleLogout = useLogout();

  // Estado local para token
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  // Detecta cambios en localStorage desde otras pestañas
  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("jwt"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="navbar-admin-color">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-vibrant-pink via-vibrant-purple to-vibrant-orange bg-clip-text text-black">
              Nova Wear Store
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Button
              variant="link"
              className="border-0 navbar-select"
              onClick={() => navigate("/home")}
            >
              Inicio
            </Button>

            <Button
              variant="link"
              className="border-0 navbar-select"
              onClick={() => navigate("/productos")}
            >
              Productos
            </Button>

            <Button
              variant="link"
              className="border-0 navbar-select"
              onClick={() => navigate("/administrador")}
            >
              Administrador de productos
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
                  className="icon_navbar navbar-select"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className=" navbar-select background-color w-48 border-2 border-black rounded-md shadow-lg mt-2 bg-white"
                side="bottom"
                align="center"
                sideOffset={5}
              >
                {!token && (
                  <DropdownMenuItem
                    className="navbar-select"
                    onClick={() => navigate("/login")}
                  >
                    Iniciar sesión
                  </DropdownMenuItem>
                )}

                {token && (
                  <DropdownMenuItem
                    className="navbar-select"
                    onClick={() => {
                      handleLogout();
                      toast.success("Sesión de administrador finalizada");
                      navigate("/home");
                    }}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Carrito */}
            <Button
              className="icon_navbar navbar-select"
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
};

export default NavbarAdmin;
