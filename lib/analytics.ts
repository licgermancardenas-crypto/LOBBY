import { createClient } from "@/lib/supabase/client"

// Analítica nivel 1 (comportamiento). Best-effort: nunca rompe la UI.
// Convención de nombres: objeto_acción, en minúscula (no renombrar después).

const SESSION_KEY = "lobby_session_id"

/** ID de sesión anónimo, estable por navegador (para agrupar eventos). */
function getSessionId(): string {
  if (typeof window === "undefined") return "server"
  try {
    let id = localStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return "unknown"
  }
}

type TrackOptions = {
  /**
   * Perfil al que refiere el evento. Para `profile_viewed` /
   * `external_link_clicked` es el perfil VISTO (así su dueño puede leer sus
   * propios eventos vía RLS). Para acciones del actor, su propio id. Null si
   * es anónimo o si el perfil todavía no existe.
   */
  profileId?: string | null
  properties?: Record<string, unknown>
}

/** Registra un evento en la tabla `events`. Silencioso ante cualquier error. */
export async function track(
  name: string,
  { profileId = null, properties = {} }: TrackOptions = {}
): Promise<void> {
  try {
    const supabase = createClient()
    await supabase.from("events").insert({
      profile_id: profileId,
      session_id: getSessionId(),
      name,
      properties,
    })
  } catch {
    // best-effort: la analítica jamás debe romper la experiencia
  }
}
