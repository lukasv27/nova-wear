import AdminLayout from "@/paginas/components/layouts/AdminLayout";
import PublicLayout from "@/paginas/components/layouts/PublicLayout";
import AuthLayout from "@/paginas/components/layouts/AuthLayout";

import LoginForm from "@/paginas/components/pages/login/LoginForm";
import UserRegister from "@/paginas/components/pages/userRegister/UserSignup";
import HomePage from "@/paginas/components/pages/homepage/HomePage";
import ProductsPage from "@/paginas/components/pages/Productpage/ProductsPage";
import CategoryPage from "@/paginas/components/pages/Productpage/CategoryPage";
import ShoppingCartPage from "@/paginas/components/pages/shoppingcart/ShoppingCartPage";
import PurchareHistory from "@/paginas/components/pages/purcharehistorypage/PurchareHistory";
import AddProductPage from "@/paginas/components/pages/addproductspage/AddProductsPage";

import { createBrowserRouter } from "react-router";
import LoginPage from "@/paginas/components/pages/login/LoginPage";

export const router = createBrowserRouter([
  // RUTAS PÚBLICAS (Navbar cliente o admin según rol)
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "productos", element: <ProductsPage /> },
      { path: "category/:categoryName", element: <CategoryPage /> },
      { path: "shoppingcart", element: <ShoppingCartPage /> },
      { path: "historial", element: <PurchareHistory /> },
      { path: "login", element: <LoginForm /> },
      { path: "registro", element: <UserRegister /> },
    ],
  },

  // RUTAS ADMIN (solo admin, navbar admin)
  {
    path: "/administrador",
    element: <AdminLayout />,
    children: [{ index: true, element: <AddProductPage /> }],
  },

  // RUTAS DE AUTH (sin navbar)
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "registro", element: <UserRegister /> },
    ],
  },
]);
