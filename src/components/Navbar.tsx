"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Mobile Menu */}
          <button className="md:hidden text-foreground hover:text-primary transition-colors">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                ESCORPIO ACERO
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Inicio</Link>
            <Link href="/#coleccion" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Catálogo</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button className="text-foreground hover:text-primary transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <Link href="/admin/login" className="text-foreground hover:text-primary transition-colors hidden sm:block">
              <User size={20} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
