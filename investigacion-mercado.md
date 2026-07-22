# Investigación de mercado — LOBBY

> Análisis de competencia, intentos fallidos, debilidades/amenazas y cómo
> construir un producto de clase mundial. Documento vivo — se amplía a medida
> que avanza el research.
>
> Última actualización: 2026-07-22.

---

## 1. ¿Ya existe? Sí. Varios lo intentaron, y el patrón es revelador

**El "LinkedIn for gamers" no es idea nueva — es un cementerio con sobrevivientes
que pivotearon.**

| Player | Qué era | Qué pasó | Lección |
|---|---|---|---|
| **eFuse** (EE.UU.) | *El* "LinkedIn for gamers". Levantó ~$10M+ (incl. estrellas NBA/NFL) | **Pivoteó fuera del social de consumo** hacia software B2B white-label (erena, esports.gg). En 2023 despidió al 30% tras el fiasco de su "Creator League" ligada a **cripto/NFT** | El social de consumo puro no se sostuvo → la plata está en B2B |
| **Zengaming** (Israel) | "LinkedIn de pro gamers", $2.8M, 3M usuarios | Se apagó | 3M registros ≠ negocio |
| **PvP** | "LinkedIn for gamers" social | Marginal | — |
| **Guilded** | Competidor de Discord (comunidades) | Adquirido por Roblox (2021) | El social/comunidad lo gana Discord |
| **GameTree** | Buscar amigos/LFG por afinidad | Vive, pero sufre el "matching en juegos nicho" | Cold-start brutal |

**Los que SÍ funcionan (y son competencia real):**

- **Hitmarker** (2017) — la **bolsa de empleos** gaming/esports. No es red social:
  es **B2B por suscripción** (empresas pagan por contratar) + revenue-share con
  agencias. Millones de candidatos, expandiéndose a "career ecosystem". **Es el
  modelo que probó ser rentable.** Dato: eFuse le pagaba a Hitmarker por acceso a
  su API de empleos.
- **Op.gg / Mobalytics / Tracker.gg** — ya son la **identidad de stats
  verificadas** del jugador competitivo. Ese foso ya está parcialmente ocupado.
- **Seek Team, Curry.gg, GewdGame, LegionFarm** — reclutamiento/marketplace por
  nicho.
- **Beacons, Linktree, TLinky, GamerLinks** — *link-in-bio* para streamers.
  Ocupan el ángulo de "media kit vivo".
- **Discord, Twitch, Steam, LinkedIn** — el problema del *"¿por qué no uso lo que
  ya tengo?"*.

**En LATAM:** hay **infraestructura de ligas** (GGTech / University Esports, Pro
Play Esports) y **programas de creadores** (TikTok), pero **no hay una capa de
identidad profesional consolidada**. Ahí está el hueco. Mercado enorme: **~335M
jugadores en LATAM y ~US$25B en 2025**, audiencia comparable a Europa.

---

## 2. Por qué falló en el pasado (las causas reales)

1. **El problema del "por qué no Discord/Twitter/Steam".** El gamer ya tiene
   identidad en 5 lados. Una red standalone necesita valor **no sustituible**.
2. **Cold-start de doble cara.** Necesitás oferta (talento) *y* demanda (equipos,
   marcas, reclutadores) a la vez. Perfiles vacíos + cero demanda = muerte.
3. **Mismatch de monetización.** El gamer de consumo **no paga**. La plata es B2B.
   Por eso eFuse pivoteó a B2B y Hitmarker nació B2B.
4. **Retención de "currículum".** Un perfil se arma una vez y se olvida. Sin loop
   de hábito (feed, oportunidades, "quién te vio"), no hay efecto red.
5. **Stats auto-reportadas = basura.** El foso real son **stats verificadas**
   (Riot/Steam APIs), pero es caro, rate-limited y **dependés de que la plataforma
   no te corte el acceso**.
6. **Distracciones que mataron momentum.** Cripto/NFT (backlash que hundió la
   Creator League de eFuse), pivotes sobre-ambiciosos.
7. **"Invierno" del esports.** Despidos 2023–2024, orgs recortando, capital frío.

---

## 3. Debilidades (internas) y Amenazas (externas)

### Debilidades
- **Scope doble.** "LinkedIn **+** Upwork para gaming" son **dos productos
  difíciles**. Riesgo de dispersión.
- **Sin stats verificadas todavía** (auto-reportadas → sin foso).
- **Sin lado de demanda** ni distribución ni marca. Arrancás con perfiles vacíos.
- **Equipo/recursos tempranos** contra incumbentes gratis y con network effects.
- **Monetización no probada.**

