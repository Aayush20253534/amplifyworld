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

Connected Vercel and Neon inventories contain only the unrelated Digimarket projects, not a dedicated AmplifyWorld project. The Render connector discovered one workspace named amplify's workspace, but requires explicit operator confirmation before selecting it. Do not reuse resources or infer production ownership. A verified Resend sender, recipient, privacy approval and real deployment URLs are not yet provided.

## Release acceptance status

GitHub build/tests can verify repository readiness, but cannot establish a live Neon connection, Vercel deployment, Render deployment, Resend delivery, production migration or actual customer inquiry. Module 17 is **NOT completed** until the operator checklist in DEPLOYMENT_RUNBOOK.md passes, including live transactional evidence. Module 18 must wait for that.

## GitHub repository acceptance

- [PR #16](https://github.com/ayush-jha-NIT/amplifyworld/pull/16) was merged into main at [a132a4b](https://github.com/ayush-jha-NIT/amplifyworld/commit/a132a4b1bad686bd07c669c59e620c7437ad7fcf).
- [PR CI run 39473801401](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39473801401) passed frozen install, production Next/Express builds, Prisma, TypeScript, lint, all unit tests including deployment gates and CORS preflight, isolated PostgreSQL migration/integration, and existing 83 Chromium browser tests.
- **Cloud release status:** NOT DEPLOYED OR VERIFIED. No official Vercel URL, Render deployed service, dedicated Neon project, Resend verified sender, production data migration or live email/inquiry result was established. Module 17 remains PARTIAL until those gates pass.
