import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Mock data for products
const MOCK_PRODUCTS = [
  { id: "1", name: "Aros Argolla Dorada", price: 15000, category: "Aros", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
  { id: "2", name: "Cadena Eslabón Fino", price: 22000, category: "Cadenas", image: "https://images.unsplash.com/photo-1599643478514-4a4e08d509bc?q=80&w=600&auto=format&fit=crop" },
  { id: "3", name: "Pulsera Minimalista", price: 18000, category: "Pulseras", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
  { id: "4", name: "Anillo Sello Plata", price: 12500, category: "Anillos", image: "https://images.unsplash.com/photo-1605100804763-247f67b8548e?q=80&w=600&auto=format&fit=crop" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-black/10 overflow-hidden flex items-center justify-center">
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        
        <div className="container mx-auto px-4 text-center text-white space-y-6">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
            Elegancia que Perdura
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            Descubre nuestra nueva colección de joyería en acero quirúrgico. Diseño moderno, durabilidad eterna.
          </p>
          <div className="pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
              Ver Catálogo
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">Novedades</h2>
            <p className="text-foreground/70 mt-2">Lo último en llegar a nuestra tienda.</p>
          </div>
          <Link href="/catalogo" className="text-primary hover:underline font-medium hidden md:block">
            Ver todo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <Card key={product.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow group">
              <Link href={`/producto/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-black/5">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">{product.category}</div>
                <Link href={`/producto/${product.id}`}>
                  <CardTitle className="text-lg mb-2 hover:text-primary transition-colors">{product.name}</CardTitle>
                </Link>
                <div className="font-medium text-foreground">${product.price.toLocaleString("es-AR")}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Agregar al Carrito</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full">
            Ver todo el catálogo
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-center mb-8">Nuestras Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Aros", "Cadenas", "Pulseras", "Anillos"].map((cat) => (
            <Link key={cat} href={`/catalogo?categoria=${cat}`}>
              <div className="relative aspect-square rounded-2xl overflow-hidden group flex items-center justify-center bg-black/5 border border-border/50">
                <div className="z-10 font-serif text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {cat}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
