"use client"

import { track } from "@/lib/analytics"

type Props = {
  href: string
  profileId?: string | null
  eventName?: string
  properties?: Record<string, unknown>
  className?: string
  children: React.ReactNode
}

/** Link externo que registra un evento al hacer click (best-effort). */
export function TrackedLink({
  href,
  profileId = null,
  eventName = "external_link_clicked",
  properties = {},
  className,
  children,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track(eventName, { profileId, properties })}
    >
      {children}
    </a>
  )
}
