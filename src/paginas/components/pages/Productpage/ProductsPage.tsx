import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router";
import axios from "axios";
import Navbar from "../../NavBar";

import ProductCard from "../../ProductCard";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  size: string;
  imageBase64: string;
}

export default function ProductsPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);



  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:8080/products");
        setProducts(response.data);

        // Inicializar talla seleccionada por defecto
        const initialSizes: { [key: number]: string } = {};
        response.data.forEach((p) => {
          initialSizes[p.id] = p.size || "S";
        });
        
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = categoryName
    ? products.filter((p) => p.category === categoryName)
    : products;

 

  if (loading) return <p className="p-10">Cargando productos...</p>;

  return (
    <div>
      
      <Outlet />

      <h1 className="tborder p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col">
        Categoría: {categoryName || "Todos los productos"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              imageBase64={p.imageBase64}
              name={p.name}
              price={p.price}
              category={p.category}
              size={p.size}
              
            />
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
