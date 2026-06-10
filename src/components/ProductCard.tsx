import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ProductCard({ id, name, price, category, imageUrl }: ProductCardProps) {
  return (
    <div className="group flex flex-col cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
        
        {/* Add to Cart Button (Appears on hover) */}
        <button className="absolute bottom-4 left-1/2 flex w-[80%] -translate-x-1/2 translate-y-4 items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-medium text-foreground opacity-0 shadow-lg transition-all duration-300 hover:bg-primary hover:text-white group-hover:translate-y-0 group-hover:opacity-100">
          <ShoppingBag size={16} />
          Agregar
        </button>
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-wider text-foreground/60 mb-1">{category}</span>
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">{name}</h3>
        <p className="mt-2 text-sm font-semibold text-foreground">${price.toLocaleString('es-AR')}</p>
      </div>
    </div>
  );
}
