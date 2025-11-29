import { Card, CardContent } from "@/components/ui/card";
import { Shirt, ShoppingBag, Footprints, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Camisetas", icon: Shirt },
  { id: 2, name: "Accesorios", icon: ShoppingBag },
  { id: 3, name: "Calzado", icon: Footprints },
  { id: 4, name: "Pantalones", icon: Layers },
];

export default function Categories() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Categorías</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <Link key={cat.id} to={`/category/${cat.name}`}>
              <Card className="p-6 text-center hover:shadow-lg transition">
                <CardContent>
                  <Icon size={40} className="mx-auto mb-2" />
                  <h3 className="font-bold">{cat.name}</h3>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
