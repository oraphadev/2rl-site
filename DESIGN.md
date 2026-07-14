# DESIGN.md — "Kinetic Terminal" Design System

> **Purpose:** This document is a complete, self-contained specification of a design system extracted from a production dark/animated creative-agency site. It is written for AI agents. Following it verbatim reproduces the visual language and motion system with pixel-level fidelity, **independent of any brand, product, or content**. All brand-specific values are isolated in §1 (Substitution Tokens) — swap those and nothing else.

---

## 0. Design DNA (read first)

The aesthetic in one sentence: **a dark, kinetic, editorial-tech interface that looks like a precision instrument — hairline-ruled blueprint grids, oversized display typography, monospace metadata labels, one saturated accent color used as an energy source, and constant subtle motion.**

Core principles (every decision below derives from these):

1. **Near-black canvas, hairline structure.** The page is one continuous `neutral-950` surface. Structure comes from 1px borders at 5–10% white opacity — never from filled containers or drop shadows.
2. **Blueprint grid as decoration.** Column rules run full-bleed through sections; grid intersections are marked with small `+` crosshair glyphs. The layout itself is the ornament.
3. **Typographic extremes.** Giant display headlines (up to `24rem`, `clamp`-based) against `9–12px` monospace micro-labels. Almost nothing in between mid-range.
4. **One accent, used as energy.** A single saturated hue (default `#ef4444` red) appears only as: index numbers, scan-line beams, glows, active states, hover states, and 1px details. It is *never* used for large fills or body text.
5. **Motion is ambient and physical.** Everything eases with pronounced cubic-beziers; scroll reveals combine translate + blur; decorative loops (beams, marquees, typing, cursors) run infinitely at low visual volume.
6. **Terminal/archive fiction.** UI copy is styled like machine metadata: `/// SECTION`, `01 // LABEL`, `Ref: 001`, uppercase, letter-spaced, monospaced. Numbered everything.
7. **Mock-UI as illustration.** Instead of stock imagery, sections use hand-built animated miniature UIs (code editors, charts, settings panels, isometric wireframes) rendered in the same token palette.

---

## 1. Substitution Tokens (the ONLY brand-specific layer)

Replace these to re-brand. Everything else in this document references these tokens.

| Token | Default value | Role |
|---|---|---|
| `{ACCENT}` | `#ef4444` (Tailwind `red-500`) | Sole accent hue. All `red-*` classes below map to the accent scale. |
| `{ACCENT-STRONG}` | `#dc2626` (`red-600`) | Filled micro-elements (square bullets, badges). |
| `{FONT-DISPLAY}` | `Syne` (Google Fonts, wghts 400–800) | Headlines, logo, big numbers. Geometric, wide, slightly eccentric sans. Substitutes must be a *display* sans with personality (e.g. Clash Display, Space Grotesk). |
| `{FONT-BODY}` | `Inter` (Google Fonts, wghts 300–700) | Body, nav, UI copy. Neutral grotesque. |
| `{FONT-MONO}` | system mono stack (`font-mono`) | Metadata labels, index numbers, code mock-ups. |
| `{BRAND-NAME}` | — | Wordmark text in header + giant hero H1. |
| `{HERO-BG}` | WebGL shader embed (see §8.8) | Animated hero background. Replaceable with CSS/canvas equivalent. |

If a different accent hue is chosen, regenerate the alpha variants used throughout: `accent/5`, `/10`, `/20`, `/30`, `/50` and shadow `accent/5`.

---

## 2. Tech Stack Assumptions

- **Tailwind CSS** (utility classes are the source of truth; arbitrary values in brackets are exact).
- **Iconify web component** with the **`solar:*-linear`** icon set (thin 1.5px stroke line icons). Any thin-line icon set is an acceptable substitute; keep sizes 16–28px.
- Fonts via Google Fonts: `Inter:wght@300;400;500;600;700`, `Syne:wght@400;500;600;700;800`.
- Vanilla JS for interactions (IntersectionObserver reveal, click handlers). No animation library required — all motion is CSS keyframes + Tailwind transitions.
- Optional: a WebGL background embed for the hero (original uses UnicornStudio). See §8.8 for a pure-CSS fallback recipe.

---

## 3. Color System

### 3.1 Palette (dark-only; no light mode)

