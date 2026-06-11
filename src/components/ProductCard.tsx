"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ProductCard({ id, name, price, category, imageUrl }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      imageUrl,
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden bg-white">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
        {/* Placeholder para imagen */}
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Botón rápido de agregar */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          className="absolute z-10 bottom-4 right-4 flex h-10 w-10 translate-y-12 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 hover:bg-primary/90 group-hover:translate-y-0 group-hover:opacity-100 shadow-md cursor-pointer"
          aria-label="Agregar al carrito"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="mt-4 flex flex-col flex-1">
        <span className="text-xs text-foreground/50">{category}</span>
        <h3 className="mt-1 text-sm font-medium text-foreground line-clamp-1">
          <Link href={`/producto/${id}`}>
            <span aria-hidden="true" className="absolute inset-0 z-0" />
            {name}
          </Link>
        </h3>
        <p className="mt-2 text-sm font-bold text-foreground">${price}</p>
      </div>
    </div>
  );
}
