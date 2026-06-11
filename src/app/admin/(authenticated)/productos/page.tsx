export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-zinc-900">Productos</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          + Nuevo Producto
        </button>
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
              {/* Dummy data for layout testing */}
              <tr className="bg-white border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-6 py-4 font-medium text-zinc-900">Anillo Minimalista</td>
                <td className="px-6 py-4">Anillos</td>
                <td className="px-6 py-4">15</td>
                <td className="px-6 py-4">$1,200</td>
                <td className="px-6 py-4">$3,500</td>
                <td className="px-6 py-4 text-green-600">65%</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:underline mr-3">Editar</button>
                  <button className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
