import { chromium } from "playwright";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = (process.env.VP10_BASE_URL || "https://fokhara.vercel.app").replace(/\/$/, "");
const OUTPUT_ROOT = path.resolve("visual-review", "vp10");

const routes = [
  { id: "home", path: "/" },
  { id: "shop", path: "/shop" },
  { id: "collections", path: "/collections" },
  { id: "collection-nebula", path: "/collections/nebula" },
  { id: "product-nebula", path: "/shop/nebula-espresso-cup" },
  { id: "workshops", path: "/workshops" },
  {
    id: "workshop-handbuilding",
    path: "/workshops/handbuilding-pottery-workshop"
  },
  {
    id: "booking-handbuilding",
    path: "/book/handbuilding-pottery-workshop"
  },
  { id: "studio", path: "/studio" },
  { id: "visit", path: "/visit" },
  { id: "cart", path: "/cart" },
  { id: "workshop-policies", path: "/policies/workshops" }
];

const profiles = [
  {
    id: "desktop",
    viewport: { width: 1440, height: 1000 },
    isMobile: false,
    hasTouch: false
  },
  {
    id: "mobile",
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  }
];

await rm(OUTPUT_ROOT, { recursive: true, force: true });
await mkdir(OUTPUT_ROOT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const manifest = {
  generatedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  routes: [],
  profiles
};

for (const profile of profiles) {
  const profileDir = path.join(OUTPUT_ROOT, profile.id);
  await mkdir(profileDir, { recursive: true });

  const context = await browser.newContext({
    viewport: profile.viewport,
    deviceScaleFactor: 1,
    isMobile: profile.isMobile,
    hasTouch: profile.hasTouch,
    colorScheme: "light",
    reducedMotion: "no-preference"
  });

  for (const route of routes) {
    const page = await context.newPage();
    const pageErrors = [];
    const consoleErrors = [];
    const failedRequests = [];

    page.on("pageerror", (error) => {
      pageErrors.push(String(error?.message || error));
    });

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("requestfailed", (request) => {
      failedRequests.push({
        url: request.url(),
        error: request.failure()?.errorText || "request failed"
      });
    });

    const url = BASE_URL + route.path;
    const startedAt = Date.now();

    try {
      const response = await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 45_000
      });

      await page
        .waitForFunction(
          () => !document.fonts || document.fonts.status === "loaded",
          undefined,
          { timeout: 12_000 }
        )
        .catch(() => {});

      await page
        .waitForFunction(
          () =>
            Array.from(document.images).every(
              (image) => image.complete && image.naturalWidth > 0
            ),
          undefined,
          { timeout: 18_000 }
        )
        .catch(() => {});

      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(650);

      const metrics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const clientWidth = root.clientWidth;
        const scrollWidth = Math.max(root.scrollWidth, body?.scrollWidth || 0);

        return {
          title: document.title,
          clientWidth,
          scrollWidth,
          horizontalOverflow: Math.max(0, scrollWidth - clientWidth),
          scrollHeight: Math.max(root.scrollHeight, body?.scrollHeight || 0),
          headerHeight:
            document.querySelector(".siteHeader")?.getBoundingClientRect().height ??
            null,
          mainHeight:
            document.querySelector("main")?.getBoundingClientRect().height ?? null
        };
      });

      const foldPath = path.join(profileDir, `${route.id}__fold.png`);
      const fullPath = path.join(profileDir, `${route.id}__full.png`);

      await page.screenshot({
        path: foldPath,
        fullPage: false,
        animations: "disabled"
      });

      await page.screenshot({
        path: fullPath,
        fullPage: true,
        animations: "disabled"
      });

      manifest.routes.push({
        id: route.id,
        path: route.path,
        url,
        profile: profile.id,
        status: response?.status() ?? null,
        ok: response?.ok() ?? null,
        captureMs: Date.now() - startedAt,
        screenshots: {
          fold: path.relative(OUTPUT_ROOT, foldPath).replaceAll("\\", "/"),
          full: path.relative(OUTPUT_ROOT, fullPath).replaceAll("\\", "/")
        },
        metrics,
        pageErrors,
        consoleErrors,
        failedRequests
      });

      console.log(
        `[VP10] ${profile.id.padEnd(7)} ${route.id.padEnd(22)} status=${response?.status() ?? "?"} overflow=${metrics.horizontalOverflow}px`
      );
    } catch (error) {
      manifest.routes.push({
        id: route.id,
        path: route.path,
        url,
        profile: profile.id,
        ok: false,
        captureMs: Date.now() - startedAt,
        error: error instanceof Error ? error.message : String(error),
        pageErrors,
        consoleErrors,
        failedRequests
      });

      console.error(
        `[VP10] FAILED ${profile.id} ${route.id}: ${error instanceof Error ? error.message : error}`
      );
    } finally {
      await page.close();
    }
  }

  await context.close();
}

await browser.close();

const manifestPath = path.join(OUTPUT_ROOT, "manifest.json");
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

const failures = manifest.routes.filter((entry) => entry.ok === false);
const overflow = manifest.routes.filter(
  (entry) => (entry.metrics?.horizontalOverflow || 0) > 1
);

console.log("");
console.log(`VP10 capture complete: ${OUTPUT_ROOT}`);
console.log(`Entries: ${manifest.routes.length}`);
console.log(`Failures: ${failures.length}`);
console.log(`Horizontal-overflow flags: ${overflow.length}`);
console.log("Manifest: visual-review/vp10/manifest.json");

if (failures.length > 0) {
  process.exitCode = 1;
}
