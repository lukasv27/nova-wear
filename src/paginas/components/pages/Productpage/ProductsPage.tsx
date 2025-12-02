import { useEffect, useState } from "react";
import {
  getPublicProducts,
  getPublicProductsByCategory,
} from "@/api/service/ProductService";
import ProductCard from "../../ProductCard";
import type { Product } from "@/api/service/ProductService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Lista de categorías (puedes traerla de la API si quieres dinámico)
  const categories = [
    "todos",
    "Camisetas",
    "Pantalones",
    "Accesorios",
    "Calzado",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data =
          selectedCategory === "Todos"
            ? await getPublicProducts()
            : await getPublicProductsByCategory(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  if (loading) return <p className="p-10">Cargando productos...</p>;

  return (
    <div className="p-10">
      {/* Dropdown de categorías */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Selecciona categoría:</label>
        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

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
