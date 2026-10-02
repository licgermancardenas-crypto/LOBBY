# LOBBY — Plan de Negocios

**La capa profesional de la economía del entretenimiento**

> Documento maestro escrito. Estructura tipo HBS / consultora. Se apoya en el
> research de `investigacion-mercado.md`, `mapa-industria-gaming.md` y
> `mapa-marcas-latam.md`, y en la tesis de `00-tesis-y-estrategia.md`.
>
> Etapa: pre-lanzamiento · Ronda: pre-seed US$500K · Última act.: 2026-07-31.

---

## 1. Resumen ejecutivo

**LOBBY** es la capa de identidad profesional de la economía del entretenimiento,
comenzando por los **creadores de gaming y streaming de LATAM**. Ofrece al creador
un perfil profesional gratuito con **audiencia verificada por OAuth** (Twitch,
YouTube, TikTok, Instagram) y le vende a las **marcas y agencias** el acceso a ese
directorio verificado y segmentable — el único activo que hoy no pueden comprar.

El "LinkedIn para gamers" como red social de consumo ya fracasó varias veces
(eFuse, Zengaming, PvP): el gamer no paga y el cold-start es brutal. **LOBBY no
repite ese error.** Es una infraestructura B2B de descubrimiento y verificación,
disfrazada de perfil gratis para el creador. El pagador —la marca— **ya está
gastando** en resolver el problema de verificación, hoy tercerizándolo en agencias
de forma manual, cara y opaca.

- **Mercado:** creator economy global US$250B→480B (2027); influencer marketing
  ~US$33B (2025), gaming la vertical que más crece; LATAM 372,3M jugadores y
  ~US$8,3B (Newzoo). No-endémicas superaron a las endémicas por 1ª vez en 2025. El
  dolor tiene número: 37,2% de seguidores falsos, ~US$4,6B/año desperdiciados.
- **Wedge:** directorio B2B de creadores LATAM con audiencia verificada.
- **Monetización (secuenciada):** oferta gratis → suscripción B2B → reclutamiento
  + freemium + take-rate.
- **Ask:** US$500K pre-seed (SAFE), 18 meses de runway.
- **Hito Serie Seed:** densidad verificada en 3 mercados + US$250-500K ARR B2B.

---

## 2. El problema

### 2.1 El creador no tiene identidad profesional portable
El talento de gaming/streaming vive fragmentado: audiencia en Twitch, contenido en
YouTube, descubrimiento en TikTok, comunidad en Discord, y un Linktree que junta
todo sin probar nada. No existe una forma estándar y creíble de decir *"esta es mi
audiencia real, así es como performa, esto es lo que puedo ofrecer a una marca."*

### 2.2 La marca no puede comprar lo que más necesita: confianza en la audiencia
El presupuesto de marketing de influencers crece y se corre hacia gaming, pero la
pregunta #1 de toda marca sigue sin resolverse a escala: **¿esta audiencia es real
o está inflada?** A eso se suma la necesidad de **segmentar** (por juego, país,
plataforma, tipo de audiencia) y **descubrir** creadores más allá de los tres
nombres obvios.

### 2.3 Hoy el parche es la agencia — manual, cara y opaca
Las marcas tercerizan en agencias que mantienen rosters pre-chequeados a mano. Eso
funciona pero: (a) es caro, (b) no escala, (c) es una caja negra — la marca no ve
el universo de creadores, sólo lo que la agencia le muestra. **Hay un flujo de
dinero real buscando una herramienta que todavía no existe en LATAM.**

---

## 3. La solución

Un perfil profesional donde el creador conecta sus canales y LOBBY **verifica su
audiencia por OAuth**, generando un "media kit vivo" que se actualiza solo. Para la
marca, LOBBY es un **motor de descubrimiento**: buscar y segmentar creadores LATAM
con audiencia verificada, por juego, país, plataforma y tamaño.

**Estado del producto (ya construido — ver repo):**
- Perfiles públicos con handle propio y SEO/Open Graph.
- Verificación de audiencia por OAuth: Twitch, YouTube, TikTok, Instagram.
- Badge de "audiencia verificada" + refresh automático de stats vía cron.
- Discovery para marcas en `/buscar` (filtra por juego, país, audiencia).
- Analítica de comportamiento + panel de métricas para el creador.
- Onboarding, auth, edición de perfil.

Es decir: **el wedge técnico ya existe.** El pre-seed es para densidad de mercado y
primeros pilotos de venta, no para construir el MVP desde cero.

