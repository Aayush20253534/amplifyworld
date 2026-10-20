# Module 1 — Application foundation report

## Scope and implementation

- pnpm workspace with `apps/web`, `apps/api`, and `packages/shared`.
- Next.js App Router / React / TypeScript web starter with the five approved routes, central navigation and honest placeholder content.
- Express / TypeScript API with `GET /health`, conservative JSON payload limits, 404 handling, configurable CORS, and graceful process shutdown.
- Shared branded service categories and typed API response.
- Node 22 baseline, environment templates, configuration and GitHub Actions CI (install/build/typecheck/lint/test).
- Basic API and route-contract tests.
- No secrets, fake business phone numbers or fabricated client results included.

## Development

Install Node.js 22 and pnpm 10.13.1. From repository root:

```sh
corepack enable
pnpm install --no-frozen-lockfile
pnpm dev
```

Web: http://localhost:3000

API: http://localhost:4000/health

The workspaces must be built in dependency order with `pnpm build`. A standard clean-build validation is `pnpm check`; CI runs build, typecheck, lint and tests individually.

## Boundaries

This module deliberately contains only a usable application scaffold and simple placeholder visual layout. The approved original brand graphics, advanced global navbar, animated globe/mountain scene and design system belong to Modules 2–5. The DB, inquiry forms and Resend are Modules 11–13.

## Acceptance evidence

**Accepted:** GitHub Actions CI passed on the Module 1 pull request and again on the merged Modules 1–3 `main` commit. Evidence: [Module 1 CI run](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39402236840) and [combined `main` CI run](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39402440329).

- [x] Clean pnpm install
- [x] Shared package build
- [x] Next.js production build
- [x] Express TypeScript build
- [x] Lint/typecheck
- [x] API and workspace tests

## Next

Modules 2–3 design production kit has been merged into `main` via PR #1. Module 4 should integrate the design tokens, actual logo, navigation/footer and page transitions with the live Next.js application. A deterministic root lockfile can be added as part of the next dependency maintenance pass; CI currently uses `pnpm install --no-frozen-lockfile`.
