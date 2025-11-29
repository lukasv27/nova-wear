import { createRoot } from "react-dom/client";
import { CartProvider } from "./paginas/components/CartProvider";
import "./index.css";

// ✅ Importación default, no 'type'
import WebApp from "./router/WebApp";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster richColors position="top-right" />
    <CartProvider>
      <WebApp />
    </CartProvider>
  </>
);
