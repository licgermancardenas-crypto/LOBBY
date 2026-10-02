# LOBBY — Modelo financiero

> Proyección a 5 años, unit economics y escenarios. **Todos los números son
> ilustrativos y están gobernados por los supuestos explícitos del §1** — esto es
> pre-lanzamiento, así que el valor del modelo está en la *lógica* y las palancas,
> no en la precisión decimal. Se reemplaza por datos reales al tener tracción.
>
> Moneda: US$. Última act.: 2026-07-31.

---

## 1. Supuestos maestros

### 1.1 Oferta (creadores — gratis, es el foso)
| Supuesto | Valor | Racional |
|---|---|---|
| Creadores verificados fin de Y1 | 3.000 | BD dirigido en 2-3 mercados |
| Crecimiento | 5x → 3.3x → 2.4x → 2.1x | desaceleración natural |
| CAC creador | US$3-8 | orgánico + alianzas con ligas |
| Conversión a freemium premium | 3% (desde Y3) | benchmark LinkedIn/Patreon |
| Precio premium creador | US$8/mes | accesible para mid-tier |

### 1.2 Demanda (cuentas B2B — el revenue)
| Supuesto | Valor | Racional |
|---|---|---|
| Cuentas B2B pagas fin Y2 → Y5 | 40 → 150 → 400 → 800 | land-and-expand |
| ARPA (ingreso anual por cuenta) | US$6K → US$10.2K | agencias > marcas; upsell de asientos |
| Retención anual de cuentas | 80% | B2B con costo de cambio |
| CAC cuenta B2B | US$2.000 | venta directa, ciclo medio |
| Margen bruto | 85% | SaaS + costos de API/infra |

### 1.3 Motores Fase 3 (desde Y3)
| Motor | Y3 | Y4 | Y5 |
|---|---|---|---|
| Reclutamiento / jobs | US$150K | US$600K | US$1.5M |
| Take-rate en deals | — | US$400K | US$1.2M |
| Freemium creador | ~US$43K | ~US$115K | ~US$240K |

### 1.4 Ronda
- Pre-seed **US$500K** vía SAFE (mid del rango $250-750K).
- Runway objetivo: **18 meses**.
- Cap post-money sugerido: **~US$8-10M** (mediana Carta 2025 para rondas de
  US$250K-1M es ~US$10M; con producto construido + problema validado, LOBBY apunta
  a la mitad alta). Dilución resultante **~5%** — founder-friendly. Detalle en
  `13-analisis-economico-financiero.md §7-8`.

---

## 2. Proyección de ingresos — escenario BASE

| Motor | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---|---|---|---|---|
| Directorio B2B | 0 | $240K | $1.17M | $3.6M | $8.16M |
| Reclutamiento | 0 | 0 | $150K | $600K | $1.5M |
| Take-rate | 0 | 0 | 0 | $400K | $1.2M |
| Freemium creador | 0 | $43K | $43K | $115K | $240K |
| **Total** | **~$0** | **~$0.28M** | **~$1.4M** | **~$4.8M** | **~$11.1M** |

> Directorio B2B = cuentas × ARPA. Ej. Y3: 150 × ~US$7.8K ≈ US$1.17M.

---

## 3. Escenarios

| ARR fin de año | Conservador | **Base** | Agresivo |
|---|---|---|---|
| Y2 | $0.15M | $0.28M | $0.45M |
| Y3 | $0.8M | $1.4M | $2.3M |
| Y4 | $2.6M | $4.8M | $8.0M |
| Y5 | $6.0M | $11.1M | $19.5M |

Palancas entre escenarios: (a) velocidad de densidad de oferta, (b) tasa de cierre
B2B, (c) ARPA (mezcla agencia/marca y upsell de asientos), (d) timing de encendido
de los motores de Fase 3.

---

## 4. Unit economics

### 4.1 Cuenta B2B (el motor)
| Métrica | Valor | Cálculo |
|---|---|---|
| ARPA | ~US$7.800/año | mezcla marca/agencia |
| Margen bruto | 85% | ~US$6.630 contribución/año |
| Vida media | 5 años | 1 / (1 − 80% retención) |
| **LTV** | **~US$33.000** | contribución × vida |
| CAC | US$2.000 | venta directa |
| **LTV/CAC** | **~16x** | muy por encima del piso de 3x |
| Payback | ~3.6 meses | CAC / (ARPA×margen/12) |

### 4.2 Creador (foso, no ganancia directa)
| Métrica | Valor |
|---|---|
| CAC | US$3-8 |
| Ingreso directo | ~0 (3% convierte a $8/mes en Fase 3) |
| Valor real | dato de verificación que habilita el revenue B2B |

**Lectura:** cada creador verificado es un input del producto que se le vende a la
marca. La rentabilidad no está en el creador sino en la **densidad** que hace
inevitable la suscripción B2B.

---

## 5. Costos y runway del pre-seed (18 meses)

| Rubro | % del uso | Detalle |
|---|---|---|
| Producto / ingeniería / datos | ~55% | 2 eng + infra + costos de API de verificación |
| BD creadores + ventas B2B | ~30% | 1 BD oferta + 1 ventas demanda + viáticos/eventos |
| Operación / legal / misc | ~15% | societario, contable, herramientas |

Con US$500K y ~18m, el burn objetivo es **~US$28K/mes**. El hito de salida del
pre-seed (densidad en 3 mercados + US$250-500K ARR B2B contratado) es lo que
destraba la Serie Seed.

---

## 6. Camino a la Serie Seed

| Métrica de gate | Objetivo pre-Seed |
|---|---|
| Creadores verificados | masa crítica en 3 mercados |
| ARR B2B contratado | US$250-500K |
| LTV/CAC B2B validado | > 5x con cuentas reales |
| Retención de cuentas | ≥ 70% observada |

---

## 7. Advertencia metodológica (para el inversor)

Este modelo es **top-down orientado por supuestos**, apropiado para pre-seed. No
pretende precisión: pretende mostrar (1) que la economía B2B cierra con holgura,
(2) cuáles son las 3-4 palancas que mueven el resultado, y (3) que el uso de
US$500K compra los hitos que destraban la próxima ronda. Se sustituye por un
modelo bottom-up con cohortes reales apenas haya tracción.

> **Próximo paso sugerido:** exportar este modelo a una planilla (Google
> Sheets/Excel) con celdas de supuestos editables para hacer sensibilidad en vivo
> frente a inversores. Puedo generar el CSV.