| Role | Value | Usage |
|---|---|---|
| Canvas | `neutral-950` (`#0a0a0a`) | `<body>` and every section background. Alt: `bg-[#0A0A0B]` for mock-UI panels. |
| Surface raised | `neutral-900` (`#171717`) | Cards inside mock-UIs, buttons, dropdowns, team strip container. |
| Surface subtle tint | `bg-neutral-900/10`…`/50` | Alternating rows, panels. |
| Hover wash | `bg-white/[0.015]`, `bg-white/[0.02]` | Row/card hover states. Extremely faint — this is intentional. |
| Border primary | `border-white/10` | ALL structural rules: section tops, column dividers, card borders. |
| Border secondary | `border-white/5` (or `/[0.05]`) | Inner separators, footnote rules. |
| Text primary | `text-white` | Headlines, active labels. |
| Text body | `text-neutral-300` / `text-neutral-400` | Paragraphs (300 = lead paragraphs, 400 = standard). |
| Text muted | `text-neutral-500` | Secondary copy, footer links, inactive. |
| Text ghost | `text-neutral-600` / `text-neutral-700` | Section meta-labels, decorative numbers. |
| Ornament ghost | `text-white/30` | The `+` grid crosshairs. |
| Accent | `{ACCENT}` (`red-500`) | Index numbers, hover text, beams, active toggles. |
| Accent hover text | `red-400` | Text/icon color on button hover. |
| Accent fills | `red-600` | 1×1 square bullets (`w-1 h-1 bg-red-600`), small badges. |
| Accent borders | `border-red-500/20` → hover `border-red-500/50` | Tech-button borders. |
| Accent glow | `bg-red-600/5` + `blur-[120px]` | Section glow orbs. |
| Success (sparingly) | `emerald-500` | Availability dots (`● Q2 OPEN` style status). |
| Selection | `selection:bg-red-500/30 selection:text-white` | Set on `<body>`. |

### 3.2 Rules

- Never use pure `#000`; the canvas is `neutral-950`.
- Never place accent color on more than ~5% of any viewport.
- No gradients as fills except: (a) transparent→canvas edge fades on marquees, (b) accent beam gradients, (c) conic border-spin gradients, (d) mock-UI illustration internals.
- Shadows are near-invisible and accent-tinted: `shadow-lg shadow-red-500/5`. No gray drop shadows.

---

## 4. Typography

### 4.1 Font roles

```css
body { font-family: '{FONT-BODY}', sans-serif; }        /* Inter */
.font-syne { font-family: '{FONT-DISPLAY}', sans-serif !important; }  /* headings, giant numbers, wordmark */
/* font-mono → metadata, indices, code mock-ups */
```

### 4.2 Scale & recipes (exact class combos)

| Element | Recipe |
|---|---|
| **Giant hero word** | `.text-huge` = `font-size: clamp(3rem, 16vw, 24rem)` + `leading-none tracking-tighter font-syne font-medium text-white mix-blend-overlay opacity-90`. Centered absolutely over hero, `pointer-events-none`. |
| **Oversized statement H2** (e.g. "11 years in the game") | `text-4xl md:text-6xl lg:text-8xl font-syne tracking-tighter font-semibold text-white`, optionally `leading-[0.9]` or `leading-[0.85]`. |
| **Section H2** | `text-3xl font-medium text-white tracking-tight font-syne` |
| **Card/Item H3** | `text-xl` or `text-2xl`/`text-4xl` (pricing) `text-white font-medium uppercase tracking-tighter` (names/products) or `tracking-widest` (service categories), `font-syne` on larger ones. |
| **Lead paragraph** | `text-lg text-neutral-300 leading-relaxed font-normal max-w-xs`…`max-w-lg` |
| **Body paragraph** | `text-sm text-neutral-400`/`neutral-500 leading-relaxed max-w-[65ch]` |
| **Nav link** | `text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] hover:text-white transition-colors` |
| **Meta label (signature!)** | `font-mono text-[9px]`–`text-xs uppercase tracking-widest`/`tracking-[0.2em]`/`[0.3em]` in `text-neutral-600`/`700` or `text-red-500` |
| **Index numeral** | `font-mono text-xs text-red-500` (active) or `text-neutral-700` (ghost), content like `01`, `02` |
| **Quote** | `text-2xl lg:text-3xl font-light leading-tight font-syne tracking-tight text-neutral-300` |
| **Stat figure** | `text-2xl font-syne text-white` paired with a `text-[9px] font-mono uppercase tracking-widest text-neutral-600` caption |

### 4.3 Rules

- Headlines: display font, tight tracking (`tracking-tight`/`tighter`), medium–semibold weight (never black/900).
- All-caps appears constantly but **only at small sizes with wide tracking** (labels, nav, buttons) or on H3 names — never on paragraphs.
- Line-height: `leading-none`/`[0.9]` for display, `leading-relaxed` for body. Nothing default.
- Copy voice for labels: `/// SECTION-NAME`, `01 // Category`, `Ref: 001 // Client`, `Archive-01 // Identity`. Use `//` and `///` prefixes as decorative syntax.

