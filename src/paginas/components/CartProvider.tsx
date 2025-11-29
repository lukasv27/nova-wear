import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "@/hooks/useCartContext";
import type { CartItem } from "@/hooks/useCartContext";

interface Props {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Agregar al carrito
  const addToCart = (item: CartItem) => {
    console.log("item es: ", item)    
    let isElementInCart = false;
    cart.forEach((element) => {
      if(element.productId === item.productId){
        isElementInCart = true;
      }
    })

    if(!isElementInCart){
      setCart((items) => [...items, item]);
    } else {
      cart.forEach((element) => {
        if(element.productId === item.productId){
          element.quantity = element.quantity + item.quantity;
        }
      })
      setCart((items) => [...items]);
    }
  };
  // esto permite que el carrito no se borre al reinicar la pagina
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  

  // Eliminar
  const removeFromCart = (productId: number, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  // Actualizar cantidad
  const updateQuantity = (productId: number, size: string, qty: number) => {
    if (qty < 1) return; // no permitir cantidad 0 o negativa
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // Total del carrito
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  useEffect(() => {
    console.log("El carrito actualizado:", cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};

