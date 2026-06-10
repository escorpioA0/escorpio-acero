import Link from "next/link"
import { ShoppingBag, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú</span>
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-xl font-bold tracking-tight text-primary">
              Escorpio Acero
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Inicio</Link>
          <Link href="/catalogo" className="transition-colors hover:text-primary">Catálogo</Link>
          <Link href="/nosotros" className="transition-colors hover:text-primary">Nosotros</Link>
          <Link href="/contacto" className="transition-colors hover:text-primary">Contacto</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
              0
            </span>
            <span className="sr-only">Carrito</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
