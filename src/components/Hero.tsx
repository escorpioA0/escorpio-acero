import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between px-6 py-16 md:flex-row md:py-24">
        {/* Text Content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left z-10 mt-12 md:mt-0">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl max-w-xl">
            Detalles que iluminan tu estilo.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-foreground/80 font-sans">
            Accesorios exclusivos en acero quirúrgico, acero blanco y dorado. Diseños elegantes para acompañarte todos los días.
          </p>
          <div className="mt-10 flex gap-4">
            <Link 
              href="#coleccion" 
              className="rounded-none bg-primary px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-accent hover:shadow-lg"
            >
              Ver Colección
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex-1 w-full flex justify-center md:justify-end">
          <div className="relative h-[400px] w-[90%] max-w-[500px] overflow-hidden rounded-t-full bg-white shadow-xl">
            {/* The image is loaded from artifacts using absolute path or we can copy it to public. 
                For demo, we can just use an object-cover div or standard img tag.
                Since it's Next.js and images are not in public yet, we'll use standard img for absolute path.
                Wait, Next Image needs configured domains for absolute paths or relative to public.
                We will use standard <img> for local absolute paths in dev.
             */}
            <img 
              src="/hero_jewelry_bg_1781134036685.png" 
              alt="Joyería elegante" 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
