-- ============================================================
-- LOBBY — brand_waitlist (lista de acceso anticipado para marcas)
-- Lado demanda del pre-lanzamiento: marcas y agencias dejan su
-- contacto desde la landing mientras se arma la densidad de
-- creadores (ver plan-de-negocios/09-plan-de-lanzamiento.md).
-- ============================================================

create table public.brand_waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company     text not null check (char_length(company) between 1 and 120),
  role        text not null check (role in ('marca', 'agencia', 'org', 'otro')),
  created_at  timestamptz not null default now()
);

-- ============================================================
-- RLS — cualquiera puede anotarse, nadie puede leer.
-- Sin política de select: la lista solo se consulta con el
-- service role (dashboard de Supabase / Metabase).
-- ============================================================

alter table public.brand_waitlist enable row level security;

create policy "brand_waitlist alta pública"
  on public.brand_waitlist for insert
  to anon, authenticated
  with check (true);
