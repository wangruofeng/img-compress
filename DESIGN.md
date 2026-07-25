---
version: "2.1.0"
name: "ImgCompress Design System"
description: "ImgCompress is a browser-based image compression tool with a dark-first, glassmorphic design language. The system is built around a violet primary (#8b5cf6) with an amber accent, zinc neutral surfaces, and frosted-glass (.glass / .glass-elevated) containers over a subtly animated gradient background. Display type is Outfit paired with DM Sans for body text."
colors:
  primary: "#8b5cf6"
  primary-light: "#a78bfa"
  primary-dark: "#7c3aed"
  primary-glow: "#c4b5fd"
  accent: "#f59e0b"
  # Status colors — used only for semantic states, never as brand accent
  success: "#10b981" # emerald-500 — saved-space badges
  warning: "#f59e0b" # amber-500 — invalid-file alert, mid quality
  danger: "#ef4444" # red-500 — errors, low quality
  info: "#0ea5e9" # sky-500 — kept-original badge
  # Neutrals (Tailwind zinc)
  background: "#09090b" # zinc-950 (dark default)
  surface: "#18181b" # zinc-900
  surface-elevated: "#27272a" # zinc-800
  text-primary-dark: "#e4e4e7" # zinc-200 on dark
  text-primary-light: "#1e293b" # slate-800 on light
  text-secondary: "#a1a1aa" # zinc-500 / dark:zinc-400
typography:
  display:
    fontFamily: "Outfit"
    usage: "Headings, app title, button labels (font-display)"
    weights: "400 / 500 / 600 / 700 / 800"
  body:
    fontFamily: "DM Sans"
    usage: "All body copy, labels, captions — applied globally via * selector"
    weights: "300 / 400 / 500 / 600 / 700"
  gradient-text:
    usage: "App title & hero heading"
    dark: "linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 50%, #f59e0b 100%)"
    light: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #d97706 100%)"
    note: "background-clip: text with descender padding compensation (see index.css)"
animation:
  fade-in: "fadeIn 0.5s ease-out — generic enter"
  slide-up: "slideUp 0.5s ease-out — enter from below"
  scale-in: "scaleIn 0.3s ease-out — modal/overlay enter"
  soft-float: "softFloat 2.8s ease-in-out infinite — gentle vertical bob (scroll cue)"
  spin: "animate-spin — loading spinners"
---

## Overview

- **Dark-first.** Dark mode is the default; light mode is a class-toggled (`html.light`) variant, not an afterthought.
- **Glassmorphism is core.** Frosted containers (`.glass`, `.glass-elevated`) sit over an animated gradient body background. Both modes blur; only the surface tint differs.
- **Violet + amber, on zinc.** Primary CTA/highlight color is violet (`#8b5cf6`); amber (`#f59e0b`) is the secondary accent. Emerald/amber/red are **status-only** — they encode quality tiers and outcomes, never brand chrome.
- **Flat icon buttons.** Header/navigation controls are borderless `44×44` icon buttons with color-only hover feedback (no filled backgrounds at rest). See the `flatButtonClass` token below.

## Color

The palette is **not** a warm/orange/cream system. Primary is violet, neutrals are zinc.

| Token | Value | Tailwind | Role |
|---|---|---|---|
| primary | `#8b5cf6` | `primary` / `primary` | CTA buttons, active states, focus rings, highlights |
| primary-light | `#a78bfa` | `primary-light` | Hover/active text on dark, processing spinner |
| primary-dark | `#7c3aed` | `primary-dark` | Gradient end stop, hover/active text on light |
| primary-glow | `#c4b5fd` | `primary-glow` | Scrollbar gradient, glow shadows |
| accent | `#f59e0b` | `accent` | Secondary gradient stop (dropzone glow) |
| background | `#09090b` | `background` / zinc-950 | Dark body base |
| surface | `#18181b` | `surface` / zinc-900 | Dark cards, scrollbar track |
| surface-elevated | `#27272a` | `surface-elevated` / zinc-800 | Dark elevated panels |

**Status palette (semantic only):**
- Success — `emerald-500` (`#10b981`): saved-space badges, high quality tier.
- Warning — `amber-500` (`#f59e0b`): invalid-file alert, mid quality tier.
- Danger — `red-500` (`#ef4444`): error overlays, low quality tier.
- Info — `sky-500` (`#0ea5e9`): "kept original" badge (compression produced no gain).

### Body background

Both modes paint a 135° diagonal gradient over the whole `<body>` (defined in `index.css`, not via Tailwind):

- **Dark (default):** `#09090b → #18181b → #0c0c10`
- **Light:** `#f8fafc → #f1f5f9 → #e2e8f0`

## Typography

- **Outfit** — display font for headings, the app title, and button labels (`font-display`).
- **DM Sans** — body font, applied globally through the `* { font-family }` rule in `index.css`.
- **`.gradient-text`** — clips a violet→amber gradient to the text of the app title / hero heading. Includes descender padding compensation so glyphs like `g`/`p` are not clipped. Different gradient stops for light vs dark.

## Glassmorphism

Two container tiers plus a noise texture, all defined in `index.css` under `@layer components`:

| Class | Dark surface | Light surface | Blur | Border |
|---|---|---|---|---|
| `.glass` | `rgba(24,24,27,0.7)` | `rgba(255,255,255,0.7)` | 20px | `1px rgba(255,255,255,0.08)` / `rgba(0,0,0,0.08)` |
| `.glass-elevated` | `rgba(39,39,42,0.8)` | `rgba(255,255,255,0.9)` | 24px | `1px rgba(255,255,255,0.1)` / `rgba(0,0,0,0.1)` |

