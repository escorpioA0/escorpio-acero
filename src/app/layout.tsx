
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { supabase } from "@/lib/supabase"; // Server client

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase.from("store_settings").select("store_name").limit(1).single();
  const storeName = data?.store_name || "Escorpio Acero";
  
  return {
    title: `${storeName} | Joyería Premium`,
    description: "Tienda online de joyería en acero quirúrgico. Aros, cadenas, pulseras y anillos.",
  };
}

// Convert HEX to HSL so Tailwind can use it as hsl(var(--primary))
function hexToHSL(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  let cmin = Math.min(r,g,b), cmax = Math.max(r,g,b), delta = cmax - cmin, h = 0, s = 0, l = 0;
  
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${h} ${s}% ${l}%`;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch store settings for customization
  const { data: settings } = await supabase.from("store_settings").select("*").limit(1).single();
  
  let customStyle = "";
  if (settings && settings.primary_color) {
    const hslPrimary = hexToHSL(settings.primary_color);
    customStyle = `
      :root {
        --primary: ${hslPrimary};
      }
    `;
  }

  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full antialiased font-sans`}
    >
      <head>
        {customStyle && <style>{customStyle}</style>}
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
