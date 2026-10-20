# AmplifyWorld

**We Amplify Your Business Growth.**

AmplifyWorld helps businesses grow through strategic marketing, technology, branding, web development, SEO, GEO and AI automation. This repository is the planned production website for the agency.

> **Development status:** Module 0 (planning and requirements). Modules 1–18 cover production implementation and deployment. This repository is not yet a functioning website.

## Approved experience

- **Homepage**: cinematic black/violet hero with a glowing mountain road, sequential **Strategy → Marketing → Technology → Scalable Growth** milestones, an animated AmplifyWorld mark whose arrow points toward a continuously revolving Earth, service cards and featured projects.
- **About**: uncluttered brand story, mission, vision, values and differentiators.
- **Portfolio**: animated project carousel, category filters, interactive previews and detail views. Show only authorized projects and substantiated metrics.
- **Blog**: articles, topic filters, search and **full inline article reading on the blog page**, not redirecting users to separate pages.
- **Contact**: inquiry form with server validation, Resend email notifications and direct WhatsApp contact.

### Branding and contact CTAs

- Use the supplied white-to-violet/magenta AmplifyWorld logo and matching dark/purple design palette.
- Main headline: **We Amplify Your Business Growth**.
- Navbar CTA: **Let's Grow** (WhatsApp icon).
- Primary WhatsApp CTA: **Talk to Amplify World**.
- No fabricated client testimonials, performance statistics, contact numbers or addresses.

### Core services

1. Meta Ads and performance marketing
2. Google Business Profile optimization
3. Customized, growth-focused website development
4. SEO and Generative Engine Optimization (GEO)
5. Agentic AI for websites where suitable
6. End-to-end social media management: shooting, production, publishing and ongoing management

## Technical architecture

| Layer | Stack |
| --- | --- |
| Web | Next.js (App Router), TypeScript, Tailwind CSS |
| Interactive motion | GSAP/ScrollTrigger, SVG/CSS |
| 3D | Three.js with React Three Fiber |
| API | Node.js, Express, TypeScript |
| Database | Neon PostgreSQL, Prisma |
| Email | Resend |
| Workspace | pnpm monorepo |
| Deployment target | Vercel (web) + Render (API) + Neon |

No paid motion-generation platform is needed for the code-based animations. Motion must be performant on mobile and honor reduced-motion settings.

## Project documents

- [Module 0 specification](docs/MODULE_00_SPEC.md)
- [Development roadmap (Modules 0–18)](docs/ROADMAP.md)
- [Architecture and backend contracts](docs/ARCHITECTURE.md)
- [Design and asset production inventory](docs/DESIGN_ASSETS.md)

## Working agreement

Implement sequentially; use screenshot comparison against approved mockups to guide layout and content; treat those mockups as reference, **not** as flattened page backgrounds. Keep production secrets out of source control. Each module ends with build/test and repository review.

Project repository: [ayush-jha-NIT/amplifyworld](https://github.com/ayush-jha-NIT/amplifyworld).
