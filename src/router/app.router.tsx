import AdminLayout from "@/paginas/components/layouts/AdminLayout";
import PublicLayout from "@/paginas/components/layouts/PublicLayout"; // Layout público con Navbar
import AuthLayout from "@/paginas/components/layouts/AuthLayout";

import LoginPage from "@/paginas/components/pages/login/LoginPage";
import LoginForm from "@/paginas/components/pages/login/LoginForm";
import UserRegister from "@/paginas/components/pages/userRegister/UserSignup";
import HomePage from "@/paginas/components/pages/homepage/HomePage";
import ProductsPage from "@/paginas/components/pages/Productpage/ProductsPage";
import CategoryPage from "@/paginas/components/pages/Productpage/CategoryPage";
import ShoppingCartPage from "@/paginas/components/pages/shoppingcart/ShoppingCartPage";
import PurchareHistory from "@/paginas/components/pages/purcharehistorypage/PurchareHistory";
import AdminProductsPage from "@/paginas/components/pages/addproductspage/AddProductsPage";

import { createBrowserRouter } from "react-router";
import PrivateRoute from "@/paginas/components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "login",
        element: <LoginPage />,
        children: [{ index: true, element: <LoginForm /> }],
      },
      { path: "registro", element: <UserRegister /> },
      { path: "productos", element: <ProductsPage /> },
      { path: "category/:categoryName", element: <CategoryPage /> },
      {
        path: "shoppingcart",
        element: <ShoppingCartPage />,
      },
      {
        path: "historial",
        element: (
          <PrivateRoute>
            <PurchareHistory />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/admin/products",
    element: (
      <PrivateRoute allowedRoles={["ADMINISTRADOR"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminProductsPage /> },
      { path: "productos", element: <AdminProductsPage /> },
    ],
  },

  {
    path: "/auth", // rutas de login/registro sin Navbar
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "registro", element: <UserRegister /> },
    ],
  },
]);
