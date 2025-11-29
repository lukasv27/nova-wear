import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  imageBase64: string;
  name: string;
  price: string;
  category: string;
  size: string;
}

const ProductCard = ({ imageBase64, name, price, category, size }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <img src={imageBase64} alt={name} className="w-full h-64 object-cover rounded" />
      <h3 className="mt-2 text-lg font-bold"> {name}</h3>
      <p className="text-gray-500">Precio: {price}</p>
      <p className="text-gray-500">Categoria: {category}</p>
      <p className="text-black-500">Talla: {size}</p>
      <div className="mt-4 flex justify-between items-center">
        <Button onClick={() => setIsFavorite(!isFavorite)}>
          <Heart className={isFavorite ? "text-red-500" : "text-gray-400"} />
        </Button>
        <Button>
          <ShoppingCart className="mr-2" />
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
