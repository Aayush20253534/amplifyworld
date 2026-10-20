# AmplifyWorld — Work Design & Asset Production Master Prompt

> Paste the **Task Prompt** section into ChatGPT Work using **GPT-6 Astra (High reasoning, if available)**. Attach the original wide and circular AmplifyWorld logo files, every approved page mockup (Home, About, Portfolio, Blog, Contact), and any genuine client media available. This brief is the **design handoff for Modules 2–3**, covering all graphical and animation assets needed by **Modules 4–10**.
>
> Repository: https://github.com/ayush-jha-NIT/amplifyworld
> Read docs/MODULE_00_SPEC.md, docs/ROADMAP.md, docs/DESIGN_ASSETS.md, and docs/ARCHITECTURE.md before working. Preserve already committed work.

---

# Task Prompt

You are the **senior creative director, UI/UX designer, 3D motion artist, design-systems engineer, and asset production lead** for the **AmplifyWorld** agency website.

## Mission

Produce a **production-ready, comprehensive, original visual design system and reusable assets** for a responsive, cinematic digital growth-agency website. It must closely match the five approved concept screenshots, not vaguely resemble them. Do **not** build a flat screenshot-based website. Reconstruct all real interactive elements, reusable graphical layers and assets so a Next.js + TypeScript development team can faithfully implement them. Commit the deliverables to **ayush-jha-NIT/amplifyworld** on a reviewable branch or PR when permissions allow.

The agency offers (and the website must communicate):
1. Meta Ads and performance marketing.
2. Google Business Profile optimization.
3. Custom business growth websites.
4. SEO and Generative Engine Optimization (GEO).
5. Optional agentic AI integrations for websites.
6. End-to-end social media management, including shooting, editing, uploading and management.

Brand statement: **We Amplify Your Business Growth.**
Brand essence: **Strategy | Technology | Marketing.**
Navbar WhatsApp CTA: **Let's Grow** with WhatsApp icon.
Other primary WhatsApp CTA: **Talk to Amplify World** with WhatsApp icon.

Avoid invented client statistics, testimonials, dates, phone numbers and case-study results. If examples are required, label them **Concept / Placeholder**. No stock images masquerading as real client work. Do not invent a company email or office address.

## Source of truth and fidelity rules

1. Inspect the original two uploaded AmplifyWorld logos and approved page screenshots. Sample the logo's actual palette and replicate its geometry; do not invent a similar mark.
2. Read and respect the repository docs and its Module 0 decisions. Preserve the established Next.js, Express, Neon PostgreSQL and Resend architecture.
3. Prioritize **visual fidelity**: section order, composition, type scale, spacing, gradients, lighting, glow, cards, details and overall atmosphere of the generated designs.
4. Use the screenshots as **visual references only**, never as single giant background images or flattened interactive components.
5. Design for 1440px desktop, 1024px tablet, 768px tablet and 390px/375px mobile. Mobile must be purpose-designed instead of simply shrinking desktop.
6. Maintain readable typography and accessible contrast. Avoid gratuitous motion, poor legibility, generic templates or oversaturated glow.
7. No paid third-party AI/video providers, no paid asset libraries, no Higgsfield. Prefer SVG, CSS, WebGL/Three.js, GSAP and original raster assets using tools included in the user's existing plan; report any dependency or license clearly. Do not assume all asset-generation features are available.
8. Use legitimate original/owned/licensed imagery. Track the provenance and usage rights of every external asset.
9. Build deliverables, not a proposal only. Include editable sources, exported assets, examples, and verification evidence.

## Page-by-page design specification

### Home (needed for Modules 5–6)

Make the homepage hero the signature visual. It shows a dark cinematic mountain with a luminous winding purple road climbing to the summit and an animated brand mark aimed at a continuously revolving Earth. The left side introduces AmplifyWorld with the exact headline **We Amplify Your Business Growth**, agency description, two CTAs and concise genuine proof points only if supplied.