- `.noise-bg::after` overlays a faint (opacity 0.03) fractal-noise SVG in dark mode for texture.
- **Header** inlines its own frosted treatment rather than reusing `.glass`: `bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl backdrop-saturate-150` with a `border-zinc-200/70` hairline.

## Radii

The system leans on `rounded-xl` (12px) and `rounded-2xl` (16px); `rounded-lg` (8px) is reserved for small in-card badges, and `rounded-full` for pills/remove buttons.

| Radius | Value | Used for |
|---|---|---|
| `rounded-lg` | 8px | Small result badges, format chips inside containers |
| `rounded-xl` | 12px | Primary buttons (download), stat badges, alerts |
| `rounded-2xl` | 16px | Cards (ImageCard, SettingsPanel, Dropzone, modal panels), icon-button tiles |
| `rounded-full` | 9999px | Toggle track, small pill chips, circular remove button |

## Components

### Shared flat-button token (Header + Onboarding)

Header navigation controls (Help, Theme toggle, GitHub link) and the Onboarding top-bar controls (Close, Theme toggle) share one borderless `44×44` button class so the language switcher aligns across pages:

```ts
const flatButtonClass =
  'flex items-center justify-center w-11 h-11 text-zinc-500 dark:text-zinc-400 hover:text-primary-dark dark:hover:text-primary-light transition-colors';
```

- No background, no border, no radius — color-only hover feedback.
- The `LanguageSwitcher` trigger mirrors this: `h-11 px-3.5 text-[13px]` with the same text/hover colors, so all header controls share one visual height.
- **Keep these in sync.** If you change one, change all three (`Header.flatButtonClass`, `Onboarding.headerButtonClass`, `LanguageSwitcher` trigger).

### Header

- Sticky, `z-50`, inline frosted glass (`backdrop-blur-xl backdrop-saturate-150`), `h-16`.
- Left: logo (`logo.svg` via `import.meta.env.BASE_URL`) + title (`.gradient-text`) + subtitle.
- Right (desktop): Documentation link (pill, `px-3.5 py-1.5 rounded-full`) + GitHub icon button; mobile collapses to icon buttons + language switcher.

### Cards (`glass-elevated` + `rounded-2xl`)

- **ImageCard** — preview (aspect-video, zoom-in cursor), emerald `-N%` badge top-left, circular remove button top-right, processing/error overlays, download button (primary gradient) in footer. Hover lifts border to `border-primary/40` and casts `shadow-primary/10`.
- **SettingsPanel** — header row + padded body. Lossless toggle is a primary-gradient pill switch; quality slider is a native range input styled via `peer`/absolute-positioned track + thumb, with a traffic-light badge (emerald/amber/red) reflecting the quality tier.
- **Dropzone** — dashed border, `rounded-2xl`; on drag → `border-primary bg-primary/10 scale-[1.01]` + blurred primary→accent glow.

### Buttons

- **Primary / gradient** — `bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary` with `shadow-primary/25`, `active:scale-95`. Used for download button, format active state, CTA in Onboarding.
- **Flat icon** — the shared token above.
- **Pill link** — `rounded-full` low-emphasis link for "Documentation".

### Quality-tier traffic light

The quality badge and slider fill derive from `settings.quality` (`SettingsPanel.getQualityLabel` / `qualityColor`):

| Quality | Range | Color |
|---|---|---|
| High | `≥ 0.8` | emerald (`#10b981 → #34d399`) |
| Medium | `≥ 0.5` | amber (`#f59e0b → #fbbf24`) |
| Low | `< 0.5` | red (`#ef4444 → #f87171`) |

## Motion

- Animations live in `tailwind.config.js` under `theme.extend.animation` + `keyframes`: `fade-in`, `slide-up`, `scale-in`, `soft-float`.
- **`soft-float`** (`softFloat 2.8s`) is the Onboarding scroll-cue bob — a gentle `translateY(5px)` with opacity breathing between 0.55 and 1.
- **Reduced motion:** entrance/hero animations that may cause vestibular discomfort pair with `motion-reduce:animate-none` (e.g. the Onboarding hero `animate-fade-in motion-reduce:animate-none`). New ambient animations should follow the same convention.
- **Scroll-lock compensation:** when a full-screen overlay (Onboarding) locks `body` scroll, the now-hidden scrollbar width is read once and applied as `body { padding-right }` to prevent sideways layout shift; both `overflow` and `padding-right` are restored from captured previous values on cleanup.

## Do's and Don'ts

### Do
- Build containers on `.glass` / `.glass-elevated` over the body gradient — that is the intended depth language.
- Use `primary` (violet) for CTAs, active states, and focus rings (`focus-visible:ring-primary/40`).
- Encode outcome/quality with the **status palette only** (emerald/amber/red/sky), never as decoration.
- Reuse the shared flat-button token for new header/overlay icon controls; keep the three call sites in sync.
- Pair ambient/entrance animations with `motion-reduce:animate-none`.

### Don't
- Don't introduce orange/cream surfaces, Playfair Display, or pill-shaped primary buttons — those belong to an abandoned spec (v2.0.0) that was never implemented and has been removed.
- Don't strip glassmorphism in favor of flat opaque cards — the frosted blur is load-bearing for this design.
- Don't use Tailwind `gray-*` for neutrals; the system is consistently on `zinc-*`.
- Don't add filled backgrounds to the flat header controls at rest — they are color-only by design.

## Light / Dark Mode

Dark is the default. The `ThemeContext` toggles `html.dark` / `html.light`. Light mode re-tints `.glass*`, `.gradient-text`, the body gradient, and inverts scrollbar track colors while keeping the violet primary palette intact. When adding a surface, always specify both `bg-… ` and `dark:bg-…` variants rather than a single fixed color.
