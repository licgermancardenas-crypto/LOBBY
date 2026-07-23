"use client"

import { Trash2, Plus } from "lucide-react"
import type { Platform } from "@/types/database"

export const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "twitch", label: "Twitch" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "kick", label: "Kick" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X" },
]

export type LinkRow = { platform: string; url: string }
export type StatRow = { platform: Platform; handle: string; followers: string; avg_views: string }

export const inputClass =
  "w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)]"

export function toInt(v: string): number | null {
  const n = parseInt(v, 10)
  return Number.isFinite(n) && n >= 0 ? n : null
}

/** Editor de stats de audiencia por plataforma (el media kit). */
export function AudienceEditor({
  stats,
  onChange,
}: {
  stats: StatRow[]
  onChange: (stats: StatRow[]) => void
}) {
  const update = (i: number, patch: Partial<StatRow>) =>
    onChange(stats.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Audiencia
        </h2>
        <button
          type="button"
          onClick={() => onChange([...stats, { platform: "twitch", handle: "", followers: "", avg_views: "" }])}
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
              onChange={(e) => update(i, { platform: e.target.value as Platform })}
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
              onChange={(e) => update(i, { handle: e.target.value })}
              placeholder="@usuario"
              className={inputClass}
            />
            <input
              type="number"
              min={0}
              value={s.followers}
              onChange={(e) => update(i, { followers: e.target.value })}
              placeholder="Seguidores"
              className={inputClass}
            />
            <input
              type="number"
              min={0}
              value={s.avg_views}
              onChange={(e) => update(i, { avg_views: e.target.value })}
              placeholder="Vistas prom."
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(stats.filter((_, idx) => idx !== i))}
              className="p-2 text-[var(--muted-foreground)] hover:text-red-400"
              aria-label="Quitar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

/** Editor de links externos (Twitch, Discord, tienda, etc.). */
export function LinksEditor({
  links,
  onChange,
}: {
  links: LinkRow[]
  onChange: (links: LinkRow[]) => void
}) {
  const update = (i: number, patch: Partial<LinkRow>) =>
    onChange(links.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Links
        </h2>
        <button
          type="button"
          onClick={() => onChange([...links, { platform: "", url: "" }])}
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
              onChange={(e) => update(i, { platform: e.target.value })}
              placeholder="Twitch, Discord..."
              className={inputClass}
            />
            <input
              value={l.url}
              onChange={(e) => update(i, { url: e.target.value })}
              placeholder="https://..."
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(links.filter((_, idx) => idx !== i))}
              className="p-2 text-[var(--muted-foreground)] hover:text-red-400"
              aria-label="Quitar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
