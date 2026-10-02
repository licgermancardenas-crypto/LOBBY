# LOBBY — Frameworks estratégicos de marketing

> Los marcos analíticos que un comité de inversión / HBS espera, aplicados a LOBBY:
> SWOT, Porter (5 fuerzas), PESTEL (macro LATAM), Ansoff, Blue Ocean/ERRC y
> Customer Journey Map. Se apoyan en `05-mercado`, `06-mapas`, `07-competitivo`,
> `08-marketing` y `10-personas`.
>
> Última act.: 2026-07-31.

---

## 1. SWOT (matriz FODA)

| **Fortalezas** | **Debilidades** |
|---|---|
| Producto ya construido (MVP verificado) | Pre-lanzamiento: cero tracción real todavía |
| Wedge de **verificación por OAuth** (nadie lo tiene como identidad de creador) | Cold-start de dos lados aún por resolver |
| **B2B desde el diseño** (evita el error de eFuse) | Dependencia de APIs de plataformas (riesgo estructural) |
| LATAM-native + founder-market fit | Marca desconocida; equipo chico |
| Capital-efficient (US$500K, no US$17M) | Brasil exige localización a portugués (costo) |
| Dato propietario cross-plataforma | Sin bios de equipo cerradas aún (`01 §9`) |

| **Oportunidades** | **Amenazas** |
|---|---|
| No-endémicas **superaron a endémicas** (2025) y suben | Plataformas cortan/limitan el OAuth |
| **Ningún player consolidado** en LATAM | Incumbente (LinkedIn, GRIN) baja a LATAM/gaming |
| Dolor de fraude creciente (37,2% falso, US$4,6B) | Una agencia grande construye su propio directorio |
| Expansión al **mercado hispano de EE.UU.** | Plata de apuestas = riesgo reputacional |
| Creator economy US$250B→480B | Macro LATAM (riesgo cambiario, regulación) |

**Estrategias cruzadas (lo que hace útil un SWOT):**
- **FO (usar fuerza para oportunidad):** el wedge de verificación + hueco LATAM →
  ser dueños de la categoría antes de que aparezca un rival.
- **FA (fuerza contra amenaza):** dato propietario + multi-plataforma → mitigar el
  riesgo de corte de API (no depender de una sola).
- **DO (corregir debilidad para aprovechar oportunidad):** cerrar equipo y tracción
  rápido para capturar el hueco antes que un incumbente.
- **DA (defensivo):** disciplina de foco (beachhead) para no dispersar el poco
  capital ante amenazas múltiples.

---

## 2. Porter — 5 Fuerzas (estructura de la industria)

| Fuerza | Intensidad | Análisis |
|---|---|---|
| **Poder de proveedores** (plataformas como fuente de datos) | 🔴 **ALTA** | Twitch/YouTube/TikTok/IG controlan el OAuth. Pueden cortar/encarecer el acceso. **Es la fuerza que más ata a LOBBY.** |
| **Poder de compradores** (marcas/agencias) | 🟡 Media | Hoy tienen alternativas (agencias, vetting manual), pero ninguna verificada. El costo de cambio **crece** con el uso. |
| **Amenaza de sustitutos** | 🔴 Alta (hoy) | Agencias, Excel, Linktree, vetting manual, herramientas in-platform. LOBBY debe ser 10x mejor, no marginal. |
| **Amenaza de nuevos entrantes** | 🟡 Media-alta | Copiar el OAuth es barato; **el foso real es el dataset denso + posición de categoría + red de dos lados**, no el código. |
| **Rivalidad competitiva** | 🟢 Baja en LATAM / 🔴 Alta global | En LATAM-gaming no hay rival directo; global (GRIN, CreatorIQ) es fuerte pero no atiende la región. |

