import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditarProducto({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl text-red-500 mb-4">Error cargando producto</h1>
        <p className="text-zinc-600 font-mono text-sm">{JSON.stringify(error)}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl text-red-500 mb-4">Producto no encontrado</h1>
        <p className="text-zinc-600">El ID {params.id} no existe en la base de datos.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-zinc-900">Editar Producto</h1>
        <Link 
          href="/admin/productos"
          className="text-zinc-500 hover:text-zinc-900"
        >
          Volver
        </Link>
      </div>

      <ProductForm initialData={product} />
    </div>
  );
}
