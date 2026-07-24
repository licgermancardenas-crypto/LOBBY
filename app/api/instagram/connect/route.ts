import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAuthorizeUrl, isInstagramConfigured } from "@/lib/instagram"

// Inicia el flujo OAuth de Instagram para el creador logueado.
export async function GET(request: Request) {
  const { origin } = new URL(request.url)

  if (!isInstagramConfigured()) {
    return NextResponse.redirect(`${origin}/editar-perfil?instagram=config`)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${origin}/login`)

  const state = crypto.randomUUID()
  const res = NextResponse.redirect(getAuthorizeUrl(state))
  res.cookies.set("instagram_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  })
  return res
}
