import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { BadgeCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { siteUrl } from "@/lib/site"
import { PLATFORM_LABELS, displayUrl, formatCount } from "@/lib/format"
import { Wordmark } from "@/components/brand/wordmark"
import { TrackEvent } from "@/components/analytics/track-event"
import { TrackedLink } from "@/components/analytics/tracked-link"
import { ShareActions } from "@/components/perfil/share-actions"
import type { Profile, ProfileGame, Game, Link as ProfileLink, ChannelStat } from "@/types/database"

// Media kit: la versión "para marcas" del perfil. Un link que el creador manda
// tal cual (o como PDF), con la audiencia separada en verificada y auto-reportada.

type KitProfile = Profile & {
  profile_games: (ProfileGame & { games: Pick<Game, "name"> | null })[]
  links: ProfileLink[]
  channel_stats: ChannelStat[]
}

type Props = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const supabase = await createClient()
  const { data } = await supabase.from("profiles").select("display_name").eq("handle", handle).single()
  const profile = data as Pick<Profile, "display_name"> | null
  if (!profile) return { title: "Perfil no encontrado", robots: { index: false, follow: false } }

  const title = `Media kit de ${profile.display_name}`
  const description = `Audiencia verificada de ${profile.display_name} (@${handle}) en Lobby.`
  return {
    title,
    description,
    alternates: { canonical: `/${handle}/kit` },
    openGraph: { title, description, url: `/${handle}/kit` },
    twitter: { card: "summary_large_image", title, description },
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })
}

