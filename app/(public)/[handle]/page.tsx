import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { TrackEvent } from "@/components/analytics/track-event"
import { TrackedLink } from "@/components/analytics/tracked-link"
import { siteUrl } from "@/lib/site"
import type { Profile, ProfileGame, Game, Link as ProfileLink, ChannelStat } from "@/types/database"

type ProfileWithRelations = Profile & {
  profile_games: (ProfileGame & { games: Game | null })[]
  links: ProfileLink[]
  channel_stats: ChannelStat[]
}

const PLATFORM_LABELS: Record<string, string> = {
  twitch: "Twitch",
  youtube: "YouTube",
  tiktok: "TikTok",
  kick: "Kick",
  instagram: "Instagram",
  x: "X",
}

function formatCount(n: number | null): string {
  if (n === null) return "—"
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`
  return n.toString()
}

type Props = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select("display_name, bio")
    .eq("handle", handle)
    .single()

  const profile = data as Pick<Profile, "display_name" | "bio"> | null
  if (!profile) {
    return { title: "Perfil no encontrado", robots: { index: false, follow: false } }
  }

  const title = `${profile.display_name} (@${handle})`
  const description =
    profile.bio ?? `Perfil profesional de ${profile.display_name} en LOBBY`
  const url = `/${handle}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function ProfilePage({ params }: Props) {
  const { handle } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("profiles")
    .select(`*, profile_games (*, games (name, slug)), links (*), channel_stats (*)`)
    .eq("handle", handle)
    .single()

  const profile = data as ProfileWithRelations | null
  if (!profile) notFound()

  // Datos estructurados (schema.org) para SEO / rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: profile.created_at,
    mainEntity: {
      "@type": "Person",
      name: profile.display_name,
      alternateName: `@${handle}`,
      url: `${siteUrl}/${handle}`,
      ...(profile.avatar_url ? { image: profile.avatar_url } : {}),
      ...(profile.bio ? { description: profile.bio } : {}),
      ...(profile.links?.length
        ? { sameAs: profile.links.map((l) => l.url) }
        : {}),
    },
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackEvent name="profile_viewed" profileId={profile.id} properties={{ handle }} />

      {/* Header */}
      <div className="flex items-start gap-4">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.display_name}
            className="w-20 h-20 rounded-full object-cover border border-[var(--border)]"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[var(--muted)] flex items-center justify-center text-2xl font-bold">
            {profile.display_name[0].toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{profile.display_name}</h1>
          <p className="text-[var(--muted-foreground)]">@{handle}</p>
          {profile.country && (
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{profile.country}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="leading-relaxed">{profile.bio}</p>
      )}

      {/* Audiencia (media kit) */}
      {profile.channel_stats?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Audiencia
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {profile.channel_stats.map((stat) => (
              <div
                key={stat.id}
                className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl"
              >
                <div className="flex items-center gap-1.5">
                  <p className="text-[var(--muted-foreground)] text-xs uppercase tracking-wider">
                    {PLATFORM_LABELS[stat.platform] ?? stat.platform}
                  </p>
                  {stat.verified && (
                    <span
                      title="Audiencia verificada"
                      className="text-[var(--accent)] text-xs font-semibold"
                    >
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold mt-1">{formatCount(stat.followers)}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  seguidores{stat.handle ? ` · ${stat.handle}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Juegos */}
      {profile.profile_games?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Juegos
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.profile_games.map((pg) => (
              <span
                key={pg.id}
                className="px-3 py-1 bg-[var(--muted)] rounded-full text-sm"
              >
                {pg.games?.name} {pg.rank && `· ${pg.rank}`}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      {profile.links?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Links
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.links.map((link) => (
              <TrackedLink
                key={link.id}
                href={link.url}
                profileId={profile.id}
                properties={{ handle, platform: link.platform, url: link.url }}
                className="text-[var(--accent)] hover:underline text-sm"
              >
                {link.platform}
              </TrackedLink>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
