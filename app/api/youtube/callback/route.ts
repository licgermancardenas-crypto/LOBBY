import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient, tryServiceClient } from "@/lib/supabase/admin"
import { exchangeCode, getChannel } from "@/lib/youtube"

// Callback OAuth de YouTube: intercambia el code, lee suscriptores del canal
// y lo guarda como stat verificado del creador logueado.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const oauthError = searchParams.get("error")

  const done = (result: string) =>
    NextResponse.redirect(`${origin}/editar-perfil?youtube=${result}`)

  const cookieStore = await cookies()
  const savedState = cookieStore.get("youtube_oauth_state")?.value

  if (oauthError || !code || !state || !savedState || state !== savedState) {
    return done("error")
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${origin}/login`)

  try {
    const tokens = await exchangeCode(code)
    const channel = await getChannel(tokens.accessToken)

    // verified = true solo lo puede escribir el service role (trigger
    // channel_stats_guard_verified); sin la key, cae al cliente del usuario.
    const writer = tryServiceClient() ?? supabase
    const { error } = await writer.from("channel_stats").upsert(
      {
        profile_id: user.id,
        platform: "youtube",
        handle: channel.handle ?? channel.title,
        followers: channel.subscribers,
        verified: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "profile_id,platform" }
    )
    if (error) return done("error")

    // Guardar tokens para el refresh automático (best-effort).
    try {
      const admin = createServiceClient()
      await admin.from("platform_connections").upsert(
        {
          profile_id: user.id,
          platform: "youtube",
          external_id: channel.id,
          external_handle: channel.handle ?? channel.title,
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
          expires_at: new Date(Date.now() + tokens.expiresInSec * 1000).toISOString(),
          scopes: tokens.scopes,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "profile_id,platform" }
      )
    } catch {
      // sin refresh automático, pero la verificación puntual funcionó
    }
  } catch {
    return done("error")
  }

  const res = done("ok")
  res.cookies.delete("youtube_oauth_state")
  return res
}
