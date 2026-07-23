"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2, Plus } from "lucide-react"
import type { Profile, Link, ChannelStat, Platform } from "@/types/database"

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "twitch", label: "Twitch" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "kick", label: "Kick" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X" },
]

type LinkRow = { platform: string; url: string }
type StatRow = { platform: Platform; handle: string; followers: string; avg_views: string }

type Props = {
  profile: Profile
  initialLinks: Link[]
  initialStats: ChannelStat[]
}

export function EditProfileForm({ profile, initialLinks, initialStats }: Props) {
  const supabase = createClient()
  const router = useRouter()

  const [displayName, setDisplayName] = useState(profile.display_name)
  const [country, setCountry] = useState(profile.country ?? "")
  const [bio, setBio] = useState(profile.bio ?? "")
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "")

  const [links, setLinks] = useState<LinkRow[]>(
    initialLinks.map((l) => ({ platform: l.platform, url: l.url }))
  )
  const [stats, setStats] = useState<StatRow[]>(
    initialStats.map((s) => ({
      platform: s.platform,
      handle: s.handle ?? "",
      followers: s.followers?.toString() ?? "",
      avg_views: s.avg_views?.toString() ?? "",
    }))
  )

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  function toInt(v: string): number | null {
    const n = parseInt(v, 10)
    return Number.isFinite(n) && n >= 0 ? n : null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)

    // 1. Perfil base
    const { error: pErr } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        country: country || null,
        bio: bio || null,
        avatar_url: avatarUrl || null,
      })
      .eq("id", profile.id)

    if (pErr) {
      setError(pErr.message)
      setSaving(false)
      return
    }

    // 2. Links — reemplazo completo (borrar + insertar el set actual)
    await supabase.from("links").delete().eq("profile_id", profile.id)
    const cleanLinks = links
      .filter((l) => l.platform.trim() && l.url.trim())
      .map((l) => ({ profile_id: profile.id, platform: l.platform.trim(), url: l.url.trim() }))
    if (cleanLinks.length) {
      const { error: lErr } = await supabase.from("links").insert(cleanLinks)
      if (lErr) {
        setError(lErr.message)
        setSaving(false)
        return
      }
    }

    // 3. Stats de audiencia — reemplazo completo
    await supabase.from("channel_stats").delete().eq("profile_id", profile.id)
    const cleanStats = stats
      .filter((s) => s.platform)
      .map((s) => ({
        profile_id: profile.id,
        platform: s.platform,
        handle: s.handle.trim() || null,
        followers: toInt(s.followers),
        avg_views: toInt(s.avg_views),
      }))
    if (cleanStats.length) {
      const { error: sErr } = await supabase.from("channel_stats").insert(cleanStats)
      if (sErr) {
        setError(sErr.message)
        setSaving(false)
        return
      }
    }

    setSaved(true)
    setSaving(false)
    router.refresh()
  }

  const inputClass =
    "w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)]"

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ---- Perfil base ---- */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Perfil
        </h2>

        <div className="space-y-1">
          <label className="text-sm font-medium">Nombre</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">País</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Argentina, México, Colombia..."
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            maxLength={300}
            className={`${inputClass} resize-none`}
          />
          <p className="text-xs text-[var(--muted-foreground)] text-right">{bio.length}/300</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Avatar (URL)</label>
          <input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </section>

      {/* ---- Stats de audiencia (media kit) ---- */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Audiencia
          </h2>
          <button
            type="button"
            onClick={() =>
              setStats((s) => [...s, { platform: "twitch", handle: "", followers: "", avg_views: "" }])
            }
            className="flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
          >
            <Plus size={14} /> Agregar plataforma
          </button>
        </div>

        {stats.length === 0 && (
          <p className="text-sm text-[var(--muted-foreground)]">
            Sumá tus números por plataforma — es tu media kit.
          </p>
        )}

        <div className="space-y-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[130px_1fr_110px_110px_auto] gap-2 items-center"
            >
              <select
                value={s.platform}
                onChange={(e) =>
                  setStats((arr) =>
                    arr.map((r, idx) =>
                      idx === i ? { ...r, platform: e.target.value as Platform } : r
                    )
                  )
                }
                className={inputClass}
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <input
                value={s.handle}
                onChange={(e) =>
                  setStats((arr) => arr.map((r, idx) => (idx === i ? { ...r, handle: e.target.value } : r)))
                }
                placeholder="@usuario"
                className={inputClass}
              />
              <input
                type="number"
                min={0}
                value={s.followers}
                onChange={(e) =>
                  setStats((arr) => arr.map((r, idx) => (idx === i ? { ...r, followers: e.target.value } : r)))
                }
                placeholder="Seguidores"
                className={inputClass}
              />
              <input
                type="number"
                min={0}
                value={s.avg_views}
                onChange={(e) =>
                  setStats((arr) => arr.map((r, idx) => (idx === i ? { ...r, avg_views: e.target.value } : r)))
                }
                placeholder="Vistas prom."
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setStats((arr) => arr.filter((_, idx) => idx !== i))}
                className="p-2 text-[var(--muted-foreground)] hover:text-red-400"
                aria-label="Quitar"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Links ---- */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Links
          </h2>
          <button
            type="button"
            onClick={() => setLinks((l) => [...l, { platform: "", url: "" }])}
            className="flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
          >
            <Plus size={14} /> Agregar link
          </button>
        </div>

        <div className="space-y-3">
          {links.map((l, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[160px_1fr_auto] gap-2 items-center">
              <input
                value={l.platform}
                onChange={(e) =>
                  setLinks((arr) => arr.map((r, idx) => (idx === i ? { ...r, platform: e.target.value } : r)))
                }
                placeholder="Twitch, Discord..."
                className={inputClass}
              />
              <input
                value={l.url}
                onChange={(e) =>
                  setLinks((arr) => arr.map((r, idx) => (idx === i ? { ...r, url: e.target.value } : r)))
                }
                placeholder="https://..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setLinks((arr) => arr.filter((_, idx) => idx !== i))}
                className="p-2 text-[var(--muted-foreground)] hover:text-red-400"
                aria-label="Quitar"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {saved && <p className="text-[var(--accent)] text-sm">Guardado ✓</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="py-3 px-6 bg-[var(--accent)] text-[var(--accent-foreground)] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  )
}
