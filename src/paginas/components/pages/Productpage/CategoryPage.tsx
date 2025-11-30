// src/pages/CategoryPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCart } from "../../CartProvider";
import {
  getPublicProductsByCategory,
  getAllProducts,
  type Product,
} from "@/api/service/ProductService";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Props {
  isAdmin?: boolean; // ✅ opción para indicar si es admin
}

export default function CategoryPage({ isAdmin = false }: Props) {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>(
    {}
  );
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let res: Product[] = [];

        if (isAdmin) {
          // Admin ve todos los productos y filtramos por categoría
          res = await getAllProducts();
          if (categoryName) {
            res = res.filter(
              (p) => p.category.toLowerCase() === categoryName.toLowerCase()
            );
          }
        } else {
          // Cliente usa la ruta pública
          if (!categoryName) return;
          res = await getPublicProductsByCategory(categoryName);
        }

        setProducts(res);

        // Inicializar la talla seleccionada con la primera disponible
        const initialSizes: { [key: number]: string } = {};
        res.forEach((p) => {
          initialSizes[p.id] = p.sizes[0] || "";
        });
        setSelectedSizes(initialSizes);
      } catch (error) {
        console.error("Error cargando productos por categoría:", error);
      }
    };

    loadProducts();
  }, [categoryName, isAdmin]);

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageBase64: product.imageBase64,
      size: selectedSizes[product.id],
      quantity: 1,
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        {categoryName || "Todos los productos"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No hay productos en esta categoría.
          </p>
        )}

        {products.map((p) => (
          <div key={p.id} className="border rounded p-4 flex flex-col">
            <img
              src={p.imageBase64}
              alt={p.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold">{p.name}</h3>
            <p>Precio: ${p.price}</p>

            <label className="mr-2 font-medium mt-2">Selecciona talla:</label>
            <select
              value={selectedSizes[p.id]}
              onChange={(e) => handleSizeChange(p.id, e.target.value)}
              className="custome-select mb-4"
            >
              {p.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Button
              onClick={() => handleAddToCart(p)}
              className="mt-auto flex items-center justify-center gap-2"
            >
              <ShoppingCart />
              Agregar al carrito
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
