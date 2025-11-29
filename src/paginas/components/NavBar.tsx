import { ShoppingBag, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
            <Button variant="link" className="drop-down-select border-0" onClick={() => navigate("/home")}>
              Inicio
            </Button>

            <Button variant="link" className="drop-down-select border-0" onClick={() => navigate("/productos")}>
              Productos
            </Button>

            <Button variant="link" className="drop-down-select border-0" onClick={() => navigate("/historial de compra")}>
              Historial de compra
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {/* Dropdown del usuario */}
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="icon_navbar drop-down-select">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="drop-down w-48 mr-3">
                

                <DropdownMenuItem className ="drop-down-select"onClick={() => navigate("/login")}>
                  Iniciar sesion
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="drop-down-select "
                  onClick={() => console.log("Cerrar sesión")}
                >
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Carrito */}
            <Button className="icon_navbar drop-down-select" variant="ghost" size="icon"
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

export default Navbar;
