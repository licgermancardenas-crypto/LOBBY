#!/usr/bin/env python3
"""Ensambla los documentos del plan en un solo HTML con estilo de consultoría."""
import re, pathlib, datetime, markdown

BASE = pathlib.Path(__file__).parent

# Orden narrativo del informe (no el orden de archivos)
ORDER = [
    "00-tesis-y-estrategia.md",
    "01-plan-completo.md",
    "05-mercado-y-tamano.md",
    "07-panorama-competitivo.md",
    "06-mapas-latam-por-pais.md",
    "08-estrategia-de-marketing.md",
    "10-buyer-personas.md",
    "11-frameworks-estrategicos.md",
    "12-pricing-y-packaging.md",
    "09-plan-de-lanzamiento.md",
    "02-modelo-financiero.md",
    "13-analisis-economico-financiero.md",
    "03-one-pager.md",
    "04-pitch-deck.md",
]
ANEXOS = {"03-one-pager.md", "04-pitch-deck.md"}

def load(name):
    txt = (BASE / name).read_text(encoding="utf-8")
    # Quitar el índice del paquete de 00 (el PDF tiene su propio TOC)
    if name == "00-tesis-y-estrategia.md":
        txt = re.sub(r"## 0\. Índice del paquete.*?(?=## 1\. La tesis)", "", txt, flags=re.S)
    # Solo el primer H1 es el título del capítulo; los H1 posteriores del mismo
    # doc (ej. "# PARTE A") se demueven a H2 para no crear capítulos falsos.
    lines = txt.splitlines()
    seen_title = False
    in_fence = False
    for i, ln in enumerate(lines):
        if ln.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if ln.startswith("# "):
            if not seen_title:
                title = ln[2:].replace("LOBBY — ", "").replace("LOBBY —", "").strip()
                if name in ANEXOS:
                    title = "Anexo · " + title
                lines[i] = "# " + title
                seen_title = True
            else:
                lines[i] = "#" + ln  # "# PARTE A" -> "## PARTE A"
    return "\n".join(lines)

body_md = "[TOC]\n\n" + "\n\n\n".join(load(n) for n in ORDER)

md = markdown.Markdown(extensions=["extra", "toc", "sane_lists", "attr_list"],
                       extension_configs={"toc": {"toc_depth": "1-2"}})
body_html = md.convert(body_md)

_M = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto",
      "septiembre","octubre","noviembre","diciembre"]
_t = datetime.date.today()
hoy = f"{_t.day} de {_M[_t.month-1]} de {_t.year}"

