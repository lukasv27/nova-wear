import Navbar from "../../NavBar";
import { useCart } from "../../CartProvider";

import CartSummary from "../../CartSummary";

import { Outlet } from "react-router";

import CartItems from "@/paginas/components/CartItems";
import CartEmpty from "@/paginas/components/CartEmpty";

const ShoppingCartPage = () => {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {cart.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
          <Outlet />
          <CartItems />
          <CartSummary />
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
