// Handles que no puede tomar un usuario porque chocan con rutas de la app
// (/buscar, /panel, /terminos…) o con rutas que probablemente sumemos.
// Si un usuario tomara uno, su perfil en /[handle] quedaría tapado por la ruta.
// ⚠️ Mantener en sync con el check `profiles_handle_not_reserved` de
// supabase/migrations/20261002120100_reserved_handles.sql.
export const RESERVED_HANDLES = new Set([
  // rutas que existen hoy
  "api", "auth", "buscar", "login", "registro", "onboarding", "panel",
  "terminos", "privacidad",
  // rutas probables / nombres sensibles
  "admin", "ayuda", "blog", "contacto", "empresas", "explorar", "legal",
  "lobby", "marcas", "mensajes", "precios", "settings", "soporte", "www",
])
