import { useCart } from "@/paginas/components/CartProvider";

export const useLogout = () => {
  const { clearCart } = useCart();

  return () => {
    clearCart();
    localStorage.removeItem("jwt");
    localStorage.removeItem("rol");
    localStorage.removeItem("email");
    localStorage.removeItem("purchaseHistory");
    // Esto fuerza a App a re-renderizar y mostrar el Navbar correcto
    window.dispatchEvent(new Event("storage"));
  };
};
