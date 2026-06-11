"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase-browser";
import { UploadCloud, X, Save, Plus, Trash2 } from "lucide-react";

export default function ConfiguracionClient() {
  const supabase = createClient();
  const [settings, setSettings] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchSettingsAndCategories();
  }, []);

  const fetchSettingsAndCategories = async () => {
    setLoading(true);
    try {
      const [settingsRes, catsRes] = await Promise.all([
        supabase.from("store_settings").select("*").limit(1).single(),
        supabase.from("categories").select("*").order("name")
      ]);
      
      if (settingsRes.error && settingsRes.error.code !== 'PGRST116') throw settingsRes.error;
      
      if (settingsRes.data) {
        setSettings(settingsRes.data);
      } else {
        setSettings({ store_name: "Escorpio Acero", primary_color: "#C5A059", logo_url: "" });
      }

      if (!catsRes.error) {
        setCategories(catsRes.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (settings.id) {
        const { error } = await supabase.from("store_settings").update({
          store_name: settings.store_name,
          primary_color: settings.primary_color,
          logo_url: settings.logo_url
        }).eq("id", settings.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("store_settings").insert([settings]);
        if (error) throw error;
      }
      
      alert("Configuración guardada exitosamente. Recarga la página pública para ver los cambios.");
    } catch (error: any) {
      alert("Error guardando la configuración: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    try {
      const { data, error } = await supabase.from("categories").insert([{ name: newCatName, slug }]).select().single();
      if (error) throw error;
      setCategories([...categories, data]);
      setNewCatName("");
    } catch (error: any) {
      alert("Error agregando categoría: " + error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("¿Seguro que quieres borrar esta categoría? Los productos que la tengan quedarán sin categoría.")) return;
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
      setCategories(categories.filter(c => c.id !== id));
    } catch (error: any) {
      alert("Error borrando categoría: " + error.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
      setSettings({ ...settings, logo_url: data.publicUrl });
    } catch (error: any) {
      alert("Error subiendo el logo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !settings) return <div className="p-10 text-center">Cargando configuración...</div>;

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-zinc-900">Mi Tienda</h1>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSave} className="p-6 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-4 border-b pb-2">Identidad Visual</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre de la Tienda</label>
                  <input 
                    name="store_name"
                    value={settings.store_name || ""}
                    onChange={handleChange}
                    className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary" 
                  />
                  <p className="text-xs text-zinc-500 mt-1">Aparecerá en el navegador y como título secundario.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Color Principal (Botones y Detalles)</label>
                  <div className="flex gap-3">
                    <input 
                      type="color" 
                      name="primary_color"
                      value={settings.primary_color || "#C5A059"}
                      onChange={handleChange}
                      className="h-10 w-16 p-1 border border-zinc-300 rounded cursor-pointer" 
                    />
                    <input 
                      type="text" 
                      name="primary_color"
                      value={settings.primary_color || "#C5A059"}
                      onChange={handleChange}
                      className="flex-1 border border-zinc-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Logo de la Marca</label>
                <div 
                  className="border-2 border-dashed border-zinc-300 rounded-xl p-4 text-center hover:bg-zinc-50 transition-colors h-40 flex flex-col items-center justify-center relative cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {settings.logo_url ? (
                    <div className="relative w-full h-full flex items-center justify-center p-2">
                      <img src={settings.logo_url} alt="Logo" className="max-h-full max-w-full object-contain" />
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setSettings({...settings, logo_url: ""}); }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <UploadCloud size={24} className="text-zinc-400 mb-2" />
                      <p className="text-sm font-medium text-zinc-700">Subir Logo</p>
                      <p className="text-xs text-zinc-500 mt-1">PNG transparente recomendado</p>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>
              </div>
            </div>
          </section>

          <div className="pt-4 flex justify-end border-b pb-6 border-zinc-200">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-zinc-900 text-white px-6 py-2.5 rounded-md hover:bg-zinc-800 transition-colors flex items-center gap-2 font-medium disabled:opacity-70"
            >
              <Save size={18} /> {saving ? "Guardando..." : "Guardar Configuración"}
            </button>
          </div>
        </form>

        <section className="p-6 bg-zinc-50">
          <h2 className="text-lg font-bold text-zinc-900 mb-4 border-b pb-2">Gestión de Categorías</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Nueva categoría (ej: Pulseras)" 
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                className="flex-1 border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
              <button 
                type="button"
                onClick={handleAddCategory}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Plus size={16} /> Agregar
              </button>
            </div>

            <div className="bg-white border border-zinc-200 rounded-md overflow-hidden">
              {categories.length === 0 ? (
                <div className="p-4 text-sm text-zinc-500 text-center">No hay categorías. ¡Agrega algunas arriba!</div>
              ) : (
                <ul className="divide-y divide-zinc-100">
                  {categories.map(cat => (
                    <li key={cat.id} className="p-3 flex justify-between items-center hover:bg-zinc-50">
                      <span className="text-sm font-medium text-zinc-900">{cat.name} <span className="text-zinc-400 font-normal text-xs ml-2">/{cat.slug}</span></span>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                        title="Borrar categoría"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
