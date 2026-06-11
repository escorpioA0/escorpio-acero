"use client";

import { useCartStore } from "@/lib/store";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full py-4 rounded-lg font-bold transition-all flex justify-center items-center gap-2 ${
        added 
          ? "bg-green-500 text-white" 
          : "bg-primary text-white hover:bg-primary/90"
      }`}
    >
      {added ? (
        "¡Agregado al Carrito!"
      ) : (
        <>
          <ShoppingBag size={20} />
          Agregar al Carrito
        </>
      )}
    </button>
  );
}
