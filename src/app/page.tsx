import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

// Datos de prueba (hasta que conectemos Supabase para los productos)
const mockProducts = [
  {
    id: "1",
    name: "Pulsera Estrellas y Luna",
    price: 15500,
    category: "Pulseras",
    imageUrl: "/product_bracelet_1781134047510.png"
  },
  {
    id: "2",
    name: "Argollas Clásicas Plata",
    price: 9800,
    category: "Aros",
    imageUrl: "/product_ring_1781134056270.png"
  },
  {
    id: "3",
    name: "Cadena Eslabón Fino",
    price: 12000,
    category: "Cadenas",
    // Usamos la misma imagen generada o una diferente temporalmente
    imageUrl: "/hero_jewelry_bg_1781134036685.png"
  },
  {
    id: "4",
    name: "Anillo Ajustable Brillo",
    price: 8500,
    category: "Anillos",
    imageUrl: "/product_ring_1781134056270.png"
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Colección Destacada */}
        <section id="coleccion" className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-foreground/50 mb-2">Descubre</span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Nuestros Favoritos
            </h2>
            <div className="mt-4 h-0.5 w-16 bg-primary opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <button className="border border-foreground px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-white">
              Ver Todo el Catálogo
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