---

## 5. Layout System

### 5.1 Page skeleton

```html
<body class="bg-neutral-950 text-neutral-200 overflow-x-hidden w-full min-h-screen relative
             selection:bg-red-500/30 selection:text-white pt-16">
  <header class="fixed top-0 left-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md
                 border-b border-white/10 h-16 transition-all duration-300">…</header>

  <!-- fixed, full-viewport animated background behind hero (see §8.8) -->
  <div class="fixed top-0 w-full h-screen -z-10 brightness-125 saturate-200">…</div>

  <!-- hero block (not a <section>) -->
  <div class="z-20 grid grid-cols-1 md:grid-cols-4 w-full relative h-[900px] max-h-[900px]">…</div>

  <!-- every subsequent band: -->
  <section class="z-20 overflow-hidden bg-neutral-950 w-full border-t border-white/10 relative">…</section>
  …
  <footer class="relative z-20 w-full border-t border-white/10 bg-neutral-950">…</footer>
</body>
```

Rules:
- Sections are **full-bleed bands** separated only by `border-t border-white/10`. No vertical gaps between sections; no rounded section containers; no max-width wrappers on the band itself (inner content may use `max-w-[1920px] mx-auto`).
- Sections carry `z-20 bg-neutral-950` so they slide **over** the fixed hero background; the hero area lets the background show through.
- Header height `h-16`, body compensates with `pt-16`.

### 5.2 The blueprint grid (signature motif)

Two-level system:

1. **Structural grids** inside sections: `grid grid-cols-1 md:grid-cols-4` (hero, footer, services) or `md:grid-cols-12` (asymmetric splits like `col-span-3` sidebar + `col-span-9` content). Columns divided by `divide-x divide-white/10` (+ `divide-y` on mobile), or explicit `border-r border-white/10`.
2. **Ghost grid overlays** on sections whose content is free-form (marquees, big statements): an absolutely-positioned, pointer-transparent replica of the 4-column grid so the vertical rules continue through the section:

```html
<div class="absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-4 pointer-events-none z-10">
  <div class="border-r border-white/10 h-full hidden md:block relative">
    <div class="absolute -right-[5px] -top-[5px] text-white/30 text-xs hidden md:block">+</div>
  </div>
  <!-- repeat per column; last column has no border -->
</div>
```

3. **Crosshair markers:** every column-rule/section-rule intersection gets a `+` character: `absolute -right-[5px] -top-[5px] text-white/30 text-xs z-20`.

### 5.3 Cell anatomy

Grid cells are tall flex columns padded `p-6 md:p-8` (up to `p-8 lg:p-16` for pricing rows), content pushed to edges with `justify-between` / `mt-auto`. Hero is a 4-col row of such cells at fixed `h-[900px]`.

### 5.4 Sidebar + canvas pattern

Recurring section layout: `grid md:grid-cols-12 divide-x divide-white/10` where
- `md:col-span-3`: sticky-feeling intro panel — meta-label, H2, paragraph, stat block, CTA button; `p-8 lg:p-12 flex flex-col justify-between`.
- `md:col-span-9` (or 7): the exhibit — marquee, list rows, mock-UI, pricing items.

### 5.5 Spacing

- Base unit 4px (Tailwind default). Common paddings: `p-6`, `p-8`, `p-12`, `p-16`; section vertical rhythm comes from cell padding, not section margins.
- Hero fixed height `900px`; team strip `h-[600px]`; testimonial cards `w-[400px] lg:w-[500px] px-12 py-16`; CTA band `pt-32 pb-32 md:py-48`.
- Gaps: nav `gap-10`, logo rows `gap-20`, chip lists `gap-x-6 gap-y-2`.

### 5.6 Radius policy

Sharp by default. `rounded-none`/`rounded-[1px]` on editorial elements; `rounded-md` on buttons/mock-UI panels; `rounded-sm` on the solid header CTA; `rounded-full` only for dots, avatars, toggle knobs; `rounded-lg`/`xl` only on floating menus. Never large radii on cards.

---

## 6. Iconography & Imagery

