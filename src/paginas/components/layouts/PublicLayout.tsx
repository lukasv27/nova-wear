import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";
import NavbarAdmin from "../NavbarAdmin";
import Footer from "../Footer";
import { useAuth } from "@/hooks/useAuth";

export default function PublicLayout() {
  const { rol, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar por defecto de cliente si no hay sesión */}
      {isAuthenticated() && rol === "ADMINISTRADOR" ? (
        <NavbarAdmin />
      ) : (
        <Navbar />
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
