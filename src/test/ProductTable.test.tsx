import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ProductTable from "@/paginas/components/ProductTable"; // ajusta la ruta según tu estructura
import type { Product } from "@/api/service/ProductService";

describe("ProductTable", () => {
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "Zapatillas",
      price: "50000",
      category: "Calzado",
      sizes: ["M", "L"],
      imageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
    },
    {
      id: 2,
      name: "Polera",
      price: "15000",
      category: "Camisetas",
      sizes: ["S"],
      imageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA",
    },
  ];

  test("renderiza productos en la tabla", () => {
    const mockEdit = vi.fn();
    const mockDelete = vi.fn();

    render(
      <ProductTable
        products={sampleProducts}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    expect(screen.getByText("Zapatillas")).toBeInTheDocument();
    expect(screen.getByText("Polera")).toBeInTheDocument();
    expect(screen.getByText("Calzado")).toBeInTheDocument();
    expect(screen.getByText("Camisetas")).toBeInTheDocument();
    expect(screen.getByText("$50000")).toBeInTheDocument();
    expect(screen.getByText("$15000")).toBeInTheDocument();
    expect(screen.getByText("M, L")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
    expect(screen.getByAltText("Zapatillas")).toBeInTheDocument();
    expect(screen.getByAltText("Polera")).toBeInTheDocument();
  });

  test("llama a onEdit y onDelete al hacer click en los botones", () => {
    const mockEdit = vi.fn();
    const mockDelete = vi.fn();

    render(
      <ProductTable
        products={sampleProducts}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Editar" })[0]);
    expect(mockEdit).toHaveBeenCalledWith(sampleProducts[0]);

    fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[1]);
    expect(mockDelete).toHaveBeenCalledWith(sampleProducts[1].id);
  });

  test("muestra mensaje vacío cuando no hay productos", () => {
    const mockEdit = vi.fn();
    const mockDelete = vi.fn();

    render(
      <ProductTable products={[]} onEdit={mockEdit} onDelete={mockDelete} />
    );
    expect(
      screen.getByText("No hay productos que coincidan con la búsqueda.")
    ).toBeInTheDocument();
  });
});