**Conclusión de Porter:** la fuerza **vinculante es el poder de proveedores
(plataformas)**. Toda la defensa estratégica pasa por: (a) **multi-plataforma**
para no depender de una, (b) **capturar y componer el dato** en el momento de la
conexión (que el valor viva en LOBBY, no en la API), y (c) construir **densidad y
categoría** que suban la barrera a nuevos entrantes. La estructura es atractiva
**localmente** (baja rivalidad, hueco claro), que es exactamente por qué el
beachhead LATAM tiene sentido.

---

## 3. PESTEL (entorno macro — crítico por la geografía LATAM)

| Factor | Implicancia para LOBBY |
|---|---|
| **P — Político** | Inestabilidad regional variable; regulación de **apuestas** en cambio (afecta una fuente de demanda). Neutralidad política de la marca es un activo. |
| **E — Económico** | **Riesgo cambiario** (inflación AR) presiona el CAC local pero también abarata el talento/BD; el **revenue B2B dolarizado** actúa de cobertura natural. Gasto de ad en alza (+12,6% influencer LATAM). |
| **S — Social** | Población joven, altísimo uso de redes (Brasil 144M), **cultura de creador fuerte** y **alta confianza en creadores locales** — viento a favor de la adopción. |
| **T — Tecnológico** | APIs de OAuth disponibles y baratas (habilitador del wedge); **mobile-first**; despliegue de **5G**; stack **fintech** maduro facilita el cobro B2B. |
| **E — Ambiental** | Baja relevancia directa (negocio digital). Ángulo ESG menor: economía del creador como inclusión económica. |
| **L — Legal** | **Privacidad de datos** (LGPD Brasil y leyes símiles), **Términos de uso** de plataformas (riesgo API), **IVA a servicios digitales** por país, reglas de publicidad/apuestas. Requiere compliance desde el diseño. |

**Lectura:** el entorno es **mayormente favorable** (social + tecnológico
empujan), con dos focos de gestión activa: **económico (cambiario)** —cubierto por
revenue dolarizado— y **legal (datos + ToS de plataformas)** —cubierto por
compliance y multi-plataforma.

---

## 4. Ansoff — vectores de crecimiento

|  | **Mercados existentes** | **Mercados nuevos** |
|---|---|---|
| **Productos existentes** | **Penetración de mercado** 🟢 *Ahora:* densidad de creadores + cuentas B2B en AR/MX con el producto actual | **Desarrollo de mercado** 🟡 *Fase 2:* Brasil (PT), Colombia, Chile → **US hispano** (mismo producto, nueva geo) |
| **Productos nuevos** | **Desarrollo de producto** 🟡 *Fase 3:* reclutamiento, freemium, take-rate (el portafolio de monetización sobre la misma base) | **Diversificación** 🔵 *Visión:* extender de gaming a **otras verticales del entretenimiento** (música, deportes, streaming general) — la "capa profesional de la economía del entretenimiento" |

**Secuencia de riesgo creciente:** penetración → desarrollo (mercado + producto en
paralelo) → diversificación. LOBBY **no salta a diversificación** hasta dominar el
núcleo — pero el nombre y la tesis ya dejan la puerta abierta a la visión grande
(lo que un VC quiere ver: TAM expansible sin cambiar la marca).

---

## 5. Blue Ocean / ERRC (refuerza el category design)

En vez de competir en el "océano rojo" de las influencer platforms, LOBBY crea uno
azul con el canvas **Eliminar-Reducir-Aumentar-Crear**:

| **Eliminar** | **Reducir** |
|---|---|
| La opacidad de las agencias | El costo y tiempo de descubrir/vettear creadores |
| Las stats auto-reportadas (basura) | La dependencia de intermediarios | 
| El vetting 100% manual | El desperdicio de presupuesto (36%) |

| **Aumentar** | **Crear** |
|---|---|
| La **confianza** (verificación real) | La categoría **"identidad de creador verificada"** |
| La granularidad de **segmentación** | La **audiencia verificada cross-plataforma** como estándar |
| El **control del creador** sobre su dato | Un **directorio LATAM-native** que no existía |

