import type { Product } from "@/api/service/ProductService";
interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto border rounded-xl shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Imagen</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Categoría</th>
            <th className="p-3">Talla</th>
            <th className="p-3">Precio</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-3">
                <img
                  src={product.imageBase64}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-3 font-medium">{product.name}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">{product.sizes.join(", ")}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button
                  onClick={() => onEdit(product)}
                  className="mt-5 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="mt-5 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-5 text-gray-500">
                No hay productos que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
