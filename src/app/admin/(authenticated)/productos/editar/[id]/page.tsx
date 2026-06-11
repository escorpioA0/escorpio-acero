import { supabase } from "@/lib/supabase";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditarProducto({ params }: { params: { id: string } }) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !product) {
    notFound();
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