---

## 4. Mercado (TAM / SAM / SOM)

> Resumen. **Metodología completa, fuentes citables y sensibilidad en
> `05-mercado-y-tamano.md`.** Números *(est.)* = estimaciones propias con supuesto
> explícito, a validar con datos primarios post-lanzamiento.

### 4.1 TAM — el dinero que fluye a los creadores
Influencer marketing global **~US$33B (2025)** (Statista), dentro de una creator
economy de **US$250B→480B (2027)** (Goldman Sachs). **Gaming/entretenimiento es la
vertical de mayor crecimiento (~32,7% CAGR, Mordor).**

### 4.2 SAM — gaming/creadores en LATAM
Gasto de influencer marketing LATAM **~US$1,26B (2025)** (extrapolado de US$1,12B
2024, Statista) × **~15% de share de gaming** *(est.)* = **~US$189M/año** (rango
US$150-250M). Contexto: LATAM tiene **372,3M jugadores** y **~US$8,3B** de mercado
gaming (Newzoo 2025).

### 4.3 SOM — lo que LOBBY puede capturar
LOBBY captura suscripción B2B + reclutamiento + freemium + take-rate, no el pool
completo. Con ~800 cuentas B2B pagas (bottom-up: ~16-27% de un universo serviceable
de 3.000-5.000 cuentas), el SOM a 5 años es **~US$10-15M de ARR** *(est.)* —
**~6% del SAM**, captura conservadora.

### 4.4 El dolor cuantificado (por qué es urgente)
**37,2% de seguidores falsos**, **~US$4,6B/año desperdiciados**, y el tramo con más
fraude es el **macro 100K-500K (48,3%)** — exactamente el **mid-tier que LOBBY
verifica**. **81% de los anunciantes** sufrió fraude en los últimos 12 meses (WFA).

### 4.5 Segmento de entrada
Creadores **mid-tier (10K-500K)** en Brasil, México, Argentina, Colombia y Chile —
los que las marcas más buscan, los de mayor fraude no-verificado, y hoy los peor
servidos.

---

## 5. Panorama competitivo

| Categoría | Players | Cómo se diferencia LOBBY |
|---|---|---|
| "LinkedIn for gamers" social | eFuse, Zengaming, PvP | Todos murieron/pivotearon: consumo no monetiza. LOBBY es B2B. |
| Bolsa de empleo gaming | **Hitmarker** (rentable) | LOBBY parte del descubrimiento+verificación de marca; reclutamiento es Fase 3 |
| Stats competitivas | Op.gg, Mobalytics, Tracker.gg | Ellos = skill del jugador. LOBBY = audiencia del creador + capa B2B |
| Link-in-bio | Linktree, Beacons | Ellos = media kit estático. LOBBY = verificado + descubrible por marcas |
| Plataformas madre | Twitch, YouTube, TikTok, Discord | Dan audiencia pero no identidad profesional cross-plataforma ni B2B |
| Agencias / MCN | rosters manuales | LOBBY los complementa y/o desintermedia con datos y escala |

**Ventaja defendible:** dataset propietario de verificación cross-plataforma +
posición de categoría en LATAM + secuencia correcta de red de dos lados. Detalle
del foso en `00-tesis-y-estrategia.md §4`.

---

## 6. Modelo de negocio

**Portafolio de ingresos secuenciado** (detalle y racional en `00 §6`):

1. **Directorio B2B verificado** (Fase 2, primer revenue): marcas y agencias pagan
   suscripción por descubrimiento + verificación + segmentación. Precio por asiento
   / tier según volumen de búsquedas y features.
2. **Reclutamiento / jobs** (Fase 3): teams, orgs y empleadores endémicos pagan por
   publicar y contratar — el modelo Hitmarker, ya probado rentable.
3. **Freemium creador** (Fase 3): 3-5% de creadores top pagan por analytics
   avanzado, prioridad en búsqueda y media kit premium.
4. **Take-rate en deals** (Fase 3): fee sobre deals marca-creador cerrados en la
   plataforma.

El creador **no paga** en el núcleo — su gratuidad es lo que construye el foso de
datos que se le vende a la marca.

---

## 7. Go-to-market

### 7.1 Encender la oferta (0-12m)
- **BD dirigido por mercado y juego**, no horizontal: entrar donde ya hay densidad
  (ej. Valorant/FIFA/Free Fire en Brasil y México).
