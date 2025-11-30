import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export default function UserDropdown() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenuItem
      className="drop-down-select"
      onClick={() => {
        logout(); // Borra token, rol y email
        navigate("/login"); // Redirige al login
      }}
    >
      Cerrar sesión
    </DropdownMenuItem>
  );
}
