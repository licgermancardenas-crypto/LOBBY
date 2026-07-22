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

## 5. Más post-mortems: la plata no salva (caso PlayVS)

**PlayVS** levantó **US$96M** para infraestructura de esports en secundarias
—un nicho real y acotado— y aun así se complicó. Sirve como caso de estudio:

- **Fraude de identidad.** Permitió (2020+) que jugadores **no estudiantes**
  entraran a ligas escolares; de ~1.700–2.000 inscriptos a una liga de Fortnite,
  flageó 300–400 por falsear edad/estatus, y **no le avisó a Epic**. Dañó la
  confianza con el publisher.
- **Estrategia de exclusividad.** Usó deals de exclusividad para bloquear
  competidores → escándalo público (Washington Post), acusaciones de
  "strong-arming" a docentes.
- **Despidos del 25%** (marzo 2023) y **el fundador dejó el cargo**.

**Lecciones para LOBBY:**
1. **El fraude de identidad es un riesgo central** de cualquier plataforma de
   perfiles/stats. La **verificación** no es un lujo: es integridad del producto.
   Perfiles falsos = confianza cero = las marcas no pagan.
2. **No se gana por lock-in/exclusividad, se gana por producto.** Intentar
   controlar el ecosistema genera backlash.
3. **US$96M + nicho claro no garantizan nada** si la ejecución y la confianza
   fallan. Tu ventaja no será el capital: será el foco y la integridad del dato.

## 6. El lado de la demanda: ¿quién paga realmente?

La monetización es B2B, pero **la demanda está fragmentada y hay que elegir bien
a quién le vendés**:

- **Equipos/orgs de esports** — manejan su propio presupuesto de reclutamiento,
  pero están **recortando** (funding winter) y son pocos. Pagadores flacos.
- **Estudios y empresas de gaming** — son los clientes que sostienen a
  **Hitmarker** (contratación de roles de industria: marketing, dev, diseño,
  broadcasting). Mercado más grande y estable que las orgs de esports.
- **Marcas/sponsors** — pagan por **acceso a audiencia y segmentación**, no por
  reclutar. Encaja con tu nivel 2 de analítica (segmentos para marcas).

> Implicación: el pagador más sólido no es "el equipo de esports que ficha
> jugadores", sino **empresas de gaming que contratan** y **marcas que buscan
> talento/creadores segmentados**. Diseñá el lado de demanda para ellos.

## 7. El foso frágil: la letra chica de la API de Riot

Las **stats verificadas** son tu foso, pero apoyarlo en la API de Riot tiene
condiciones duras que hay que asumir desde el diseño:

- Licencia **revocable, no transferible**; **un solo producto por production key**
  (no podés correr varios proyectos con la misma).
- Hay que **registrar el producto** y obtener **estado "approved"**.
- **Obligatorio un tier gratuito para jugadores**; si cobrás, el contenido debe
  ser **"transformativo"** (no revender el dato crudo).
- **Rate limits por región**.
- Violar políticas → **suspensión, cancelación o acción legal**.

**Implicación:** el foso **depende de un tercero que puede cortarlo**. Mitigá:
(a) no dependas de una sola API — diversificá (Steam, Twitch/YouTube, Faceit);
(b) agregá valor **por encima** del dato (contexto, historial, reputación,
portfolio) para que el producto sobreviva aunque cambie una API; (c) cumplí las
políticas al pie (tier gratis, uso transformativo) desde el día uno.

## 8. Amenaza geográfica: monetizar en LATAM es difícil

Tu ventaja (LATAM sin capa de identidad) viene con un costo:

- **ARPU bajo** — por debajo del promedio global; ingreso disponible menor.
- **Fricción de pagos** — estrategia "solo tarjeta" es incompleta: hace falta
  **Pix, tarjetas locales, e-wallets y efectivo/prepago**. Población sub-bancada.
- **El mercado crece** (+13% en mobile 2024, US$1.5B) pero la conversión a pago
  exige **stack de pagos local**, no Stripe global y listo.

**Implicación:** reforzá que **el que paga es B2B en USD** (empresas/marcas), no
el gamer LATAM. Si en algún momento cobrás a usuarios (perfil premium), vas a
necesitar **métodos de pago locales** o la conversión se muere. Localización
(idioma + pagos) no es opcional en la región.

