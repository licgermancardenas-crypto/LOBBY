import type { Event } from "@/types/database"

// Resumen de métricas de un perfil a partir de sus eventos. Función pura:
// recibe las filas ya filtradas por profile_id (RLS: solo las del dueño) y
// devuelve los agregados que muestra el /panel.

export type ProfileMetrics = {
  views: number
  viewsLast7d: number
  clicks: number
  clicksLast7d: number
  uniqueVisitors: number
  clicksByPlatform: { platform: string; count: number }[]
  hasData: boolean
}

type EventRow = Pick<Event, "name" | "session_id" | "properties" | "created_at">

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export function summarizeEvents(events: EventRow[]): ProfileMetrics {
  const since = Date.now() - SEVEN_DAYS_MS
  const isRecent = (e: EventRow) => new Date(e.created_at).getTime() >= since

  const views = events.filter((e) => e.name === "profile_viewed")
  const clicks = events.filter((e) => e.name === "external_link_clicked")

  const byPlatform = new Map<string, number>()
  for (const c of clicks) {
    const p = c.properties?.platform
    const platform = typeof p === "string" && p ? p : "otro"
    byPlatform.set(platform, (byPlatform.get(platform) ?? 0) + 1)
  }

  const uniqueSessions = new Set(
    views.map((v) => v.session_id).filter((s): s is string => Boolean(s))
  )

  return {
    views: views.length,
    viewsLast7d: views.filter(isRecent).length,
    clicks: clicks.length,
    clicksLast7d: clicks.filter(isRecent).length,
    uniqueVisitors: uniqueSessions.size,
    clicksByPlatform: [...byPlatform.entries()]
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count),
    hasData: events.length > 0,
  }
}
