import { createBrowserClient } from "@supabase/ssr"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createClient() {
  if (!url || !anonKey) {
    // Error claro en vez del críptico de @supabase/ssr. Falta configurar
    // NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local
    // (local) y en Vercel → Settings → Environment Variables (producción).
    throw new Error(
      "Faltan las variables de Supabase (NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    )
  }

  return createBrowserClient(url, anonKey)
}