- **Icons:** thin-line set (`solar:*-linear` via `<iconify-icon>`), sizes 16 / 18 / 20 / 24 / 28. Color inherits text color — typically `text-neutral-400`/`500`, turning accent or white on hover. Signature glyph: `arrow-right-up` (↗) on every CTA.
- **Photos:** used only inside team/testimonial modules. Treatment: `object-cover`, **`grayscale` by default → `grayscale-0` when active/hover**, paired with `scale-105 → scale-110` slow zoom (`duration-700`). Duotone/desaturated look keeps photos subordinate to the system.
- **Illustrations:** build mock-UIs from tokens instead of images (code editor with syntax colors on `#0A0A0B`, bar charts with accent bars, settings panels with animated toggles, isometric SVG cubes with `rgba(255,255,255,0.14–0.45)` strokes). Caption them like instrument readouts.

---

## 7. Component Library (exact recipes)

### 7.1 Header

```html
<header class="fixed top-0 left-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10 h-16 transition-all duration-300">
  <div class="flex md:px-8 w-full h-full max-w-[1920px] mx-auto px-6 items-center justify-between">
    <!-- wordmark -->
    <a href="/" class="flex items-center gap-3 group">
      <span class="uppercase group-hover:text-red-500 transition-colors text-sm font-medium text-white tracking-widest font-syne">{BRAND-NAME}</span>
    </a>
    <!-- nav -->
    <nav class="hidden md:flex items-center gap-10">
      <a class="text-[10px] hover:text-white transition-colors uppercase font-bold text-neutral-400 tracking-[0.2em]">Link</a>
    </nav>
    <!-- solid CTA (the ONLY white-filled element on the page) -->
    <a class="hidden md:flex text-[10px] hover:bg-neutral-200 transition-colors uppercase font-bold text-black tracking-widest bg-white rounded-sm py-2.5 px-6">Primary CTA</a>
  </div>
</header>
```

Mobile menu: hamburger (`solar:hamburger-menu-linear`, 24px) toggling a dropdown `absolute top-full right-0 mt-4 w-48 bg-neutral-900 border border-white/10 rounded-lg p-2 shadow-2xl`, items `px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded`.

### 7.2 "Tech button" (signature CTA — used everywhere except header)

Two stacked layers; the outer conic gradient rotates on hover to create an orbiting accent spark on the border:

```html
<div class="relative group cursor-pointer w-max">
  <!-- spinning border layer -->
  <div class="absolute -inset-[1px] rounded-md
              bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_300deg,#ef4444_360deg)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              animate-border-spin blur-[0.5px]"></div>
  <!-- button body -->
  <div class="relative bg-neutral-900 border border-red-500/20 text-neutral-300 px-5 py-2.5 rounded-md
              flex items-center gap-3 shadow-lg shadow-red-500/5
              group-hover:text-red-400 group-hover:border-red-500/50 transition-all duration-300">
    <span class="text-xs font-medium tracking-[0.2em] uppercase">Label</span>
    <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16"
      class="text-neutral-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300"></iconify-icon>
  </div>
</div>
```

(Size variant: `text-sm` + icon 18 for hero-level CTAs.)

### 7.3 Section intro block (sidebar panel)

```html
<span class="block text-xs text-neutral-600 font-mono mb-4">/// SECTION-NAME</span>
<h2 class="text-3xl font-medium text-white tracking-tight font-syne mb-4">Headline</h2>
<p class="text-neutral-400 text-sm leading-relaxed mb-8">Supporting copy…</p>
<!-- optional stat -->
<div class="flex items-center gap-4 border-t border-white/5 pt-6">
  <span class="text-2xl font-syne text-white">98%</span>
  <span class="text-[9px] font-mono text-neutral-600 uppercase tracking-widest leading-tight">Metric<br>Caption</span>
</div>
```

### 7.4 Service card (grid cell)

Cell in a 4-col `divide-x` grid; top = animated mock-UI illustration, bottom = text:

```html
<div class="group flex flex-col p-8 …">
  <div class="relative h-64 mb-8 …"><!-- mock-UI illustration + caption overlay:
    caption: font-syne text-sm text-white/90 tracking-tight  +  text-xs text-neutral-400
    corner tag: text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500 --></div>
  <span class="font-mono text-red-500 text-xs block mb-3">01</span>
  <h3 class="text-xl text-white font-medium uppercase tracking-widest mb-3">Category</h3>
  <p class="text-neutral-400 text-sm leading-relaxed mb-6">One-line description.</p>
  <div class="mt-auto pt-6 border-t border-white/5">
    <span class="text-xs text-neutral-500 group-hover:text-white transition-colors flex items-center gap-2">Link label →</span>
  </div>
</div>
```

### 7.5 Process / numbered rows

