import { BarChart3, TrendingUp, Users, Package } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-zinc-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-500">Ingresos Totales</h3>
            <span className="p-2 bg-primary/10 text-primary rounded-md"><TrendingUp size={16} /></span>
          </div>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-green-600 mt-1">+20.1% este mes</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-500">Pedidos Nuevos</h3>
            <span className="p-2 bg-primary/10 text-primary rounded-md"><BarChart3 size={16} /></span>
          </div>
          <div className="text-2xl font-bold">+235</div>
          <p className="text-xs text-green-600 mt-1">+15% este mes</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-500">Productos Activos</h3>
            <span className="p-2 bg-primary/10 text-primary rounded-md"><Package size={16} /></span>
          </div>
          <div className="text-2xl font-bold">124</div>
          <p className="text-xs text-zinc-500 mt-1">4 sin stock</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-zinc-500">Clientes</h3>
            <span className="p-2 bg-primary/10 text-primary rounded-md"><Users size={16} /></span>
          </div>
          <div className="text-2xl font-bold">892</div>
          <p className="text-xs text-green-600 mt-1">+12 nuevos esta semana</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-200">
          <h2 className="text-lg font-semibold text-zinc-900">Últimos Pedidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-500">
            <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-3">Pedido</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy data for now */}
              <tr className="bg-white border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-6 py-4 font-medium text-zinc-900">#ORD-001</td>
                <td className="px-6 py-4">María López</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pendiente</span></td>
                <td className="px-6 py-4">$12,500.00</td>
              </tr>
              <tr className="bg-white border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-6 py-4 font-medium text-zinc-900">#ORD-002</td>
                <td className="px-6 py-4">Juan Pérez</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Enviado</span></td>
                <td className="px-6 py-4">$4,200.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
