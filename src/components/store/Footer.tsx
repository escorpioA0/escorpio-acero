import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary">Escorpio Acero</h4>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Joyería de acero quirúrgico de alta calidad. Elegancia y durabilidad para cada día.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Enlaces Rápidos</h4>
            <nav className="flex flex-col space-y-2 text-sm text-foreground/70">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
              <Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Legales</h4>
            <nav className="flex flex-col space-y-2 text-sm text-foreground/70">
              <Link href="/terminos" className="hover:text-primary transition-colors">Términos y Condiciones</Link>
              <Link href="/privacidad" className="hover:text-primary transition-colors">Políticas de Privacidad</Link>
              <Link href="/devoluciones" className="hover:text-primary transition-colors">Políticas de Devolución</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Contacto</h4>
            <div className="flex flex-col space-y-2 text-sm text-foreground/70">
              <span>Email: hola@escorpioacero.com</span>
              <span>WhatsApp: +54 9 11 1234-5678</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} Escorpio Acero. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
