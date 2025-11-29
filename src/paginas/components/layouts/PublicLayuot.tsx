// src/paginas/components/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../NavBar"; // Asegúrate de que esta ruta sea correcta

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar único */}
     

      {/* Contenido de cada página */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
