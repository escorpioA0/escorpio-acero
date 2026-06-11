"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function NuevoProducto() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-zinc-900">Nuevo Producto</h1>
        <button 
          onClick={() => router.back()}
          className="text-zinc-500 hover:text-zinc-900"
        >
          Volver
        </button>
      </div>

      <ProductForm />
    </div>
  );
}