```html
<div class="group grid grid-cols-[140px_1fr] border-b border-white/10 hover:bg-white/[0.015] transition-colors">
  <div class="p-8 flex flex-col justify-between border-r border-white/10">
    <div class="w-10 h-10 flex items-center justify-center text-neutral-400 group-hover:text-red-500 transition-colors">
      <iconify-icon icon="solar:magnifer-linear" width="20" height="20"></iconify-icon>
    </div>
    <span class="font-mono text-xs text-neutral-700 group-hover:text-red-500/50">01</span>
  </div>
  <div class="p-8 flex flex-col justify-center">
    <h3 class="text-xl text-white font-medium tracking-tight mb-3">Step title</h3>
    <p class="text-neutral-500 text-sm leading-relaxed max-w-[65ch]">Description…</p>
  </div>
</div>
```

### 7.6 Team expanding-strip (interactive accordion of images)

Horizontal flex strip `h-[600px] bg-neutral-900`; clicking a card expands it via flex-grow animation:

```html
<div class="flex flex-col lg:flex-row overflow-hidden bg-neutral-900 w-full h-[600px]" id="team-container">
  <article onclick="setActiveCard(this)"
    class="team-card active flex-[3] overflow-hidden cursor-pointer transition-all duration-700
           ease-[cubic-bezier(0.22,1,0.36,1)] group lg:border-r border-white/10 relative">
    <img src="…" class="absolute inset-0 w-full h-full object-cover transition-all duration-700
                        scale-105 grayscale group-[.active]:scale-110 group-[.active]:grayscale-0">
    <div class="absolute inset-x-0 bottom-0 p-8 z-20">
      <span class="block text-[9px] font-mono text-red-500 mb-2 tracking-widest uppercase
                   opacity-0 group-[.active]:opacity-100 transition-opacity">01 // Role</span>
      <h3 class="text-2xl text-white font-medium uppercase tracking-tighter">Name</h3>
      <div class="grid grid-rows-[0fr] group-[.active]:grid-rows-[1fr] transition-[grid-template-rows] duration-700">
        <div class="overflow-hidden"><p class="text-neutral-400 text-xs mt-4 max-w-xs">Bio line.</p></div>
      </div>
    </div>
  </article>
  <!-- inactive cards: class="team-card flex-1 …" -->
</div>
<script>
function setActiveCard(el){
  const cards=document.getElementById('team-container').querySelectorAll('.team-card');
  cards.forEach(c=>{c.classList.remove('active','flex-[3]');c.classList.add('flex-1');});
  el.classList.add('active','flex-[3]');el.classList.remove('flex-1');
}
</script>
```

### 7.7 Testimonial marquee card

Inside an infinite marquee (§8.3) with edge fade masks:

```html
<div class="w-[400px] lg:w-[500px] px-12 py-16 flex flex-col justify-between border-r border-white/5
            group transition-all duration-500 hover:bg-white/[0.01]">
  <div class="mb-12">
    <span class="text-[9px] font-mono text-neutral-700 uppercase tracking-[0.3em] mb-6 block">Ref: 001 // Client</span>
    <blockquote class="text-2xl lg:text-3xl text-neutral-300 font-light leading-tight font-syne tracking-tight
                       group-hover:text-white transition-colors duration-500">"Quote…"</blockquote>
  </div>
  <div class="flex items-center gap-5 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
    <img class="rounded-full …"> <!-- attribution -->
  </div>
</div>
```

Edge masks on the marquee container:
`absolute left-0 inset-y-0 w-24–32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none` (mirrored right).

### 7.8 Pricing row (editorial list, not cards)

Stacked rows in `divide-y divide-white/10`; middle/featured row tinted `bg-neutral-900/10`:

```html
<div class="group relative p-8 lg:p-16 transition-all duration-500 hover:bg-white/[0.02]">
  <div class="flex flex-col md:flex-row md:items-start justify-between gap-8">
    <div class="flex-1">
      <span class="font-mono text-red-500 text-[10px] tracking-widest uppercase mb-4 block">Archive-01 // Tier</span>
      <h3 class="text-4xl text-white font-syne font-medium mb-6 uppercase tracking-tighter
                 group-hover:translate-x-2 transition-transform duration-500">Tier Name</h3>
      <p class="text-neutral-500 text-sm max-w-sm mb-8 leading-relaxed">Description…</p>
      <ul class="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono text-neutral-400 uppercase">
        <li class="flex items-center gap-2"><span class="w-1 h-1 bg-red-600"></span>Feature</li>
      </ul>
    </div>
    <div class="flex flex-col items-end justify-between self-stretch">
      <div class="text-4xl font-syne text-white tracking-tighter mb-4">$0,000</div>
      <!-- tech button §7.2 -->
    </div>
  </div>
</div>
```

