import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import CategoryPage from "@/paginas/components/pages/Productpage/CategoryPage"; // ajusta la ruta según tu estructura

// Mocks de servicios
const mockGetAllProducts = vi.fn();
const mockGetPublicProductsByCategory = vi.fn();

vi.mock("@/api/service/ProductService", () => ({
  getAllProducts: () => mockGetAllProducts(),
  getPublicProductsByCategory: (cat: string) =>
    mockGetPublicProductsByCategory(cat),
}));

// Mock de ProductCard para simplificar render
vi.mock("@/paginas/components/ProductCard", () => ({
  default: ({ name }: { name: string }) => <div>{name}</div>,
}));

describe("CategoryPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza categoría inicial 'Todos' y mensaje vacío", async () => {
    mockGetAllProducts.mockResolvedValueOnce([]); // siempre devolver array
    render(<CategoryPage />);
    // Buscar el heading en vez de getByText para evitar ambigüedad
    expect(screen.getByRole("heading", { name: "Todos" })).toBeInTheDocument();
    expect(
      await screen.findByText("No hay productos en esta categoría.")
    ).toBeInTheDocument();
  });

  test("modo cliente: carga todos los productos cuando categoría es 'Todos'", async () => {
    mockGetAllProducts.mockResolvedValueOnce([
      {
        id: 1,
        name: "Gorra",
        price: "10000",
        category: "Accesorios",
        sizes: [],
        imageBase64: "",
      },
    ]);
    render(<CategoryPage />);
    expect(await screen.findByText("Gorra")).toBeInTheDocument();
    expect(mockGetAllProducts).toHaveBeenCalled();
  });

  test("modo cliente: carga productos por categoría específica", async () => {
    mockGetPublicProductsByCategory.mockResolvedValueOnce([
      {
        id: 2,
        name: "Zapatillas",
        price: "50000",
        category: "Calzado",
        sizes: ["M"],
        imageBase64: "",
      },
    ]);
    render(<CategoryPage />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Calzado" },
    });
    expect(await screen.findByText("Zapatillas")).toBeInTheDocument();
    expect(mockGetPublicProductsByCategory).toHaveBeenCalledWith("Calzado");
  });

  test("modo admin: carga todos los productos y filtra por categoría", async () => {
    mockGetAllProducts.mockResolvedValue([
      {
        id: 3,
        name: "Polera",
        price: "15000",
        category: "Camisetas",
        sizes: ["S"],
        imageBase64: "",
      },
      {
        id: 4,
        name: "Pantalón",
        price: "20000",
        category: "Pantalones",
        sizes: ["M"],
        imageBase64: "",
      },
    ]);
    render(<CategoryPage isAdmin />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Camisetas" },
    });

    expect(await screen.findByText("Polera")).toBeInTheDocument();
    expect(screen.queryByText("Pantalón")).not.toBeInTheDocument();
    expect(mockGetAllProducts).toHaveBeenCalled();
  });
});
