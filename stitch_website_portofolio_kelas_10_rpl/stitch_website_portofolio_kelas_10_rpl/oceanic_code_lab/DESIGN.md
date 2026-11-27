---
name: Oceanic Code Lab
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#49607e'
  on-secondary: '#ffffff'
  secondary-container: '#c4dcff'
  on-secondary-container: '#49617f'
  tertiary: '#006577'
  on-tertiary: '#ffffff'
  tertiary-container: '#008096'
  on-tertiary-container: '#f9fdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#b0c8eb'
  on-secondary-fixed: '#001c37'
  on-secondary-fixed-variant: '#314865'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: 4.25rem
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.5rem
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-action:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

### Identity & Tone
This design system defines an immersive, modern portfolio platform tailored for high school vocational software engineering students (Kelas 10 Rekayasa Perangkat Lunak). It bridges youthful digital culture with serious engineering craftsmanship. The personality is ambitious, collaborative, technically articulate, and forward-looking. 

### Visual Direction: Neo-Technical Glass
The visual style merges structured engineering discipline with organic digital fluidity:
- **Clean Developer Aesthetic:** Grounded in monospaced accents, structural gridlines, and clean typography reminiscent of high-end developer documentation and IDE interfaces.
- **Ocean-Infused Glassmorphism:** Layered surfaces combining translucent backdrops (`backdrop-blur-md`), precise hairline borders, and atmospheric ambient gradients inspired by deep oceanic trenches rising into bright sky cyan.
- **Micro-Interactions & Technical Polish:** Tactile interactive states, soft glowing cyan focus halos, and reactive hover lifts conveying performance and precision.

## Colors

### Palette Architecture
The palette pairs high-contrast marine blues with cool-tinted structural slates, engineered for long-form legibility and technical vibrancy.

- **Primary (`#0284C7` - Ocean Blue):** Anchors high-priority actions, focus outlines, key metrics, and primary navigational states.
- **Secondary (`#0A2540` - Deep Navy):** Represents authority and depth; applied to high-contrast hero modules, footers, code block frames, and structural mastheads.
- **Tertiary (`#06B6D4` - Cyan Accent):** Highlights real-time technical statuses, interactive badges, code tokens, and subtle gradient stops alongside Sky Cyan (`#38BDF8`).
- **Indigo Accent (`#6366F1`):** Reserved for advanced engineering contexts, Git commit timelines, and collaborative project badges.
- **Neutral Core:** Built on Slate tones. Surfaces transition from clean daylight (`#F8FAFC`, `#F1F5F9`) in standard views into `#0F172A` and `#1E293B` for terminal windows, IDE showcases, and dark-surface components.

### Semantic Tones
- **Success (`#10B981`):** Passing test suites, live deployment URLs, active attendance, and project completions.
- **Warning (`#F59E0B`):** Upcoming assignment deadlines, work-in-progress features, and queue statuses.
- **Danger / Expression (`#F43F5E`):** Critical alerts, bug trackers, and community expressions/menfess categories.

## Typography

### Structural Pairings
- **Display & Interface:** `Plus Jakarta Sans` provides an open, modern geometric appearance with humanist warmth. Tight negative tracking on large display headings (`-0.02em` to `-0.03em`) creates a polished, editorial tech feeling.
- **Developer Accents & Metadata:** `JetBrains Mono` handles all programmatic elements: tags, commit timestamps, file extensions, technical stack badges, and code snippets.

### Rules of Usage
- Always render technical categories (e.g., `PRODUKTIF RPL`, `commit hash`, `v1.0.4`) in `JetBrains Mono` uppercase with expanded letter-spacing.
- Keep editorial body paragraphs constrained to a maximum width of `65ch` to preserve reading cadence across student case studies.

## Layout & Spacing

### Layout Architecture
- **Grid Structure:** Standard 12-column responsive fluid grid system on desktop (`>= 1024px`), 8-column layout on tablet (`768px - 1023px`), and 4-column layout on mobile (`< 768px`).
- **Canvas Constraints:** Maximum layout width capped at `1280px` (`80rem`) centered horizontally, keeping content dense, legible, and unified.

### Responsive Breakpoints
- **Mobile (< 768px):** Single-column stacked flows. Outer gutters compress to `1rem`. Dense UI components (such as student directories) collapse into single-column or scroll-snapped cards.
- **Tablet (768px - 1023px):** Two-column card arrangements. Navigation switches from floating dock to standard compact bar. Gutters expand to `1.25rem`.
- **Desktop (>= 1024px):** Full multi-column dashboard, project showcases, interactive Git graph visualization, and persistent sidebars where needed.

