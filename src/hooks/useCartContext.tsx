import { createContext, useContext } from "react";

export interface CartItem {
  productId: number;
  name: string;
  price: string;
  size: string;
  quantity: number;
  imageBase64: string;
}

export interface CartContextType {
  cart: CartItem[];
  clearCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, qty: number) => void;
  total: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
