import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import ThankYouMessage from "./ThankYouMessage";
import { useNavigate } from "react-router";

const formattedPrice = (price: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);

export default function CartSummary() {
  const { cart, total, clearCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (cart.length === 0) return;

    // Obtener el email del usuario actual
    const userEmail = localStorage.getItem("email");
    if (!userEmail) return;

    // Guardar historial por usuario
    const storageKey = `purchaseHistory_${userEmail}`;
    const previousHistory = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );
    localStorage.setItem(
      storageKey,
      JSON.stringify([...previousHistory, ...cart])
    );

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      clearCart(); // Limpiar carrito después de guardar historial
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6 sticky top-4">
        <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">{formattedPrice(total)}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-gray-500">Envío</span>
          <span className="font-semibold">Gratis</span>
        </div>

        <div className="border-t my-4"></div>

        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>{formattedPrice(total)}</span>
        </div>

        <Button
          className="w-full mb-3 add-cart-button"
          onClick={handlePurchase}
        >
          Proceder al pago
        </Button>

        {showMessage && (
          <ThankYouMessage onClose={() => setShowMessage(false)} />
        )}

        <Button
          variant="outline"
          className="w-full add-cart-button"
          onClick={() => navigate("/productos")}
        >
          Continuar comprando
        </Button>
      </div>
    </div>
  );
}
