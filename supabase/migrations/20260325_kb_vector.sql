-- Knowledge Base vector search schema
create extension if not exists vector;
create extension if not exists pg_trgm;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.niches (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  display_name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.niches (key, display_name)
values
  ('water_damage_restoration', 'Water Damage Restoration'),
  ('senior_home_care', 'Senior Home Care'),
  ('personal_injury_law', 'Personal Injury Law'),
  ('hvac', 'HVAC'),
  ('plumbing', 'Plumbing')
on conflict (key) do update
set display_name = excluded.display_name,
    is_active = true,
    updated_at = now();

create table if not exists public.kb_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid null,
  niche text not null references public.niches(key),
  topic text null,
  title text null,
  question text not null,
  answer text not null,
  content text generated always as (coalesce(title, '') || E'\n' || question || E'\n' || answer) stored,
  embedding vector(384) not null,
  tags text[] not null default '{}',
  source text not null default 'kb_generator',
  is_active boolean not null default true,
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint kb_items_niche_question_unique unique (niche, question)
);

create index if not exists kb_items_niche_idx on public.kb_items (niche);
create index if not exists kb_items_org_niche_idx on public.kb_items (org_id, niche);
create index if not exists kb_items_embedding_hnsw
  on public.kb_items
  using hnsw (embedding vector_cosine_ops);

create or replace function public.match_kb_items(
  niche_in text,
  query_embedding vector(384),
  org_id_in uuid default null,
  match_count int default 5
)
returns table (
  id uuid,
  niche text,
  topic text,
  title text,
  question text,
  answer text,
  tags text[],
  score float
)
language sql
stable
as $$
  select
    k.id,
    k.niche,
    k.topic,
    k.title,
    k.question,
    k.answer,
    k.tags,
    1 - (k.embedding <=> query_embedding) as score
  from public.kb_items k
  where k.niche = niche_in
    and k.is_active = true
    and (org_id_in is null or k.org_id = org_id_in)
  order by k.embedding <=> query_embedding asc
  limit greatest(match_count, 1);
$$;

alter table public.kb_items enable row level security;

-- Conservative read policy for logged-in users.
drop policy if exists kb_items_select_authenticated on public.kb_items;
create policy kb_items_select_authenticated
  on public.kb_items
  for select
  to authenticated
  using (is_active = true);

-- Inserts/updates/deletes should be performed with service_role key only.

drop trigger if exists trg_niches_updated_at on public.niches;
create trigger trg_niches_updated_at
before update on public.niches
for each row
execute function public.set_updated_at();

drop trigger if exists trg_kb_items_updated_at on public.kb_items;
create trigger trg_kb_items_updated_at
before update on public.kb_items
for each row
execute function public.set_updated_at();