export default async function MediaKitPage({ params }: Props) {
  const { handle } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select(`*, profile_games (*, games (name)), links (*), channel_stats (*)`)
    .eq("handle", handle)
    .single()

  const profile = data as KitProfile | null
  if (!profile) notFound()

  // Verificados primero y, dentro de cada grupo, de mayor a menor audiencia.
  const stats = [...(profile.channel_stats ?? [])].sort(
    (a, b) => Number(b.verified) - Number(a.verified) || (b.followers ?? 0) - (a.followers ?? 0)
  )
  const total = stats.reduce((sum, s) => sum + (s.followers ?? 0), 0)
  const verifiedTotal = stats.filter((s) => s.verified).reduce((sum, s) => sum + (s.followers ?? 0), 0)
  const verifiedPct = total > 0 ? Math.round((verifiedTotal / total) * 100) : 0
  const hasSelfReported = stats.some((s) => !s.verified)
  const lastUpdate = stats
    .filter((s) => s.verified)
    .map((s) => s.updated_at)
    .sort()
    .at(-1)

  const kitUrl = `${siteUrl}/${handle}/kit`

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 sm:py-14 space-y-6 print:py-0 print:space-y-4">
      <TrackEvent name="media_kit_viewed" profileId={profile.id} properties={{ handle }} />

      <div className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Lobby">
          <Wordmark className="h-7 w-auto text-[var(--cream)]" />
        </Link>
        <p className="text-[var(--lilac)] text-xs font-semibold tracking-[0.25em] uppercase">Media kit</p>
      </div>

      {/* Identidad */}
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
        <div className="flex items-center gap-5">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element -- avatar de URL arbitraria del usuario
            <img
              src={profile.avatar_url}
              alt={profile.display_name}
              className="size-20 sm:size-24 rounded-full object-cover border-2 border-[var(--lilac)]"
            />
          ) : (
            <div className="size-20 sm:size-24 shrink-0 rounded-full bg-[var(--muted)] border-2 border-[var(--lilac)] flex items-center justify-center text-3xl font-bold font-[family-name:var(--font-heading)]">
              {profile.display_name[0].toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white break-words">
              {profile.display_name}
            </h1>
            <p className="text-[var(--lavender)]">
              @{handle}
              {profile.country ? ` · ${profile.country}` : ""}
            </p>
          </div>
        </div>
        {profile.bio && <p className="mt-6 leading-relaxed text-[var(--foreground)]/90">{profile.bio}</p>}
      </section>

      {/* Audiencia */}
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6">
        {stats.length === 0 ? (
          <p className="text-[var(--muted-foreground)]">Este creador todavía no cargó su audiencia.</p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-[var(--lilac)] text-xs font-semibold tracking-[0.25em] uppercase">
                  Audiencia total
                </p>
                <p className="mt-1 font-[family-name:var(--font-heading)] text-6xl font-bold text-[var(--peach)] tabular-nums">
                  {formatCount(total)}
                </p>
              </div>
              {verifiedTotal > 0 && (
                <div className="sm:text-right">
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-[var(--lilac)]/15 px-3 py-1 text-sm font-semibold text-[var(--lilac)]">
                    <BadgeCheck className="size-4" /> {verifiedPct}% verificada
                  </p>
                  {lastUpdate && (
                    <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                      Actualizado el {formatDate(lastUpdate)}
                    </p>
                  )}
                </div>
              )}
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {stats.map((s) => (
                <li
                  key={s.id}
                  className={`rounded-2xl border p-4 ${
                    s.verified ? "border-[var(--lilac)]/50 bg-[var(--lilac)]/[0.07]" : "border-[var(--border)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{PLATFORM_LABELS[s.platform] ?? s.platform}</p>
                    {s.verified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--lilac)]">
                        <BadgeCheck className="size-3.5" /> Verificado
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--muted-foreground)]">Auto-reportado</span>
                    )}
                  </div>
                  <p className="mt-2 text-3xl font-bold tabular-nums">{formatCount(s.followers)}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {s.platform === "youtube" ? "suscriptores" : "seguidores"}
                    {s.avg_views !== null ? ` · ${formatCount(s.avg_views)} vistas promedio` : ""}
                    {s.handle ? ` · ${s.handle}` : ""}
                  </p>
                </li>
              ))}
            </ul>

            <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
              <span className="text-[var(--lilac)] font-semibold">Verificado</span>: Lobby lee el número
              directo de la plataforma con autorización del creador y lo actualiza solo.
              {hasSelfReported && " Auto-reportado: lo cargó el creador y Lobby no lo comprobó."}
            </p>
          </>
        )}
      </section>

      {/* Juegos y links */}
      {(profile.profile_games?.length > 0 || profile.links?.length > 0) && (
        <section className="grid gap-6 sm:grid-cols-2 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          {profile.profile_games?.length > 0 && (
            <div>
              <p className="text-[var(--lilac)] text-xs font-semibold tracking-[0.25em] uppercase">Juegos</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.profile_games.map((pg) => (
                  <span key={pg.id} className="px-3 py-1 bg-[var(--muted)] rounded-full text-sm">
                    {pg.games?.name}
                    {pg.rank ? ` · ${pg.rank}` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
          {profile.links?.length > 0 && (
            <div>
              <p className="text-[var(--lilac)] text-xs font-semibold tracking-[0.25em] uppercase">Contacto y canales</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {profile.links.map((link) => (
                  <li key={link.id} className="truncate">
                    <span className="text-[var(--muted-foreground)] capitalize">{link.platform}: </span>
                    <TrackedLink
                      href={link.url}
                      profileId={profile.id}
                      properties={{ handle, platform: link.platform, url: link.url, source: "media_kit" }}
                      className="text-[var(--foreground)] hover:text-[var(--lilac)] underline-offset-2 hover:underline"
                    >
                      {displayUrl(link.url)}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 print:pt-0">
        <ShareActions url={kitUrl} profileId={profile.id} printable />
        <p className="text-sm text-[var(--muted-foreground)]">
          {displayUrl(kitUrl)}
          <span className="print:hidden">
            {" "}·{" "}
            <Link href={`/${handle}`} className="text-[var(--lilac)] hover:underline">
              Ver perfil completo
            </Link>
          </span>
        </p>
      </div>
    </main>
  )
}
