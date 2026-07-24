import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAuthorizeUrl, isTwitchConfigured } from "@/lib/twitch"

// Inicia el flujo OAuth de Twitch para el creador logueado.
export async function GET(request: Request) {
  const { origin } = new URL(request.url)

  if (!isTwitchConfigured()) {
    return NextResponse.redirect(`${origin}/editar-perfil?twitch=config`)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${origin}/login`)

  // state anti-CSRF: lo guardamos en cookie httpOnly y lo validamos en el callback.
  const state = crypto.randomUUID()
  const res = NextResponse.redirect(getAuthorizeUrl(state))
  res.cookies.set("twitch_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  })
  return res
}
