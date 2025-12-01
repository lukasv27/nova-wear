import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ProductForm from "@/paginas/components/ProductForm";

describe("ProductForm", () => {
  test("renderiza título 'Agregar Producto' cuando no hay initialData", () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    // Verifica el título
    expect(
      screen.getByRole("heading", { name: "Agregar Producto" })
    ).toBeInTheDocument();

    // Verifica el botón
    expect(
      screen.getByRole("button", { name: "Agregar Producto" })
    ).toBeInTheDocument();
  });

  test("renderiza título 'Editar Producto' cuando hay initialData", () => {
    const mockOnSubmit = vi.fn();
    render(
      <ProductForm
        onSubmit={mockOnSubmit}
        initialData={{
          id: 1,
          name: "Polera",
          price: "15000",
          category: "Camisetas",
          sizes: ["M"],
        }}
      />
    );
    expect(screen.getByText("Editar Producto")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Guardar Cambios" })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Polera")).toBeInTheDocument();
    expect(screen.getByDisplayValue("15000")).toBeInTheDocument();
  });

  test("permite ingresar datos y enviar el formulario", () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Marca"), {
      target: { value: "Zapatillas" },
    });
    fireEvent.change(screen.getByPlaceholderText("Precio"), {
      target: { value: "50000" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Calzado" },
    });
    fireEvent.click(screen.getByLabelText("M")); // seleccionar talla M

    // Enviar usando el botón
    fireEvent.click(screen.getByRole("button", { name: "Agregar Producto" }));

    expect(mockOnSubmit).toHaveBeenCalled();

    const [id, formData] = mockOnSubmit.mock.calls[0];
    expect(id).toBeNull();
    expect(formData.get("name")).toBe("Zapatillas");
    expect(formData.get("price")).toBe("50000");
    expect(formData.get("category")).toBe("Calzado");
    expect(formData.getAll("sizes")).toContain("M");
  });

  test("muestra preview al subir imagen", async () => {
    const mockOnSubmit = vi.fn();
    const { container } = render(<ProductForm onSubmit={mockOnSubmit} />);
    const file = new File(["dummy"], "test.png", { type: "image/png" });

    // Seleccionamos directamente el input file
    const fileInput = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Esperamos que aparezca el preview
    expect(await screen.findByAltText("Preview")).toBeInTheDocument();
  });
});
