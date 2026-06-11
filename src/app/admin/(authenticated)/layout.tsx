"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-zinc-200">
          <h2 className="font-serif text-xl font-bold text-primary">Escorpio Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${pathname === '/admin/dashboard' ? 'bg-zinc-100 text-primary' : 'text-zinc-700 hover:bg-zinc-100 hover:text-primary'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-100 text-zinc-700 hover:text-primary transition-colors">
            <Package size={18} /> Productos
          </Link>
          <Link href="/admin/pedidos" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-100 text-zinc-700 hover:text-primary transition-colors">
            <ShoppingCart size={18} /> Pedidos
          </Link>
          <Link href="/admin/configuracion" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-100 text-zinc-700 hover:text-primary transition-colors">
            <Settings size={18} /> Mi Tienda
          </Link>
        </nav>
        <div className="p-4 border-t border-zinc-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md hover:bg-red-50 text-red-600 transition-colors">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center px-6 md:hidden">
          <h2 className="font-serif text-xl font-bold text-primary">Escorpio Admin</h2>
        </header>
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
