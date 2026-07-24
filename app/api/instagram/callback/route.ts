import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/admin"
import { exchangeCode, getProfile } from "@/lib/instagram"

// Callback OAuth de Instagram: intercambia el code por un token de larga
// duración, lee followers_count y lo guarda como stat verificado.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const oauthError = searchParams.get("error")

  const done = (result: string) =>
    NextResponse.redirect(`${origin}/editar-perfil?instagram=${result}`)

  const cookieStore = await cookies()
  const savedState = cookieStore.get("instagram_oauth_state")?.value

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
    const profile = await getProfile(tokens.accessToken)

    const { error } = await supabase.from("channel_stats").upsert(
      {
        profile_id: user.id,
        platform: "instagram",
        handle: profile.handle,
        followers: profile.followers,
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
          platform: "instagram",
          external_id: profile.id,
          external_handle: profile.handle,
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
  res.cookies.delete("instagram_oauth_state")
  return res
}
