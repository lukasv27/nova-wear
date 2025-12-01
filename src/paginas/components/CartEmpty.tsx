import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const GoToStoreButton = () => {
  const { rol, token } = useAuth();

  const backgroundColor =
    rol === "ADMINISTRADOR" && token
      ? "rgba(72, 167, 170, 1)"
      : "rgb(166, 136, 170)";

  return (
    <Button
      className="text-white navbar-select"
      style={{ backgroundColor }}
      onClick={() => (window.location.href = "/productos")}
    >
      Ir a la tienda
    </Button>
  );
};

export default function CartEmpty() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
      <p className="text-gray-500 mb-6">
        Agrega productos para comenzar tu compra
      </p>
<<<<<<< HEAD
      <Button
        className="drop-down-select"
        onClick={() => (window.location.href = "/productos")}
      >
        Ir a la tienda
      </Button>
=======

      <GoToStoreButton />
>>>>>>> 0b2db75 (se corrigio el dropdown de navbar cliente y admin)
    </div>
  );
}
