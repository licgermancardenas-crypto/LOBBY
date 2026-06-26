// Tipos de la base de datos de LOBBY
// Reemplazar con tipos generados: npx supabase gen types typescript --project-id <id> > types/database.ts

export type ProfileType = "player" | "dev" | "streamer" | "org"

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
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      profile_type: ProfileType
    }
  }
}
