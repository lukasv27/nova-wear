import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Por favor ingresa un correo válido");
      return;
    }
    // limpiar el campo del correo
    toast.success(`¡Gracias por suscribirte, ${email}!`);
    setEmail("");
  };

  return (
    <section
      id="contacto"
      className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),0_-10px_15px_-3px_rgba(0,0,0,0.3)]"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-16 w-16 mx-auto mb-6 text-white" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            ¡Únete a Nuestra Comunidad!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Suscríbete y recibe las últimas tendencias, ofertas exclusivas y
            novedades directamente en tu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 h-12"
            />
            <Button
              onClick={handleSubscribe}
              className="bg-white text-vibrant-pink hover:bg-white/90 h-12 px-8"
            >
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
