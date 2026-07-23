"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

type Props = {
  name: string
  profileId?: string | null
  properties?: Record<string, unknown>
}

/** Dispara un evento una vez, al montar. Renderiza nada. */
export function TrackEvent({ name, profileId = null, properties = {} }: Props) {
  useEffect(() => {
    track(name, { profileId, properties })
    // solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
