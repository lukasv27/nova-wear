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
import type { RegistroDTO } from "@/api/types";
import { registro } from "@/api/service/AuthService";
import { toast } from "sonner";
import { useState } from "react";

const UserRegister = () => {
  const form = useForm<RegistroDTO>({
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegistroDTO) => {
    setLoading(true);
    try {
      const persona = await registro(data);
      toast.success(`Usuario registrado: ${persona.email}`);
      form.reset(); // opcional: limpia el formulario
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
             hover:shadow-lg hover:scale-[1.01] animate-fadeSlideUp" // animacion para que se vea mas pro y se mueva la card de registro
        >
          {/* NOMBRE */}
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Tus nombres" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* APELLIDOS */}
          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Tus Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONTRASEÑA */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* BOTÓN */}
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarme"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserRegister;
