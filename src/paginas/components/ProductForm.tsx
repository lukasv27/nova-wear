import { useState, useEffect } from "react";

interface ProductFormProps {
  initialData?: {
    id?: number;
    name?: string;
    price?: string;
    category?: string;
    sizes?: string[];
    imageBase64?: string;
  };
  onSubmit: (id: number | null, formData: FormData) => void;
}

const categories = ["Camisetas", "Accesorios", "Calzado", "Pantalones"];
const sizesList = ["S", "M", "L", "XL", "XXL"];

export default function ProductForm({
  initialData,
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes || []);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialData?.imageBase64 || null);

  useEffect(() => {
    setName(initialData?.name || "");
    setPrice(initialData?.price || "");
    setCategory(initialData?.category || "");
    setSizes(initialData?.sizes || []);
    setPreview(initialData?.imageBase64 || null);
    setImageFile(null);
  }, [initialData]);

  const handleSizeChange = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    sizes.forEach((s) => formData.append("sizes", s));
    if (imageFile) formData.append("image", imageFile);

    onSubmit(initialData?.id || null, formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-xl shadow flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold">
        {initialData?.id ? "Editar Producto" : "Agregar Producto"}
      </h2>
      <input
        placeholder="Marca"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Selecciona categoría</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="flex gap-2 flex-wrap">
        {sizesList.map((s) => (
          <label key={s} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={sizes.includes(s)}
              onChange={() => handleSizeChange(s)}
            />
            {s}
          </label>
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
          }
        }}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-48 object-cover rounded"
        />
      )}

      <button
        type="submit"
        className={`p-2 rounded text-white ${
          initialData?.id ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600"
        }`}
      >
        {initialData?.id ? "Guardar Cambios" : "Agregar Producto"}
      </button>
    </form>
  );
}
