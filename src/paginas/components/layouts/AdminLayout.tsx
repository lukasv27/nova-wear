
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin";

export default function AdminLayout() {
  return (
    <div>
      <NavbarAdmin />
      <div className="p-10 max-w-6xl mx-auto">
        <Outlet /> {/* Aquí se renderiza la página hija */}
      </div>
    </div>
  );
}
