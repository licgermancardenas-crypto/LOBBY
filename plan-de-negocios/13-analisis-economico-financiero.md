# LOBBY — Análisis económico-financiero (profundo)

> El companion de nivel VC del `02-modelo-financiero.md`: revenue bottom-up por
> tier, P&L direccional, unit economics por segmento, **métricas de salud SaaS con
> benchmarks 2025**, burn/runway, cap table y dilución, valuación por comparables,
> roadmap de fundraising y retorno para el inversor.
>
> Última act.: 2026-07-31. Benchmarks: Carta *State of Pre-Seed 2025*, SaaS Capital,
> Benchmarkit 2025, Data-Mania. Números de LOBBY = ilustrativos, gobernados por
> supuestos (pre-lanzamiento).

---

## 1. Metodología (por qué este nivel)

El `02` es **top-down** (apropiado para pre-seed). Acá hacemos el **bottom-up** que
lo valida —construir el ARR desde los tiers de `12-pricing`— y lo enmarcamos en las
**métricas que un VC usa para juzgar salud SaaS**, contra benchmarks públicos. El
objetivo no es precisión decimal (imposible pre-lanzamiento) sino demostrar que
**la economía cierra y las palancas son las correctas**.

---

## 2. Revenue bottom-up por tier (reconcilia con el top-down)

Construcción del **directorio B2B** al Año 5 desde los tiers de `12`:

| Tier | % de cuentas | Cuentas (de 800) | ARPA/año | ARR |
|---|---|---|---|---|
| Starter | 20% | 160 | US$1,5K | US$0,24M |
| Growth ⭐ | 50% | 400 | US$6,5K | US$2,60M |
| Agency ⭐ | 22% | 176 | US$15K | US$2,64M |
| Enterprise | 8% | 64 | US$35K | US$2,24M |
| **Total directorio Y5** | | **800** | **~US$9,7K blended** | **~US$7,7M** |

Más los otros motores (Y5): reclutamiento **US$1,5M** + take-rate **US$1,2M** +
freemium creador **US$0,24M**.

> **Total Y5 ≈ US$10,7-11,1M ARR** — reconcilia con el top-down del `02`. La clave:
> el **ARPA blended sube** con el tiempo (de ~US$6K a ~US$9,7K) porque la mezcla se
> corre hacia Agency/Enterprise vía **expansión de asientos (NRR)**, no por subir
> precios de lista.

---

## 3. P&L direccional 5 años (ilustrativo)

| US$ '000 | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---|---|---|---|---|
| **Ingresos** | ~0 | 280 | 1.400 | 4.800 | 11.100 |
| COGS (15%: API/infra/soporte) | — | (42) | (210) | (720) | (1.665) |
| **Gross profit (85%)** | ~0 | 238 | 1.190 | 4.080 | 9.435 |
| I+D (producto/eng) | (300) | (600) | (1.100) | (1.800) | (2.600) |
| S&M (ventas + mkt) | (120) | (350) | (900) | (2.200) | (3.600) |
| G&A | (80) | (150) | (400) | (900) | (1.500) |
| **EBITDA** | **(500)** | **(862)** | **(1.210)** | **(820)** | **1.735** |

- **Margen bruto 85%** — estándar SaaS; el COGS es API de verificación + infra +
  soporte.
- **Break-even de EBITDA hacia Y5** — el negocio se vuelve rentable a escala,
  cuando el gross profit (85%) supera el opex. Antes de eso, se **invierte en
  crecimiento** (es lo que un VC quiere en growth stage, no rentabilidad temprana).
- Estructura de opex converge a un mix sano: **I+D ~23%, S&M ~32%, G&A ~14%** de
  ingresos en Y5.

---

## 4. Unit economics por segmento (el corazón)

Las cuentas no son iguales — separamos **marca** de **agencia**:

| Métrica | Marca (Growth) | Agencia | Blended |
|---|---|---|---|
| ARPA/año | US$6,5K | US$15K | ~US$9,7K |
| Margen bruto | 85% | 85% | 85% |
| Contribución/año | US$5,5K | US$12,75K | US$8,2K |
| Retención anual | 80% | 85% | ~82% |
| Vida media | 5 años | 6,7 años | ~5,5 años |
| **LTV** | **~US$27,6K** | **~US$85K** | **~US$45K** |
| CAC | US$2.000 | US$3.500 | ~US$2.400 |
| **LTV/CAC** | **~14x** | **~24x** | **~18x** |
| **CAC payback** | **~4,4 meses** | **~3,3 meses** | **~3,5 meses** |

