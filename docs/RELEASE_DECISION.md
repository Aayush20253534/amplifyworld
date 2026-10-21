# AmplifyWorld Release Decision (as of 21 October 2026)

**Decision: NO-GO for full public operations.** Vercel confirms a production Next.js deployment READY at https://web-qtkhfzvl0-ayush-jha-nits-projects.vercel.app/ on commit `e90f20512739cc7e0e30c0ef7831effbd5fd052e`, but external read-only HTTP checks could not confirm live page responses. No working Render API + migrated Neon database + frontend production flow has been independently verified. All release profiles (preview, public-site, full-production) still require separate smoke and manual acceptance gates.

## Known verified evidence

| Area | Status | Evidence / limitation |
| --- | --- | --- |
| GitHub modules 0–16 | Green repository CI | Main GitHub Actions run [39471166905](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39471166905) |
| Module 17 deployment-readiness code | Green repository CI | [PR #16](https://github.com/ayush-jha-NIT/amplifyworld/pull/16), main run [39474494194](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39474494194) |
| Dedicated Neon | Project exists | AmplifyWorld free organization project \`lingering-pond-17105101\`, PostgreSQL 17, branch \`main\`, database \`amplifyworld\`; **read-only inspection on 21 October: no public application tables** |
| Vercel frontend | **Deployed; acceptance blocked** | Deployment `dpl_8mh98Sjazachju8MD2hJiEtNwadK` is READY on commit `e90f205`. Team-scoped project settings/logs still return HTTP 403; public smoke verification is outstanding |
| Render authorization | **Blocked** | User rejected discovered \`amplify's workspace\`; correct workspace unknown |
| Real domain | Not provided | Provider-generated domains acceptable after authorized deployment |
| Privacy, retention, public claims, sender/recipient | Not approved | Contact collection, email delivery and SEO indexing intentionally remain disabled |
| Live API readiness / admin OIDC | Unverified | No production API service or configured identity provider |
| Live end-to-end submission/email | Unverified | No real accepted-and-delivered message receipt |
| Physical-device screenshots and review | Manual signoff outstanding | CI 83 Chromium tests + screenshot evidence do not substitute for iOS Safari/Android Chrome |

## Minimum path to release

1. Retain the READY Vercel deployment. Grant the ChatGPT Vercel integration team-scoped access to project settings and runtime logs for `ayush-jha-nits-projects`; deployment metadata alone is insufficient.
2. The owner must connect and explicitly authorize the **correct Render workspace**. Do not access the previously rejected workspace.
3. Keep the existing free-plan Vercel frontend, deploy an isolated AmplifyWorld API into an explicitly approved Render workspace, and record/verify both provider URLs. Keep inquiry collection, email and indexing disabled.
4. Apply reviewed Prisma migrations **only to the dedicated Neon** via a controlled schema-owner identity, configure restricted runtime role and verify \`/api/v1/ready\`.
5. Run read-only \`deployment:smoke\`, check CORS and the code-derived noindex state. Conduct visual review on real phones.
6. Obtain lawful privacy and retention approval and configure an actual cleanup schedule before activating inquiry collection. Configure a verified Resend sender/recipient, independently scheduled worker and authenticated admin identity as separately approved. Verify actual results and set monitoring/rollback.
7. Fill a private copy of [release evidence template](RELEASE_EVIDENCE_TEMPLATE.json), verify every evidence link against the exact release SHA, then run \`pnpm release:audit full-production /path/to/evidence.json\`. The CLI reports only claimed status; human approval and live validation remain mandatory.

**No service or setting may be marked deployed, green or approved solely because code and documentation exist.** Never substitute Digimarket resources, a paid plan, invented domain or fabricated delivery data to close this checklist.