- **Alianzas con ligas y programas** (GGTech/University Esports, programas de
  creadores) para onboarding en bloque.
- **Loop de producto:** "quién te vio", verificación como status symbol, media kit
  compartible → adquisición orgánica creador-a-creador.

### 7.2 Encender la demanda (12-24m)
- **Venta directa a marcas y agencias** activas en LATAM: partir de las endémicas
  (Razer, Logitech, HyperX, Red Bull) por ser el cierre más natural, y bebidas/QSR
  que ya invierten fuerte (Ambev, McDonald's, Burger King).
- **Vender el ahorro de due diligence:** el pitch a la marca es "lo que hoy te
  cuesta meses y una agencia, acá lo hacés en minutos con datos verificados".
- **Modelo land-and-expand:** empezar con un piloto pago acotado, expandir a más
  asientos/campañas.

### 7.3 Política de demanda sostenible
Priorizar fintech, consumo y tech por sobre apuestas — plata más lenta pero marca
más limpia y defendible ante Harvard/VCs y ante los propios creadores.

---

## 8. Producto y roadmap

| Fase | Foco | Entregables clave |
|---|---|---|
| **Hecho** | Wedge técnico | Perfiles verificados, discovery, analytics, OAuth 4 plataformas |
| **0-6m** | Densidad + pulido | Onboarding en bloque, calidad de datos, loop de hábito |
| **6-12m** | Herramientas de marca | Búsqueda avanzada, listas/segmentos, export, seats B2B |
| **12-24m** | Monetización B2B | Facturación, tiers, dashboard de campaña |
| **24m+** | Apilar motores | Jobs/reclutamiento, freemium premium, take-rate/marketplace |

---

## 9. Equipo

> **A completar con datos reales.** Un plan McKinsey es tan creíble como su equipo.
> Detallar: fundador(es), rol, por qué son los indicados ("founder-market fit"),
> asesores del ecosistema gaming/esports LATAM, y los 3-4 primeros hires que
> financia el pre-seed (eng, BD de creadores, ventas B2B).

Placeholder de estructura con el pre-seed (~18m):
- Fundador/es (producto + estrategia).
- 2 ingenieros (producto + datos/verificación).
- 1 BD de creadores (oferta).
- 1 ventas B2B (demanda, pilotos).

---

## 10. Proyecciones financieras (resumen)

> Detalle completo, supuestos y escenarios en `02-modelo-financiero.md`.

| Año | Creadores verif. | Cuentas B2B | Ingresos (base) |
|---|---|---|---|
| Y1 | 3.000 | 0 (piloto) | ~US$0 |
| Y2 | 15.000 | 40 | ~US$0.28M |
| Y3 | 50.000 | 150 | ~US$1.4M |
| Y4 | 120.000 | 400 | ~US$4.8M |
| Y5 | 250.000 | 800 | ~US$11M |

**Unit economics B2B (base):** CAC cuenta ~US$2.000; ARPA ~US$6-10K/año;
retención ~80%; **LTV/CAC > 10x**. La oferta (creadores) se adquiere casi orgánica
a ~US$3-8 de CAC y es costo de foso, no centro de ganancia.

---

## 11. El ask y uso de fondos

- **US$500K pre-seed** vía SAFE, ~18 meses de runway.
- **Uso:** ~55% producto/ingeniería y datos, ~30% BD de creadores + ventas B2B,
  ~15% operación/legal.
- **Hito para levantar Seed:** densidad verificada en 3 mercados + US$250-500K de
  ARR B2B contratado + unit economics B2B validados con cuentas reales.

---

## 12. Riesgos

Tabla completa en `00-tesis-y-estrategia.md §9`. Los tres materiales:
1. **Dependencia de APIs** de plataformas → mitigar con multi-plataforma y captura
   del dato en la conexión.
2. **Cold-start** → mitigar con secuencia oferta→demanda y BD por nicho denso.
3. **Preferencia por agencias** → mitigar posicionando LOBBY también como
   herramienta *de* la agencia, no sólo como reemplazo.

---

## 13. Apéndices

- `investigacion-mercado.md` — competencia, fracasos y foso.
- `mapa-industria-gaming.md` — value chain y las tres tortas.
- `mapa-marcas-latam.md` — el pagador: quién, cuánto, cómo compra.
- `02-modelo-financiero.md` — modelo cuantitativo.
- **Pendiente:** cohortes de tracción reales (post-lanzamiento) y bios del equipo.
