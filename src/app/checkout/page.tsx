"use client";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Truck, Store, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Formulario
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    ciudad: "",
    cp: ""
  });

  // Opciones de envío
  const [shippingMethod, setShippingMethod] = useState<"local" | "cercana" | "lejos">("local");
  
  // Costos de envío
  const COSTO_PROVINCIA_CERCANA = 2500;
  const COSTO_OTRAS_PROVINCIAS = 5000;
  const MONTO_ENVIO_GRATIS_CERCANA = 30000; 

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      
      // 1. Crear el pedido en la base de datos (Requiere políticas RLS públicas o rol admin)
      let direccionCompleta = shippingMethod === "local" ? "Retiro en local" : `${formData.direccion}, ${formData.ciudad} (${formData.cp})`;
      let metodoEnvioTexto = shippingMethod === "local" ? "Retiro" : shippingMethod === "cercana" ? "Envío Provincia Cercana" : "Envío Resto del País";

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([{
          total_amount: total,
          shipping_address: direccionCompleta,
          shipping_method: metodoEnvioTexto,
          shipping_cost: shippingCost,
          customer_name: formData.nombre,
          customer_phone: formData.telefono,
          customer_email: formData.email,
          status: 'pendiente'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insertar los items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Generar mensaje de WhatsApp
      let mensaje = `*¡Hola! Quiero hacer un pedido:*%0A%0A`;
      mensaje += `*ID Pedido:* ${orderData.id.split('-')[0]}%0A`;
      mensaje += `*Nombre:* ${formData.nombre}%0A`;
      if (formData.email) mensaje += `*Email:* ${formData.email}%0A`;
      mensaje += `*Envío:* ${metodoEnvioTexto} (${direccionCompleta})%0A%0A`;
      
      mensaje += `*Productos:*%0A`;
      items.forEach(item => {
        mensaje += `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})%0A`;
      });

      mensaje += `%0A*Subtotal:* $${subtotal}%0A`;
      mensaje += `*Costo de Envío:* $${shippingCost}%0A`;
      mensaje += `*TOTAL A PAGAR:* $${total}%0A%0A`;
      mensaje += `Por favor, indícame cómo realizar el pago. ¡Gracias!`;

      // 4. Redirigir a WhatsApp (reemplazar con el nro del dueño real)
      const numeroVendedor = "5491100000000"; // Se recomienda guardarlo en Settings luego
      
      clearCart();
      setSuccess(true);
      
      window.open(`https://wa.me/${numeroVendedor}?text=${mensaje}`, "_blank");

    } catch (error: any) {
      console.error("Error en checkout:", error);
      alert("Hubo un error al procesar tu pedido. Por favor intenta de nuevo. Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 text-2xl">✓</div>
        <h1 className="text-3xl font-serif font-bold text-zinc-900 mb-2">¡Pedido Registrado!</h1>
        <p className="text-zinc-600 mb-8 max-w-md">Tu pedido ha sido guardado. Si no se abrió WhatsApp automáticamente, comunícate con nosotros para coordinar el pago.</p>
        <Link href="/" className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors">
          Volver a la tienda
        </Link>
      </div>
    );
  }

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
        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-zinc-900 mb-6">Tus Datos</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre Completo *</label>
                    <input required name="nombre" value={formData.nombre} onChange={handleChange} type="text" className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Teléfono / WhatsApp *</label>
                    <input required name="telefono" value={formData.telefono} onChange={handleChange} type="text" className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:border-primary focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Correo electrónico</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="ejemplo@correo.com" className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:border-primary focus:outline-none" />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Truck size={20} className="text-primary" />
                Método de Entrega
              </h2>
              
              <div className="space-y-3">
                <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === "local" ? "border-primary bg-primary/5" : "border-zinc-200 hover:border-zinc-300"}`}>
                  <input type="radio" name="shipping" className="mt-1 mr-3 text-primary focus:ring-primary h-4 w-4" checked={shippingMethod === "local"} onChange={() => setShippingMethod("local")} />
                  <div className="flex-1">
                    <span className="block font-medium text-zinc-900 flex items-center gap-2">
                      <Store size={16} /> Retiro en Local
                    </span>
                    <span className="block text-sm text-zinc-500 mt-1">Acordar punto de encuentro.</span>
                  </div>
                  <span className="font-bold text-green-600">Gratis</span>
                </label>

                <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === "cercana" ? "border-primary bg-primary/5" : "border-zinc-200 hover:border-zinc-300"}`}>
                  <input type="radio" name="shipping" className="mt-1 mr-3 text-primary focus:ring-primary h-4 w-4" checked={shippingMethod === "cercana"} onChange={() => setShippingMethod("cercana")} />
                  <div className="flex-1">
                    <span className="block font-medium text-zinc-900 flex items-center gap-2">
                      <MapPin size={16} /> Provincias Cercanas
                    </span>
                    {subtotal < MONTO_ENVIO_GRATIS_CERCANA && (
                      <span className="block text-xs text-primary mt-1 font-medium">¡Suma ${MONTO_ENVIO_GRATIS_CERCANA - subtotal} más para envío gratis!</span>
                    )}
                  </div>
                  <span className="font-bold text-zinc-900">
                    {subtotal >= MONTO_ENVIO_GRATIS_CERCANA ? <span className="text-green-600">Gratis</span> : `$${COSTO_PROVINCIA_CERCANA}`}
                  </span>
                </label>

                <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${shippingMethod === "lejos" ? "border-primary bg-primary/5" : "border-zinc-200 hover:border-zinc-300"}`}>
                  <input type="radio" name="shipping" className="mt-1 mr-3 text-primary focus:ring-primary h-4 w-4" checked={shippingMethod === "lejos"} onChange={() => setShippingMethod("lejos")} />
                  <div className="flex-1">
                    <span className="block font-medium text-zinc-900 flex items-center gap-2">
                      <Truck size={16} /> Resto del País
                    </span>
                  </div>
                  <span className="font-bold text-zinc-900">${COSTO_OTRAS_PROVINCIAS}</span>
                </label>
              </div>

              {shippingMethod !== "local" && (
                <div className="mt-6 space-y-4 pt-6 border-t border-zinc-100">
                  <h3 className="font-medium text-zinc-900">Dirección de Envío</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="direccion" value={formData.direccion} onChange={handleChange} type="text" placeholder="Calle y Número *" className="col-span-2 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    <input required name="ciudad" value={formData.ciudad} onChange={handleChange} type="text" placeholder="Ciudad / Provincia *" className="col-span-1 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                    <input required name="cp" value={formData.cp} onChange={handleChange} type="text" placeholder="Código Postal *" className="col-span-1 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                  </div>
                </div>
              )}
            </section>
          </div>

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
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-green-500 text-white py-4 rounded-lg font-bold hover:bg-green-600 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {loading ? "Procesando..." : "Enviar Pedido por WhatsApp"}
              </button>
              <p className="text-center text-xs text-zinc-500 mt-3 flex items-center justify-center gap-1">
                Te contactaremos para coordinar el pago.
              </p>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}