### Amenazas
- **Incumbentes se expanden:** Discord agrega perfiles; LinkedIn ya tiene gaming;
  Hitmarker va hacia "profiles + career ecosystem"; Riot/Twitch podrían sumar capa
  profesional nativa.
- **Dependencia de plataforma:** APIs de Riot/Steam (te pueden revocar), Supabase,
  OAuth de Google/Discord.
- **Winner-take-all:** las redes son de ganador único.
- **Volatilidad del sector** (funding winter del esports).
- **Regulación de datos/privacidad** (Ley 25.326 AAIP → GDPR/LGPD), sobre todo con
  el perfilado nivel 4.

---

## 4. Cómo construir un producto de clase mundial

1. **Clavá UNA punta de lanza.** Un persona + un país. La red gana clavando un
   caso de uso, no cinco.
2. **Resolvé un dolor ardiente, no "un perfil".** El perfil es un **subproducto**
   de algo que el usuario necesita hoy: que lo descubran/recluten, probar stats,
   o que lo contraten/paguen.
3. **Stats verificadas desde temprano = el foso.** Integrá Riot/Steam ni bien haya
   punta de lanza. Valor **no sustituible** frente a Discord/Linktree.
4. **Monetización B2B clara desde el día uno.** Jugadores gratis; pagan
   reclutadores/equipos/marcas (modelo Hitmarker).
5. **Distribución = la arquitectura ya la habilita.** Perfiles públicos SSR
   indexables en `/[handle]` = adquisición orgánica por SEO + loop viral
   (reemplazo del link-in-bio).
6. **Sembrá la demanda a mano (concierge).** Marketplaces se arrancan curados.
7. **Loop de retención**, no currículum estático: feed de oportunidades,
   notificaciones, "quién vio tu perfil".
8. **Cero distracciones:** nada de cripto/NFT. No construir search/ML antes de
   tiempo (el plan por fases ya lo difiere — bien).
9. **Nativo de LATAM:** español/portugués, pagos locales, onboarding vía Discord,
   alianzas con comunidad existente (GGTech, Gino Army, creadores de TikTok).
10. **El "aha moment":** un perfil verificado que **te consigue algo** lo más
    rápido posible.

**Veredicto:** la idea no es original y varios murieron — pero **ninguno la clavó
en LATAM con stats verificadas + SEO orgánico + monetización B2B desde el inicio**.
El mayor riesgo no es la competencia: es el **scope doble** y **construir "un
perfil" en vez de resolver un dolor**.

---

## Fuentes

- [Forbes — 'LinkedIn For Gamers' (eFuse) $6M](https://www.forbes.com/sites/mattgardner1/2021/02/18/linkedin-for-gamers-secures-6-million-investment-from-nfl-and-nba-stars/)
- [Esports Insider — eFuse lays off 30%, postpones Creator League](https://esportsinsider.com/2023/09/efuse-layoffs-creator-league-postponed)
- [Dexerto — eFuse Creator League NFT backlash](https://www.dexerto.com/esports/efuse-postpones-creator-league-amid-layoffs-cryptocurrency-affiliation-2280179/)
- [SiliconANGLE — Zengaming $2.8M](https://siliconangle.com/2016/04/21/zengaming-raises-2-8m-to-bring-esports-pro-gamers-together/)
- [GamesBeat/VentureBeat — eFuse $6M](https://venturebeat.com/esports/efuse-raises-6-million-for-linkedin-for-gamers-platform/)
- [BusinessWire — Hitmarker Pro launch](https://www.businesswire.com/news/home/20260427151778/en/Hitmarker-Launches-Hitmarker-Pro-a-New-End-to-End-Hiring-Platform-Built-specifically-for-the-Gaming-Industry)
- [Quora — el problema de las redes sociales de gamers](https://www.quora.com/What-is-the-problem-with-gaming-social-networks)
- [Grand View Research — LATAM gaming market](https://www.grandviewresearch.com/horizon/outlook/gaming-market/latin-america)
- [Statista — video gaming in Latin America](https://www.statista.com/topics/13859/video-gaming-in-latin-america/)
- [Think with Google — industria gamer en Latinoamérica](https://www.thinkwithgoogle.com/intl/es-419/insights/tendencias-de-consumo/industria-gamer-latinoamerica/)
- [Nivel Gamer — plataforma esports creada en LATAM](https://nivelgamer.com/la-primera-plataforma-internacional-de-esports-creada-en-america-latina-ya-abierta/)