CSS = """
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Noto Sans","DejaVu Sans",Arial,sans-serif; color:#1c2033;
  font-size:10.5pt; line-height:1.5; margin:0; }
:root { --navy:#141a34; --navy2:#232b52; --violet:#6d5efc; --violet-soft:#eef0ff;
  --ink:#1c2033; --muted:#5b6480; --line:#dfe3ee; }

/* ---------- PORTADA (panel enmarcado) ---------- */
.cover { height:256mm; background:linear-gradient(155deg,#0f1430 0%,#1b2350 55%,#2b2170 100%);
  color:#fff; padding:24mm 20mm; display:flex; flex-direction:column;
  page-break-after:always; position:relative; border-radius:10px; overflow:hidden; }
.cover::after { content:""; position:absolute; right:-60mm; top:-60mm; width:150mm; height:150mm;
  background:radial-gradient(circle,rgba(109,94,252,.35),transparent 62%); }
.cover .brand { font-size:15pt; letter-spacing:.42em; font-weight:700; color:#c9c6ff; z-index:1; }
.cover .rule { width:64px; height:5px; background:var(--violet); margin:22mm 0 8mm; border-radius:3px; z-index:1; }
.cover h1 { font-size:42pt; line-height:1.06; font-weight:800; margin:0 0 10mm; border:0; color:#fff;
  z-index:1; page-break-before:avoid; counter-increment:none; padding:0; }
.cover h1::before { content:none; }
.cover .sub { font-size:15pt; color:#c3c8ff; font-weight:400; max-width:150mm; z-index:1; }
.cover .spacer { flex:1; }
.cover .meta { font-size:10pt; color:#a3aae0; line-height:1.95; border-top:1px solid #3a4488; padding-top:6mm; z-index:1; }
.cover .meta b { color:#fff; font-weight:600; }
.cover .conf { position:absolute; top:24mm; right:20mm; font-size:8.5pt; letter-spacing:.22em;
  color:#c9c6ff; border:1px solid #4a55a0; padding:4px 12px; border-radius:20px; z-index:1; }

/* ---------- TOC ---------- */
.toc { page-break-after:always; }
.toc-title { font-size:20pt; font-weight:800; color:var(--navy); margin:4mm 0 6mm; }
.toc > ul { list-style:none; padding:0; margin:0; counter-reset:toc; }
.toc > ul > li { counter-increment:toc; font-weight:700; color:var(--navy);
  padding:7px 0; border-bottom:1px solid var(--line); font-size:11pt; }
.toc > ul > li::before { content:counter(toc,decimal-leading-zero); color:var(--violet);
  font-weight:800; margin-right:12px; }
.toc ul ul { list-style:none; padding:2px 0 2px 34px; margin:0; }
.toc ul ul li { font-weight:400; color:var(--muted); font-size:9.5pt; padding:1.5px 0; }
.toc a { color:inherit; text-decoration:none; }

/* ---------- CONTENIDO ---------- */
.content { padding:0 2mm; counter-reset:chap; }
h1 { page-break-before:always; counter-increment:chap; color:var(--navy);
  font-size:23pt; font-weight:800; line-height:1.15; margin:0 0 6mm;
  padding-bottom:5mm; border-bottom:3px solid var(--violet); }
h1::before { content:counter(chap,decimal-leading-zero); display:block;
  font-size:12pt; color:var(--violet); letter-spacing:.2em; margin-bottom:3mm; }
h2 { color:var(--navy2); font-size:15pt; font-weight:700; margin:9mm 0 3mm;
  padding-left:10px; border-left:4px solid var(--violet); }
h3 { color:var(--navy2); font-size:12pt; font-weight:700; margin:6mm 0 2mm; }
h4 { color:var(--muted); font-size:10.5pt; font-weight:700; margin:4mm 0 1mm; }
p { margin:2mm 0; }
a { color:var(--violet); text-decoration:none; }
strong { color:#111634; }
hr { border:0; border-top:1px solid var(--line); margin:6mm 0; }
ul,ol { margin:2mm 0; padding-left:6mm; }
li { margin:1mm 0; }

blockquote { background:var(--violet-soft); border-left:4px solid var(--violet);
  margin:3mm 0; padding:3mm 5mm; border-radius:0 6px 6px 0; color:#2a2f52; }
blockquote p { margin:1mm 0; }

table { border-collapse:collapse; width:100%; margin:3mm 0; font-size:8.6pt;
  page-break-inside:avoid; }
th { background:var(--navy); color:#fff; text-align:left; padding:5px 7px; font-weight:600;
  border:1px solid var(--navy); }
td { padding:5px 7px; border:1px solid var(--line); vertical-align:top; }
tr:nth-child(even) td { background:#f6f7fc; }

pre { background:#0f1430; color:#e6e8ff; font-family:"DejaVu Sans Mono",monospace;
  font-size:7.4pt; line-height:1.35; padding:4mm; border-radius:6px; overflow:hidden;
  page-break-inside:avoid; white-space:pre; }
code { font-family:"DejaVu Sans Mono",monospace; background:#eef0ff; color:#3a2f8f;
  padding:1px 4px; border-radius:3px; font-size:8.6pt; }
pre code { background:none; color:inherit; padding:0; }
"""

COVER = f"""
<div class="cover">
  <div class="conf">CONFIDENCIAL</div>
  <div class="brand">L O B B Y</div>
  <div class="rule"></div>
  <h1>Plan de Negocios</h1>
  <div class="sub">La capa profesional de la economía del entretenimiento — la red
  de creadores de gaming verificados de Latinoamérica.</div>
  <div class="spacer"></div>
  <div class="meta">
    <div><b>Documento estratégico integral</b> · Ronda pre-seed (~US$500K)</div>
    <div>Etapa: pre-lanzamiento · Mercado: LATAM</div>
    <div>{hoy}</div>
  </div>
</div>
"""

# Separar el bloque [TOC] del cuerpo para envolverlo con su título
toc_match = re.search(r'<div class="toc">.*?</div>', body_html, flags=re.S)
toc_html = toc_match.group(0) if toc_match else ""
content_html = body_html.replace(toc_html, "") if toc_html else body_html

html = f"""<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>{CSS}</style></head><body>
{COVER}
<div class="toc"><div class="toc-title">Contenido</div>{toc_html.replace('<div class="toc">','').replace('</div>','',1) if toc_html else ''}</div>
<div class="content">{content_html}</div>
</body></html>"""

out = BASE / "LOBBY-plan-de-negocios.html"
out.write_text(html, encoding="utf-8")
print("HTML:", out, len(html), "bytes")
