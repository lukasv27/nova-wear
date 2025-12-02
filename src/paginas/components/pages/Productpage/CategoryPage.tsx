import { useEffect, useState } from "react";
import { useCart } from "../../CartProvider";
import {
  getPublicProductsByCategory,
  getAllProducts,
  type Product,
  getPublicProducts,
} from "@/api/service/ProductService";
import ProductCard from "@/paginas/components/ProductCard";

interface Props {
  isAdmin?: boolean;
}

const categories = [
  "Todos",
  "Accesorios",
  "Calzado",
  "Pantalones",
  "Camisetas",
];

export default function CategoryPage({ isAdmin = false }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let res: Product[] = [];

        if (isAdmin) {
          res = await getAllProducts();

          if (selectedCategory !== "Todos") {
            res = res.filter(
              (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
          }
        } else {
          if (selectedCategory === "Todos") {
            res = await getPublicProducts(); // ← ESTE ES EL CORRECTO
          } else {
            res = await getPublicProductsByCategory(selectedCategory);
          }
        }

        setProducts(res);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    loadProducts();
  }, [selectedCategory, isAdmin]);

  return (
    <div className="p-10">
      <div className="flex items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">{selectedCategory}</h1>

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
        {products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No hay productos en esta categoría.
          </p>
        )}

        {products.map((p) => (
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
  );
}
