import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function HistoryEmpty() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">No tienes historial de compras</h2>
      <p className="text-gray-500 mb-6">Aún no has realizado ninguna compra</p>

      <Button onClick={() => (window.location.href = "/productos")}>
        Ir a la tienda
      </Button>
    </div>
  );
}
