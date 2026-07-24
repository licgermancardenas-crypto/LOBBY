import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/admin"
import { refreshTokens as refreshTwitch, getFollowerCount } from "@/lib/twitch"
import { refreshTokens as refreshYouTube, getChannel } from "@/lib/youtube"
import { refreshTokens as refreshTikTok, getUser as getTikTokUser } from "@/lib/tiktok"
import { refreshTokens as refreshInstagram, getProfile as getInstagramProfile } from "@/lib/instagram"

// Cron: refresca los stats de audiencia de los canales conectados.
// Vercel Cron invoca esta ruta con Authorization: Bearer <CRON_SECRET>.

type Connection = {
  id: string
  profile_id: string
  platform: string
  external_id: string | null
  external_handle: string | null
  access_token: string
  refresh_token: string | null
}

// Refresca una conexión y devuelve los followers + tokens nuevos, o null si
// la plataforma no está soportada / faltan datos.
async function refreshOne(conn: Connection) {
  if (conn.platform === "twitch") {
    if (!conn.refresh_token || !conn.external_id) return null
    const tokens = await refreshTwitch(conn.refresh_token)
    const followers = await getFollowerCount(tokens.accessToken, conn.external_id)
    return { followers, handle: conn.external_handle, tokens }
  }

  if (conn.platform === "youtube") {
    if (!conn.refresh_token) return null
    const tokens = await refreshYouTube(conn.refresh_token)
    const channel = await getChannel(tokens.accessToken)
    return { followers: channel.subscribers, handle: channel.handle ?? conn.external_handle, tokens }
  }

  if (conn.platform === "tiktok") {
    if (!conn.refresh_token) return null
    const tokens = await refreshTikTok(conn.refresh_token)
    const tk = await getTikTokUser(tokens.accessToken)
    return { followers: tk.followers, handle: tk.handle ?? conn.external_handle, tokens }
  }

  if (conn.platform === "instagram") {
    // Instagram no usa refresh_token: refresca su token de larga duración.
    const tokens = await refreshInstagram(conn.access_token)
    const ig = await getInstagramProfile(tokens.accessToken)
    return { followers: ig.followers, handle: ig.handle ?? conn.external_handle, tokens }
  }

  return null
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  const auth = request.headers.get("authorization")
  if (!secret || auth !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const admin = createServiceClient()
  const { data: connections } = await admin
    .from("platform_connections")
    .select("id, profile_id, platform, external_id, external_handle, access_token, refresh_token")

  let updated = 0
  let failed = 0

  for (const conn of (connections ?? []) as Connection[]) {
    try {
      const result = await refreshOne(conn)
      if (!result) {
        failed++
        continue
      }

      await admin.from("channel_stats").upsert(
        {
          profile_id: conn.profile_id,
          platform: conn.platform,
          handle: result.handle,
          followers: result.followers,
          verified: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "profile_id,platform" }
      )

      await admin
        .from("platform_connections")
        .update({
          access_token: result.tokens.accessToken,
          // Google no devuelve refresh_token nuevo: conservamos el existente.
          refresh_token: result.tokens.refreshToken ?? conn.refresh_token,
          expires_at: new Date(Date.now() + result.tokens.expiresInSec * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", conn.id)

      updated++
    } catch {
      // p.ej. el usuario revocó el acceso: dejamos el stat como estaba
      failed++
    }
  }

  return NextResponse.json({ updated, failed })
}
