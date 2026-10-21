import { createHash, createHmac } from "node:crypto";
import { Router } from "express";
import type { Request, Response } from "express";
import { validateInquiryPayload } from "@amplifyworld/shared/inquiry";
import { SERVICES } from "@amplifyworld/shared";
import { prismaPublicRepository } from "./repository.js";
import type { Listing, PublicRepository } from "./repository.js";

type ApiOptions = {
  repository?: PublicRepository;
  collectionEnabled?: boolean;
  retentionDays?: number;
  privacyApproved?: boolean;
  abuseSecret?: string;
};

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_BUCKETS = 5000;

function error(response: Response, status: number, code: string, message: string, fields?: object) {
  response.status(status).json({ error: { code, message, ...(fields ? { fields } : {}) } });
}
function queryParams(req: Request): Listing | null {
  const limit = req.query.limit === undefined ? 12 : Number(req.query.limit);
  const offset = req.query.offset === undefined ? 0 : Number(req.query.offset);
  const category = req.query.category;
  if (!Number.isInteger(limit) || limit < 1 || limit > 50 ||
    !Number.isInteger(offset) || offset < 0 || offset > 10_000 ||
    (category !== undefined && (typeof category !== "string" || !slug.test(category) || category.length > 120))) {
    return null;
  }
  return { limit, offset, ...(typeof category === "string" ? { category } : {}) };
}
function validSlug(value: string | undefined): value is string {
  return typeof value === "string" && value.length <= 160 && slug.test(value);
}
function retention(options: ApiOptions): number {
  return options.retentionDays ?? Number(process.env.INQUIRY_RETENTION_DAYS);
}
function collectionAvailable(options: ApiOptions): boolean {
  const days = retention(options);
  return (options.collectionEnabled ?? process.env.INQUIRY_COLLECTION_ENABLED === "true") &&
    (options.privacyApproved ?? process.env.INQUIRY_PRIVACY_POLICY_APPROVED === "true") &&
    Number.isInteger(days) && days >= 1 && days <= 365 &&
    Boolean(options.repository || process.env.DATABASE_URL) &&
    Boolean(options.repository || (options.abuseSecret ?? process.env.INQUIRY_ABUSE_HASH_SECRET ?? "").length >= 32);
}
/** Local bounded rate guard; distributed abuse controls are expanded in Module 13. */
function createLocalRateLimit() {
  const bucket = new Map<string, { count: number; until: number }>();
  return (req: Request, res: Response): boolean => {
    const now = Date.now();
    const key = req.ip || "unknown";
    let state = bucket.get(key);
    if (!state || state.until <= now) {
      if (bucket.size >= MAX_BUCKETS) {
        for (const [ip, entry] of bucket) {
          if (entry.until <= now) bucket.delete(ip);
        }
        if (bucket.size >= MAX_BUCKETS) {
          error(res, 503, "RATE_GUARD_BUSY", "Inquiry service is temporarily busy.");
          return false;
        }
      }
      state = { count: 0, until: now + 10 * 60_000 };
      bucket.set(key, state);
    }
    state.count++;
    if (state.count > 5) {
      res.setHeader("Retry-After", String(Math.max(1, Math.ceil((state.until - now) / 1000))));
      error(res, 429, "TOO_MANY_REQUESTS", "Too many inquiries. Please try later.");
      return false;
    }
    return true;
  };
}
export function createPublicRouter(options: ApiOptions = {}) {
  const router = Router();
  const repository = options.repository ?? prismaPublicRepository;
  const maySubmit = createLocalRateLimit();

  router.get("/ready", async (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    if (!options.repository && !process.env.DATABASE_URL) {
      error(res, 503, "DATABASE_UNAVAILABLE", "Database is not configured.");
      return;
    }
    try {
      await repository.ready();
      res.status(200).json({ status: "ready" });
    } catch {
      error(res, 503, "DATABASE_UNAVAILABLE", "Database is temporarily unavailable.");
    }
  });

  function list(kind: "posts" | "projects") {
    return async (req: Request, res: Response) => {
      const query = queryParams(req);
      if (!query) {
        error(res, 400, "INVALID_QUERY", "Invalid pagination or category.");
        return;
      }
      try {
        const result = kind === "posts" ? await repository.listPosts(query) : await repository.listProjects(query);
        res.status(200).json({ ...result, limit: query.limit, offset: query.offset });
      } catch {
        error(res, 503, "CONTENT_UNAVAILABLE", "Content is temporarily unavailable.");
      }
    };
  }
  function detail(kind: "posts" | "projects") {
    return async (req: Request, res: Response) => {
      if (!validSlug(req.params.slug)) {
        error(res, 400, "INVALID_SLUG", "Invalid content identifier.");
        return;
      }
      try {
        const item = kind === "posts" ? await repository.readPost(req.params.slug) : await repository.readProject(req.params.slug);
        if (!item) error(res, 404, "NOT_FOUND", "Content was not found.");
        else res.status(200).json({ item });
      } catch {
        error(res, 503, "CONTENT_UNAVAILABLE", "Content is temporarily unavailable.");
      }
    };
  }
  router.get("/posts", list("posts"));
  router.get("/posts/:slug", detail("posts"));
  router.get("/projects", list("projects"));
  router.get("/projects/:slug", detail("projects"));

  router.post("/inquiries", async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    if (process.env.CONTACT_EMAIL_DIRECT_ENABLED === "true") {
      const origin = req.get("origin");
      const allowed = (process.env.CLIENT_ORIGIN ?? "").split(",").map(x => x.trim()).filter(Boolean);
      if (!origin || !allowed.includes(origin)) {
        error(res, 403, "ORIGIN_FORBIDDEN", "This origin cannot submit inquiries.");
        return;
      }
      if (!maySubmit(req, res)) return;
      const key = req.get("idempotency-key");
      if (!key || !uuid.test(key)) {
        error(res, 400, "IDEMPOTENCY_REQUIRED", "A valid idempotency key is required.");
        return;
      }
      const validation = validateInquiryPayload(req.body);
      if (!validation.valid) {
        error(res, 422, "VALIDATION_ERROR", "Review the highlighted fields.", validation.errors);
        return;
      }
      const { name, email, phone, company, service, message } = validation.data;
      const apiKey = process.env.RESEND_API_KEY!;
      const from = process.env.RESEND_FROM_EMAIL!;
      const to = process.env.INQUIRY_NOTIFY_EMAIL!;
      const serviceLabel = SERVICES.find(item => item.id === service)?.title ?? "Not sure yet";
      const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
      const field = (label: string, value: string) =>
        '<tr><td style="padding:12px 16px;border-bottom:1px solid #e9eaf0;color:#64748b;font-size:13px;width:145px;vertical-align:top">' +
        escapeHtml(label) + '</td><td style="padding:12px 16px;border-bottom:1px solid #e9eaf0;color:#111827;font-size:14px;font-weight:600;overflow-wrap:anywhere">' +
        escapeHtml(value || "Not provided") + '</td></tr>';
      const html = [
        '<!doctype html><html><body style="margin:0;padding:32px 12px;background:#f4f5fa;font-family:Arial,Helvetica,sans-serif;color:#111827">',
        '<div style="max-width:640px;margin:auto;background:#ffffff;border:1px solid #e8eaf2;border-radius:16px;overflow:hidden">',
        '<div style="background:#171329;padding:28px 30px"><p style="color:#c5b4fa;letter-spacing:2px;font-size:11px;font-weight:bold;margin:0 0 10px">AMPLIFYWORLD · CONTACT</p>',
        '<h1 style="color:#ffffff;font-size:25px;line-height:1.25;margin:0">New business inquiry</h1>',
        '<p style="color:#cbd5e1;font-size:13px;margin:12px 0 0">A visitor has contacted you through your website.</p></div>',
        '<div style="padding:24px 24px 8px"><h2 style="font-size:15px;margin:0 0 14px;color:#4c1d95">Contact details</h2>',
        '<table role="presentation" style="border-collapse:collapse;width:100%">',
        field("Full name", name), field("Email", email), field("Phone", phone),
        field("Company", company), field("Service", serviceLabel), '</table>',
        '<h2 style="font-size:15px;margin:26px 0 12px;color:#4c1d95">Project details</h2>',
        '<div style="background:#f8f7fc;border:1px solid #ede9f7;border-radius:10px;padding:18px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.65;font-size:14px">',
        escapeHtml(message), '</div>',
        '<p style="font-size:12px;line-height:1.6;color:#64748b;margin:24px 0">Reply to this email to respond directly to the sender.</p></div>',
        '<div style="padding:16px 30px;background:#f8f7fc;color:#64748b;font-size:12px;text-align:center">AmplifyWorld · Website contact notification</div>',
        '</div></body></html>'
      ].join("");
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + apiKey,
            "Content-Type": "application/json",
            "Idempotency-Key": "amplifyworld-direct/" + key
          },
          body: JSON.stringify({
            from, to: [to], reply_to: email,
            subject: "New AmplifyWorld contact inquiry",
            html,
            text: [
              "New website inquiry", "Name: " + name, "Email: " + email,
              "Phone: " + (phone || "Not provided"),
              "Company: " + (company || "Not provided"),
              "Service: " + serviceLabel, "", "Message:", message
            ].join("\n")
          }),
          signal: AbortSignal.timeout(12000)
        });
        if (!response.ok) {
          error(res, 502, "EMAIL_PROVIDER_UNAVAILABLE", "Unable to confirm email acceptance.");
          return;
        }
        const result: unknown = await response.json();
        if (!result || typeof result !== "object" || !("id" in result) ||
          typeof result.id !== "string" || !result.id) {
          error(res, 502, "EMAIL_CONFIRMATION_MISSING", "Unable to confirm email acceptance.");
          return;
        }
        res.status(201).json({ status: "accepted", receiptId: key, notification: "provider_accepted" });
      } catch {
        error(res, 503, "EMAIL_UNAVAILABLE", "Unable to confirm email acceptance. Please retry.");
      }
      return;
    }
    if (!collectionAvailable(options)) {
      error(res, 503, "INQUIRIES_DISABLED", "Online inquiries are not available yet.");
      return;
    }
    // Browser submissions must originate from an explicitly allowed frontend.
    const origin = req.get("origin");
    const allowed = (process.env.CLIENT_ORIGIN ?? "http://localhost:3000,http://127.0.0.1:3000")
      .split(",").map(x => x.trim()).filter(Boolean);
    if ((origin && !allowed.includes(origin)) || (!origin && req.get("sec-fetch-site") === "cross-site")) {
      error(res, 403, "ORIGIN_FORBIDDEN", "This origin cannot submit inquiries.");
      return;
    }
    if (!maySubmit(req, res)) return;
    const key = req.get("idempotency-key");
    if (!key || !uuid.test(key)) {
      error(res, 400, "IDEMPOTENCY_REQUIRED", "A valid idempotency key is required.");
      return;
    }
    // Empty decoy input catches simplistic automated form fills; do not issue fake receipts.
    const input = req.body as Record<string, unknown> | null;
    if (input && typeof input === "object" && Object.prototype.hasOwnProperty.call(input, "website")) {
      if (typeof input.website !== "string" || input.website.trim() !== "") {
        res.status(204).end();
        return;
      }
    }
    const { website: _honeypot, ...raw } = input && typeof input === "object" && !Array.isArray(input)
      ? input : { website: undefined };
    void _honeypot;
    const validation = validateInquiryPayload(raw);
    if (!validation.valid) {
      error(res, 422, "VALIDATION_ERROR", "Review the highlighted fields.", validation.errors);
      return;
    }
    const payload = validation.data;
    // Canonical normalized field ordering: identical retries share the same hash.
    const body = JSON.stringify(payload);
    const hash = createHash("sha256").update(body).digest("hex");
    try {
      // HMAC stores only an opaque digest per UTC 10-minute window; no raw IP/email.
      // Absent private secret fails closed when using the real Prisma repository.
      const secret = options.abuseSecret ?? process.env.INQUIRY_ABUSE_HASH_SECRET;
      if (!options.repository && (!secret || secret.length < 32)) {
        error(res, 503, "ABUSE_GUARD_UNAVAILABLE", "Inquiry service is temporarily unavailable.");
        return;
      }
      if (secret && secret.length >= 32 && repository.consumeInquiryBudget) {
        const block = Math.floor(Date.now() / 600_000);
        const digest = createHmac("sha256", secret).update(String(block) + ":" + (req.ip ?? "unknown")).digest("hex");
        if (!await repository.consumeInquiryBudget(digest)) {
          res.setHeader("Retry-After", "600");
          error(res, 429, "TOO_MANY_REQUESTS", "Too many inquiries. Please try later.");
          return;
        }
      }
      const outcome = await repository.writeInquiry(payload, key, hash, retention(options));
      if ("conflict" in outcome) {
        error(res, 409, "IDEMPOTENCY_CONFLICT", "This retry key was used for different details.");
        return;
      }
      // Acknowledgement follows the awaited durable write only.
      res.status(outcome.created ? 201 : 200).json({
        status: "accepted", receiptId: outcome.id, duplicate: !outcome.created,
        notification: outcome.notification ?? "not_requested"
      });
    } catch {
      // Never expose raw driver errors, SQL, credentials, or submitted PII.
      error(res, 503, "INQUIRY_UNAVAILABLE", "Unable to confirm receipt. Retry using the same key.");
    }
  });

  return router;
}
