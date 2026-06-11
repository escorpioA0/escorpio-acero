import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "./AddToCartButton";
import { notFound } from "next/navigation";

interface ProductoPageProps {
  params: {
    id: string;
  };
}

export default async function ProductoPage({ params }: ProductoPageProps) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("id", params.id)
    .single();

  if (error) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl text-red-500 mb-4">Error cargando producto</h1>
        <p className="text-zinc-600 bg-zinc-100 p-4 rounded-md inline-block text-left font-mono text-sm max-w-2xl overflow-auto">
          {JSON.stringify(error, null, 2)}
        </p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const category = product.categories?.name || "Categoría";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagen */}
          <div className="aspect-[4/5] bg-zinc-100 rounded-lg overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">Sin Imagen</div>
            )}
          </div>

          {/* Detalles */}
          <div className="flex flex-col justify-center">
            <span className="text-sm uppercase tracking-widest text-zinc-500 mb-2">{category}</span>
            <h1 className="text-3xl font-serif font-bold text-zinc-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-zinc-900 mb-6">${product.price}</p>
            
            <div className="prose prose-zinc mb-8">
              <p className="text-zinc-600">{product.description || "Un diseño elegante y atemporal para complementar tu estilo diario."}</p>
            </div>

            <div className="mb-8">
              <span className="text-sm text-zinc-500">
                Disponibilidad: <span className="font-medium text-green-600">En stock ({product.stock} disponibles)</span>
              </span>
            </div>

            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.image_url || ""
              }}
            />
            
            <div className="mt-8 space-y-4 text-sm text-zinc-500 border-t border-zinc-200 pt-6">
              <p>✓ Acero quirúrgico hipoalergénico 316L</p>
              <p>✓ Envíos a todo el país</p>
              <p>✓ Pagos seguros con Mercado Pago</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
