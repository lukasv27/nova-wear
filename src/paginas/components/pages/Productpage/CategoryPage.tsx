import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/api/service/ProductService";
import Navbar from "../../NavBar";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/paginas/components/CartProvider"; // ✅ Importa tu context

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  size: string;
  imageBase64: string;
}

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const sizes = ["S", "M", "L", "XL"];
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>(
    {}
  );

  const { addToCart } = useCart(); // ✅ Obtener función para agregar al carrito
  const navigate = useNavigate(); // para navegar al carrito si quieres

  useEffect(() => {
    const loadProducts = async () => {
      const res = await getAllProducts();
      const filtered = res.data.filter(
        (p: Product) => p.category.toLowerCase() === categoryName?.toLowerCase()
      );
      setProducts(filtered);

      // Inicializar tallas por defecto
      const initialSizes: { [key: number]: string } = {};
      filtered.forEach((p) => {
        initialSizes[p.id] = p.size;
      });
      setSelectedSizes(initialSizes);
    };
    loadProducts();
  }, [categoryName]);

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageBase64: product.imageBase64,
      size: selectedSizes[product.id] || product.size,
      quantity: 1,
    });

    console.log(
      `Agregado al carrito: ${product.name}, talla: ${
        selectedSizes[product.id] || product.size
      }`
    );
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded p-4">
            <img
              src={p.imageBase64}
              alt={p.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold">Marca: {p.name}</h3>
            <p>Precio: ${p.price}</p>

            {/* Dropdown de tallas */}
            <label className="mr-2 font-medium">Selecciona talla:</label>
            <select
              value={selectedSizes[p.id] || p.size}
              onChange={(e) => handleSizeChange(p.id, e.target.value)}
              className="custome-select"
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            {/* Botón Comprar */}
            <Button
              onClick={() => handleAddToCart(p)}
              className="mt-5 border p-1 rounded w-full"
            >
              <ShoppingCart className="mr-2" />
              Agregar a carrito
            </Button>
          </div>
        ))}

        {products.length === 0 && <p>No hay productos en esta categoría.</p>}
      </div>
    </div>
  );
}
