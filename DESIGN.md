---
version: "2.0.0"
name: "ImgCompress — Smart Image Compression (Mistral-inspired)"
description: "ImgCompress is a browser-based image compression tool redesigned with a Mistral AI-inspired design language. The UI features cream-yellow surfaces, saturated orange (#FF6D00) primary accent, flat editorial geometry (8px buttons, 12px cards), and the signature sunset stripe gradient band at the page foot. The system pairs Playfair Display (near-serif, for hero) with Inter (UI sans) and uses JetBrains Mono for code."
colors:
  primary: "#FF6D00"
  primary-deep: "#E65100"
  primary-light: "#FF8F00"
  primary-glow: "#FFB74D"
  sunshine-300: "#FFB74D"
  sunshine-500: "#FF9800"
  sunshine-700: "#F57C00"
  yellow-saturated: "#FFC107"
  cream: "#FFF8E1"
  cream-soft: "#FFFDE7"
  cream-deeper: "#FFE0B2"
  beige-deep: "#FFCC80"
  canvas: "#FFFFFF"
  surface: "#F5F5F5"
  surface-cream: "#FFFBF0"
  surface-code: "#1E1E1E"
  ink: "#1A1A1A"
  ink-tint: "#333333"
  charcoal: "#333333"
  slate: "#666666"
  steel: "#999999"
  stone: "#B0B0B0"
  muted: "#CCCCCC"
  hairline: "#E5E5E5"
  hairline-soft: "#F0F0F0"
  hairline-strong: "#CCCCCC"
  on-dark: "#FFFFFF"
  on-dark-muted: "rgba(255,255,255,0.7)"
  on-cream: "#1A1A1A"
  link: "#FF6D00"
typography:
  hero-display:
    fontFamily: "Playfair Display"
    fontSize: "84px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-1.5px"
  display-lg:
    fontFamily: "Playfair Display"
    fontSize: "64px"
    fontWeight: 400
    lineHeight: 1.10
    letterSpacing: "-1px"
  heading-1:
    fontFamily: "Playfair Display"
    fontSize: "52px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.5px"
  heading-2:
    fontFamily: "Inter"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: "-0.5px"
  heading-3:
    fontFamily: "Inter"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.25
  heading-4:
    fontFamily: "Inter"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.30
  subtitle:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.50
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.50
  button-md:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.30
  caption:
    fontFamily: "Inter"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.40
  micro:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.40
  micro-uppercase:
    fontFamily: "Inter"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: "1px"
  code-md:
    fontFamily: "JetBrains Mono"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.50
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  xxl: "20px"
  full: "9999px"
spacing:
  base: "4px"
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  xxl: "32px"
  xxxl: "40px"
  section-sm: "48px"
  section: "64px"
  section-lg: "96px"
  hero: "120px"
components:
  button-primary:
    backgroundColor: "#FF6D00"
    textColor: "#FFFFFF"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    border: "none"
    hoverEffect: "background #E65100"
  button-dark:
    backgroundColor: "#1A1A1A"
    textColor: "#FFFFFF"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    border: "none"
  button-cream:
    backgroundColor: "#FFF8E1"
    textColor: "#1A1A1A"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    border: "1px solid #FFCC80"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "#1A1A1A"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    border: "1px solid #CCCCCC"
  button-link:
    backgroundColor: "transparent"
    textColor: "#FF6D00"
    padding: "0"
    border: "none"
  card-base:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: "24px"
    border: "1px solid #F0F0F0"
    shadow: "rgba(0, 0, 0, 0.04) 0px 4px 12px 0px"
  card-feature:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: "32px"
    border: "1px solid #F0F0F0"
  card-cream:
    backgroundColor: "#FFF8E1"
    color: "#1A1A1A"
    rounded: "{rounded.lg}"
    padding: "32px"
    border: "1px solid #FFCC80"
  glass-default:
    backgroundColor: "rgba(24, 24, 27, 0.7)"
    backdropFilter: "blur(12px)"
    border: "1px solid rgba(255,255,255,0.08)"
  glass-elevated:
    backgroundColor: "rgba(39, 39, 42, 0.8)"
    backdropFilter: "blur(24px)"
    border: "1px solid rgba(255,255,255,0.1)"
  badge-orange:
    backgroundColor: "#FF6D00"
    textColor: "#FFFFFF"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
    fontWeight: 600
  badge-cream:
    backgroundColor: "#FFE0B2"
    textColor: "#1A1A1A"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
    fontWeight: 600
  filter-tag:
    backgroundColor: "#FFFFFF"
    textColor: "#666666"
    border: "1px solid #E5E5E5"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    fontSize: "13px"
    fontWeight: 500
  filter-tag-active:
    backgroundColor: "#FF6D00"
    textColor: "#FFFFFF"
    border: "1px solid #FF6D00"
  text-input:
    backgroundColor: "#FFFFFF"
    color: "#1A1A1A"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "44px"
    border: "1px solid #CCCCCC"
    focusBorder: "2px solid #FF6D00"
  sunset-stripe:
    height: "8px"
    gradient: "linear-gradient(90deg, #FF6D00 0%, #F57C00 25%, #FF9800 50%, #FFC107 75%, #FFF8E1 100%)"