Status chip: `text-emerald-500 text-xs font-mono uppercase` with `●` prefix, captioned by `text-[9px] font-mono text-neutral-600 uppercase`.

### 7.9 Big CTA band

```html
<section class="overflow-hidden flex md:py-48 pt-32 pb-32 w-full z-20 border-t border-white/10 relative items-center justify-center">
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div class="w-[40vw] h-[40vw] bg-red-600/5 blur-[120px] rounded-full mix-blend-screen"></div>
  </div>
  <div class="relative z-10 flex flex-col items-center text-center px-6">
    <h2 class="text-4xl md:text-6xl lg:text-8xl font-syne tracking-tighter text-white font-semibold mb-6">Statement.</h2>
    <p class="text-neutral-400 text-base md:text-lg max-w-lg mb-12 leading-relaxed">Support copy…</p>
    <!-- tech button §7.2 (text-sm / icon 18) -->
  </div>
</section>
```

### 7.10 Footer

`border-t border-white/10 bg-neutral-950`, `grid md:grid-cols-4 divide-x divide-white/10`:
- Col 1 (`p-8 min-h-[300px] flex flex-col justify-between`): `///` mono glyph, `text-3xl font-syne` H2, paragraph, tech button.
- Cols 2–4 (`p-8 grid grid-cols-2 md:grid-cols-4 gap-8`): link groups — `h4: text-white text-sm font-medium uppercase tracking-widest mb-6`, links `text-neutral-500 text-sm hover:text-white transition-colors` in `space-y-4` lists.

### 7.11 Logo marquee band

Section with ghost grid overlay (§5.2) + `py-10` marquee of partner logos: each `flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300`, icon 28px + `text-lg font-semibold text-white tracking-tight font-syne` name; groups spaced `gap-20`.

---

## 8. Motion System

Global easing vocabulary (use these, nothing else):

| Name | Curve | Use |
|---|---|---|
| `reveal` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Scroll-in reveals |
| `spring-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Layout changes (accordion), looping reveals |
| `standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Ambient loops (beams, cursors) |
| `linear` | — | Marquees, border-spin |

Durations: micro-hover `300ms`, content hover `500ms`, layout/photo `700ms`, reveal `800ms`, ambient loops `2–40s`.

### 8.1 Scroll reveal (applies to the whole page)

Every `h1, h2, h3, p, button, .group, blockquote` (except inside marquees) starts hidden and reveals on first intersection with a 100ms per-element stagger:

```css
@keyframes fadeInUpBlur {
  0%   { opacity: 0; transform: translateY(20px); filter: blur(10px); }
  100% { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
.animate-in { animation: fadeInUpBlur 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.reveal-hidden { opacity: 0; }
```

```js
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.remove("reveal-hidden");
          entry.target.classList.add("animate-in");
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  const targets = document.querySelectorAll("h1, h2, h3, p, button, .group, blockquote");
  targets.forEach(el => {
    if (!el.closest(".animate-marquee-infinite")) {
      el.classList.add("reveal-hidden");
      observer.observe(el);
    }
  });
});
```

The blur→sharp component is the signature; do not reduce it to a plain fade/slide.

### 8.2 Accent beam (vertical scan-line on grid rules)

A 1px column rule hosts a falling accent gradient; stagger multiple beams with `animation-delay` (0s / 1.5s / 3s):

```html
<div class="absolute right-0 top-0 h-full w-[1px] bg-white/10 overflow-hidden">
  <div class="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-red-500 to-transparent
              animate-beam opacity-75" style="animation-delay: 1.5s;"></div>
</div>
```
```css
@keyframes beam-drop { 0% { transform: translateY(-100%); } 100% { transform: translateY(500%); } }
.animate-beam { animation: beam-drop 5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
```

### 8.3 Infinite marquee

Content duplicated 2× inside a `w-max`/`min-w-full whitespace-nowrap` flex; pauses on hover:

```css
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.animate-marquee-infinite { animation: marquee 40s linear infinite; }
.animate-marquee-infinite:hover { animation-play-state: paused; }
```
Always flank with §7.7 edge-fade masks.

### 8.4 Border-spin (tech button hover)

```css
@keyframes border-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-border-spin { animation: border-spin 2s linear infinite; }
```
Applied to the conic-gradient layer described in §7.2 (gradient is transparent for 300° with an accent tail to 360° → reads as an orbiting spark).

### 8.5 Hover micro-interaction vocabulary

