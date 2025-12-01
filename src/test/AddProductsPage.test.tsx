import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AddProductPage from "@/paginas/components/pages/addproductspage/AddProductsPage";

// Mock de las funciones del servicio
vi.mock("@/api/service/ProductService", () => ({
  getAllProducts: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Zapatillas",
      price: 50000,
      category: "Calzado",
      imageBase64: "",
      sizes: ["M"],
    },
    {
      id: 2,
      name: "Polera",
      price: 15000,
      category: "Camisetas",
      imageBase64: "",
      sizes: ["S", "L"],
    },
  ]),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}));

describe("AddProductPage", () => {
  test("debe renderizar el título del panel", () => {
    render(<AddProductPage />);
    expect(screen.getByText("Panel de administrador")).toBeInTheDocument();
  });

  test("debe mostrar productos en la tabla después de cargarlos", async () => {
    render(<AddProductPage />);

    // Esperamos a que se carguen los productos mockeados
    await waitFor(() => {
      expect(screen.getByText("Zapatillas")).toBeInTheDocument();
      expect(screen.getByText("Polera")).toBeInTheDocument();
    });
  });

  test("debe mostrar mensaje de carga mientras se obtienen productos", async () => {
    render(<AddProductPage />);
    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();

    // Después de cargar, ya no debería estar
    await waitFor(() => {
      expect(
        screen.queryByText("Cargando productos...")
      ).not.toBeInTheDocument();
    });
  });
});
