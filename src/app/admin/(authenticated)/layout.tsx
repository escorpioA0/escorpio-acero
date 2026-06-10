import Link from "next/link"
import { Package, LayoutDashboard, Settings, ShoppingCart, LogOut } from "lucide-react"

export default function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="font-serif text-xl font-bold text-primary">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/5 text-sm font-medium">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/5 text-sm font-medium">
            <Package className="w-4 h-4" /> Productos
          </Link>
          <Link href="/admin/pedidos" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/5 text-sm font-medium">
            <ShoppingCart className="w-4 h-4" /> Pedidos
          </Link>
          <Link href="/admin/configuracion" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/5 text-sm font-medium">
            <Settings className="w-4 h-4" /> Configuración
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 text-red-600 text-sm font-medium w-full transition-colors">
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="h-16 border-b border-border bg-card flex items-center px-6 justify-between md:hidden">
           <span className="font-serif text-lg font-bold text-primary">Admin Panel</span>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
