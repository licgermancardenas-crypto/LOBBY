import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/admin"
import { refreshTokens, getFollowerCount } from "@/lib/twitch"

// Cron: refresca los stats de audiencia de los canales conectados.
// Vercel Cron invoca esta ruta con Authorization: Bearer <CRON_SECRET>.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  const auth = request.headers.get("authorization")
  if (!secret || auth !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const admin = createServiceClient()
  const { data: connections } = await admin
    .from("platform_connections")
    .select("id, profile_id, platform, external_id, external_handle, refresh_token")
    .eq("platform", "twitch")

  let updated = 0
  let failed = 0

  for (const conn of connections ?? []) {
    try {
      if (!conn.refresh_token || !conn.external_id) {
        failed++
        continue
      }

      const tokens = await refreshTokens(conn.refresh_token)
      const followers = await getFollowerCount(tokens.accessToken, conn.external_id)

      await admin.from("channel_stats").upsert(
        {
          profile_id: conn.profile_id,
          platform: "twitch",
          handle: conn.external_handle,
          followers,
          verified: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "profile_id,platform" }
      )

      await admin
        .from("platform_connections")
        .update({
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken ?? conn.refresh_token,
          expires_at: new Date(Date.now() + tokens.expiresInSec * 1000).toISOString(),
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
