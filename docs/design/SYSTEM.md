# Fly Nerd Tech Design System (Codex-inspired, original)

## Principles
- **Authenticity-first authority:** every component should explain mechanism + measurable outcome.
- **App-shell marketing:** landing page behaves like a focused product workspace.
- **Low-friction motion:** ambient depth with restrained animation and reduced-motion fallback.

## Tokens
Primary tokens are defined in `src/lib/design-tokens.ts`.
- Color palette prioritizes dark canvas + cool accent glow.
- Radius scale: `sm(10)`, `md(14)`, `lg(20)`, `xl(28)`.
- Motion: `180ms/260ms` with cubic-bezier easing.

## Core Components
1. `SidebarShell`
   - Fixed IDE-like navigation, status indicator, expandable groups.
   - Footer contains always-visible CTA and `SegmentToggle`.
2. `HeroWithAmbientVideo`
   - Self-hosted ambient loop in `/public/video/ambient-loop.mp4`.
   - Uses poster fallback `/public/images/ambient-poster.svg`.
3. `ServiceCard`
   - Hover elevation + glow.
   - Dialog reveals implementation details, timeline, inputs, outcomes.
4. `SegmentToggle`
   - Audience switcher for Franchise / Member Hub / Enterprise Ops.

## Motion Rules
- Use CSS transforms/opacity for hover + reveal.
- Avoid blocking animations and JS timeline dependencies.
- Respect `prefers-reduced-motion` in `globals.css`: suppress transitions + hide video.

## Accessibility Rules
- Sidebar menu button includes aria labels and keyboard focus states.
- Expand/collapse controls expose `aria-expanded`.
- Segment selector uses tab semantics.
- Service modal uses Radix dialog focus management.

## Replacement Note
`ambient-loop.mp4` is a lightweight placeholder and should be replaced by final brand-approved abstract motion clip while preserving dimensions and preload settings.