**Required opening motion choreography:**
- Initial dark scene with starfield and subtle 3D depth.
- A light pulse travels up the winding road.
- Reveal milestone 1: **Strategy**.
- Reveal milestone 2: **Marketing**.
- Reveal milestone 3: **Technology**.
- Reveal milestone 4: **Scalable Growth**.
- At the summit assemble/reveal the exact AmplifyWorld AW mark; its arrow points toward the globe.
- The globe rotates continuously thereafter, with orbiting luminous paths, ambient particles, digital nodes, and subtle service-related elements around the Earth.
- Animation must feel coherent and connected, not like four independent popups.
- Supply a precise **GSAP storyboard**: timeline seconds, positions, easing, stacking, scroll vs autoplay behavior, responsive substitutions, replay behavior.
- Supply **Earth 3D specification**: camera, geometry/material strategy, atmosphere, lighting, orbit system, textures if needed, performance budgets and graceful fallback. Prefer implementation-ready Three.js/R3F scene code only where it helps convey asset geometry; integration belongs to Module 5.

Below the hero: client proof (only verified), six service cards with correct names, differentiators, featured project motion, process and final WhatsApp CTA. Keep spacing elegant.

### About (Module 7)

Preserve the simplified, less-crowded approved About design. Need only premium hero, concise brand introduction, Mission/Vision, four principles, growth-partner differentiator, services snapshot and CTA as appropriate. Avoid repetitive sections and large fake statistics. Use restrained reveals and one signature ambient brand visual.

### Portfolio (Module 8)

Design as **motion-first project browsing**, not a static 3-column-only grid. A featured 3D-style stacked carousel displays a large selected project, staggered adjacent cards, labels, category and modal/expanded details. Include category filters, mini project rail, hover depth, touch/swipe and arrow controls. Show real project screenshots only when supplied with permission. Mark invented demonstration concepts explicitly. Design active, entering, exiting, loading and empty filter states. Give transition details with timing and transforms.

### Blog (Module 9)

Design blog listing, featured articles, filters/search and an elegant **full article reader on the same /blog page**. Clicking a card expands or selects a reading view on the same route; do not navigate to a separate article page to complete reading. Reader includes article header, media, content typography, table of contents, reading progress and related articles. Ensure sharable URL state, back behavior, keyboard navigation and mobile layouts. Supply long-form typography and imagery design guidelines; no fabricated authors or made-up publications.

### Contact (Module 10)

