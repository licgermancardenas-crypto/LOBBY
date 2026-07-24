import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/admin"
import { exchangeCode, getUser, getFollowerCount } from "@/lib/twitch"

// Callback OAuth de Twitch: intercambia el code, lee el total de followers
// del canal y lo guarda como stat verificado del creador logueado.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const oauthError = searchParams.get("error")

  const done = (result: string) =>
    NextResponse.redirect(`${origin}/editar-perfil?twitch=${result}`)

  const cookieStore = await cookies()
  const savedState = cookieStore.get("twitch_oauth_state")?.value

  // Validaciones de seguridad: sin error, con code, y state que coincide.
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
    const twitchUser = await getUser(tokens.accessToken)
    const followers = await getFollowerCount(tokens.accessToken, twitchUser.id)

    // Upsert por (profile_id, platform); RLS deja escribir solo al dueño.
    const { error } = await supabase.from("channel_stats").upsert(
      {
        profile_id: user.id,
        platform: "twitch",
        handle: twitchUser.login,
        followers,
        verified: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "profile_id,platform" }
    )
    if (error) return done("error")

    // Guardar tokens para el refresh automático. Best-effort: si el service
    // role no está configurado, la conexión igual quedó verificada arriba.
    try {
      const admin = createServiceClient()
      await admin.from("platform_connections").upsert(
        {
          profile_id: user.id,
          platform: "twitch",
          external_id: twitchUser.id,
          external_handle: twitchUser.login,
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
  res.cookies.delete("twitch_oauth_state")
  return res
}
