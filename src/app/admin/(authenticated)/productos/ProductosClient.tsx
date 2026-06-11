"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProductosClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`*, categories (name)`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error al eliminar el producto.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-zinc-900">Productos</h1>
        <Link 
          href="/admin/productos/nuevo"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          + Nuevo Producto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            className="border border-zinc-300 rounded-md px-3 py-2 text-sm w-64 focus:outline-none focus:border-primary"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-500">
            <thead className="text-xs text-zinc-700 uppercase border-b border-zinc-200">
              <tr>
                <th className="px-6 py-3">Producto</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Costo</th>
                <th className="px-6 py-3">Precio Venta</th>
                <th className="px-6 py-3">Margen</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">Cargando productos...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">No hay productos registrados.</td>
                </tr>
              ) : (
                products.map(product => {
                  const price = product.price || 0;
                  const cost = product.cost_price || 0;
                  const margin = price > 0 ? Math.round(((price - cost) / price) * 100) : 0;

                  return (
                    <tr key={product.id} className="bg-white border-b border-zinc-100 hover:bg-zinc-50">
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        <div className="flex items-center gap-3">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                          ) : (
                            <div className="w-10 h-10 bg-zinc-200 rounded-md flex items-center justify-center text-xs">Sin img</div>
                          )}
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">{product.categories?.name || "-"}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">${cost}</td>
                      <td className="px-6 py-4">${price}</td>
                      <td className={`px-6 py-4 ${margin > 0 ? 'text-green-600' : 'text-red-600'}`}>{margin}%</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:underline mr-3">Editar</button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">Eliminar</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