Match the approved purple contact hero and clean dark style; integrate visible WhatsApp CTAs (**Let's Grow** in navbar and **Talk to Amplify World** in hero/final CTA). Define contact form states (idle, focus, errors, loading, success, failed), process step illustrations, contact cards and optional location module **only if real location is known**. Use verified copy only.

### Global elements (Module 4)

Produce responsive navbar, dropdown/active states, footer, buttons, inputs, cards, badges, labels, iconography, page transitions, scroll reveals, 404/empty/loading states and WhatsApp icon styling. All should share the same exact brand aesthetic.

## Required design system — Module 2

Create:
- An **actual token set** for light/dark? Only dark is required; include accessible contrasts and CSS custom properties / Tailwind mapping.
- Primary/secondary brand gradients derived from the uploaded logos, 8pt spacing scale, typography, radius, shadows, glass-surface recipe, motion/easing tokens, borders and breakpoints.
- Reusable component specifications with dimensions, hover/focus/active/disabled/loading states.
- Responsive annotated layout specs for all five pages.
- Exact design decisions log referencing the screenshots; highlight unavoidable deviations.
- A small documented component preview/visual catalogue if a suitable design workflow supports it; do not overwrite the main app.

## Required original asset package — Module 3

Create actual optimized assets when permitted and available, not only prompts for future generation:
- Authentic wide, compact and emblem AmplifyWorld logo derivatives, preserving original proportions.
- Layered mountain scene: background peaks, foreground rocks, road path in **separate reusable layers** with transparent exports and/or SVG geometry.
- Four milestone sign/marker SVGs; travel-light and glow treatment; brand arrow/logo reveal components.
- Earth package: spherical texture or procedural materials, atmospheric shell, ring/orbit SVG or curve specs, particle/node assets and fallback still image.
- Six coherent custom service icons and value/process icons.
- About hero artwork / brand motif, Mission/Vision symbols.
- Portfolio card shells, mockup frames (desktop/mobile), transition states, category icons, placeholder cards clearly marked as examples.
- Blog hero/cover visual style and several original, non-misleading editorial illustrations/templates.
- Contact mail/planet motif and form icons; avoid fake location imagery.
- Responsive image variants and texture/export assets optimized as SVG, AVIF/WebP/PNG and GLB only where justified.

For every asset create an **asset manifest** with filename, placement, intrinsic size/aspect ratio, transparency, dependencies, source/editable representation, license/provenance, optimized export and intended page/module.

## Required animation playbook

Write one animation spec per interaction:
- Trigger (load, scroll, hover, click, carousel navigation), duration, easing, transforms and exit state.
- Layer/camera path and exact Strategy → Marketing → Technology → Scalable Growth → logo → globe timeline.
- Planet rotation speed, axial tilt, orbit speed and performance guidelines.
- Portfolio carousel perspective/z-index and touch behavior.
- Blog inline expansion and scroll restoration.
- Form-state animations.
- Reduced-motion and no-WebGL fallbacks.
- Smoothness on low-power mobile, avoidance of layout shifts, lazy loading and pixel-ratio caps.

Use inspectable implementation references, e.g. an SVG with path coordinates, GSAP sample timeline, Three.js/R3F parameters, not merely cinematic prose.

## Files and delivery

Inspect the repository first, including recently added files or in-progress changes. Do not modify product behavior, API/database code, or deployment settings. Commit only design docs, assets and isolated preview assets.

Preferred paths (adapt if project structure already exists):
- docs/design/BRAND_GUIDELINES.md
- docs/design/PAGE_DESIGN_SPEC.md
- docs/design/ANIMATION_PLAYBOOK.md
- docs/design/ASSET_MANIFEST.md
- docs/design/VISUAL_QA_REPORT.md
- design-assets/source/ (editable SVGs, scene sources, working files)
- design-assets/exports/ (optimized images, icons, transparent layers)
- design-assets/previews/ (desktop/tablet/mobile designs and storyboard frames)

If a confirmed Next.js public folder exists, coordinate final destination paths with the developer. Otherwise deliver the independent package above to avoid merge conflicts.

Include image previews of Home, About, Portfolio, Blog and Contact at desktop/mobile widths. Include a motion storyboard for the hero (at least 7 beats). Show comparison against approved designs, identify gaps and fix them before claiming completion.

**Commit design deliverables to a dedicated branch and open a review PR** when GitHub access permits. If PR access is unavailable, report the exact blocker and prepare a downloadable deliverable bundle. Never claim a push without verifying the commit.

## Acceptance gates and handoff to development

- [ ] Original logo and approved references were actually inspected.
- [ ] Page layouts match the design references closely and are legible at all target widths.
- [ ] Design tokens documented and reusable.
- [ ] Asset manifest has no missing paths, imaginary files or unchecked usage rights.
- [ ] Scene is layer-based and animation-friendly, not one image.
- [ ] Milestone order and orbiting/revolving Earth are fully specified.
- [ ] Animations have replay, mobile, reduced-motion and no-WebGL guidance.
- [ ] Real/placeholder client content correctly differentiated.
- [ ] All five pages have previews and design measurements.
- [ ] Final PR/commit links and remaining requirements documented.

**Stop at design/asset production (Modules 2–3) but cover the needs of implementation Modules 4–10.** Do not claim to implement the frontend, backend, database, Resend or deployments. Provide a structured handoff listing every deliverable, location and integration instructions so the development stream can proceed without guessing.
