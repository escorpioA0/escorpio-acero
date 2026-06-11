"use client";

import { useCartStore } from "@/lib/store";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Evita errores de hidratación con Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <h2 className="text-lg font-serif font-bold text-zinc-900 flex items-center gap-2">
            <ShoppingBag size={20} />
            Tu Carrito
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Tu carrito está vacío.</p>
              <button 
                onClick={onClose}
                className="text-primary hover:underline text-sm font-medium"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-zinc-100 rounded-md overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">Sin img</div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-zinc-900 line-clamp-2">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-400 hover:text-red-500 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-zinc-900 mt-1">${item.price}</p>
                    
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center border border-zinc-200 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-500 hover:bg-zinc-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-500 hover:bg-zinc-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-100 bg-zinc-50">
            <div className="flex justify-between mb-4 text-zinc-900">
              <span className="font-medium">Total estimado</span>
              <span className="font-bold text-lg">${getCartTotal()}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={onClose}
              className="w-full block text-center bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Iniciar Pago
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
