import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import ThankYouMessage from "./ThankYouMessage";

export default function CartSummary() {
  const { total } = useCart();

  const [showMessage, setShowMessage] = useState(false);
  const handlePurchase = () => {
    // Aquí luego conectarás el backend para guardar la compra
    console.log("Compra realizada!");
    setShowMessage(true);

    // Si quieres que se cierre solo:
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6 sticky top-4">
        <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-gray-500">Envío</span>
          <span className="font-semibold">Gratis</span>
        </div>

        <div className="border-t my-4"></div>

        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* BOTÓN QUE DISPARA LA ANIMACIÓN */}
        <Button
          className="w-full mb-3 add-cart-button"
          onClick={handlePurchase}
        >
          Proceder al pago
        </Button>

        {/* MENSAJE ANIMADO */}
        {showMessage && (
          <ThankYouMessage onClose={() => setShowMessage(false)} />
        )}

        <Button
          variant="outline"
          className="w-full add-cart-button"
          onClick={() => (window.location.href = "/productos")}
        >
          Continuar comprando
        </Button>
      </div>
    </div>
  );
}
