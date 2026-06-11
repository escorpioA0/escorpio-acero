"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import CartDrawer from "./CartDrawer";
import { createClient } from "@/lib/supabase-browser";

export default function Navbar() {
  const supabase = createClient();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());
  const [storeName, setStoreName] = useState("ESCORPIO ACERO");
  const [logoUrl, setLogoUrl] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, catsRes] = await Promise.all([
        supabase.from("store_settings").select("store_name, logo_url").limit(1).single(),
        supabase.from("categories").select("id, name, slug").order("name")
      ]);
      
      if (settingsRes.data) {
        if (settingsRes.data.store_name) setStoreName(settingsRes.data.store_name.toUpperCase());
        if (settingsRes.data.logo_url) setLogoUrl(settingsRes.data.logo_url);
      }
      
      if (catsRes.data) {
        setCategories(catsRes.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
              {logoUrl && (
                <img src={logoUrl} alt={storeName} className="h-8 w-auto object-contain" />
              )}
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                {storeName}
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Inicio</Link>
            {categories.map(cat => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {cat.name}
              </Link>
            ))}
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
