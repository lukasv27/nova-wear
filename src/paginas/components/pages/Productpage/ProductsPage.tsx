import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPublicProducts,
  getPublicProductsByCategory,
} from "@/api/service/ProductService";
import ProductCard from "../../ProductCard";
import type { Product } from "@/api/service/ProductService";

export default function ProductsPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = categoryName
          ? await getPublicProductsByCategory(categoryName)
          : await getPublicProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  if (loading) return <p className="p-10">Cargando productos...</p>;

  return (
    <div className="p-10">
      <h1 className="tborder p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col mb-6">
        Categoría: {categoryName || "Todos los productos"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              imageBase64={p.imageBase64}
              name={p.name}
              price={p.price}
              category={p.category}
              sizes={p.sizes}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No hay productos en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
}
