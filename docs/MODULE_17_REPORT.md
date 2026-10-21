# Module 17: Production deployment preparation and live release gates

## Outcome

**Partially implemented.** Repository deployment support, startup security gates, cross-origin admin PATCH fix, offline configuration validation, read-only HTTPS smoke probes and runbook are implemented. Actual deployment on Vercel/Render/Neon/Resend **is pending verified ownership, explicit workspace selection, provisioning and operator approvals**.

## Source changes

- render.yaml: explicit free-plan Render API health-only Blueprint, no database or paid jobs.
- apps/web/vercel.json: Next.js pnpm workspace build configuration.
- apps/api/src/deployment/config.ts: startup validation of production CORS, pooled TLS DB, approved collection/retention, trusted proxies and independently verified notification jobs. Invalid config reports key names, never credentials.
- apps/api/src/deployment/smoke.ts: read-only homepage, Contact, API health and DB readiness checks against user-verified HTTPS origins.
- apps/api/src/app.ts: CORS PATCH enabled for secured admin draft-editing preflight.
- apps/api/scripts and package.json: operator check/smoke commands.
- Extra tests for validation failures, no secret logging, mock smoke endpoints, and CORS admin preflight.
- docs/DEPLOYMENT_RUNBOOK.md: exact deployment settings, non-destructive migration, privacy activation, scheduled jobs and rollback.

## Resource audit

**Deployment status update, 21 October 2026:** Vercel confirms a READY production frontend at https://web-ayush-jha-nits-projects.vercel.app/ for `a34866f`. GitHub Actions [smoke run 39554839166](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39554839166) passed seven anonymous route checks plus branding, noindex, no-login, and nosniff verification. Vercel SSO now protects previews only. This does NOT verify backend readiness, completed Neon migration, inquiry delivery, Resend, admin identity, or final signoff. Earlier inventory follows.\n\n**Earlier deployment metadata:**

## Release acceptance status

GitHub build/tests can verify repository readiness, but cannot establish a live Neon connection, Vercel deployment, Render deployment, Resend delivery, production migration or actual customer inquiry. Module 17 is **NOT completed** until the operator checklist in DEPLOYMENT_RUNBOOK.md passes, including live transactional evidence. Module 18 must wait for that.

## GitHub repository acceptance

- [PR #16](https://github.com/ayush-jha-NIT/amplifyworld/pull/16) was merged into main at [a132a4b](https://github.com/ayush-jha-NIT/amplifyworld/commit/a132a4b1bad686bd07c669c59e620c7437ad7fcf).
- [PR CI run 39473801401](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39473801401) passed frozen install, production Next/Express builds, Prisma, TypeScript, lint, all unit tests including deployment gates and CORS preflight, isolated PostgreSQL migration/integration, and existing 83 Chromium browser tests.
- **Cloud release status:** NOT DEPLOYED OR VERIFIED. No official Vercel URL, Render deployed service, Neon production migration, verified Resend sender, or live email/inquiry result was established. The dedicated AmplifyWorld Neon project exists, but has zero application tables and is not connected to a live API. Module 17 remains PARTIAL until those gates pass.
