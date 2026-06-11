-- Create extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  phone text,
  address text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

-- Drop existing policies if any to avoid errors on re-run
drop policy if exists "Public profiles are viewable by everyone." on profiles;
drop policy if exists "Users can insert their own profile." on profiles;
drop policy if exists "Users can update own profile." on profiles;

create policy "Public profiles are viewable by everyone."
  on profiles for select using ( true );

create policy "Users can insert their own profile."
  on profiles for insert with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update using ( auth.uid() = id );

-- Handle new user signup (only replace if we need to update, usually it's fine)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger logic is omitted here to avoid dropping it if it already exists, 
-- but it's safe to drop and recreate.
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Categories Table
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

drop policy if exists "Categories are viewable by everyone." on categories;
create policy "Categories are viewable by everyone."
  on categories for select using ( true );

-- 3. Products Table (Updated)
-- We use "create table if not exists" and then "alter table add column" to ensure it updates existing schema safely
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  stock integer not null default 0,
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Safely add new columns if they don't exist
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name='products' and column_name='cost_price') then
    alter table public.products add column cost_price numeric(10,2) default 0;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='products' and column_name='tags') then
    alter table public.products add column tags text[] default '{}';
  end if;
end $$;

alter table public.products enable row level security;
drop policy if exists "Active products are viewable by everyone." on products;
create policy "Active products are viewable by everyone."
  on products for select using ( is_active = true );

-- 4. Orders Table
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending', -- pending, paid, shipped, completed, cancelled
  total_amount numeric(10,2) not null default 0,
  shipping_address text,
  shipping_method text,
  shipping_cost numeric(10,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;
drop policy if exists "Users can view their own orders." on orders;
drop policy if exists "Users can insert their own orders." on orders;
create policy "Users can view their own orders."
  on orders for select using ( auth.uid() = user_id );
create policy "Users can insert their own orders."
  on orders for insert with check ( auth.uid() = user_id );

-- 5. Order Items Table
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null,
  unit_price numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.order_items enable row level security;
drop policy if exists "Users can view their own order items." on order_items;
drop policy if exists "Users can insert their own order items." on order_items;
create policy "Users can view their own order items."
  on order_items for select using ( 
    exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
  );
create policy "Users can insert their own order items."
  on order_items for insert with check ( 
    exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
  );

-- 6. Store Settings Table (NEW)
create table if not exists public.store_settings (
  id uuid default uuid_generate_v4() primary key,
  store_name text default 'Escorpio Acero',
  logo_url text,
  primary_color text default '#C5A059',
  font_family text default 'Playfair Display',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure there is always exactly one settings row
insert into public.store_settings (store_name)
select 'Escorpio Acero'
where not exists (select 1 from public.store_settings);

alter table public.store_settings enable row level security;
drop policy if exists "Store settings are viewable by everyone." on store_settings;
create policy "Store settings are viewable by everyone."
  on store_settings for select using ( true );
