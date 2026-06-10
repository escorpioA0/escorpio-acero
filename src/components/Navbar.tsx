import Link from "next/link";
import { ShoppingCart, Menu, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Mobile Menu */}
        <button className="md:hidden text-foreground hover:text-primary transition-colors">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link href="/" className="flex items-center gap-2">
            {/* Si tienes el logo en PNG, se puede usar <Image> aquí */}
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
              ESCORPIO ACERO
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          <Link href="#aros" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Aros</Link>
          <Link href="#cadenas" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Cadenas y Dijes</Link>
          <Link href="#anillos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Anillos</Link>
          <Link href="#pulseras" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Pulseras</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button className="text-foreground hover:text-primary transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <button className="text-foreground hover:text-primary transition-colors hidden sm:block">
            <User size={20} />
          </button>
          <button className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingCart size={20} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
