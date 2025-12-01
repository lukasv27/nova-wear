import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import ProductCard from "@/paginas/components/ProductCard"; // ajusta la ruta según tu estructura

// Mocks
const mockAddToCart = vi.fn();
const mockIsAuthenticated = vi.fn();

vi.mock("@/paginas/components/CartProvider", () => ({
  useCart: () => ({ addToCart: mockAddToCart }),
}));

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ isAuthenticated: mockIsAuthenticated }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import { toast } from "sonner";

describe("ProductCard", () => {
  const defaultProps = {
    id: 1,
    imageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
    name: "Zapatillas",
    price: "50000",
    category: "Calzado",
    sizes: ["M", "L"],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza nombre, precio, categoría e imagen", () => {
    mockIsAuthenticated.mockReturnValue(true);
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText("Zapatillas")).toBeInTheDocument();
    expect(screen.getByText("Precio: $50000")).toBeInTheDocument();
    expect(screen.getByText("Categoría: Calzado")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Zapatillas" })).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("cuando no está autenticado, muestra toast.error y no agrega al carrito", () => {
    mockIsAuthenticated.mockReturnValue(false);
    render(<ProductCard {...defaultProps} />);
    const button = screen.getByRole("button", {
      name: /Inicia sesión para agregar/i,
    });

    fireEvent.click(button);

    expect(toast.error).toHaveBeenCalledWith(
      "Debes iniciar sesión para agregar productos al carrito"
    );
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  test("cuando está autenticado, agrega producto al carrito y muestra toast.success", () => {
    mockIsAuthenticated.mockReturnValue(true);
    render(<ProductCard {...defaultProps} />);
    const button = screen.getByRole("button", { name: /Agregar/i });

    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith({
      productId: 1,
      name: "Zapatillas",
      price: "50000",
      size: "M", // talla inicial seleccionada
      quantity: 1,
      imageBase64: defaultProps.imageBase64,
    });
    expect(toast.success).toHaveBeenCalledWith("Producto agregado al carrito");
  });

  test("permite cambiar la talla seleccionada", () => {
    mockIsAuthenticated.mockReturnValue(true);
    render(<ProductCard {...defaultProps} />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "L" } });
    fireEvent.click(screen.getByRole("button", { name: /Agregar/i }));

    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({ size: "L" })
    );
  });
});