---

## 9. La punta de lanza (decisión)

El error que mató a los competidores fue querer ser "para todos los gamers". La
red gana clavando **un** caso de uso. Acá está el análisis y la decisión.

### Los tres candidatos

| Beachhead | Dolor real | Pagador cercano | Distribución | Dependencia |
|---|---|---|---|---|
| **A. Jugadores competitivos** (Valorant AR/MX) | Ser scouteado/fichado | **Débil** — orgs de esports pocas y recortando | Media | **Alta** (API Riot; Riot ya da el ladder Open Series/Game Changers) |
| **B. Devs / creadores de juegos** (LATAM) | Portfolio para ser contratado (nearshore US/EU) | **Fuerte** — estudios/empresas pagan en USD (modelo Hitmarker) | Media | Baja |
| **C. Streamers / creadores emergentes** (LATAM) | Ser descubierto + media kit para marcas | Medio — marcas pagan por audiencia segmentada, pero a escala | **Muy alta** — comparten su propio perfil = loop viral + SEO | Media (multi-plataforma, más resiliente que Riot solo) |

**Datos que soportan el análisis:**
- **Jugadores:** Riot ya opera el embudo amateur→pro en LATAM (Open Series,
  Swift Cups, Game Changers, VCL). Pasión altísima, pero el pagador es flaco y
  **el foso depende de una API revocable** (§7). Riot compite en tu terreno.
- **Devs:** Brasil solo tiene +500k devs y ~227k graduados STEM/año; LATAM es
  región emergente de gaming. La demanda **paga en USD** (nearshore, estudios).
  Pero el perfil es **sustituible** por GitHub/LinkedIn y el dev no auto-difunde.
- **Creadores:** LATAM = **28% de las horas vistas en Twitch, +40% interanual**.
  El descubrimiento orgánico "es casi inexistente" para el chico → dolor ardiente.
  Y **auto-difunden su perfil** (link-in-bio), lo que resuelve el cold-start solo.

### Decisión: **Creadores/streamers emergentes de gaming, en Argentina**

> **Persona:** creador de gaming emergente/medio (≈1k–50k seguidores),
> multi-plataforma (Twitch/YouTube/TikTok), que **empieza a recibir interés de
> marcas pero no tiene forma profesional de mostrarse**.
>
> **País semilla:** Argentina (home-field del fundador → community-building
> concéntrico, cultura creadora fuerte, costo de adquisición bajo). México es el
> mercado de **escala** posterior (más volumen y plata de marcas).
>
> **Dolor ardiente:** el descubrimiento está roto y no tienen **media kit**: no
> pueden probarle a una marca quién los sigue ni por qué valen.
>
> **Producto-cuña:** el **perfil verificado, indexable (SEO) y público en
> `/[handle]`** que funciona como su **link-in-bio + media kit vivo** —
> agregando sus stats de audiencia de varias plataformas.
>
> **"Aha moment":** un perfil que **les consigue algo** — que los descubran,
> que una marca los contacte, que reemplacen su Linktree por algo que sí prueba
> su audiencia.
>
> **Pagador (fase 2):** marcas/agencias que quieren **audiencias de creadores
> LATAM segmentadas** (encaja con tu analítica nivel 2). Creadores gratis.

### Por qué NO los otros primero

- **Jugadores no primero:** pagador débil + **dependencia crítica de la API de
  Riot** + Riot ya provee el ladder. Alta pasión, bajo negocio y alto riesgo de
  plataforma. Es Fase 3, cuando la infra de stats se justifique.
- **Devs no primero:** es el **mejor pagador**, pero el perfil compite de frente
  con LinkedIn/GitHub (sustituible) y el dev **no auto-difunde** → no aprovecha
  la ventaja estructural de LOBBY (perfiles SEO que se comparten). Es la **Fase 2
  natural**: el motor de monetización.

### Por qué creadores encaja con LOBBY específicamente

