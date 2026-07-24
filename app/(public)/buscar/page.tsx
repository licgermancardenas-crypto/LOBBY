import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import type { Profile } from "@/types/database"
import { TrackEvent } from "@/components/analytics/track-event"

type SearchParams = Promise<{
  juego?: string
  pais?: string
  tipo?: string
  q?: string
  orden?: string
}>

type ResultRow = Pick<
  Profile,
  "handle" | "display_name" | "profile_type" | "country" | "avatar_url" | "bio" | "created_at"
> & {
  channel_stats: { followers: number | null }[]
}

/** Formatea audiencia de forma compacta: 1234 → 1.2K, 2500000 → 2.5M. */
function formatAudience(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`
  return String(n)
}

export default async function BuscarPage({ searchParams }: { searchParams: SearchParams }) {
  const { juego, pais, tipo, q, orden } = await searchParams
  const supabase = await createClient()

  // Catálogos para los filtros (juegos + países reales que existen).
  const [{ data: gamesData }, { data: countryData }] = await Promise.all([
    supabase.from("games").select("slug, name").order("name"),
    supabase.from("profiles").select("country").not("country", "is", null),
  ])
  const games = gamesData ?? []
  const countries = [...new Set((countryData ?? []).map((r) => r.country as string))].sort()

  let query = supabase
    .from("profiles")
    .select(
      "handle, display_name, profile_type, country, avatar_url, bio, created_at, channel_stats(followers)"
    )
    .limit(200)

  if (tipo) query = query.eq("profile_type", tipo)
  if (pais) query = query.eq("country", pais)
  if (q) query = query.ilike("display_name", `%${q}%`)

  // Filtro por juego: resolvemos slug → perfiles que lo juegan.
  if (juego) {
    const { data: game } = await supabase.from("games").select("id").eq("slug", juego).single()
    const { data: pg } = game
      ? await supabase.from("profile_games").select("profile_id").eq("game_id", game.id)
      : { data: [] as { profile_id: string }[] }
    const ids = (pg ?? []).map((r) => r.profile_id)
    // Sin coincidencias → forzamos resultado vacío con un id imposible.
    query = query.in("id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"])
  }

  const { data } = await query
  const rows = (data ?? []) as ResultRow[]

  // Audiencia total por perfil (suma de followers de todos sus canales).
  const withAudience = rows.map((r) => ({
    ...r,
    audience: r.channel_stats.reduce((sum, c) => sum + (c.followers ?? 0), 0),
  }))

  const sortByRecent = orden === "recientes"
  withAudience.sort((a, b) =>
    sortByRecent
      ? b.created_at.localeCompare(a.created_at)
      : b.audience - a.audience
  )
  const profiles = withAudience.slice(0, 48)

  const hasQuery = Boolean(q || tipo || pais || juego)

  const selectClass =
    "px-4 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      {hasQuery && (
        <TrackEvent
          name="search_performed"
          properties={{
            q: q ?? null,
            tipo: tipo ?? null,
            pais: pais ?? null,
            juego: juego ?? null,
            orden: orden ?? "audiencia",
            results: profiles.length,
          }}
        />
      )}

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Explorar perfiles</h1>
        <p className="text-[var(--muted-foreground)]">
          Encontrá jugadores, devs, streamers y orgs de LATAM por juego, país y audiencia
        </p>
      </div>

      {/* Filtros */}
      <form className="flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre..."
          className={selectClass}
        />
        <select name="tipo" defaultValue={tipo} className={selectClass}>
          <option value="">Todos los tipos</option>
          <option value="player">Jugador</option>
          <option value="dev">Dev</option>
          <option value="streamer">Streamer</option>
          <option value="org">Org / Marca</option>
        </select>
        <select name="juego" defaultValue={juego} className={selectClass}>
          <option value="">Todos los juegos</option>
          {games.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <select name="pais" defaultValue={pais} className={selectClass}>
          <option value="">Todos los países</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select name="orden" defaultValue={orden} className={selectClass}>
          <option value="audiencia">Mayor audiencia</option>
          <option value="recientes">Más recientes</option>
        </select>
        <button
          type="submit"
          className="px-5 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg font-semibold text-sm"
        >
          Buscar
        </button>
      </form>

      {/* Resultados */}
      {profiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profiles.map((profile) => (
            <Link
              key={profile.handle}
              href={`/${profile.handle}`}
              className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)] transition-colors space-y-2"
            >
              <div className="flex items-center gap-3">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[var(--muted)] flex items-center justify-center font-bold text-sm">
                    {profile.display_name[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{profile.display_name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">
                    @{profile.handle}
                  </p>
                </div>
              </div>
              {profile.bio && (
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{profile.bio}</p>
              )}
              <div className="flex items-center gap-2 pt-1 text-xs">
                {profile.audience > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] border border-[var(--border)] font-medium">
                    {formatAudience(profile.audience)} seguidores
                  </span>
                )}
                {profile.country && (
                  <span className="text-[var(--muted-foreground)]">{profile.country}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted-foreground)]">No se encontraron perfiles.</p>
      )}
    </main>
  )
}
