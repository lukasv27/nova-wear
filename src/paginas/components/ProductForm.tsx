// src/paginas/components/ProductForm.tsx
import { useState, useEffect } from "react";

interface ProductFormProps {
  initialData?: {
    id?: number;
    name: string;
    price: string;
    category: string;
    size: string;
    imageBase64?: string;
  };
  onSubmit: (id: number | null, formData: FormData) => void;
}

const categories = ["Camisetas", "Accesorios", "Calzado", "Pantalones"];
const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [size, setSize] = useState(initialData?.size || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.imageBase64 || null);

  useEffect(() => {
    setName(initialData?.name || "");
    setPrice(initialData?.price || "");
    setCategory(initialData?.category || "");
    setSize(initialData?.size || "");
    setPreview(initialData?.imageBase64 || null);
    setImageFile(null);
  }, [initialData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("size", size);
    if (imageFile) formData.append("image", imageFile);

    onSubmit(initialData?.id || null, formData);
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 border rounded-xl shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold">{initialData?.id ? "Editar Producto" : "Agregar Producto"}</h2>

      <input placeholder="Marca" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} required />

      <select value={category} onChange={e => setCategory(e.target.value)} required>
        <option value="">Selecciona categoría</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <select value={size} onChange={e => setSize(e.target.value)} required>
        <option value="">Selecciona talla</option>
        {sizes.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {preview && <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />}

      <button
        type="submit"
        className={`p-2 rounded text-white focus ${initialData?.id ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {initialData?.id ? "Guardar Cambios" : "Agregar Producto"}
      </button>
    </form>
  );
}
