import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-serif tracking-tight">Dashboard</h1>
      
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales (Mes)</CardTitle>
            <DollarSign className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250,000</div>
            <p className="text-xs text-foreground/50">+20.1% respecto al mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Nuevos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+150</div>
            <p className="text-xs text-foreground/50">+15% respecto al mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
            <Package className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">345</div>
            <p className="text-xs text-foreground/50">21 bajos en stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
            <TrendingUp className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-foreground/50">+1.2% respecto al mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Gráfico (Mockup) */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Resumen de Ventas (Últimos 7 días)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full bg-black/5 rounded-md flex items-end justify-between p-4 gap-2">
              {/* Barras de mock */}
              {[40, 60, 45, 80, 50, 90, 75].map((height, i) => (
                <div key={i} className="w-full bg-primary/80 rounded-t-sm" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-foreground/50 px-4">
              <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
            </div>
          </CardContent>
        </Card>

        {/* Últimos Pedidos */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Últimos Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { id: "1024", name: "María Gómez", email: "maria@example.com", amount: 45000, status: "Pagado" },
                { id: "1025", name: "Juan Pérez", email: "juan@example.com", amount: 15000, status: "Pendiente" },
                { id: "1026", name: "Ana Martínez", email: "ana@example.com", amount: 82000, status: "Enviado" },
                { id: "1027", name: "Lucas López", email: "lucas@example.com", amount: 22000, status: "Pagado" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.name}</p>
                    <p className="text-sm text-foreground/50">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${order.amount.toLocaleString("es-AR")}</p>
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 inline-block
                      ${order.status === 'Pagado' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Enviado' ? 'bg-blue-100 text-blue-700' : 
                        'bg-yellow-100 text-yellow-700'}`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
