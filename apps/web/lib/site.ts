/**
 * Use the official AmplifyWorld domain on production so the sitemap and
 * canonical metadata never silently disappear when optional env vars are absent.
 * Preview and development deployments remain nonindexable.
 */
export function siteOrigin(env: Partial<NodeJS.ProcessEnv> = process.env): URL | null {
  if (env.VERCEL_ENV === "preview" || env.VERCEL_ENV === "development" ||
      env.SITE_INDEXING_ENABLED === "false") return null;
  // Render the official canonical URLs in production even when the optional
  // indexing flag and URL variable have not been configured in Vercel.
  const raw = env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (env.VERCEL_ENV === "production" ? "https://amplifyworld.in" : "");
  if (!raw || raw.length > 300) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password ||
        url.search || url.hash || url.pathname !== "/" ||
        !url.hostname.includes(".") || url.hostname === "localhost") return null;
    return url;
  } catch {
    return null;
  }
}
export function absolutePublicUrl(path = "/", env: Partial<NodeJS.ProcessEnv> = process.env): string | null {
  const origin = siteOrigin(env);
  if (!origin || !path.startsWith("/") || path.startsWith("//") || path.includes("?") || path.includes("#")) return null;
  return new URL(path, origin).href;
}
export const marketingRoutes = ["/", "/about", "/contact"] as const;

export function structuredEntity(json: Record<string, unknown>) {
  // JSON-LD is first-party server-owned data; escape HTML-sensitive characters.
  return JSON.stringify(json).replace(/</g, "\\u003c");
}
export function marketingWebPage(path: (typeof marketingRoutes)[number], title: string, description: string) {
  const url = absolutePublicUrl(path);
  const root = absolutePublicUrl("/");
  if (!url || !root) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url + "#webpage",
    url, name: title, description,
    isPartOf: { "@id": root + "#website" },
    inLanguage: "en"
  };
}
