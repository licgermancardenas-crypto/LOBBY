"use server"

import { createClient } from "@/lib/supabase/server"

export type WaitlistState = { ok: boolean; error: string | null }

const ROLES = ["marca", "agencia", "org", "otro"] as const

export async function joinBrandWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const company = String(formData.get("company") ?? "").trim()
  const role = String(formData.get("role") ?? "")

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "Ingresá un email válido." }
  }
  if (!company || company.length > 120) {
    return { ok: false, error: "Ingresá el nombre de tu empresa." }
  }
  if (!ROLES.includes(role as (typeof ROLES)[number])) {
    return { ok: false, error: "Elegí qué tipo de empresa sos." }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from("brand_waitlist").insert({ email, company, role })
    // 23505 = email ya anotado: para el usuario es un éxito igual.
    if (error && error.code !== "23505") {
      console.error("brand_waitlist insert:", error)
      return { ok: false, error: "No pudimos anotarte. Probá de nuevo en un rato." }
    }
  } catch (e) {
    console.error("brand_waitlist:", e)
    return { ok: false, error: "No pudimos anotarte. Probá de nuevo en un rato." }
  }

  return { ok: true, error: null }
}
