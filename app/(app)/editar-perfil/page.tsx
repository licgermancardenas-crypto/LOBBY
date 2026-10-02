import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { siteUrl } from "@/lib/site"
import { displayUrl } from "@/lib/format"
import { EditProfileForm } from "@/components/perfil/edit-profile-form"
import type { Profile, Link as ProfileLink, ChannelStat } from "@/types/database"

// Página autenticada que monta un form con el cliente Supabase: no prerenderizar.
export const dynamic = "force-dynamic"

type Props = {
  searchParams: Promise<{
    twitch?: string
    youtube?: string
    tiktok?: string
    instagram?: string
  }>
}

function connectBanner(
  platform: string,
  result?: string
): { text: string; ok: boolean } | null {
  if (!result) return null
  if (result === "ok")
    return { text: `✓ ${platform} conectado. Tus seguidores quedaron verificados.`, ok: true }
  if (result === "config")
    return { text: `La conexión con ${platform} todavía no está configurada.`, ok: false }
  return { text: `No pudimos conectar ${platform}. Probá de nuevo.`, ok: false }
}

export default async function EditarPerfilPage({ searchParams }: Props) {
  const { twitch, youtube, tiktok, instagram } = await searchParams
  const banner =
    connectBanner("Twitch", twitch) ??
    connectBanner("YouTube", youtube) ??
    connectBanner("TikTok", tiktok) ??
    connectBanner("Instagram", instagram)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const profile = profileData as Profile | null
  if (!profile) redirect("/onboarding")

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", user.id)

  const { data: stats } = await supabase
    .from("channel_stats")
    .select("*")
    .eq("profile_id", user.id)

  const statByPlatform = stats as ChannelStat[] | null
  const findStat = (p: string) => statByPlatform?.find((s) => s.platform === p)
  const twitchStat = findStat("twitch")
  const youtubeStat = findStat("youtube")
  const tiktokStat = findStat("tiktok")
  const instagramStat = findStat("instagram")

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Editar perfil</h1>
          <p className="text-[var(--muted-foreground)] text-sm">{displayUrl(`${siteUrl}/${profile.handle}`)}</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/${profile.handle}`} className="text-[var(--accent)] hover:underline">
            Ver perfil →
          </Link>
          <Link
            href="/panel"
            className="px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg font-medium hover:border-[var(--accent)] transition-colors"
          >
            Volver al panel
          </Link>
        </div>
      </div>

      {banner && (
        <div
          className={`px-4 py-3 rounded-lg text-sm border ${
            banner.ok
              ? "bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]"
              : "bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)]"
          }`}
        >
          {banner.text}
        </div>
      )}

      {/* Verificar audiencia */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Verificar audiencia
        </h2>
        <VerifyRow platform="Twitch" connectPath="/api/twitch/connect" stat={twitchStat} />
        <VerifyRow platform="YouTube" connectPath="/api/youtube/connect" stat={youtubeStat} />
        <VerifyRow platform="TikTok" connectPath="/api/tiktok/connect" stat={tiktokStat} />
        <VerifyRow platform="Instagram" connectPath="/api/instagram/connect" stat={instagramStat} />
      </div>

      <EditProfileForm
        profile={profile}
        initialLinks={(links ?? []) as ProfileLink[]}
        initialStats={(stats ?? []) as ChannelStat[]}
      />
    </main>
  )
}

function VerifyRow({
  platform,
  connectPath,
  stat,
}: {
  platform: string
  connectPath: string
  stat?: ChannelStat
}) {
  const verified = Boolean(stat?.verified)
  return (
    <section className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl flex items-center justify-between gap-4">
      <div>
        <h3 className="font-semibold text-sm">{platform}</h3>
        <p className="text-[var(--muted-foreground)] text-xs mt-1">
          {verified
            ? `Conectado como ${stat?.handle ?? "tu canal"} · ${stat?.followers?.toLocaleString("es") ?? 0} seguidores verificados`
            : "Conectá tu canal para mostrar seguidores verificados en tu perfil."}
        </p>
      </div>
      <a
        href={connectPath}
        className="shrink-0 px-4 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        {verified ? "Actualizar" : `Conectar ${platform}`}
      </a>
    </section>
  )
}
