import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

test("Portfolio has a real page, approved hero and server metadata", () => {
  const page = read("app/portfolio/page.tsx");
  for (const token of ["export const metadata", "<PortfolioGallery />", "portfolio-hero", "Projects", "/contact", "portfolio-process", "portfolio-final-cta"]) {
    assert.ok(page.includes(token), token);
  }
  assert.ok(!page.includes("PageFrame"));
});

test("Filtering, search, empty reset, arrows, indicators and mini rail are interactive", () => {
  const source = read("components/portfolio/portfolio-gallery.tsx");
  for (const token of ["useMemo(", "project.category !== category", "type=\"search\"", "setSearch(", "aria-pressed", "Previous project", "Next project", "goTo(", "portfolio-mini-rail", "Clear filters", "portfolio-empty"]) {
    assert.ok(source.includes(token), token);
  }
});

test("Carousel uses horizontal gesture threshold without hijacking vertical scroll", () => {
  const source = read("components/portfolio/portfolio-gallery.tsx");
  for (const token of ["onTouchStart", "onTouchEnd", "Math.abs(deltaX) >= 60", "Math.abs(deltaY) * 1.3", "ArrowLeft", "ArrowRight", 'aria-roledescription="carousel"']) {
    assert.ok(source.includes(token), token);
  }
});

test("Native detail dialog dismisses with Escape and restores focus", () => {
  const source = read("components/portfolio/portfolio-gallery.tsx");
  for (const token of ["<dialog", ".showModal()", ".close()", "onClose={finishDialog}", "opener.focus()", "aria-labelledby", "autoFocus"]) {
    assert.ok(source.includes(token), token);
  }
});

test("Seven live project entries include bundled screenshots and secure external links", () => {
 const data = read("components/portfolio/portfolio-data.ts");
 const gallery = read("components/portfolio/portfolio-gallery.tsx");
 const entries = [
  [
    "style-club",
    "https://www.styleclub.fashion/"
  ],
  [
    "big-mos",
    "https://big-mos.vercel.app/"
  ],
  [
    "bar-code",
    "https://www.thebarcode.in/"
  ],
  [
    "casa-de-grande",
    "https://www.thecasahotel.in/"
  ],
  [
    "ignited-brains",
    "https://www.ignitedbrain.in/"
  ],
  [
    "rovauto",
    "https://www.rovauto.com/"
  ],
  [
    "lotus-family-dental",
    "https://lotusfamilydental.me/"
  ]
];
 for(const [slug, url] of entries){
   assert.ok(data.includes('"id": "' + slug + '"'), slug);
   assert.ok(data.includes('"websiteUrl": "' + url + '"'), url);
   const image = new URL("public/portfolio/" + slug + ".webp", root);
   assert.ok(existsSync(image), slug + " screenshot missing");
   const bytes = readFileSync(image);
   assert.equal(bytes.toString("ascii",0,4),"RIFF");
   assert.equal(bytes.toString("ascii",8,12),"WEBP");
 }
 assert.equal((data.match(/"status": "Live Website"/g) || []).length,7);
 assert.ok(!data.includes("Concept / Placeholder"));
 assert.match(gallery,/Visit Live Website/);
 assert.match(gallery,/noopener noreferrer/);
});

test("Responsive 3D carousel supports reduced-motion and missing-media/loading fallback", () => {
  const css = read("app/globals.css");
  for (const selector of [".portfolio-card-active", ".portfolio-card-next", ".portfolio-card-previous", ".portfolio-mini-rail", ".portfolio-detail-dialog", ".portfolio-media-unavailable", "@media (prefers-reduced-motion: reduce)"]) {
    assert.ok(css.includes(selector), selector);
  }
  assert.ok(existsSync(new URL("app/portfolio/loading.tsx", root)));
  assert.match(read("components/portfolio/portfolio-gallery.tsx"), /onError=\{\(\) => setFailed\(true\)\}/);
});
