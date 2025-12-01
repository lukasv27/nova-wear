import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";
import NavbarAdmin from "../NavbarAdmin";
import Footer from "../footer";
import { useAuth } from "@/hooks/useAuth";

export default function PublicLayout() {
  const { rol, token } = useAuth(); // obtenemos rol y token

  const isAdmin = token && rol === "ADMINISTRADOR";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mostrar navbar según rol y sesión */}
      {isAdmin ? <NavbarAdmin /> : <Navbar />}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
