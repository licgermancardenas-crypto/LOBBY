-- ============================================================
-- LOBBY — solo Lobby puede marcar stats como verificados
-- La política "channel_stats escritura del dueño" deja al creador
-- escribir su fila con cualquier valor, incluido verified = true:
-- con la anon key alguien podría inventarse una audiencia
-- "verificada". Este trigger lo impide para los roles del cliente
-- (anon / authenticated): sus inserts y updates quedan siempre
-- como auto-reportados, y una fila verificada no se puede editar.
-- Los callbacks OAuth y el cron escriben con el service role, que
-- no pasa por esta restricción. Borrar la propia fila sigue
-- permitido (desconectar un canal no falsea nada).
-- ============================================================

create or replace function public.channel_stats_guard_verified()
returns trigger
language plpgsql
as $$
begin
  if current_user not in ('anon', 'authenticated') then
    return new;
  end if;

  if tg_op = 'UPDATE' and old.verified then
    raise exception 'Los stats verificados solo los actualiza Lobby'
      using errcode = '42501';
  end if;

  new.verified := false;
  return new;
end;
$$;

create trigger channel_stats_guard_verified
  before insert or update on public.channel_stats
  for each row execute function public.channel_stats_guard_verified();
