-- ============================================================
-- LOBBY — channel_stats (media kit del creador)
-- Núcleo de la Fase 1 (creadores): stats de audiencia por
-- plataforma. Arranca auto-reportado (verified = false); la
-- verificación por API (Twitch/YouTube/Riot) es fase 2/3.
-- ============================================================

create table public.channel_stats (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  platform    text not null check (platform in ('twitch', 'youtube', 'tiktok', 'kick', 'instagram', 'x')),
  handle      text,
  followers   integer check (followers is null or followers >= 0),
  avg_views   integer check (avg_views is null or avg_views >= 0),
  verified    boolean not null default false,
  updated_at  timestamptz default now(),
  unique (profile_id, platform)
);

create index on public.channel_stats (profile_id);

-- ============================================================
-- RLS — lectura pública, escritura solo del dueño
-- (mismo patrón que links / experiences / media)
-- ============================================================

alter table public.channel_stats enable row level security;

create policy "channel_stats lectura pública"
  on public.channel_stats for select using (true);

create policy "channel_stats escritura del dueño"
  on public.channel_stats for all using (auth.uid() = profile_id);
