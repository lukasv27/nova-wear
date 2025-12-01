import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ShoppingCartPage from "@/paginas/components/pages/shoppingcart/ShoppingCartPage";
import { useCart } from "@/paginas/components/CartProvider";

// Mock del hook useCart
vi.mock("@/paginas/components/CartProvider", () => ({
  useCart: vi.fn(),
}));

describe("ShoppingCartPage", () => {
  test("muestra CartEmpty cuando el carrito está vacío", () => {
    // Configuramos el mock para devolver un carrito vacío
    (
      useCart as unknown as {
        mockReturnValue(arg0: { cart: never[] }): unknown;
        (): { cart: any[] };
      }
    ).mockReturnValue({ cart: [] });

    render(<ShoppingCartPage />);
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  test("muestra CartItems y CartSummary cuando hay productos", () => {
    // Configuramos el mock para devolver un carrito con un producto
    (
      useCart as unknown as {
        mockReturnValue(arg0: {
          cart: {
            id: number;
            name: string;
            price: number;
            category: string;
            sizes: string[];
            imageBase64: null;
          }[];
        }): unknown;
        (): { cart: any[] };
      }
    ).mockReturnValue({
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
    expect(screen.getByText("Zapatillas")).toBeInTheDocument();
  });
});
