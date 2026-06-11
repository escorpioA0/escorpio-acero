"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { UploadCloud, X } from "lucide-react";

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "",
    cost_price: initialData?.cost_price?.toString() || "",
    stock: initialData?.stock?.toString() || "10",
    image_url: initialData?.image_url || "",
  });

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: data.publicUrl });
    } catch (error: any) {
      alert("Error subiendo la imagen: " + error.message + "\n\n¿Creaste el bucket 'product-images' público en Supabase?");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Create a fake event object to pass to handleImageUpload
      const fakeEvent = {
        target: { files: e.dataTransfer.files }
      } as React.ChangeEvent<HTMLInputElement>;
      handleImageUpload(fakeEvent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseSlug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      // If it's an update, we shouldn't necessarily change the slug unless we want to, but to avoid unique constraint on insert/update:
      // If initialData exists, we can keep the old slug to not break URLs, or if it's new we generate a unique one.
      const slug = initialData?.slug || `${baseSlug}-${Math.random().toString(36).substring(2, 8)}`;
      
      const productPayload = {
        name: formData.name,
        slug: slug,
        description: formData.description,
        price: parseFloat(formData.price),
        cost_price: parseFloat(formData.cost_price || "0"),
        stock: parseInt(formData.stock),
        image_url: formData.image_url || null,
        tags: tags,
        is_active: true
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from("products")
          .update(productPayload)
          .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productPayload]);
        if (error) throw error;
      }
      
      router.push("/admin/productos");
      router.refresh();
    } catch (error: any) {
      console.error("Error al guardar producto:", error);
      alert("Hubo un error al guardar el producto: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const price = parseFloat(formData.price) || 0;
  const cost = parseFloat(formData.cost_price) || 0;
  const margin = price > 0 ? Math.round(((price - cost) / price) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Imagen Drag & Drop */}
        <div 
          className="border-2 border-dashed border-zinc-300 rounded-xl p-8 text-center hover:bg-zinc-50 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {formData.image_url ? (
            <div className="relative w-40 h-40 mx-auto">
              <img src={formData.image_url} alt="Vista previa" className="w-full h-full object-cover rounded-lg shadow-sm" />
              <button 
                type="button" 
                onClick={() => setFormData({...formData, image_url: ""})}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <UploadCloud size={24} />
              </div>
              <div>
                <p className="font-medium text-zinc-900">
                  {uploading ? "Subiendo..." : "Haz clic o arrastra una imagen aquí"}
                </p>
                <p className="text-sm text-zinc-500 mt-1">PNG, JPG, WEBP hasta 5MB</p>
              </div>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        {/* Campos Básicos */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre del Producto</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Descripción</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Costo ($)</label>
              <input 
                required
                name="cost_price"
                value={formData.cost_price}
                onChange={handleChange}
                type="number" 
                step="0.01"
                className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Precio de Venta ($)</label>
              <input 
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number" 
                step="0.01"
                className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {price > 0 && (
            <div className="bg-zinc-50 p-3 rounded-md text-sm border border-zinc-100 flex justify-between">
              <span className="text-zinc-600">Margen de Ganancia Estimado:</span>
              <span className={`font-bold ${margin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {margin}%
              </span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Stock Inicial</label>
            <input 
              required
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              type="number" 
              className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Etiquetas (Tags) */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Etiquetas (Presiona Enter o Coma para agregar)</label>
            <div className="border border-zinc-300 rounded-md p-2 flex flex-wrap gap-2 focus-within:border-primary transition-colors">
              {tags.map((tag) => (
                <span key={tag} className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input 
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="ej: oferta, dia del padre"
                className="flex-1 outline-none text-sm min-w-[150px]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            disabled={loading || uploading}
            type="submit" 
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
