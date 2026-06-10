import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Camera, ShoppingBag, Truck, ShieldCheck } from "lucide-react"

// En el futuro, esto obtendría el producto de Supabase
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // Mock data para el prototipo
  const product = {
    id,
    name: "Aros Argolla Dorada Clásica",
    price: 15000,
    description: "Aros argolla de acero quirúrgico bañados en oro. Ideales para uso diario, no pierden el color ni causan alergias. Cierre a presión seguro y cómodo. Diámetro: 15mm.",
    category: "Aros",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    inStock: true
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Columna Izquierda: Imagen del Producto y Botón AR */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/5 border border-border/50">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* BOILERPLATE FEATURE FUTURA: Probador Virtual AR */}
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-medium text-primary flex items-center justify-center sm:justify-start gap-2">
                <Camera className="w-4 h-4" /> Probador Virtual AR
              </h3>
              <p className="text-xs text-foreground/70">Mírate con este producto usando tu cámara.</p>
            </div>
            <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
              Probar con Cámara
            </Button>
          </div>
          <p className="text-[10px] text-foreground/50 text-center italic">
            * El modelo 3D usando Google MediaPipe y Three.js se renderizará en una actualización futura.
          </p>
        </div>

        {/* Columna Derecha: Detalles del Producto */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">{product.category}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {product.name}
          </h1>
          <div className="text-2xl font-medium mb-6">
            ${product.price.toLocaleString("es-AR")}
          </div>

          <p className="text-foreground/80 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-4 mb-8">
            <Button size="lg" className="w-full h-14 text-lg">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Agregar al Carrito
            </Button>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <span>Envíos a todo el país</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span>Compra segura 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
