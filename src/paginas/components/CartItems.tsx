import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "./CartProvider";
//carrito
export default function CartItems() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="lg:col-span-2 space-y-4">
      {cart.map((item) => (
        <div
          key={item.productId + item.size}
          className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition"
        >
          {/* Imagen */}
          <div className="w-full sm:w-32 h-32 flex-shrink-0">
            <img
              src={item.imageBase64}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Información */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">Talla: {item.size}</p>
              <p className="text-lg font-bold mt-2">${item.price}</p>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  updateQuantity(item.productId, item.size, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                className="h-8 w-8"
              >
                <Minus className="w-4 h-4" />
              </Button>

              <span className="w-12 text-center">{item.quantity}</span>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  updateQuantity(item.productId, item.size, item.quantity + 1)
                }
                className="h-8 w-8"
              >
                <Plus className="w-4 h-4" />
              </Button>

              <Button
                className="text-red-600 hover:bg-red-100 p-2 rounded"
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.productId, item.size)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
