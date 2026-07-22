-- Supabase habilita RLS por defecto en tablas nuevas de public. schema.sql
-- no lo pedía para games, así que sin política de select el catálogo
-- quedaba invisible para anon/authenticated (RLS filtra sin dar error).

create policy "games lectura pública"
  on public.games for select using (true);
