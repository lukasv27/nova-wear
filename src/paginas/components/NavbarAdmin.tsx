import { ShoppingBag, Menu, Search, User, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";



const NavbarAdmin = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar-admin-color">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-vibrant-pink via-vibrant-purple to-vibrant-orange bg-clip-text text-black">
                Nova Wear Store
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
                <Button className ="icon_navbar drop-down-select  "variant="ghost" size="icon" onClick={() => navigate("/login")}>
                <User className=" h-5 w-5" />
                </Button>

                <Button className="icon_navbar drop-down-select" variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                </Button>

                

            </div>
            </div>

         
        </div>
        </nav>
  );
};

export default NavbarAdmin;
