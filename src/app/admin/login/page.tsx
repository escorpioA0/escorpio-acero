"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden">
        <div className="bg-zinc-900 p-8 text-center">
          <div className="mx-auto w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-white">
            <Lock size={20} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">Escorpio Acero</h1>
          <p className="text-zinc-400 mt-2 text-sm">Panel de Administración</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center border border-red-100">
                {error === "Invalid login credentials" ? "Credenciales incorrectas" : error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="admin@escorpioacero.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Contraseña</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-bold rounded-lg px-4 py-3 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Iniciando sesión..." : "Entrar al Panel"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-zinc-500 hover:text-primary transition-colors">
              &larr; Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
