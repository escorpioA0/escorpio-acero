"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { PackageOpen, Clock, Truck, CheckCircle, Search } from "lucide-react";

export default function PedidosClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Query orders with their items and the product details
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            id,
            quantity,
            unit_price,
            product_id,
            products (name)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", id);
      
      if (error) throw error;
      
      // Update local state
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error al actualizar el estado.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock size={12}/> Pendiente</span>;
      case 'cobrado':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={12}/> Cobrado</span>;
      case 'enviado':
        return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"><Truck size={12}/> Enviado</span>;
      case 'entregado':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={12}/> Entregado</span>;
      case 'cancelado':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Cancelado</span>;
      default:
        return <span className="bg-zinc-100 text-zinc-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{status}</span>;
    }
  };

  // Filtrado simple
  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.shipping_address && o.shipping_address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-zinc-900">Pedidos</h1>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por ID o dirección..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-zinc-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-500">
            <thead className="text-xs text-zinc-700 uppercase border-b border-zinc-200 bg-zinc-50">
              <tr>
                <th className="px-6 py-3">ID Pedido</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Dirección / Envío</th>
                <th className="px-6 py-3">Productos</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p>Cargando pedidos...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <PackageOpen size={32} className="text-zinc-300" />
                      <p className="text-lg">No hay pedidos registrados.</p>
                      <p className="text-sm">Las ventas que realices en el checkout aparecerán aquí.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const date = new Date(order.created_at).toLocaleDateString('es-AR', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'
                  });

                  return (
                    <tr key={order.id} className="bg-white border-b border-zinc-100 hover:bg-zinc-50">
                      <td className="px-6 py-4 font-mono text-xs text-zinc-900">
                        {order.id.split('-')[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{date}</td>
                      <td className="px-6 py-4">
                        <div className="max-w-[200px]">
                          <p className="font-medium text-zinc-900 truncate" title={order.shipping_address}>
                            {order.shipping_address}
                          </p>
                          <p className="text-xs mt-0.5">{order.shipping_method}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 max-h-20 overflow-y-auto pr-2">
                          {order.order_items?.map((item: any) => (
                            <div key={item.id} className="text-xs flex gap-1">
                              <span className="font-bold text-zinc-900">{item.quantity}x</span>
                              <span className="truncate" title={item.products?.name}>{item.products?.name || "Producto borrado"}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-zinc-900">
                        ${order.total_amount}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="text-xs border border-zinc-300 rounded px-2 py-1 bg-white hover:border-primary focus:outline-none focus:border-primary"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="cobrado">Cobrado</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
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
