-- 1. Insert default categories
INSERT INTO public.categories (name, slug)
VALUES 
  ('Aros', 'aros'),
  ('Cadenas y Dijes', 'cadenas'),
  ('Anillos', 'anillos'),
  ('Pulseras', 'pulseras')
ON CONFLICT (slug) DO NOTHING;

-- 2. TEMPORARILY allow anonymous inserts, updates, and deletes for Products to test functionality.
-- We will secure this later with Supabase Auth.
drop policy if exists "Public can insert products" on products;
drop policy if exists "Public can update products" on products;
drop policy if exists "Public can delete products" on products;

create policy "Public can insert products" on products for insert with check (true);
create policy "Public can update products" on products for update using (true);
create policy "Public can delete products" on products for delete using (true);

-- (Optional) If we also need to allow anonymous selects of all products including inactive:
drop policy if exists "Active products are viewable by everyone." on products;
create policy "Products are viewable by everyone." on products for select using (true);
