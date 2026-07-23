"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { ProfileType } from "@/types/database"
import {
  AudienceEditor,
  LinksEditor,
  toInt,
  type LinkRow,
  type StatRow,
} from "@/components/perfil/media-inputs"

const PROFILE_TYPES: { value: ProfileType; label: string; desc: string }[] = [
  { value: "player", label: "Jugador", desc: "Esports, competitivo, torneos" },
  { value: "dev", label: "Desarrollador", desc: "Juegos, herramientas, tech" },
  { value: "streamer", label: "Streamer / Creador", desc: "Contenido, comunidad" },
  { value: "org", label: "Org / Marca", desc: "Equipo, empresa, sponsor" },
]

export function OnboardingForm({ userId }: { userId: string }) {
  const [handle, setHandle] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [profileType, setProfileType] = useState<ProfileType>("player")
  const [country, setCountry] = useState("")
  const [bio, setBio] = useState("")
  const [links, setLinks] = useState<LinkRow[]>([])
  const [stats, setStats] = useState<StatRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const cleanHandle = handle.toLowerCase().replace(/[^a-z0-9_]/g, "")

    const { error } = await supabase.from("profiles").insert([{
      id: userId,
      handle: cleanHandle,
      display_name: displayName,
      profile_type: profileType,
      country: country || null,
      bio: bio || null,
    }])

    if (error) {
      if (error.code === "23505") {
        setError("Ese handle ya está en uso, elegí otro")
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }

    // Links y stats son opcionales: best-effort, no bloquean el onboarding.
    // El perfil ya existe; lo que falte se completa después en /editar-perfil.
    const cleanLinks = links
      .filter((l) => l.platform.trim() && l.url.trim())
      .map((l) => ({ profile_id: userId, platform: l.platform.trim(), url: l.url.trim() }))
    if (cleanLinks.length) {
      await supabase.from("links").insert(cleanLinks)
    }

    const cleanStats = stats
      .filter((s) => s.platform)
      .map((s) => ({
        profile_id: userId,
        platform: s.platform,
        handle: s.handle.trim() || null,
        followers: toInt(s.followers),
        avg_views: toInt(s.avg_views),
      }))
    if (cleanStats.length) {
      await supabase.from("channel_stats").insert(cleanStats)
    }

    router.push("/panel")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Handle */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Tu handle público</label>
        <div className="flex items-center gap-1 px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-lg focus-within:border-[var(--accent)]">
          <span className="text-[var(--muted-foreground)] text-sm">lobby.app/</span>
          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
            placeholder="tu_handle"
            required
            minLength={3}
            maxLength={30}
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Nombre */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Nombre que aparece en tu perfil</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Tu nombre o apodo"
          required
          className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {/* Tipo de perfil */}
      <div className="space-y-2">
        <label className="text-sm font-medium">¿Qué sos?</label>
        <div className="grid grid-cols-2 gap-2">
          {PROFILE_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setProfileType(t.value)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                profileType === t.value
                  ? "border-[var(--accent)] bg-[var(--muted)]"
                  : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
              }`}
            >
              <p className="text-sm font-semibold">{t.label}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* País */}
      <div className="space-y-1">
        <label className="text-sm font-medium">País</label>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Argentina, México, Colombia..."
          className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {/* Bio */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Bio corta</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Contá quién sos en pocas palabras..."
          rows={3}
          maxLength={300}
          className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] resize-none"
        />
        <p className="text-xs text-[var(--muted-foreground)] text-right">{bio.length}/300</p>
      </div>

      {/* Audiencia y links — opcionales, se pueden completar después */}
      <div className="pt-2 border-t border-[var(--border)] space-y-6">
        <p className="text-xs text-[var(--muted-foreground)]">
          Opcional — podés completarlo ahora o más tarde desde tu perfil.
        </p>
        <AudienceEditor stats={stats} onChange={setStats} />
        <LinksEditor links={links} onChange={setLinks} />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[var(--accent)] text-[var(--accent-foreground)] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Creando perfil..." : "Crear mi perfil"}
      </button>
    </form>
  )
}