> **Lectura:** las **agencias son el mejor negocio** (LTV ~US$85K, LTV/CAC ~24x) —
> por eso son target ⭐. Ambos segmentos están **muy por encima** del piso sano
> (LTV/CAC > 3x, payback < 12 meses). El foso (creadores) se adquiere a CAC US$3-8
> y es costo de red, no incluido acá.

---

## 5. Métricas de salud SaaS vs. benchmarks 2025

| Métrica | Target LOBBY | Benchmark 2025 | Lectura |
|---|---|---|---|
| **NRR** (net revenue retention) | **>110%** | mediana 82%; >100% "must"; 120%+ elite | Upsell de asientos (Agency/Enterprise) |
| **GRR** (gross retention) | ~85% | 85-90% sano | Costo de cambio B2B |
| **CAC payback** | **~3,5 meses** | mediana 20m; top 12-15m | **Muy por encima** del top |
| **LTV/CAC** | **~18x** | >3x sano | Elite |
| **Rule of 40** | **>40** (growth>>40 temprano) | sólo 11-30% lo logra | Fácil en growth stage por base chica |
| **Magic Number** | **>1,0** | >1,0 = eficiente | S&M eficiente por LTV/CAC alto |
| **Burn Multiple** | **<1,5x** → <1,0x | Series A mediana 1,2x; <1,0 elite | Disciplina de capital |
| **Gross margin** | **85%** | 75-85% SaaS | Sano |

**Conclusión:** LOBBY no es un negocio de crecer quemando; su **eficiencia de
capital** (CAC payback ~3,5m, LTV/CAC ~18x) es su argumento financiero más fuerte —
consistente con la lección de Hitmarker (rentable con ~US$1M) vs. eFuse (US$17M
quemados).

---

## 6. Burn, runway y uso de fondos (pre-seed)

- **Raise:** US$500K · **runway ~18 meses** · **burn objetivo ~US$28K/mes**.
- **Uso:** ~55% producto/datos · ~30% BD+ventas · ~15% ops (ver `02 §5`).
- **Burn multiple en la ventana pre-seed:** se prioriza construir densidad + primer
  ARR; el multiple se vuelve relevante recién post-seed (target <1,5x).
- **Regla de disciplina (Carta):** el pre-seed compra **UN hito** — densidad en 3
  mercados + US$250-500K ARR contratado — no "18 meses de todo".

---

## 7. Cap table y dilución (SAFE)

**Instrumento:** post-money SAFE con cap, sin descuento — el estándar (92% de las
rondas pre-priced en Q3 2025, Carta).

| Ronda | Monto | Cap/valuación post | Dilución | Founders (aprox.) |
|---|---|---|---|---|
| Fundación | — | — | — | 100% |
| **Pre-seed (ahora)** | **US$500K** | **~US$8-10M post** | **~5-6%** + pool | **~88-90%** |
| Seed (mes 12-18) | ~US$2-3M | ~US$15-20M post | ~15% | ~72% |
| Series A (año 3) | ~US$8-12M | ~US$40-60M post | ~20% | ~57% |

> **Nota clave:** con US$500K sobre un cap de ~US$10M, la dilución del pre-seed es
> **~5%** — **muy founder-friendly** (la mediana de dilución pre-seed es 10-15%,
> pero esos son raises más grandes). LOBBY entrega poco equity por el capital que
> necesita, gracias a que **el producto ya está construido**.

---

## 8. Valuación (por comparables)

### 8.1 Hoy (pre-seed)
El cap se fija por mercado, no por DCF (no hay ingresos aún):
- **Mediana Carta 2025:** cap post-money **~US$10M** para rondas de US$250K-1M.
- **B2B SaaS first-time founder con problema validado:** caps de **US$8-15M**.
- **Target LOBBY: US$8-10M post-money** — justificado por producto construido +
  problema validado con dato (37,2% fraude) + wedge de verificación.

### 8.2 A futuro (referencia de salida)
- **Múltiplos SaaS 2025:** privado **2,5-6x ARR**; **vertical SaaS +25-30% de
  premium** (7-9,5x con fintech embebido); NRR>120% + Rule of 40>50 → 7-9x.
