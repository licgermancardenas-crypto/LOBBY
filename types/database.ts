// Tipos de la base de datos de LOBBY
// Reemplazar con tipos generados: npx supabase gen types typescript --project-id <id> > types/database.ts

export type ProfileType = "player" | "dev" | "streamer" | "org"

export type Platform = "twitch" | "youtube" | "tiktok" | "kick" | "instagram" | "x"

export type Profile = {
  id: string
  handle: string
  display_name: string
  profile_type: ProfileType
  country: string | null
  bio: string | null
  avatar_url: string | null
  created_at: string
}

export type Game = {
  id: string
  name: string
  slug: string
}

export type ProfileGame = {
  id: string
  profile_id: string
  game_id: string
  role: string | null
  rank: string | null
}

export type Link = {
  id: string
  profile_id: string
  platform: string
  url: string
}

export type Experience = {
  id: string
  profile_id: string
  type: string
  title: string
  org: string | null
  start_date: string | null
  end_date: string | null
}

export type Media = {
  id: string
  profile_id: string
  type: string
  storage_path: string
  caption: string | null
}

export type ChannelStat = {
  id: string
  profile_id: string
  platform: Platform
  handle: string | null
  followers: number | null
  avg_views: number | null
  verified: boolean
  updated_at: string
}

export type TeamMember = {
  id: string
  team_id: string
  profile_id: string
  role: string | null
}

export type Follow = {
  follower_id: string
  followed_id: string
}

export type Event = {
  id: number
  profile_id: string | null
  session_id: string | null
  name: string
  properties: Record<string, unknown> | null
  created_at: string
}

export type PlatformConnection = {
  id: string
  profile_id: string
  platform: Platform
  external_id: string | null
  external_handle: string | null
  access_token: string
  refresh_token: string | null
  expires_at: string | null
  scopes: string[] | null
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, "created_at">
        Update: Partial<Omit<Profile, "id" | "created_at">>
      }
      games: {
        Row: Game
        Insert: Game
        Update: Partial<Game>
      }
      profile_games: {
        Row: ProfileGame
        Insert: ProfileGame
        Update: Partial<ProfileGame>
      }
      links: {
        Row: Link
        Insert: Link
        Update: Partial<Link>
      }
      channel_stats: {
        Row: ChannelStat
        Insert: Omit<ChannelStat, "id" | "verified" | "updated_at"> & {
          id?: string
          verified?: boolean
          updated_at?: string
        }
        Update: Partial<Omit<ChannelStat, "id" | "profile_id">>
      }
      experiences: {
        Row: Experience
        Insert: Experience
        Update: Partial<Experience>
      }
      media: {
        Row: Media
        Insert: Media
        Update: Partial<Media>
      }
      teams: {
        Row: { id: string; name: string; country: string | null }
        Insert: { id?: string; name: string; country?: string | null }
        Update: { name?: string; country?: string | null }
      }
      team_members: {
        Row: TeamMember
        Insert: TeamMember
        Update: Partial<TeamMember>
      }
      follows: {
        Row: Follow
        Insert: Follow
        Update: Partial<Follow>
      }
      events: {
        Row: Event
        Insert: Omit<Event, "id" | "created_at">
        Update: never
      }
      platform_connections: {
        Row: PlatformConnection
        Insert: Omit<PlatformConnection, "id" | "created_at" | "updated_at"> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<PlatformConnection, "id" | "profile_id">>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      profile_type: ProfileType
    }
  }
}
