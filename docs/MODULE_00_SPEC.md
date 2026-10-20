# Module 0 — Requirements and Acceptance Specification

**Status:** Initial specification ready for review. Code implementation begins in Module 1.

## Product goals

Create a distinctive agency website for AmplifyWorld that converts qualified business inquiries while demonstrating services and work. Pages should closely match the approved concept images while remaining semantically structured, accessible, mobile-friendly and maintainable. No image-generation screenshot is a substitute for real page components.

## Approved routes

| Route | Page | Minimum content | Required interaction |
| --- | --- | --- | --- |
| `/` | Home | Hero, services, differentiation, selected work, process, CTA | Ascending mountain-road reveal + revolving globe |
| `/about` | About | Brand introduction, mission, vision, values, concise expertise, CTA | Restrained entrance and scroll motion |
| `/portfolio` | Portfolio | Featured project, category filtering, project gallery, CTA | Smooth animated transitions, carousel, project details |
| `/blog` | Blog | Featured posts, topic filters, search, full article reader | Inline full-length reader, TOC/scroll progress, back-to-list |
| `/contact` | Contact | Contact options, inquiry form, response expectation, CTA | Validated submission, success/error, WhatsApp links |

Reference designs contain Process and Pricing links. **Do not create empty or misleading destination pages.** Link Process to the homepage process section; omit Pricing until pricing content/scope is authorized. Services may link to a homepage services section until a services page is explicitly approved.

## Exact visible copy constraints

- Home hero title: **We Amplify Your Business Growth**
- Core services section: **Growth Services Built for Modern Businesses** (the accepted updated version of the 'All You Need to Grow, Under One Roof' area)
- Navbar WhatsApp CTA: **Let's Grow**
- Major WhatsApp CTA: **Talk to Amplify World**
- Tagline: **Strategy | Technology | Marketing**

## Service taxonomy

1. **Meta Ads & Performance Marketing** — campaign strategy, conversion tracking, optimization and reporting.
2. **Google Business Profile Optimization** — profile setup/improvement, local discoverability and profile content.
3. **Growth-Focused Website Development** — custom-designed, suitable for business goals, responsive and SEO-aware.
4. **SEO & GEO Optimization** — search visibility plus content structured for generative/AI-powered search.
5. **Agentic AI for Web** — optional AI-powered tools or agents where client requirements justify them.
6. **Social Media Management** — end-to-end production workflow from filming and editing to scheduling/publishing.

Do not confuse these with unrelated services; retain separate service cards.

## Homepage cinematic choreography

Build a real-time scene, not a video-only background:

1. A glowing path travels up an illustrated mountain landscape.
2. Strategy milestone appears.
3. Marketing milestone appears.
4. Technology milestone appears.
5. Scalable Growth milestone appears.
6. The logo resolves near the summit and its arrow points toward Earth.
7. Earth rotates continuously; subtle orbital lines, particles and growth/technology elements revolve or drift around it.

Implementation targets: GSAP timeline + SVG/multi-layer landscape; Three.js/React Three Fiber for the Earth; depth/parallax used carefully. Content remains available without JavaScript/WebGL. Avoid blocking introductory motion. Limit particle count/pixel ratio on low-powered devices. Respect `prefers-reduced-motion`; ensure screenshots and tests can enter deterministic animation states.

## Portfolio contract

- Featured carousel with intentional 3D/card depth, indicators and accessible previous/next.
- Filter project list by discipline with animated transitions that preserve keyboard focus.
- Details accessible by click, keyboard and assistive technology.
- On mobile use swipe or buttons; avoid horizontal page overflow.
- Only actual projects with permission should be presented as clients. No invented percentages, results or logos.

## Blog contract

- Selecting a card opens the article **on the same /blog page** without mandatory separate navigation.
- Maintain browser history/query or hash so articles can be deep-linked and back navigation works.
- Accessible reading layout, table of contents, progress indicator, media, sharing and related posts.
- Publish semantic article content (structured HTML and metadata); inline-reader behavior must not harm crawling/SEO. Optionally render article content within the same route using query state.
- Admin-entered HTML must be sanitized.

## Contact and lead capture

- Fields: name, email, phone (where appropriate), company/brand, interested service, project description.
- Validate in browser and API; show explicit loading, success and error states.
- Save inquiry in Neon; trigger Resend notification with protected server-only keys.
- Add anti-spam, rate limiting and minimal-collection/privacy handling.
- WhatsApp URLs require a **verified business phone number**. Do not silently substitute a personal or imaginary number.
- Business address, working hours, and response SLA are provisional until confirmed.

## Visual quality and accessibility gates

- Compare live desktop/tablet/mobile screenshots against approved page mockups.
- Brand colors must be sampled from supplied logo assets in the implementation phase, not guessed as final palette.
- Use semantic headings, adequate contrast, focus states and reduced-motion support.
- Avoid layout shifts and unnecessary heavy animation. Images responsive/optimized.
- Every CTA must navigate or submit to a valid, tested destination.

## Outstanding content inputs

- Verified WhatsApp number, business email/address and hours.
- Original portfolio screenshots/assets and permissions; verified case-study descriptions and results.
- Article copy, author attribution and publication details.
- Official company/legal/privacy text as applicable.
- Final image/logo asset inventory from the original uploads.

These inputs do not prevent building reusable application scaffolding in Module 1. Any unavailable content must be marked as pending, not fabricated.

## Module 0 acceptance

- [x] Routes and behaviors scoped
- [x] Core services and copy specified
- [x] Animation requirements defined
- [x] Architecture and integration boundaries drafted
- [x] Asset inventory and QA requirements documented
- [x] Repository initialized with documentation
- [ ] Exact asset colors / layout measurements extracted during visual implementation
- [ ] Business-specific contact data and real portfolio content verified

**Next:** Module 1 repository/monorepo scaffold, automated checks, environment templates and base running web/API apps.
