import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import type { Profile } from "@/types/database"

type SearchParams = Promise<{ juego?: string; pais?: string; tipo?: string; q?: string }>

export default async function BuscarPage({ searchParams }: { searchParams: SearchParams }) {
  const { pais, tipo, q } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("profiles")
    .select("handle, display_name, profile_type, country, avatar_url, bio")
    .limit(48)

  if (tipo) query = query.eq("profile_type", tipo)
  if (pais) query = query.eq("country", pais)
  if (q) query = query.ilike("display_name", `%${q}%`)

  const { data } = await query
  const profiles = (data ?? []) as Pick<Profile, "handle" | "display_name" | "profile_type" | "country" | "avatar_url" | "bio">[]

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Explorar perfiles</h1>
        <p className="text-[var(--muted-foreground)]">
          Encontrá jugadores, devs, streamers y orgs de LATAM
        </p>
      </div>

      {/* Filtros */}
      <form className="flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre..."
          className="px-4 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        <select
          name="tipo"
          defaultValue={tipo}
          className="px-4 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none"
        >
          <option value="">Todos los tipos</option>
          <option value="player">Jugador</option>
          <option value="dev">Dev</option>
          <option value="streamer">Streamer</option>
          <option value="org">Org / Marca</option>
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
                <div>
                  <p className="font-semibold text-sm">{profile.display_name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">@{profile.handle}</p>
                </div>
              </div>
              {profile.bio && (
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{profile.bio}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted-foreground)]">No se encontraron perfiles.</p>
      )}
    </main>
  )
}
