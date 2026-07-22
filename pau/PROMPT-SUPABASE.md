# Prompt para continuar el setup de Supabase (otra compu)

Pegá esto en un Claude Code nuevo, en el directorio del proyecto ya clonado.
No incluyas los secretos en el mensaje inicial: dejá que Claude te los pida.

---

```
Proyecto LOBBY (Next.js 16 + Supabase), recién clonado desde GitHub.
Quiero terminar de conectar Supabase y aplicar el schema.

Contexto ya resuelto (no lo rehagas):
- El repo ya tiene supabase/config.toml y la migración inicial en
  supabase/migrations/ (viene de supabase/schema.sql). NO crees migraciones nuevas.
- El README tiene los pasos de setup. La CLI se usa con `npx supabase`.
- Ya creé un proyecto cloud en Supabase para LOBBY.

Lo que necesito que hagas:
1. Verificá que `npm install` esté hecho (si no, corrélo).
2. Escribí .env.local (copiá de .env.example) con estas credenciales de mi
   proyecto Supabase:
   - NEXT_PUBLIC_SUPABASE_URL = <la pego>
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = <la pego>
   - SERVICE_ROLE_KEY = <la pego>
3. Aplicá el schema al proyecto cloud vía CLI:
   - npx supabase login   (te paso mi access token)
   - npx supabase link --project-ref <ref>   (te paso la DB password)
   - npx supabase db push
4. Verificá que las tablas quedaron creadas (profiles, games, etc.), que se
   insertó el catálogo de juegos y que los buckets de storage existen.
5. Confirmame que .env.local sigue ignorado por git y no se va a commitear.

Datos que te voy a pasar cuando me los pidas: URL, anon key, service_role key,
project-ref, access token y DB password. Pedímelos y seguimos.
```

---

## Notas

- Si en esa compu `gh` no está logueado ni el SSH configurado, agregá al final
  del prompt: *"además, dejá el remoto listo para poder pushear (gh auth o SSH)"*.
- Dónde encontrar cada dato en el dashboard de Supabase:
  | Dato | Ubicación |
  | --- | --- |
  | Project ref | En la URL del dashboard: `.../project/<ref>` (o Settings → General) |
  | Project URL | Settings → Data API → *Project URL* |
  | anon public key | Settings → API Keys → `anon` `public` |
  | service_role key | Settings → API Keys → `service_role` (secreto) |
  | Database password | La que pusiste al crear el proyecto |
  | Access token | https://supabase.com/dashboard/account/tokens → *Generate new token* |
