-- ============================================================
-- LOBBY — platform_connections (tokens OAuth de verificación)
-- Guarda los tokens de cada canal conectado (Twitch, etc.) para
-- poder refrescar los stats automáticamente sin que el creador
-- reconecte. Datos sensibles.
-- ============================================================

create table public.platform_connections (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  platform        text not null check (platform in ('twitch', 'youtube', 'tiktok', 'kick', 'instagram', 'x')),
  external_id     text,
  external_handle text,
  access_token    text not null,
  refresh_token   text,
  expires_at      timestamptz,
  scopes          text[],
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (profile_id, platform)
);

create index on public.platform_connections (platform);

-- ============================================================
-- RLS — SIN políticas a propósito.
-- Con RLS habilitado y cero políticas, anon/authenticated no pueden
-- leer ni escribir: los tokens nunca son accesibles desde el cliente.
-- Todo el acceso (callback OAuth + cron de refresh) pasa por el
-- service role, que bypassa RLS.
-- ============================================================

alter table public.platform_connections enable row level security;
