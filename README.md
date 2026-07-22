# LOBBY

La capa profesional de la economía del entretenimiento — red profesional para
gamers, esports, creadores y streamers de LATAM.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Supabase · Tailwind CSS v4

> ⚠️ Esta versión de Next.js tiene *breaking changes*. Antes de escribir código
> nuevo, consultá las guías en `node_modules/next/dist/docs/` (ver `AGENTS.md`).

📐 **Arquitectura completa:** ver [`ARQUITECTURA.md`](./ARQUITECTURA.md) — stack,
modelo de datos, RLS, analítica, recomendaciones y fases del producto.

## Setup

### 1. Clonar e instalar

```bash
git clone https://github.com/licgermancardenas-crypto/LOBBY.git
cd LOBBY
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env.local
```

Completá `.env.local` con los valores de tu proyecto de Supabase
(Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
SERVICE_ROLE_KEY=<service_role key>
```

> `.env.local` está en `.gitignore` — nunca se commitea.

### 3. Base de datos (Supabase)

Creá un proyecto en [supabase.com/dashboard](https://supabase.com/dashboard)
(elegí una region cercana a LATAM, ej. *South America (São Paulo)*, y guardá la
Database Password). Después aplicá el schema con la CLI:

```bash
npx supabase login                          # con tu access token de la cuenta
npx supabase link --project-ref <ref>       # pide la Database Password
npx supabase db push                        # aplica supabase/migrations/
```

Esto crea todas las tablas, RLS, índices, el catálogo inicial de juegos y los
buckets de storage.

> Alternativa sin CLI: pegá el contenido de `supabase/schema.sql` en el
> **SQL Editor** de Supabase y ejecutalo.

Para OAuth, habilitá los providers **Google** y **Discord** en
Authentication → Providers.

### 4. Correr en desarrollo

```bash
npm run dev
```

App en [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando         | Descripción                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Servidor de desarrollo          |
| `npm run build` | Build de producción             |
| `npm start`     | Servir el build                 |
| `npm run lint`  | ESLint                          |

## Estructura

```
app/
├── (public)/[handle]/   Perfiles públicos por handle
├── (public)/buscar/     Explorar / buscar perfiles
├── (auth)/              login · registro · auth/callback
└── (app)/               panel · onboarding · editar-perfil (privadas)
components/              auth · perfil · ui
lib/supabase/            clients (browser + server)
supabase/                config.toml · schema.sql · migrations/
types/                   database.ts
```
