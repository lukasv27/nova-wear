import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: 1,
    imageBase64: product1,
    name: "Hoodie Vibrante",
    price: "$45.00",
    category: "Sudaderas",
    size: "L"
  },
  {
    id: 2,
    imageBase64: product2,
    name: "Chaqueta Denim Patches",
    price: "$68.00",
    category: "Chaquetas",
    size: "L"
  },
  {
    id: 3,
    imageBase64: product3,
    name: "Sneakers Multicolor",
    price: "$89.00",
    category: "Calzado",
    size: "L"
  },
  {
    id: 4,
    imageBase64: product4,
    name: "Camiseta Gradiente",
    price: "$32.00",
    category: "Camisetas",
    size: "L"
  },
];

const FeaturedProducts = () => {
  return (
    <section id="productos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Productos{""}
            <span className="bg-gradient-to-r from-vibrant-pink via-vibrant-purple to-vibrant-orange bg-clip-text text-transparent">
              Destacados
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Las piezas más populares de nuestra colección. Estilo único que refleja tu personalidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
