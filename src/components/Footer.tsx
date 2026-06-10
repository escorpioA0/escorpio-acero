import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-border mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-2xl font-bold tracking-tight text-primary mb-4">
              ESCORPIO ACERO
            </span>
            <p className="text-foreground/70 text-center md:text-left text-sm max-w-xs">
              Accesorios exclusivos en acero quirúrgico, acero blanco y dorado. Diseños que complementan tu belleza natural.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-lg font-semibold mb-4 text-foreground">Colecciones</h4>
            <div className="flex flex-col gap-2 text-sm text-foreground/80">
              <Link href="#aros" className="hover:text-primary transition-colors">Aros</Link>
              <Link href="#cadenas" className="hover:text-primary transition-colors">Cadenas y Dijes</Link>
              <Link href="#anillos" className="hover:text-primary transition-colors">Anillos</Link>
              <Link href="#pulseras" className="hover:text-primary transition-colors">Pulseras</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-lg font-semibold mb-4 text-foreground">Contacto</h4>
            <div className="flex flex-col gap-4 text-sm text-foreground/80">
              <a href="https://instagram.com/escorpio.acero" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Instagram size={18} />
                @escorpio.acero
              </a>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                +54 9 11 1234-5678
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                Envíos a todo el país
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-foreground/50">
          &copy; {new Date().getFullYear()} Escorpio Acero. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