- **LOBBY como vertical SaaS + marketplace LATAM:** aplicando **5-7x** conservador
  sobre **US$11M ARR (Y5)** → **enterprise value ~US$55-77M**.
- **Adquirentes estratégicos** pagan 1,5-2x de premium y fueron 62% de los deals
  SaaS 2025 — hay comprador natural (plataformas, agencias, holdings).

---

## 9. Roadmap de fundraising (la escalera)

| Ronda | Cuándo | Monto | Hito que la destraba |
|---|---|---|---|
| **Pre-seed** | Ahora | US$500K | Densidad 3 mercados + US$250-500K ARR |
| **Seed** | Mes 12-18 | US$2-3M | ARR recurrente + unit economics validados |
| **Series A** | Año 3 | US$8-12M | ~US$3-5M ARR + NRR>110% + expansión geográfica |
| **(Salida)** | Año 5+ | — | ~US$11M ARR, EV ~US$55-77M (o más con premium estratégico) |

Cada ronda financia el salto al siguiente hito, no "supervivencia". Es la
**disciplina de un hito por ronda** (Carta).

---

## 10. Retorno para el inversor del pre-seed (ilustrativo)

- **Entrada:** US$500K a cap ~US$10M → ~5% pre-dilución.
- **Referencia de salida:** EV ~US$55-77M en ~5 años.
- **Múltiplo bruto:** ~5,5-7,7x sobre el valor de entrada **antes** de dilución de
  rondas siguientes; **neto de dilución** (~40-45% acumulada), sigue siendo un
  **~3-4x+** en un escenario base, con upside mucho mayor en el agresivo (`02 §3`).

> Estos retornos son **ilustrativos** — dependen de ejecución y de las rondas
> intermedias. El punto para el inversor no es la precisión sino que **la
> estructura de retorno cierra** con eficiencia de capital, no con quema.

---

## 11. Break-even y sensibilidad

- **Break-even de EBITDA:** ~**Año 5** (el gross profit al 85% supera el opex a
  escala). Break-even de caja depende del ritmo de rondas.
- **Las 4 palancas que mueven el resultado** (ver `02 §3` y `05 §7`):
  1. Velocidad de densidad de oferta (habilita el B2B).
  2. Tasa de cierre y penetración de cuentas B2B.
  3. **ARPA / mezcla de tiers** (Agency/Enterprise suben el ARPA vía NRR).
  4. Timing de encendido de reclutamiento + take-rate.
- **La más sensible:** el ARPA blended (mezcla de tiers). Pasar de 82% a 92% de
  retención + más peso Agency mueve el ARR de Y5 de ~US$8M a ~US$14M.

---

## 12. Riesgos financieros y mitigación

| Riesgo | Mitigación |
|---|---|
| ARPA real < proyectado (LATAM sensible al precio) | Tiers desde US$99; anclaje a ROI; validar con Van Westendorp (`12 §8`) |
| CAC B2B sube (ciclo de venta largo) | Empezar por endémicas (cierre fácil); casos de éxito para bajar CAC |
| Retención B2B < 80% | Onboarding + valor de campaña + gating por uso |
| Riesgo cambiario erosiona ingresos | **Cobro en USD** como cobertura (`12 §6`, PESTEL `11`) |
| Runway corto si el ARR tarda | Disciplina de un hito por ronda; burn ~US$28K/mes |
| Múltiplos SaaS comprimidos (mercado 2026 en baja) | Foco en eficiencia (Rule of 40, burn<1x) — lo que el mercado premia hoy |

---

## 13. Resumen para el inversor

1. **Bottom-up reconcilia** con el top-down: ~US$11M ARR en Y5 desde tiers reales.
2. **Unit economics elite:** LTV/CAC ~18x, CAC payback ~3,5 meses — muy sobre
   benchmark.
3. **Eficiencia > quema:** el argumento financiero es capital-efficient (Hitmarker,
   no eFuse).
4. **Ronda founder-friendly:** ~5% de dilución a cap de mercado (~US$10M).
5. **Retorno que cierra:** ~3-4x+ neto en base, upside grande, con comprador
   estratégico natural.
6. Todo **ilustrativo y gobernado por supuestos** — se reemplaza con datos reales
   post-lanzamiento.
