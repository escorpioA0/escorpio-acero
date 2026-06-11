"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NuevoProducto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    cost_price: "",
    stock: "10",
    image_url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a slug from the name
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const { error } = await supabase
        .from("products")
        .insert([
          {
            name: formData.name,
            slug: slug,
            description: formData.description,
            price: parseFloat(formData.price),
            cost_price: parseFloat(formData.cost_price || "0"),
            stock: parseInt(formData.stock),
            image_url: formData.image_url || null,
            is_active: true
          }
        ]);

      if (error) throw error;
      
      router.push("/admin/productos");
      router.refresh();
    } catch (error: any) {
      console.error("Error al crear producto:", error);
      alert("Hubo un error al crear el producto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calcular margen
  const price = parseFloat(formData.price) || 0;
  const cost = parseFloat(formData.cost_price) || 0;
  const margin = price > 0 ? Math.round(((price - cost) / price) * 100) : 0;

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

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre del Producto</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Descripción</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Costo ($)</label>
                <input 
                  required
                  name="cost_price"
                  value={formData.cost_price}
                  onChange={handleChange}
                  type="number" 
                  step="0.01"
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Precio de Venta ($)</label>
                <input 
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="number" 
                  step="0.01"
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {price > 0 && (
              <div className="bg-zinc-50 p-3 rounded-md text-sm border border-zinc-100 flex justify-between">
                <span className="text-zinc-600">Margen de Ganancia Estimado:</span>
                <span className={`font-bold ${margin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {margin}%
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Stock Inicial</label>
                <input 
                  required
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  type="number" 
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">URL de la Imagen (Opcional)</label>
                <input 
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  type="text" 
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              disabled={loading}
              type="submit" 
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
