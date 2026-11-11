create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  role text default 'agent',
  created_at timestamptz default now()
);

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  blurb text,
  average_price text,
  vibe text,
  created_at timestamptz default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  location text not null,
  city text not null,
  country text not null,
  category text not null,
  listing_type text not null check (listing_type in ('sale', 'rent', 'lease')),
  status text not null default 'For Sale',
  price numeric(14,2) not null,
  beds integer not null default 0,
  baths integer not null default 0,
  area numeric not null default 0,
  year integer,
  description text,
  summary text,
  image_url text,
  agent_id uuid references profiles(id),
  coordinates jsonb,
  created_at timestamptz default now()
);

create table if not exists property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  image_url text not null,
  sort_order integer default 0
);

create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  title text,
  location text,
  bio text,
  image_url text,
  phone text,
  email text,
  specialties text[],
  languages text[],
  created_at timestamptz default now()
);

create table if not exists saved_properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  property_id uuid references properties(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, property_id)
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  enquiry_type text not null,
  message text,
  property_id uuid references properties(id),
  created_at timestamptz default now()
);

create table if not exists viewing_requests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id),
  full_name text not null,
  email text not null,
  phone text,
  requested_at text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists valuation_requests (
  id uuid primary key default gen_random_uuid(),
  location text,
  property_type text,
  size_sqft numeric,
  bedrooms integer,
  condition text,
  email text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  summary text,
  author text,
  read_time text,
  image_url text,
  content jsonb,
  created_at timestamptz default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'Atlas Estates',
  demo_mode boolean not null default true,
  contact_email text,
  contact_phone text,
  updated_at timestamptz default now()
);

create table if not exists property_comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  property_ids uuid[] not null,
  created_at timestamptz default now()
);

alter table properties enable row level security;
alter table saved_properties enable row level security;
alter table enquiries enable row level security;
alter table viewing_requests enable row level security;
alter table valuation_requests enable row level security;
alter table property_comparisons enable row level security;

create policy "Public read access for property listings" on properties
for select using (true);

create policy "Public read access for locations" on locations
for select using (true);

create policy "Public read access for blog posts" on blog_posts
for select using (true);

create policy "Authenticated users can manage saved properties" on saved_properties
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Anyone can insert enquiries" on enquiries
for insert with check (true);

create policy "Anyone can insert viewing requests" on viewing_requests
for insert with check (true);

create policy "Anyone can insert valuation requests" on valuation_requests
for insert with check (true);

create policy "Authenticated users can manage comparisons" on property_comparisons
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
