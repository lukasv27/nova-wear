import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/Productpage/ProductsPage";
import ShoppingCartPage from "./pages/shoppingcart/ShoppingCartPage";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/products/:categoryName" element={<ProductsPage />} />
      <Route path="/shoppingcart" element={<ShoppingCartPage />} />
    </Routes>
  );
}
