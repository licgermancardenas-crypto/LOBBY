import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function createClient() {
  if (!url || !anonKey) {
    // Error claro en vez del críptico de @supabase/ssr. Ver lib/supabase/client.ts.
    throw new Error(
      "Faltan las variables de Supabase (NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    )
  }

  const cookieStore = await cookies()

  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
