import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import LoginForm from "@/paginas/components/pages/login/LoginForm"; // ajusta la ruta según tu estructura

// Mock de dependencias externas
vi.mock("@/api/service/AuthService", () => ({
  login: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

const mockLogin = vi.fn();
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import { login as loginService } from "@/api/service/AuthService";
import { toast } from "sonner";

describe("LoginForm", () => {
  test("renderiza los campos de email y contraseña", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("Ingresa tu email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tu contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Ingresar/i })
    ).toBeInTheDocument();
  });

  test("flujo exitoso: llama a loginService y useAuth.login", async () => {
    (loginService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      token: "fake-token",
      email: "test@example.com",
      rol: "CLIENTE",
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Ingresa tu email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

    await waitFor(() => {
      expect(loginService).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "123456",
      });
      expect(mockLogin).toHaveBeenCalledWith(
        "fake-token",
        "CLIENTE",
        "test@example.com"
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Bienvenido test@example.com como CLIENTE"
      );
    });
  });

  test("flujo de error: muestra toast.error si loginService falla", async () => {
    (loginService as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Credenciales inválidas")
    );

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Ingresa tu email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "badpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Credenciales inválidas");
    });
  });
});
