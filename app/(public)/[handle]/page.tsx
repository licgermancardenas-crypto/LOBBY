import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Profile, ProfileGame, Game, Link as ProfileLink } from "@/types/database"

type ProfileWithRelations = Profile & {
  profile_games: (ProfileGame & { games: Game | null })[]
  links: ProfileLink[]
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
  if (!profile) return { title: "Perfil no encontrado — LOBBY" }

  return {
    title: `${profile.display_name} (@${handle}) — LOBBY`,
    description: profile.bio ?? `Perfil profesional de ${profile.display_name} en LOBBY`,
  }
}

export default async function ProfilePage({ params }: Props) {
  const { handle } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("profiles")
    .select(`*, profile_games (*, games (name, slug)), links (*)`)
    .eq("handle", handle)
    .single()

  const profile = data as ProfileWithRelations | null
  if (!profile) notFound()

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
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
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline text-sm"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
