# Design Reference and Asset Production Register

## Authoritative inputs

The conversation contains approved AmplifyWorld UI design mockups for Home, About, Portfolio, Blog and Contact plus supplied AmplifyWorld logos (wide and circular). These are **visual references**, not ready-to-use interactive pages.

Use the original logo files as actual graphical source during implementation. Do not recreate the brand mark with approximate text or rely on upscaled screenshot crops if source assets are available.

## Visual direction

- Background: near-black with deep violet atmospheric layers.
- Foreground: white text, strong typographic hierarchy.
- Accent: purple-to-magenta gradients and restrained luminous borders.
- Layout: cinematic hero with deliberately uncluttered follow-on sections, rounded cards and glass/soft-depth effects.
- Motion: meaningful and smooth, not constant eye-catching movement on every element.

Precise tokens (font family, hex values, corner radii, spacing) will be measured and finalized against the approved images in Module 2.

## Inventory by page

### Home
- [ ] Optimized wide/mobile logos and brand-symbol variant.
- [ ] Layered dark mountain terrain (foreground/midground/background).
- [ ] SVG road/path allowing a traveling light and milestone placement.
- [ ] Four milestone icons/markers: Strategy, Marketing, Technology, Scalable Growth.
- [ ] GSAP scene timeline with a separately controllable end state.
- [ ] WebGL rotating Earth with low-cost material/shader and orbital arcs.
- [ ] 3D brand symbol or clean composited SVG logo reveal.
- [ ] Subtle particle field; optimized mobile and no-WebGL fallback.
- [ ] Service and process icon family.

### About
- [ ] Lightweight planet/brand hero motif.
- [ ] Mission and vision symbols.
- [ ] Values icons, no unnecessary duplicated sections.

### Portfolio
- [ ] Authorized project imagery, cropped for portrait and landscape displays.
- [ ] Front/side cards for active and adjacent carousel projects.
- [ ] Optional real desktop/mobile mockups and hover visuals.
- [ ] Verified project categories and results, no invented claims.

### Blog
- [ ] Article thumbnails and feature illustration variants.
- [ ] Inline reader typography, TOC visuals and reading-progress bar.
- [ ] Related article thumbnails.

### Contact
- [ ] Animated mail/planet brand motif.
- [ ] Form-state icons and verified contact-channel icons.
- [ ] Geographic information only when exact office location confirmed.

## Asset pipeline

- SVG for logos, line graphics and static icons; responsive WebP/AVIF for photography and detailed scene layers.
- Document usage rights, source assets and export settings.
- Responsive sizes and safe crops; reserve dimensions to avoid layout shifts.
- Lazy load noncritical assets and 3D code.
- Ensure all critical motion has an accessible still version.

## Visual QA protocol

1. Collect source dimensions and inspect typography, gradients and spacing.
2. Reconstruct responsive components instead of embedding whole-page mockups.
3. Capture comparable desktop/tablet/mobile screenshots at stable animation states.
4. Check alignment, text wrapping, color, imagery, borders and section hierarchy.
5. Check motion timing, reduced-motion behavior and WebGL fallback.
6. Record discrepancies; only mark a page complete after manual/design QA.

### Content accuracy warning

Some draft mockups contain demo names, dates, growth percentages, testimonials and contact details. They are not verified company facts and **must not** be shipped as factual claims.