- Arrows nudge: `group-hover:translate-x-1` (300ms).
- Titles shift: `group-hover:translate-x-2` (500ms).
- Rows tint: `hover:bg-white/[0.015]`–`[0.02]`.
- Text warms: `neutral-400/500 → white` or `→ red-400/500`.
- Photos: `grayscale → grayscale-0`, `scale-105 → scale-110` (700ms).
- Attribution slides up: `translate-y-4 → translate-y-0` (700ms).
- Logos: `opacity-40 → 100`.
- Never scale buttons/cards up; movement is translation and color, not zoom.

### 8.6 Ambient mock-UI loops (for illustration panels)

Synchronized infinite loops that make illustration panels feel alive. Full keyframe set:

```css
/* Isometric cubes assembling/dissolving — 4s loop, staggered 160ms */
@keyframes cube-reveal-left  { 0%,100%{opacity:0;transform:translate(-15px,0) scale(.98);filter:blur(4px);} 15%{opacity:1;transform:none;filter:blur(0);} 60%{opacity:1;} 75%{opacity:0;transform:translate(-15px,0) scale(.98);filter:blur(4px);} }
@keyframes cube-reveal-right { /* same with translate(15px,0) */ }
@keyframes cube-reveal-bottom{ /* same with translate(0,15px) */ }
.animate-cube-l { animation: cube-reveal-left 4s cubic-bezier(0.22,1,0.36,1) infinite; }
.animate-cube-r { animation: cube-reveal-right 4s cubic-bezier(0.22,1,0.36,1) infinite; animation-delay:160ms; }
.animate-cube-b { animation: cube-reveal-bottom 4s cubic-bezier(0.22,1,0.36,1) infinite; animation-delay:320ms; }

/* Wireframe fade cycle — 6s */
@keyframes wireframe-loop { 0%{opacity:0;transform:translateY(10px) scale(.98);filter:blur(2px);} 8%,80%{opacity:1;transform:none;filter:blur(0);} 90%,100%{opacity:0;transform:translateY(-5px) scale(.98);filter:blur(2px);} }
.animate-wireframe { opacity:0; animation: wireframe-loop 6s cubic-bezier(0.4,0,0.2,1) infinite both; }

/* Code editor typing — 5 lines typed sequentially in a shared 8s loop */
.typing-line { overflow:hidden; white-space:nowrap; width:0; border-right:2px solid transparent; will-change:width; }
@keyframes blink-caret { 0%,100%{border-color:transparent;} 50%{border-color:{ACCENT};} }
@keyframes type-loop-1 { 0%{width:0;animation-timing-function:steps(30,end);border-color:{ACCENT};} 12%{width:100%;animation-timing-function:linear;border-color:transparent;} 90%{width:100%;} 100%{width:0;} }
/* lines 2–5 identical but hold width:0 until 15% / 30% / 45% / 58%, finish at 27% / 42% / 55% / 68%; steps() 20–35 per line length */
.line-1{animation:type-loop-1 8s infinite;} /* …line-5 */

/* Floating fake cursor wandering over the panel — 8s */
@keyframes cursor-float-loop { 0%{opacity:0;transform:translate(40px,-20px) scale(.9);} 5%{opacity:1;transform:none;} 20%{transform:translate(-10px,15px);} 40%{transform:translate(5px,45px);} 60%{transform:translate(-15px,90px);} 80%{transform:translate(10px,120px);opacity:1;} 95%{opacity:0;transform:translate(10px,130px);} 100%{opacity:0;transform:translate(40px,-20px);} }

/* Bar chart bars growing — 6s, transform-origin: bottom */
@keyframes barReveal { 0%{transform:scaleY(0);opacity:0;} 15%{transform:scaleY(1);opacity:1;} 85%{transform:scaleY(1);opacity:1;} 100%{transform:scaleY(0);opacity:0;} }
.animate-bar-reveal { animation: barReveal 6s cubic-bezier(0.22,1,0.36,1) infinite; transform-origin:bottom; }

/* Settings panel: cursor steps through 4 rows (16s master loop, rows offset 0/4/8/12s) */
@keyframes cursor-path  { 0%,20%{top:48px;left:85%;} 25%,45%{top:84px;} 50%,70%{top:120px;} 75%,95%{top:156px;} 100%{top:48px;} }
@keyframes cursor-click { /* scale(1) with dips to scale(.85) at ~6%,16%,31%,41%,56%,66%,81%,91% */ }
@keyframes row-active   { 0%,20%{background:rgba(255,255,255,.05);} 21%,100%{background:transparent;} }
@keyframes toggle-state { 0%,5%{background:#262626;} 6%,15%{background:rgba(239,68,68,.2);border-color:rgba(239,68,68,.5);} 16%,100%{background:#262626;} }
@keyframes knob-slide   { 0%,5%{left:2px;background:#737373;} 6%,15%{left:16px;background:{ACCENT};} 16%,100%{left:2px;background:#737373;} }
@keyframes text-active  { 0%,5%{color:#a3a3a3;} 6%,15%{color:#fff;} 16%,100%{color:#a3a3a3;} }
```

