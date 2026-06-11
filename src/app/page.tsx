import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

import { supabase } from "@/lib/supabase";

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`*, categories (name)`)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);
    
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const products = await getProducts();

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
            {products.length === 0 ? (
              <p className="col-span-full text-center text-zinc-500">No hay productos disponibles por el momento.</p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  category={product.categories?.name || "Sin categoría"}
                  imageUrl={product.image_url || "/hero_jewelry_bg_1781134036685.png"}
                />
              ))
            )}
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
