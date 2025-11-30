// src/pages/AddProductPage.tsx
import { useState, useEffect } from "react";
import ProductForm from "../../ProductForm";
import ProductTable from "../../ProductTable";
import type { Product } from "@/api/service/ProductService";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "@/api/service/ProductService";

export default function AddProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar todos los productos
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts(); // ✅ usando JWT
      setProducts(data);
    } catch (err) {
      console.error("Error cargando productos:", err);
      alert("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (id: number | null, formData: FormData) => {
    try {
      if (id) {
        await updateProduct(id, formData);
        alert("Producto actualizado 🎉");
      } else {
        await createProduct(formData);
        alert("Producto agregado 🎉");
      }
      setEditingProduct(null);
      await loadProducts(); // refresca la tabla
    } catch (err) {
      console.error("Error al guardar producto:", err);
      alert("No se pudo guardar el producto");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await deleteProduct(id);
      alert("Producto eliminado ✅");
      await loadProducts(); // refresca la tabla
    } catch (err) {
      console.error("Error eliminando producto:", err);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel de administrador</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <ProductForm
            initialData={editingProduct ?? undefined}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="lg:w-2/3">
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <ProductTable
              products={products}
              onEdit={(product) => setEditingProduct(product)}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
