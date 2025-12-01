import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import UserRegister from "@/paginas/components/pages/userRegister/UserSignup"; // ajusta la ruta según tu estructura

// Mock del servicio de registro
vi.mock("@/api/service/AuthService", () => ({
  registro: vi.fn(),
}));

// Mock de toast
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import { registro } from "@/api/service/AuthService";
import { toast } from "sonner";

describe("UserRegister", () => {
  test("renderiza los campos del formulario", () => {
    render(<UserRegister />);
    expect(screen.getByPlaceholderText("Tus nombres")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tus Apellidos")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("email@ejemplo.com")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Registrarme/i })
    ).toBeInTheDocument();
  });

  test("flujo exitoso: llama a registro y muestra toast.success", async () => {
    (registro as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      email: "nuevo@ejemplo.com",
    });

    render(<UserRegister />);

    fireEvent.change(screen.getByPlaceholderText("Tus nombres"), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tus Apellidos"), {
      target: { value: "Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("email@ejemplo.com"), {
      target: { value: "nuevo@ejemplo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("********"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Registrarme/i }));

    await waitFor(() => {
      expect(registro).toHaveBeenCalledWith({
        nombre: "Juan",
        apellido: "Pérez",
        email: "nuevo@ejemplo.com",
        password: "123456",
      });
      expect(toast.success).toHaveBeenCalledWith(
        "Usuario registrado: nuevo@ejemplo.com"
      );
    });
  });

  test("flujo de error: muestra toast.error si registro falla", async () => {
    (registro as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Error al registrar")
    );

    render(<UserRegister />);

    fireEvent.change(screen.getByPlaceholderText("Tus nombres"), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tus Apellidos"), {
      target: { value: "Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("email@ejemplo.com"), {
      target: { value: "fallo@ejemplo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("********"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Registrarme/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error al registrar");
    });
  });
});
