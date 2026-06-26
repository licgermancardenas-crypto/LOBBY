-- ============================================================
-- LOBBY — Esquema inicial de base de datos
-- Ejecutar en: Supabase > SQL Editor
-- ============================================================

-- Extensiones
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";     -- búsqueda full-text
create extension if not exists "vector";       -- matching por similitud (fase 2)

-- ============================================================
-- TABLAS NÚCLEO
-- ============================================================

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  handle        text unique not null check (handle ~ '^[a-z0-9_]{3,30}$'),
  display_name  text not null,
  profile_type  text not null check (profile_type in ('player', 'dev', 'streamer', 'org')),
  country       text,
  bio           text,
  avatar_url    text,
  created_at    timestamptz default now()
);

create table public.games (
  id    uuid primary key default gen_random_uuid(),
  name  text not null,
  slug  text unique not null
);

create table public.profile_games (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  game_id     uuid not null references public.games(id) on delete cascade,
  role        text,
  rank        text,
  unique (profile_id, game_id)
);

create table public.links (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  platform    text not null,
  url         text not null
);

create table public.experiences (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  type        text not null,  -- 'job', 'tournament', 'project', 'education'
  title       text not null,
  org         text,
  start_date  date,
  end_date    date
);

create table public.media (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid not null references public.profiles(id) on delete cascade,
  type          text not null,  -- 'clip', 'screenshot', 'portfolio'
  storage_path  text not null,
  caption       text
);

create table public.teams (
  id       uuid primary key default gen_random_uuid(),
  name     text not null,
  country  text
);

create table public.team_members (
  id          uuid primary key default gen_random_uuid(),
  team_id     uuid not null references public.teams(id) on delete cascade,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  role        text,
  unique (team_id, profile_id)
);

create table public.follows (
  follower_id  uuid not null references public.profiles(id) on delete cascade,
  followed_id  uuid not null references public.profiles(id) on delete cascade,
  primary key (follower_id, followed_id),
  check (follower_id <> followed_id)
);

-- ============================================================
-- ANALÍTICA — Nivel 1 (comportamiento)
-- ============================================================

create table public.events (
  id          bigint generated always as identity primary key,
  profile_id  uuid references public.profiles(id) on delete set null,
  session_id  text,
  name        text not null,
  properties  jsonb,
  created_at  timestamptz default now()
);

create index on public.events (profile_id, created_at);
create index on public.events (name, created_at);

-- ============================================================
-- ÍNDICES
-- ============================================================

create index on public.profiles using gin (display_name gin_trgm_ops);
create index on public.profiles (profile_type);
create index on public.profiles (country);

-- ============================================================
-- CATÁLOGO INICIAL DE JUEGOS
-- ============================================================

insert into public.games (name, slug) values
  ('Valorant', 'valorant'),
  ('League of Legends', 'lol'),
  ('Counter-Strike 2', 'cs2'),
  ('Fortnite', 'fortnite'),
  ('Apex Legends', 'apex'),
  ('Rainbow Six Siege', 'r6'),
  ('Rocket League', 'rocket-league'),
  ('FIFA / EA FC', 'eafc'),
  ('Dota 2', 'dota2'),
  ('Minecraft', 'minecraft');

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.profiles enable row level security;
alter table public.profile_games enable row level security;
alter table public.links enable row level security;
alter table public.experiences enable row level security;
alter table public.media enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.follows enable row level security;
alter table public.events enable row level security;

-- profiles: lectura pública, escritura solo el dueño
create policy "perfiles visibles para todos"
  on public.profiles for select using (true);

create policy "el dueño edita su perfil"
  on public.profiles for update using (auth.uid() = id);

create policy "el dueño crea su perfil"
  on public.profiles for insert with check (auth.uid() = id);

create policy "el dueño borra su perfil"
  on public.profiles for delete using (auth.uid() = id);

-- profile_games
create policy "profile_games lectura pública"
  on public.profile_games for select using (true);

create policy "profile_games escritura del dueño"
  on public.profile_games for all using (
    auth.uid() = (select id from public.profiles where id = profile_id)
  );

-- links
create policy "links lectura pública"
  on public.links for select using (true);

create policy "links escritura del dueño"
  on public.links for all using (auth.uid() = profile_id);

-- experiences
create policy "experiences lectura pública"
  on public.experiences for select using (true);

create policy "experiences escritura del dueño"
  on public.experiences for all using (auth.uid() = profile_id);

-- media
create policy "media lectura pública"
  on public.media for select using (true);

create policy "media escritura del dueño"
  on public.media for all using (auth.uid() = profile_id);

-- teams: lectura pública, sin restricción de escritura por ahora
create policy "teams lectura pública"
  on public.teams for select using (true);

-- team_members: lectura pública
create policy "team_members lectura pública"
  on public.team_members for select using (true);

-- follows: lectura pública, escritura del follower
create policy "follows lectura pública"
  on public.follows for select using (true);

create policy "follows escritura del follower"
  on public.follows for all using (auth.uid() = follower_id);

-- events: solo inserción (anónima o autenticada)
create policy "events inserción libre"
  on public.events for insert with check (true);

create policy "events lectura del dueño"
  on public.events for select using (auth.uid() = profile_id);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true),
  ('media', 'media', true),
  ('private', 'private', false);
