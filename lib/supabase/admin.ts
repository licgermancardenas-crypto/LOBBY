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

/**
 * Igual que createServiceClient, pero devuelve null si falta la key en vez de
 * tirar. Para escrituras que preferimos hacer como Lobby (stats verificados)
 * pero que no deben romper el flujo si el entorno no tiene el service role.
 */
export function tryServiceClient() {
  try {
    return createServiceClient()
  } catch {
    return null
  }
}