Pattern to generalize: **long synchronized master loops (4–16s), staggered offsets per item, in-hold-out envelopes (enter ~15%, hold to ~60–85%, exit), always with blur+translate+scale together.**

### 8.7 Team accordion motion

Flex-basis animation via class swap (§7.6): `transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]` between `flex-1` and `flex-[3]`; bio expands with the `grid-rows-[0fr] → [1fr]` trick at the same duration.

### 8.8 Hero animated background

Original: a fixed full-viewport WebGL shader embed (UnicornStudio) rendering a **vertical particle/light beam in the accent hue rising from the bottom center on black, with faint dot-matrix texture**, post-processed with CSS `brightness-125 saturate-200` (+ optional `hue-rotate` to retint toward the brand accent) and a soft `mask-image: linear-gradient(to bottom, …)`.

Agnostic CSS-only fallback that preserves the look:

```html
<div class="fixed top-0 w-full h-screen -z-10 pointer-events-none">
  <!-- central glow column -->
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[80vh]
              bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.5),rgba(239,68,68,0.08)_45%,transparent_70%)]
              blur-[60px]"></div>
  <!-- vertical core beam -->
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-[70vh]
              bg-gradient-to-t from-red-500 via-red-500/40 to-transparent blur-[2px]"></div>
  <!-- optional dot-matrix: repeating radial-gradient 1px dots at rgba(255,255,255,0.06), masked to the glow -->
</div>
```

Layer the giant hero word (`§4.2 text-huge`, `mix-blend-overlay opacity-90`) over it so the glow burns through the letterforms.

### 8.9 Glow orbs

Ambient section lighting: absolutely-centered `rounded-full mix-blend-screen` divs, `bg-{ACCENT}/5`, sizes `w-[40vw] h-[40vw]`, blurs `blur-[50px]`–`blur-[120px]`. Max one per section, always `pointer-events-none`.

---

## 9. Interaction & Accessibility Notes

- All interactive affordances must have a visible hover transition (nothing is static on hover).
- Marquees pause on hover (`animation-play-state: paused`).
- Wrap ambient loops and reveals in `@media (prefers-reduced-motion: reduce)` guards when implementing for production (set animations to `none`, reveal targets to visible).
- Contrast: body copy at `neutral-400`+ on `neutral-950` passes AA at the sizes used; never set copy below `neutral-500` except decorative meta-labels.
- `+` crosshairs, ghost grids, beams, and glows must be `pointer-events-none` and `aria-hidden`.

---

## 10. Page Composition Blueprint (canonical section order)

1. **Hero** — fixed WebGL/glow background; 4-col grid `h-[900px]` with beams on column rules; giant centered display word (`mix-blend-overlay`); lead paragraph bottom-left cell; tech-button CTA bottom-right cell.
2. **Logo marquee** — ghost grid + 40s marquee of desaturated logos.
3. **Intro statement** — sidebar + oversized editorial paragraph or two-column manifesto.
4. **Services** — 4-col divided grid; each cell = animated mock-UI + numbered category (§7.4, §8.6).
5. **Big stat statement** — giant display headline band with illustration column.
6. **Capabilities/Values** — sidebar + numbered hover rows (§7.5).
7. **Process** — numbered `140px+1fr` rows with icons.
8. **Differentiators** — mock settings-panel illustration with the 16s toggle loop.
9. **Team** — expanding image accordion strip (§7.6).
10. **Testimonials** — sidebar with stat + horizontal quote marquee (§7.7).
11. **Pricing** — editorial rows with mono chip features (§7.8).
12. **CTA band** — centered statement + glow orb (§7.9).
13. **Footer** — 4-col divided grid (§7.10).

Every band separated by `border-t border-white/10`; crosshair `+` at rule intersections throughout.

---

## 11. Anti-patterns (things that break the system)

- Colored or gray card backgrounds; visible drop shadows; large border radii.
- Accent color as large fills, backgrounds, or paragraph text.
- Default Tailwind `ease` / `duration-150` transitions — always specify the curves in §8.
- Mixed icon weights or filled icons.
- Reveal animations without the blur component.
- Section spacing via `margin` between sections (use in-cell padding + hairline separators).
- Center-aligned body copy (only the CTA band and hero word are centered).
- More than one typeface personality: display font for display, body font for everything else, mono for metadata — never swap roles.
