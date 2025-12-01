import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HistoryEmpty from "../../HistoryEmpty";
import type { CartItem } from "../../CartProvider";
import { toast } from "sonner";

const PurchaseHistory = () => {
  const [history, setHistory] = useState<CartItem[]>([]);
  const userEmail = localStorage.getItem("email"); // correo del usuario actual
  const storageKey = `purchaseHistory_${userEmail}`; // clave única por usuario

  // Cargar historial del usuario
  useEffect(() => {
    if (!userEmail) {
      setHistory([]); // si no hay usuario, historial vacío
      return;
    }

    const storedHistory = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    ) as CartItem[];
    setHistory(storedHistory);
  }, [userEmail]);

  // Función para borrar historial
  const handleClearHistory = () => {
    localStorage.removeItem(storageKey);
    setHistory([]);
    toast.success("Historial borrado");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Productos comprados</h2>
        {history.length > 0 && (
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleClearHistory}
          >
            Borrar historial
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <HistoryEmpty />
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={`${item.productId}-${item.size}-${index}`}
              className="flex items-center gap-4 border-b pb-3"
            >
              {item.imageBase64 && (
                <img
                  src={item.imageBase64}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-sm text-gray-500">Talla: {item.size}</p>
                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <span className="font-bold text-lg">
                ${Number(item.price) * item.quantity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
