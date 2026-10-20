# Module 10 — Contact frontend

## Baseline and inspected contracts

Implementation starts from `main` at `4971c85393ce1d7eeb07ae95ccfdda8017c33a03`
(Modules 0–9). Reviewed the Modules 0–18 roadmap, Module 0 requirements,
`design-assets/catalogue/contact.html`, the desktop/mobile Contact previews,
`docs/design/PAGE_DESIGN_SPEC.md`, `COMPONENT_SPEC.md`, integration handoff,
design tokens, original envelope/orbit artwork, shared service taxonomy and
`docs/ARCHITECTURE.md`.

The Express application implements **only `GET /health`** plus a 404 fallback.
`POST /api/v1/inquiries` is a provisional architecture entry, with no implemented
request/response schema, storage or notification service. The shared package
currently exports service IDs and a health response; it has no inquiry contract.
There is no verified business number in committed configuration.

## Delivered

- Server-rendered `/contact` with metadata, purple split hero, original layered
  Earth/orbits/terrain/envelope art, two hero actions, truthful contact choices,
  form/next-steps split and horizon CTA. All existing public routes are preserved.
- Uses existing palette, typography, spacing and components. The form/right
  context split is 57.5/42.5; fields stack at 1024px, use two columns at 768px and
  stack on phones. Inputs have 16px text and at least 48px height.
- Required name, email, service and project details; optional phone and company.
  Service values use shared IDs plus `not-sure`. Trimmed name 1–100 characters,
  email up to 254 with a basic syntax check, phone 7–15 digits with common
  separators, company up to 150, message 20–5,000. This frontend policy must be
  reconciled with server policy in Module 12.
- Persistent labels, autocomplete/input modes, required semantics, inline errors,
  linked error summary, first-invalid-field focus, keyboard operability, polite
  status announcements and focus on results. No motion is required to use the
  form; the shared reduced-motion policy covers page/section transitions.
- **Check Inquiry** validates locally. Availability is explained before entry,
  near the hero actions and in the result. No inquiry request, browser storage,
  fake acceptance, invented email/address/phone or response SLA.
- An explicit typed *frontend adapter seam* supports pending, accepted, rejected,
  field-validation and timeout states. It is not an invented HTTP contract.
  Production passes no adapter. Only `status: "accepted"` from a future adapter
  can show receipt; malformed acknowledgements fail. Failures retain every field,
  allow an explicit retry, and do not expose raw server errors.
- A synchronous lock prevents concurrent duplicate submits, including repeated
  Enter. Accepted submissions stay locked until “Start another inquiry.”
  Pending requests time out after 20 seconds and abort on unmount. Later server
  work must implement idempotency to handle uncertain network outcomes.
- Without JavaScript, fields and submission stay disabled and a truthful notice
  appears. This also prevents accidental native GET submission of personal data.
- Existing WhatsApp gating and exact CTA wording are reused. No destination is
  invented. Owners must verify any number before configuration; syntax validation
  alone is not ownership verification.

## Files and assets

- `apps/web/app/contact/page.tsx`, Contact-scoped additions to `app/globals.css`.
- `apps/web/components/contact/inquiry.ts` and `inquiry-form.tsx`.
- Unchanged originals copied to public assets: `artwork/contact-envelope.svg`,
  `scene/orbits.svg`, `icons/mail.svg`. Existing Earth and mountain exports reused.
  No flattened page screenshots, remote artwork or new media-generation service.
- Component/validation tests, browser tests, test configuration, reproducible
  dependency lockfile, and CI browser evidence uploads.
- README, roadmap, environment example and this report.
- Removed one pre-existing unused Blog import found by lint; no Blog behavior changed.

## Validation

Local validation on 20 October 2026 passed with pnpm 10.13.1 and Node 24.16.0;
CI uses the repository's declared Node 22:

| Check | Result |
| --- | --- |
| `pnpm build` | Shared package, Express API and Next.js production builds passed; Contact prerendered |
| `pnpm typecheck` | All three workspaces passed |
| `pnpm lint` | Passed; no ESLint warnings/errors |
| `pnpm test` | 44 passing: 31 existing web contracts, 10 Contact/WhatsApp behavior tests, 2 API tests, 1 shared taxonomy test |
| `pnpm --filter @amplifyworld/web test:browser` | 9 Chromium tests passed |
| Accessibility | axe reported zero violations in the tested Contact default and locally checked states |
| Responsive | 1440, 1024, 768, 390, 375 and 320px: no horizontal page overflow; expected field layout and 48px controls |
| Reduced motion / keyboard | Static motion preference, first-error focus, tab navigation, Enter submission and result focus passed |
| Availability / privacy | No inquiry POST, no `wa.me` link without configuration, retained inputs, disabled native submission without JavaScript |
| Regression | Home, About, Portfolio, Blog and direct inline-article routes rendered their heading and footer |

The component tests use injected test transports to verify loading, duplicate
locks, accepted-only success, retry, field errors, malformed acknowledgement,
cancellation and timeout. These transports are **not** bundled into the Contact
route and do not constitute a live delivery test.

Reviewed production screenshots against the approved catalogue: split composition,
original artwork, hierarchy, panels, responsive field arrangement and final CTA
are retained. Added truthful notices increase page height. The repeated shared
footer invitation is hidden only on Contact, which supplies its own final CTA.

Screenshots: [1440](qa/module-10/contact-1440.png),
[1024](qa/module-10/contact-1024.png), [768](qa/module-10/contact-768.png),
[390](qa/module-10/contact-390.png), [375](qa/module-10/contact-375.png),
[320](qa/module-10/contact-320.png).

CI runs production builds, TypeScript, lint, all existing/new tests and Chromium
checks; browser evidence is retained as workflow artifacts for 14 days.

## Integration and remaining work

Modules 11–13 must supply durable storage, a validated inquiry API, safe error
mapping, idempotency, spam/rate controls and server-only Resend notification handling.
The client adapter must confirm durable receipt before resolving `accepted`;
a transport success or queued demo timer is insufficient. Its privacy notice
must be replaced with reviewed collection/retention language before enabling it.
`NEXT_PUBLIC_API_URL` intentionally cannot turn collection on by itself.

The design catalogue’s simulated “Send Message” action is deliberately replaced
with “Check Inquiry” while services are unavailable. “Send Your Inquiry” remains
the approved hero navigation label, accompanied by an availability notice.
Process copy is conditional and makes no delivery or response-time promise.

No deployment, live delivery or real-device/screen-reader certification is claimed.
Module 16 still covers manual assistive-technology and physical-device QA; Module
17 covers production deployment and actual end-to-end receipt/notification tests.
