import { useMemo, useState, useEffect, useContext } from "react";
import { CartContext } from "@/hooks/useCartContext";
import type { CartItem } from "@/hooks/useCartContext";

interface Props {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Agregar al carrito
  const addToCart = (item: CartItem) => {
    let isElementInCart = false;
    cart.forEach((element) => {
      if (element.productId === item.productId) {
        isElementInCart = true;
      }
    });

    if (!isElementInCart) {
      setCart((items) => [...items, item]);
    } else {
      cart.forEach((element) => {
        if (element.productId === item.productId) {
          element.quantity += item.quantity;
        }
      });
      setCart((items) => [...items]);
    }
  };

  // Eliminar del carrito
  const removeFromCart = (productId: number, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      )
    );
  };

  // Actualizar cantidad
  const updateQuantity = (productId: number, size: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Total del carrito
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // Guardar en localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Memoizar el value
  const value = useMemo(
    () => ({
      clearCart,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      total,
    }),
    [cart, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};
