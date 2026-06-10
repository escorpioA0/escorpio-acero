import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl">Admin Login</CardTitle>
          <CardDescription>Ingresa a tu panel de control de Escorpio Acero.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email
            </label>
            <input 
              id="email" 
              type="email" 
              placeholder="admin@escorpioacero.com" 
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="password">
              Contraseña
            </label>
            <input 
              id="password" 
              type="password" 
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </CardContent>
        <CardFooter>
          {/* Para el prototipo, el login redirige directamente al dashboard */}
          <Link href="/admin/dashboard" className="w-full">
            <Button className="w-full">Ingresar</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
