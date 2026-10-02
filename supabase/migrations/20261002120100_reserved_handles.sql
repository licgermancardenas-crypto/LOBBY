-- ============================================================
-- LOBBY — handles reservados
-- Un perfil en /[handle] queda tapado si su handle coincide con
-- una ruta de la app (/buscar, /panel, /terminos…). Se bloquea en
-- la base para que no dependa solo del formulario.
-- `not valid`: no revisa filas existentes (si alguna choca, se
-- corrige a mano), pero sí aplica a todo insert/update nuevo.
-- Mantener en sync con lib/reserved-handles.ts.
-- ============================================================

alter table public.profiles
  add constraint profiles_handle_not_reserved
  check (handle not in (
    'api', 'auth', 'buscar', 'login', 'registro', 'onboarding', 'panel',
    'terminos', 'privacidad',
    'admin', 'ayuda', 'blog', 'contacto', 'empresas', 'explorar', 'legal',
    'lobby', 'marcas', 'mensajes', 'precios', 'settings', 'soporte', 'www'
  ))
  not valid;
