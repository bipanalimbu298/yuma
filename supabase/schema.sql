-- Bipana Clothing Co. (Supabase) schema
-- Run this in Supabase SQL editor.

create table if not exists public.products (
  id bigint primary key,
  title text not null,
  src_url text not null,
  gallery jsonb,
  price numeric not null,
  discount jsonb not null,
  rating numeric not null default 0,
  description text,
  category text,
  is_new boolean default false,
  options jsonb,
  variants jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  status text not null,
  payment_method text not null,
  payment_ref text,
  subtotal numeric not null,
  discount numeric not null,
  total numeric not null,
  shipping jsonb not null
);

create table if not exists public.order_items (
  id bigserial primary key,
  order_id text not null references public.orders(id) on delete cascade,
  product_id bigint,
  name text not null,
  src_url text not null,
  price numeric not null,
  quantity int not null,
  attributes jsonb,
  discount jsonb not null
);

