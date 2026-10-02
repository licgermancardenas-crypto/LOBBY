import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"
import type { ProfileType } from "@/types/database"
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "@/components/brand/wordmark"

export const alt = "Perfil en Lobby"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const TYPE_LABELS: Record<ProfileType, string> = {
  player: "Jugador",
  dev: "Dev",
  streamer: "Streamer",
  org: "Org / Marca",
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`
  return String(n)
}

export default async function Image({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select("display_name, handle, profile_type, country, channel_stats(followers)")
    .eq("handle", handle)
    .single()

  const profile = data as
    | {
        display_name: string
        handle: string
        profile_type: ProfileType
        country: string | null
        channel_stats: { followers: number | null }[]
      }
    | null

  const name = profile?.display_name ?? "Perfil no encontrado"
  const audience =
    profile?.channel_stats.reduce((sum, c) => sum + (c.followers ?? 0), 0) ?? 0

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1a1023",
          color: "#fbf3e7",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <svg viewBox={WORDMARK_VIEWBOX} width={190} height={55}>
          <path fill="#fbf3e7" fillRule="evenodd" d={WORDMARK_PATH} />
        </svg>

        {/* Identidad */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 180,
              height: 180,
              borderRadius: 180,
              background: "#ffd45a",
              color: "#1a1023",
              fontSize: 96,
              fontWeight: 900,
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>{name}</div>
            <div style={{ fontSize: 36, color: "#b9aded", marginTop: 8 }}>
              @{profile?.handle ?? handle}
              {profile?.country ? ` · ${profile.country}` : ""}
            </div>
          </div>
        </div>

        {/* Footer: tipo + audiencia */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#fbf3e7",
              background: "#2a1b3d",
              border: "1px solid #3b2a57",
              padding: "12px 28px",
              borderRadius: 999,
            }}
          >
            {profile ? TYPE_LABELS[profile.profile_type] : "Lobby"}
          </div>
          {audience > 0 && (
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontSize: 64, fontWeight: 900, color: "#ffd45a" }}>
                {formatCount(audience)}
              </span>
              <span style={{ fontSize: 32, color: "#b9aded" }}>seguidores</span>
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}
