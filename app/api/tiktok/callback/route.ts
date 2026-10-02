import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient, tryServiceClient } from "@/lib/supabase/admin"
import { exchangeCode, getUser } from "@/lib/tiktok"

// Callback OAuth de TikTok: intercambia el code, lee followers y lo guarda
// como stat verificado del creador logueado.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const oauthError = searchParams.get("error")

  const done = (result: string) =>
    NextResponse.redirect(`${origin}/editar-perfil?tiktok=${result}`)

  const cookieStore = await cookies()
  const savedState = cookieStore.get("tiktok_oauth_state")?.value

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
    const tiktokUser = await getUser(tokens.accessToken)

    // verified = true solo lo puede escribir el service role (trigger
    // channel_stats_guard_verified); sin la key, cae al cliente del usuario.
    const writer = tryServiceClient() ?? supabase
    const { error } = await writer.from("channel_stats").upsert(
      {
        profile_id: user.id,
        platform: "tiktok",
        handle: tiktokUser.handle,
        followers: tiktokUser.followers,
        verified: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "profile_id,platform" }
    )
    if (error) return done("error")

    try {
      const admin = createServiceClient()
      await admin.from("platform_connections").upsert(
        {
          profile_id: user.id,
          platform: "tiktok",
          external_id: tiktokUser.openId,
          external_handle: tiktokUser.handle,
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
  res.cookies.delete("tiktok_oauth_state")
  return res
}
