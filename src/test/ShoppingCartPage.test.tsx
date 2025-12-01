import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ShoppingCartPage from "@/paginas/components/pages/shoppingcart/ShoppingCartPage";

// Mock del hook useCart
vi.mock("@/paginas/components/CartProvider", () => ({
  useCart: vi.fn(),
}));

// Importamos el mock para poder configurarlo en cada test
import { useCart } from "@/paginas/components/CartProvider";

describe("ShoppingCartPage", () => {
  test("muestra CartEmpty cuando el carrito está vacío", () => {
    (useCart as vi.Mock).mockReturnValue({ cart: [] });

    render(<ShoppingCartPage />);

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  test("muestra CartItems y CartSummary cuando hay productos", () => {
    (useCart as vi.Mock).mockReturnValue({
      cart: [
        {
          id: 1,
          name: "Zapatillas",
          price: 50000,
          category: "Calzado",
          sizes: ["M"],
          imageBase64: null,
        },
      ],
    });

    render(<ShoppingCartPage />);

    // Verificamos que CartItems y CartSummary estén presentes
    expect(screen.getByText("Zapatillas")).toBeInTheDocument();
    expect(screen.getByText(/Resumen/i)).toBeInTheDocument(); // depende de cómo CartSummary renderice
  });
});
