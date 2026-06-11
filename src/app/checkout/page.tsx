"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Truck, Store, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Opciones de envío
  const [shippingMethod, setShippingMethod] = useState<"local" | "cercana" | "lejos">("local");
  
  // Costos de envío (se pueden guardar en Supabase después)
  const COSTO_PROVINCIA_CERCANA = 2500;
  const COSTO_OTRAS_PROVINCIAS = 5000;
  const MONTO_ENVIO_GRATIS_CERCANA = 30000; // Envío gratis superando este monto

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getCartTotal();
  
  let shippingCost = 0;
  if (shippingMethod === "cercana") {
    shippingCost = subtotal >= MONTO_ENVIO_GRATIS_CERCANA ? 0 : COSTO_PROVINCIA_CERCANA;
  } else if (shippingMethod === "lejos") {
    shippingCost = COSTO_OTRAS_PROVINCIAS;
  }

  const total = subtotal + shippingCost;

  const handleSimulatePayment = () => {
    // Simulamos la redirección a MercadoPago
    alert("Redirigiendo a MercadoPago (Simulado)...");
    
    // Al finalizar el pago, limpiamos el carrito y mandamos a una página de éxito
    clearCart();
    router.push("/");
    setTimeout(() => {
      alert("¡Pago exitoso! Gracias por tu compra.");
    }, 500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-serif font-bold text-zinc-900 mb-4">Tu carrito está vacío</h1>
        <Link href="/" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Header simple */}
      <header className="bg-white border-b border-zinc-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center">
          <Link href="/" className="flex items-center text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-medium">
            <ChevronLeft size={16} className="mr-1" />
            Volver a la tienda
          </Link>
          <div className="mx-auto font-serif text-xl font-bold tracking-tight text-primary">
            ESCORPIO ACERO
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Columna Izquierda - Formulario y Envío */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-zinc-900 mb-6">Información de Contacto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Correo electrónico</label>
                  <input type="email" placeholder="ejemplo@correo.com" className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:border-primary focus:outline-none" />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Truck size={20} className="text-primary" />
                Método de Entrega
              </h2>
              
              <div className="space-y-3">
                {/* Opcion 1: Retiro Local */}
                <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === "local" ? "border-primary bg-primary/5" : "border-zinc-200 hover:border-zinc-300"}`}>
                  <input 
                    type="radio" 
                    name="shipping" 
                    className="mt-1 mr-3 text-primary focus:ring-primary h-4 w-4"
                    checked={shippingMethod === "local"}
                    onChange={() => setShippingMethod("local")}
                  />
                  <div className="flex-1">
                    <span className="block font-medium text-zinc-900 flex items-center gap-2">
                      <Store size={16} /> Retiro en Local
                    </span>
                    <span className="block text-sm text-zinc-500 mt-1">Av. Falsa 123, CABA. Lunes a Viernes de 10 a 18hs.</span>
                  </div>
                  <span className="font-bold text-green-600">Gratis</span>
                </label>

                {/* Opcion 2: Provincia Cercana */}
                <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === "cercana" ? "border-primary bg-primary/5" : "border-zinc-200 hover:border-zinc-300"}`}>
                  <input 
                    type="radio" 
                    name="shipping" 
                    className="mt-1 mr-3 text-primary focus:ring-primary h-4 w-4"
                    checked={shippingMethod === "cercana"}
                    onChange={() => setShippingMethod("cercana")}
                  />
                  <div className="flex-1">
                    <span className="block font-medium text-zinc-900 flex items-center gap-2">
                      <MapPin size={16} /> Provincias Cercanas
                    </span>
                    <span className="block text-sm text-zinc-500 mt-1">Bs. As, Santa Fe, Córdoba.</span>
                    {subtotal < MONTO_ENVIO_GRATIS_CERCANA && (
                      <span className="block text-xs text-primary mt-1 font-medium">¡Suma ${MONTO_ENVIO_GRATIS_CERCANA - subtotal} más para envío gratis!</span>
                    )}
                  </div>
                  <span className="font-bold text-zinc-900">
                    {subtotal >= MONTO_ENVIO_GRATIS_CERCANA ? <span className="text-green-600">Gratis</span> : `$${COSTO_PROVINCIA_CERCANA}`}
                  </span>
                </label>

                {/* Opcion 3: Otras Provincias */}
                <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === "lejos" ? "border-primary bg-primary/5" : "border-zinc-200 hover:border-zinc-300"}`}>
                  <input 
                    type="radio" 
                    name="shipping" 
                    className="mt-1 mr-3 text-primary focus:ring-primary h-4 w-4"
                    checked={shippingMethod === "lejos"}
                    onChange={() => setShippingMethod("lejos")}
                  />
                  <div className="flex-1">
                    <span className="block font-medium text-zinc-900 flex items-center gap-2">
                      <Truck size={16} /> Resto del País
                    </span>
                    <span className="block text-sm text-zinc-500 mt-1">Envío a domicilio mediante correo.</span>
                  </div>
                  <span className="font-bold text-zinc-900">${COSTO_OTRAS_PROVINCIAS}</span>
                </label>
              </div>

              {shippingMethod !== "local" && (
                <div className="mt-6 space-y-4 pt-6 border-t border-zinc-100">
                  <h3 className="font-medium text-zinc-900">Dirección de Envío</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Nombre" className="col-span-1 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    <input type="text" placeholder="Apellido" className="col-span-1 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    <input type="text" placeholder="Calle y Número" className="col-span-2 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    <input type="text" placeholder="Ciudad" className="col-span-1 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    <input type="text" placeholder="Código Postal" className="col-span-1 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Columna Derecha - Resumen de Compra */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm sticky top-24">
              <h2 className="text-xl font-serif font-bold text-zinc-900 mb-6">Resumen de tu pedido</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-zinc-100 rounded-md overflow-hidden flex-shrink-0">
                      {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-zinc-900 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-zinc-500 mt-1">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold text-zinc-900">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-zinc-100 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? "Gratis" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-zinc-900 pt-3 border-t border-zinc-100">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button 
                onClick={handleSimulatePayment}
                className="w-full mt-8 bg-blue-500 text-white py-4 rounded-lg font-bold hover:bg-blue-600 transition-colors flex justify-center items-center gap-2"
              >
                Pagar con Mercado Pago
              </button>
              <p className="text-center text-xs text-zinc-500 mt-3 flex items-center justify-center gap-1">
                🔒 Pagos seguros verificados
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
