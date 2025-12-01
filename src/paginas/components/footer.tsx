import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // aqui se puedend agregar las categorias y se meustran en el footer atuomaticamente
  const categories = [
    "Todos",
    "Accesorios",
    "Calzado",
    "Pantalones",
    "Camisetas",
  ];

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-vibrant-pink via-vibrant-purple to-vibrant-orange bg-clip-text text-transparent mb-4 hover-grow">
              NOVAWEAR STORE
            </div>
            <p className="text-muted-foreground hover-fade">
              Tu destino para la moda juvenil más vibrante y atrevida.
            </p>
          </div>

          {/* Explora */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground hover-grow">
              Explora
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {categories.map((category) => {
                const path =
                  category.toLowerCase() === "todos"
                    ? "/productos"
                    : `/category/${category.toLowerCase()}`;
                return (
                  <li key={category}>
                    <Link
                      to={path}
                      className="text-muted-foreground hover:text-blue-500"
                    >
                      {category}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Conecta */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground hover-grow">
              Conecta
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  to="/home#contacto"
                  className="text-muted-foreground hover:text-blue-500"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  to="/shoppingcart"
                  className="text-muted-foreground hover:text-blue-500"
                >
                  Tu carrito
                </Link>
              </li>
              <li>
                <Link
                  to="/historial"
                  className="text-muted-foreground hover:text-blue-500"
                >
                  Historial de compras
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground hover-grow">
              Síguenos
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover-grow p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover-grow p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover-grow p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover-grow p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground hover-fade">
          <p>&copy; 2024 NovaWear Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