**Curva de valor (comparación cualitativa):**
```
Atributo                Agencias   Influencer     Link-in-bio   LOBBY
                                   platforms      (Linktree)
Verificación audiencia    Media       Baja           Nula        ALTA
Cobertura LATAM           Media       Baja           Media        ALTA
Segmentación              Media       Alta           Nula         ALTA
Costo para la marca       ALTO        Medio          —            Bajo
Transparencia             Baja        Media          Alta         ALTA
Control del creador       Baja        Baja           Alta         ALTA
```
LOBBY **rompe el trade-off** clásico: da la verificación+segmentación de las
plataformas caras con la transparencia+control del link-in-bio, a costo bajo.

---

## 6. Customer Journey Map (personas → embudo)

Recorrido de las dos personas clave, mapeado al embudo AARRR (`08 §6`).

### 6.1 Creador — "Valentina" (oferta)
| Etapa | Qué siente / hace | Touchpoint | Acción de LOBBY | AARRR |
|---|---|---|---|---|
| **Awareness** | "Un colega mostró su badge y cerró un deal" | Referido, TikTok, liga | Contenido "por qué verificar importa" | Acquisition |
| **Consideración** | "¿Me sirve? ¿Es otra plataforma más?" | Landing, perfiles de ejemplo | Prueba social, cero fricción, gratis | Acquisition |
| **Onboarding** | Conecta su canal por OAuth | Flujo de alta | Aha moment: aparece el badge | **Activation** |
| **Uso** | Comparte su media kit, ve "quién te vio" | Producto | Loops de hábito | Retention |
| **Retención** | Le llegan oportunidades | Notificaciones | Mantener valor entrante | Retention |
| **Advocacy** | Invita a sus pares | Referral in-product | Incentivo de referido (Loop 1) | Referral |

### 6.2 Marca — "Carolina" (demanda / buyer)
| Etapa | Qué siente / hace | Touchpoint | Acción de LOBBY | AARRR |
|---|---|---|---|---|
| **Awareness** | "Perdí presupuesto en bots, necesito audiencia real" | Outbound, informe (lead magnet) | Mostrar el dolor con dato (37,2%) | Acquisition |
| **Consideración** | "¿Su verificación es confiable? ¿Reemplaza mi agencia?" | Demo, caso de éxito | OAuth directo; posicionar como complemento | Acquisition |
| **Activación** | Primera búsqueda con resultado, contacta un creador | Producto (discovery) | Segmentación útil, resultado en minutos | **Activation** |
| **Uso** | Guarda listas/segmentos, arma campaña | Producto | Herramientas de campaña | Retention |
| **Retención** | Repite campañas, suma asientos | Suscripción | NRR, upsell de asientos | Revenue/Retention |
| **Advocacy** | Recomienda a otros marketers | Boca a boca, industria | Programa de referidos B2B | Referral |

**Uso del mapa:** cada "qué siente" negativo es un punto de fricción a resolver por
producto o mensaje; cada touchpoint tiene un dueño (marketing/ventas/producto). Es
la traducción operativa de las personas de `10`.

---

## 7. Cómo se encadenan los frameworks (para no verlos sueltos)

```
PESTEL + Porter  → ¿es atractivo el entorno/industria?  → SÍ, localmente
        ↓
SWOT             → ¿qué tenemos vs. qué enfrentamos?     → wedge + hueco vs. API/incumbentes
        ↓
Blue Ocean/ERRC  → ¿cómo escapamos a la competencia?     → crear categoría verificada
        ↓
STP + Personas   → ¿a quién exactamente?                  → mid-tier + no-endémicas/agencias
        ↓
Ansoff           → ¿por dónde crecemos, en qué orden?     → penetración→desarrollo→diversificación
        ↓
Journey + AARRR  → ¿cómo lo ejecutamos touchpoint a touchpoint? → embudo por persona
        ↓
Plan lanzamiento → ¿qué hacemos los primeros 90 días?     → ver `09`
```

Los frameworks no son decoración: **encadenan del macro (PESTEL) al táctico
(journey/lanzamiento)** en una sola línea argumental.
