import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

export default function AdminProductsPage() {
  const MOCK_PRODUCTS = [
    { id: "1", name: "Aros Argolla Dorada", cost: 5000, price: 15000, stock: 45, category: "Aros" },
    { id: "2", name: "Cadena Eslabón Fino", cost: 8000, price: 22000, stock: 12, category: "Cadenas" },
    { id: "3", name: "Pulsera Minimalista", cost: 6000, price: 18000, stock: 3, category: "Pulseras" },
    { id: "4", name: "Anillo Sello Plata", cost: 4000, price: 12500, stock: 0, category: "Anillos" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-serif tracking-tight">Productos</h1>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" /> Nuevo Producto
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-border">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground/50" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 pl-9 text-sm placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-foreground/70 uppercase bg-black/5 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-medium">Nombre</th>
                  <th className="px-6 py-3 font-medium">Categoría</th>
                  <th className="px-6 py-3 font-medium text-right">Costo</th>
                  <th className="px-6 py-3 font-medium text-right">Precio Venta</th>
                  <th className="px-6 py-3 font-medium text-center">Margen</th>
                  <th className="px-6 py-3 font-medium text-center">Stock</th>
                  <th className="px-6 py-3 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PRODUCTS.map((product) => {
                  const marginPercent = Math.round(((product.price - product.cost) / product.price) * 100)
                  return (
                    <tr key={product.id} className="border-b border-border hover:bg-black/5">
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4 text-right">${product.cost.toLocaleString("es-AR")}</td>
                      <td className="px-6 py-4 text-right">${product.price.toLocaleString("es-AR")}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-green-600 font-medium">{marginPercent}%</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10 ? 'bg-green-100 text-green-700' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
