import { createClient } from "@supabase/supabase-js"

// Cliente con SERVICE ROLE: BYPASSEA RLS. Uso exclusivo server-side
// (callback OAuth, cron de refresh). Nunca importar desde componentes
// cliente ni exponer la key al navegador.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL y/o SERVICE_ROLE_KEY.")
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
