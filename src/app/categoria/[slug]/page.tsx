import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

// We set revalidate to 0 so it fetches fresh data (like stock) on every load
export const revalidate = 0;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 1. Get category details
  const { data: category } = await supabase
    .from("categories")
    .select("id, name, description")
    .eq("slug", slug)
    .single();

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-zinc-900 mb-4">Categoría no encontrada</h1>
        <p className="text-zinc-600 mb-8">Parece que la categoría que buscas no existe o fue eliminada.</p>
        <Link href="/" className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  // 2. Get active products in this category
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 tracking-tight mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-zinc-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-zinc-200">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">No hay productos aquí</h3>
            <p className="text-zinc-500">Pronto agregaremos nuevos tesoros a esta colección.</p>
          </div>
        )}
      </div>
    </div>
  );
}