## Elevation & Depth

### Atmospheric Glass Layering
Depth is achieved through physical clarity, soft light dispersion, and deliberate border definition rather than opaque drop-shadows.

1. **Base Tier (Ground):** Tinted backdrop (`#F8FAFC` in daylight mode, interspersed with soft gradient blurs of `#0284C7` at 5-8% opacity positioned behind hero sections).
2. **Surface Tier (Cards & Containers):** 
   - Translucent fill: `rgba(255, 255, 255, 0.75)` with `backdrop-filter: blur(12px)`.
   - Structural boundary: Solid hairline outline `1px solid rgba(226, 232, 240, 0.8)` or translucent overlay `1px solid rgba(255, 255, 255, 0.6)`.
   - Shadow: Ambient diffuse drop `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
3. **Elevated Hover Tier:**
   - Translates `-2px` on the Y-axis.
   - Border transitions to `#38BDF8` (Sky Cyan) at 60% opacity.
   - Shadow blooms: `0 12px 24px -4px rgba(2, 132, 199, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.03)`.
4. **Modal & Floating Chrome Tier (Terminal, Menfess Popups, Navigation Docks):**
   - Translucent fill: `rgba(255, 255, 255, 0.90)` backed by `backdrop-filter: blur(16px)`.
   - Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`.

## Shapes

### Geometry Strategy
- **Standard UI Containers & Cards:** Configured at Level 2 (`rounded-lg` / 12px - 16px). This rounds sharp technical edges while maintaining clean geometric alignment with code blocks and modular cards.
- **Outer Shells & Hero Cards:** Configured at `rounded-2xl` (16px - 20px) to frame multi-element groups.
- **Pills (`rounded-full`):** Strictly reserved for taxonomy tags, system status indicators, student roles, and icon button surrounds.

## Components

### Buttons
- **Primary Button (Ocean Flow):**
  - Background: Solid `#0284C7` (Ocean Blue) or 135deg gradient from `#0284C7` to `#06B6D4`.
  - Content: Pure white, `label-action` font style.
  - States: Hover delivers a `0 0 16px rgba(2, 132, 199, 0.45)` cyan glow and slight brightness increase. Active depresses by 1px.
- **Secondary Button (Glass Outline):**
  - Background: `rgba(255, 255, 255, 0.6)` with backdrop blur.
  - Border: 1px solid `#CBD5E1`.
  - Color: `#0A2540`.
  - States: Hover applies `#F1F5F9` background with `#0284C7` border and text transition.

### Pill Badges & Metadata Chips
- Built with `label-badge` typography (`JetBrains Mono`, uppercase, tracking-wider).
- Padding: `0.25rem 0.75rem`, full border radius (`rounded-full`).
- **Variants:**
  - *PRODUKTIF RPL / Core Tech:* `#E0F2FE` background, `#0369A1` text, 1px `#BAE6FD` border.
  - *Wali Kelas / Mentor:* `#EEF2FF` background, `#4338CA` text, 1px `#C7D2FE` border.
  - *Struktur Organisasi:* `#F1F5F9` background, `#334155` text, 1px `#E2E8F0` border.
  - *Menfess / Creative:* `#FFE4E6` background, `#E11D48` text, 1px `#FECDD3` border.

### Student Portfolio & Project Cards
- Base: White with `bg-white/70`, `backdrop-blur-md`, 1px border `#F1F5F9`.
- Header: Student avatar flanked by git activity/role badge and student ID in monospace.
- Body: Project title in `headline-sm`, short tech stack description in `body-sm`.
- Footer: Tech stack pill chips (e.g., `HTML`, `Tailwind`, `Laravel`, `React`) along with live demo icon and GitHub repository link.
- Hover Effect: Translates up 3px with border shifting to `#38BDF8` and an ocean-tinted drop-shadow.

### Input Fields & Textareas (e.g., Menfess & Feedback)
- Surface: `#FFFFFF` or `#F8FAFC`.
- Border: `1px solid #CBD5E1`, radius `rounded-xl`.
- Focus State: Border color switches cleanly to `#0284C7` with a ring shadow: `0 0 0 3px rgba(56, 189, 248, 0.25)`. Outline removed.
- Monospace Input mode: For student code submission inputs, font automatically maps to `code-block` style with dark background `#0F172A` and `#38BDF8` caret.

### Interactive Code Previews
- Terminal style container: Dark `#0F172A` background, header bar with three window control dots (red, yellow, green) and student branch name (`feat/kelas-10-rpl`).
- Content: Syntax highlighted code snippet with line numbers in `#64748B`.