LOBBY ya está arquitecturado con **perfiles SSR indexables en `/[handle]`** —
eso es adquisición orgánica por SEO **y** un loop viral cuando cada creador
comparte su perfil. Ese activo rinde al máximo con la persona que **más
auto-difunde**: el creador. Es la única punta de lanza que resuelve el
cold-start (§2, problema #2) por diseño, no a fuerza de marketing.

### Secuencia (de la cuña a la plataforma)

1. **Fase 1 — Creadores AR.** Perfil-media-kit + stats de audiencia + SEO.
   Métrica de éxito: **% de perfiles "vivos"** (completos y compartidos) y
   **perfiles que generan un contacto de marca**. Aha antes de monetizar.
2. **Fase 2 — Devs LATAM + marcas pagando.** Se enciende el pagador fuerte
   (estudios contratan, marcas compran segmentación).
3. **Fase 3 — Jugadores competitivos + stats verificadas (Riot/Steam).** El foso
   duro, cuando el volumen lo justifique y con dependencia diversificada.

### GTM — primeros 100 usuarios

- Sembrar **1 comunidad/país concreto** (Discord de creadores AR, eventos
  locales, alianzas con GGTech / programas de creadores de TikTok).
- **Concierge:** armarles el perfil a mano a los primeros 20–50 creadores.
- Que cada uno **reemplace su link-in-bio** por su `/[handle]` → distribución
  gratis a su propia audiencia.

### País semilla: **Argentina (fijado)**

Argentina es la semilla: home-field del fundador, cultura creadora fortísima
(Coscu Army, Spreen, Momo, Davoo) y ecosistema concentrado (Argentina Game Show,
EVA, comunidades en Discord). **México queda como mercado de escala** para
después. Decisión tomada — no se reabre.

---

## 10. GTM — los primeros 100 creadores (Argentina)

**Objetivo:** 100 creadores emergentes argentinos con **perfil vivo** (completo,
con stats de audiencia, y usado como link-in-bio real) en ~90 días. No es
"registrar 100": es 100 que **usan** el perfil y lo comparten.

### Perfil objetivo (a quién sí)

- **≈1k–50k seguidores** multi-plataforma (Twitch/YouTube/TikTok/Kick).
- Afiliado de Twitch o creciendo hacia ahí; **ya recibe (o busca) canjes/marcas**.
- Activo y con identidad propia (streamea con horario, tiene comunidad chica).
- **NO** los top (Coscu/Spreen ya tienen equipo y media kit) — apuntamos al
  **emergente que tiene el dolor sin resolver**.

### El pitch (una frase)

> *"Tu media kit verificado en una sola URL. Reemplazá tu Linktree por un perfil
> que le prueba a las marcas quién te sigue — y que Google indexa."*

El gancho es el **dolor concreto**: cuando una marca les escribe, hoy mandan un
PDF armado a mano o capturas sueltas. LOBBY es el artefacto profesional que no
tienen.

### Dónde encontrarlos (canales concretos AR)

1. **Discords de comunidades.** Argentina Game Show (10k+ miembros: creadores,
   orgs, marcas), comunidades de streamers medianos, servidores de "casas" y
   colectivos emergentes. Entrar, aportar, identificar a los del rango objetivo.
2. **Búsqueda directa.** Listar creadores AR por rango de seguidores en Twitch/
   TikTok/Kick y hacer outreach 1-a-1 (DM).
3. **Eventos presenciales.** **Argentina Game Show (oct, Tecnópolis)**, EVA,
   meetups. Concierge en vivo: armales el perfil ahí mismo.
4. **Referidos.** Cada creador conoce otros creadores de su nivel → invitación.

### Las 3 olas (0 → 100)

| Ola | Rango | Táctica | Meta |
|---|---|---|---|
| **1. Red directa** | 0–15 | Fundador arma a mano el perfil de creadores que ya conoce/alcanza. Feedback crudo. | Validar el "aha" |
| **2. Una comunidad a fondo** | 15–50 | Elegir **1 Discord/colectivo** y volverse parte. Concierge: "te lo armo en 10 min con tus stats". | Densidad en un nicho |
| **3. Loop + evento + SEO** | 50–100 | Referidos + presencia en AGS/EVA + los primeros perfiles empiezan a rankear en Google. | Que crezca sin empujar cada uno |

### El motor: concierge + loop viral

- **Done-for-you los primeros ~50.** No los mandes a un formulario: armales el
  perfil vos (avatar, bio, links, stats). Elimina la fricción y garantiza
  perfiles "vivos".
- **La condición de valor:** que **reemplacen su link-in-bio** por su `/[handle]`.
  Ahí se dispara la distribución: su audiencia (donde hay más creadores chicos)
  ve el perfil → algunos se suman. **Loop viral que resuelve el cold-start.**
- **Badge de "creador verificado"** + destaque en `/buscar` para los early
  adopters. Estatus > features.

### Plantilla de outreach (DM)

> *"Hola [nombre], sigo lo que hacés en [plataforma]. Estoy armando LOBBY: un
> perfil profesional para creadores de gaming en Argentina — tu media kit y tu
> link-in-bio en una URL que Google indexa, con tus stats de audiencia. Te lo
> armo yo en 10 minutos, gratis, y lo usás desde hoy. ¿Te tiro una mano?"*

### Qué medir (y qué NO)

- ✅ **% de perfiles vivos** (completos + link-in-bio reemplazado).
- ✅ **Perfiles compartidos** por el propio creador (distribución real).
- ✅ **Contactos de marca generados** vía el perfil (el aha que retiene).
- ✅ **Referidos** (creador que trae creador).
- ❌ **No** mirar "registros totales" (la métrica vanidosa que engañó a Zengaming
  con sus 3M).

### Regla de oro del GTM

Instrumentá los **eventos de analítica desde el primer día** (`profile_completed`,
`profile_viewed`, `external_link_clicked`, `signup_completed`). Con 100 creadores
ya querés saber **qué perfiles atraen marcas** — es la materia prima del producto
para el pagador de Fase 2.

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
- [Jacob Wolf Report — PlayVS and Player Fraud: An Epic Fiasco](https://www.jacobwolf.report/p/playvs-player-fraud-epic-fiasco)
- [Washington Post — PlayVS strong-arms teachers](https://www.washingtonpost.com/video-games/esports/2022/04/11/playvs-high-school-esports/)
- [The Esports Advocate — Layoffs hit PlayVS (marzo 2023)](https://esportsadvocate.net/2023/03/playvs-layoffs-march2023/)
- [TechCrunch — PlayVS $50M Series C ($96M total)](https://techcrunch.com/2019/09/18/playvs-picks-up-50-million-series-c-to-build-out-high-school-esports)
- [Riot Developer Portal — API Terms and Conditions](https://developer.riotgames.com/terms)
- [Riot Games Developer Policies](https://developer.riotgames.com/policies/general)
- [Antom — Brazil's gaming boom: payments opportunities](https://knowledge.antom.com/brazils-gaming-boom-unlocking-the-new-frontier-of-opportunities)
- [EBANX/EPAG — Gaming payment processing in LATAM](https://www.epag.com/en/blog/gaming-payment-processing-latam-risk-perspective/)
- [Twitch Blog — Supporting Streamers in Latin America (28% horas, +40%)](https://blog.twitch.tv/en/2025/05/19/supporting-streamers-in-latin-america/)
- [Streams Charts — Twitch para nuevos streamers: el problema de descubrimiento](https://streamscharts.com/news/twitch-still-good-new-streamers-data-based-answer-2026)
- [VCT Game Changers LATAM — Open Series (ladder amateur de Riot)](https://opengc.arenagg.com/en)
- [Combine — 2025 Global Gaming Employment Outlook (talento LATAM)](https://combinegr.com/2025-global-gaming-employment-outlook-trends-talent-strategy/)
- [iProfesional — Argentina Game Show, el evento gamer más grande de la región](https://www.iprofesional.com/tecnologia/439034-el-evento-gamer-mas-grande-de-la-region-celebra-su-undecima-edicion-en-tecnopolis)
- [Argentina Game Show — Discord (10k+ miembros)](https://discord.com/invite/agsx-1078383073974026250)
- [Rosario3 — Influencers argentinos de gaming y streaming](https://www.rosario3.com/informaciongeneral/Gaming-streaming-y-redes-sociales-quienes-son-los-influencers-argentinos-que-conquistan-el-mundo-digital-20241209-0043.html)
- [Forbes Argentina — plataformas invierten millones en streamers argentinos](https://www.forbesargentina.com/money/cuales-son-plataformas-batallan-e-invierten-millones-streamers-argentinos-n12471)
