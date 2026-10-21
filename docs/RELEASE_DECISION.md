# AmplifyWorld Release Decision (as of 21 October 2026)

**Decision: NO-GO for full public operations.** A READY Vercel production deployment is verified at https://web-ayush-jha-nits-projects.vercel.app/ on commit `a34866f494308eb9f81901618194abf856c2c5f4`, with successful anonymous public-route smoke checks ([GitHub Actions run 39554839166](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39554839166)). The public frontend is reachable, but Render API deployment, dedicated Neon schema migrations, identity, privacy/retention, message delivery and full operational acceptance remain blocked or unverified.

## Known verified evidence

| Area | Status | Evidence / limitation |
| --- | --- | --- |
| GitHub modules 0–16 | Green repository CI | Main GitHub Actions run [39471166905](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39471166905) |
| Module 17 deployment-readiness code | Green repository CI | [PR #16](https://github.com/ayush-jha-NIT/amplifyworld/pull/16), main run [39474494194](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39474494194) |
| Dedicated Neon | Project exists | AmplifyWorld free organization project \`lingering-pond-17105101\`, PostgreSQL 17, branch \`main\`, database \`amplifyworld\`; **read-only inspection on 21 October: no public application tables** |
| Vercel frontend | **READY; public smoke passed** | Latest Git SHA `a34866f`; production URL https://web-ayush-jha-nits-projects.vercel.app/; anonymous GETs of seven routes, branding, noindex, header and authentication checks passed [smoke run 39554839166](https://github.com/ayush-jha-NIT/amplifyworld/actions/runs/39554839166). Vercel SSO protection is preview-only; product runtime logs remain inaccessible through the connector |
| Render authorization | **Blocked** | User rejected discovered \`amplify's workspace\`; correct workspace unknown |
| Real domain | Not provided | Provider-generated domains acceptable after authorized deployment |
| Privacy, retention, public claims, sender/recipient | Not approved | Contact collection, email delivery and SEO indexing intentionally remain disabled |
| Live API readiness / admin OIDC | Unverified | No production API service or configured identity provider |
| Live end-to-end submission/email | Unverified | No real accepted-and-delivered message receipt |
| Physical-device screenshots and review | Manual signoff outstanding | CI 83 Chromium tests + screenshot evidence do not substitute for iOS Safari/Android Chrome |

## Minimum path to release

1. Retain the existing READY Vercel production deployment and preview-only SSO protection. Independently perform manual mobile/browser review and plan practical runtime monitoring; do not mistake a passing anonymous HTTP smoke check for complete release acceptance.
2. The owner must connect and explicitly authorize the **correct Render workspace**. Do not access the previously rejected workspace.
3. Keep the existing free-plan Vercel frontend, deploy an isolated AmplifyWorld API into an explicitly approved Render workspace, and record/verify both provider URLs. Keep inquiry collection, email and indexing disabled.
4. Apply reviewed Prisma migrations **only to the dedicated Neon** via a controlled schema-owner identity, configure restricted runtime role and verify \`/api/v1/ready\`.
5. Once the API exists, run read-only `deployment:smoke` against the real frontend/API origins, check CORS and database readiness, then complete physical-phone visual review and approved synthetic transactions.
6. Obtain lawful privacy and retention approval and configure an actual cleanup schedule before activating inquiry collection. Configure a verified Resend sender/recipient, independently scheduled worker and authenticated admin identity as separately approved. Verify actual results and set monitoring/rollback.
7. Fill a private copy of [release evidence template](RELEASE_EVIDENCE_TEMPLATE.json), verify every evidence link against the exact release SHA, then run \`pnpm release:audit full-production /path/to/evidence.json\`. The CLI reports only claimed status; human approval and live validation remain mandatory.

**No service or setting may be marked deployed, green or approved solely because code and documentation exist.** Never substitute Digimarket resources, a paid plan, invented domain or fabricated delivery data to close this checklist.