---

## Overview

- **Composition cues:**
  - Layout: Centered column with max-width constraints (1280px outer, 896px content)
  - Framing: Flat editorial design, no glassmorphism
  - Surfaces: White cards + cream panels (#FFF8E1)
  - Grid: Responsive image cards (1→2→3→4 columns)
  - Signature: Horizontal sunset stripe gradient band at page bottom

## Colors

The color system uses a warm orange/yellow/cream palette inspired by Mistral AI. Light mode is the primary experience.

- **Primary (#FF6D00):** Saturated orange for primary CTAs, active states, and accent elements.
- **Primary Deep (#E65100):** Pressed and hover states for primary buttons.
- **Sunshine 500/700:** Mid-to-deep orange stops in the sunset stripe gradient.
- **Yellow Saturated (#FFC107):** Pure brand yellow, brightest sunset stripe stop.
- **Cream (#FFF8E1):** Warm yellow-cream surface for feature cards, the dropzone, and settings panel.
- **Beige Deep (#FFCC80):** Border color for cream surfaces and cream buttons.
- **Canvas (#FFFFFF):** Page background and default card surface.
- **Surface (#F5F5F5):** Subtle gray background for doodle space.
- **Ink (#1A1A1A):** Primary text color (nearly black).
- **Slate (#666666):** Secondary text and labels.
- **Steel (#999999):** Tertiary text, captions, muted elements.

## Typography

Typography uses Playfair Display (near-serif, for hero) paired with Inter (geometric sans for everything else). This editorial/sans contrast is a core brand voice.

- **Hero Display:** Playfair Display, 84px, weight 400, line-height 1.05, letter-spacing -1.5px.
- **Display Large:** Playfair Display, 64px, weight 400, line-height 1.10.
- **Heading 1:** Playfair Display, 52px, weight 400, line-height 1.15.
- **Heading 2:** Inter, 36px, weight 500, line-height 1.20.
- **Heading 3:** Inter, 28px, weight 500, line-height 1.25.
- **Subtitle:** Inter, 18px, weight 400, line-height 1.50.
- **Body:** Inter, 16px, weight 400, line-height 1.55.
- **Button:** Inter, 14px, weight 500, line-height 1.30.
- **Code:** JetBrains Mono, 14px, weight 400, line-height 1.50.

## Layout

- **Layout type:** Centered column with max-width constraints
- **Container:** max-w-7xl (1280px) outer, max-w-4xl (896px) content
- **Base unit:** 4px
- **Card grid:** 1 column → sm:2 → lg:3 → xl:4 columns, gap 16px
- **Section padding:** 32px

## Elevation & Depth

The system is predominantly flat with minimal shadow elevation.

- **Level 0:** No shadow — default state for cards and containers.
- **Level 1 (card):** `rgba(0,0,0,0.04) 0px 4px 12px 0px` — standard cards.
- **Level 2 (hover):** `rgba(0,0,0,0.08) 0px 8px 24px -4px` — card hover state.
- **Level 3 (elevated):** `rgba(0,0,0,0.08) 0px 12px 24px -4px` — elevated mockups.
- **Level 4 (modal):** `rgba(0,0,0,0.12) 0px 16px 48px -8px` — modals, dropdowns.

### Sunset Stripe
The horizontal sunset band at the page bottom is the brand's signature decorative element — an 8px full-width gradient bar running orange → yellow → cream.

## Shapes

The radius system is sober and editorial — buttons use `rounded.md` (8px), cards use `rounded.lg` (12px). Fully rounded (`rounded.full`, 9999px) is reserved for badges only.

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Small chips |
| `{rounded.sm}` | 6px | Compact UI |
| `{rounded.md}` | 8px | Buttons, inputs, filter tags |
| `{rounded.lg}` | 12px | Cards, modals, panels (dominant card radius) |
| `{rounded.xl}` | 16px | Larger panels |
| `{rounded.xxl}` | 20px | Featured emphasis |
| `{rounded.full}` | 9999px | Badges only (NOT buttons) |

## Components

### Buttons
- **Primary:** bg #FF6D00, text white, 8px radius. Hover: #E65100.
- **Dark:** bg #1A1A1A, text white, 8px radius. For dark-on-cream actions.
- **Cream:** bg #FFF8E1, text #1A1A1A, border #FFCC80, 8px radius.
- **Secondary:** transparent, text #1A1A1A, border #CCCCCC, 8px radius.
- **Link:** transparent, text #FF6D00, no padding.
- All buttons use 10px 20px padding and 14px/500 font. No pill buttons.

### Cards
- **card-base:** White (#FFFFFF), 12px radius, 24px padding, 1px hairline border, subtle shadow. For ImageCard.
- **card-feature:** White, 12px radius, 32px padding, hairline border. For modals.
- **card-cream:** Cream (#FFF8E1), 12px radius, beige-deep border. For Dropzone, SettingsPanel.

### Badges
- **badge-orange:** bg #FF6D00, text white, full radius. For compression ratio.
- **badge-cream:** bg #FFE0B2, text #1A1A1A, full radius.

### Filter Tags
- **inactive:** White bg, #666 text, #E5E5E5 border, 8px radius. For format selection.
- **active:** Orange bg, white text. Selected format tag.

### Inputs
- **text-input:** White bg, 8px radius, 44px height, #CCCCCC border. Focus: 2px #FF6D00 border.

### Sunset Stripe
- 8px tall, full-width gradient: `#FF6D00 → #F57C00 → #FF9800 → #FFC107 → #FFF8E1`
- Placed at the bottom of the page, above any footer-like content.
- Dark mode: `#E65100 → #F57C00 → #FF9800 → #FFC107 → #333333`

### Header
- White nav header with 95% opacity + backdrop blur, 1px bottom hairline.
- Clean bar: logo + title left, nav links + theme toggle + language switcher right.
- 64px height.

### Upload Dropzone
- card-cream container with dashed border.
- On drag: bg-primary/10, border-primary/2.
- Format badges as filter-tag group.

### Image Preview Comparison
- Fullscreen overlay with black/90 background.
- Split-view slider with orange (#FF6D00) circular drag handle.
- Image labels in black/60 pill containers.

## Do's and Don'ts

### Do
- Use cream (#FFF8E1) surfaces for distinctive containers (dropzone, settings).
- Apply `rounded.md` (8px) to buttons and `rounded.lg` (12px) to cards.
- Use orange (#FF6D00) for primary CTAs and active states.
- Include the sunset stripe band at the bottom of the page.
- Use `font-medium` for button labels and `font-semibold` for headings.

### Don't
- Don't use pill buttons (9999px) — buttons are `rounded.md` (8px).
- Don't reintroduce glassmorphism or gradient border shells.
- Don't stray from the orange/yellow/cream warm palette.
- Don't add shadows to flat cards.
- Don't use violet/blue accent colors — this is not the previous design.

## Light / Dark Mode

Light mode is the primary experience. Dark mode inverts backgrounds and adjusts text colors while keeping the orange accent palette. Dark mode surfaces use #121212 (body), #1E1E1E (cards), #2A2A2A (cream-equivalent).
