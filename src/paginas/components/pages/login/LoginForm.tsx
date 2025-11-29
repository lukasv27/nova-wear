import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login as loginService } from "@/api/service/AuthService";
import type { LoginDTO } from "@/api/types";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const LoginForm = () => {
  const form = useForm<LoginDTO>({
    defaultValues: { email: "", password: "" },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); //  hook

  const onSubmit = async (data: LoginDTO) => {
    setLoading(true);
    try {
      const result = await loginService(data);
      // result debe ser { token, email, rol }

      // Guardar en useAuth
      login(result.token, result.rol, result.email);

      toast.success(`Bienvenido ${result.email} como ${result.rol}`);

      // Redirigir segun rol
      // roles admin y vendedor son provisorios por ahora, luego pongo las rutas reales
      if (result.rol === "CLIENTE") {
        navigate("/home");
      } else if (result.rol === "ADMINISTRADOR") {
        navigate("/administrador");
      } else if (result.rol === "VENDEDOR") {
        navigate("/ventas");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error("Error desconocido:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4 
             transition-transform transition-shadow duration-300 ease-in-out 
             hover:shadow-lg hover:scale-[1.01] animate-fadeSlideUp"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Tu contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
