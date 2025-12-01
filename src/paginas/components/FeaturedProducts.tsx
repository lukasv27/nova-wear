import { getPublicProducts, type Product } from "@/api/service/ProductService";
import ProductCard from "./ProductCard";

import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // todos los productos
        const data = await getPublicProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos nuevos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="p-10">Cargando productos nuevos...</p>;

  return (
    <section id="productos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Productos nuevos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Las mejores piezas estan en nuestra colección. Estilo único que
            refleja tu personalidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* limita a 4 productos y los mas recientes */}
          {[...products]
            .sort((a, b) => b.id - a.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                imageBase64={p.imageBase64}
                name={p.name}
                price={p.price}
                category={p.category}
                sizes={p.sizes}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
