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
  interactions: [],
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

      // Let client-only states such as Cart hydrate before visual evidence.
      await page
        .waitForFunction(
          () => !document.body.innerText.includes("Loading your cart"),
          undefined,
          { timeout: 10_000 }
        )
        .catch(() => {});

      // First-fold media only.
      await page
        .waitForFunction(
          () =>
            Array.from(document.images)
              .filter((image) => image.getBoundingClientRect().top < window.innerHeight * 1.2)
              .every((image) => image.complete && image.naturalWidth > 0),
          undefined,
          { timeout: 12_000 }
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

      // Sweep through the document so native lazy-loaded images actually enter
      // the viewport before the full-page evidence is recorded.
      await page.evaluate(async () => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const maxY = Math.max(
          document.documentElement.scrollHeight,
          document.body?.scrollHeight || 0
        );
        const step = Math.max(320, Math.round(window.innerHeight * 0.72));

        for (let y = 0; y < maxY; y += step) {
          window.scrollTo(0, y);
          await sleep(120);
        }

        window.scrollTo(0, maxY);
        await sleep(500);
      });

      await page
        .waitForFunction(
          () =>
            Array.from(document.images).every(
              (image) => image.complete && image.naturalWidth > 0
            ),
          undefined,
          { timeout: 20_000 }
        )
        .catch(() => {});

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

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

  // LAB SYNTHESIS — capture the accepted interaction ideas inside real routes.
  // These are evidence-only captures; they do not change the production state.

  // Collection memory: selected surface → inherited arrival trace → settled edge.
  {
    const page = await context.newPage();
    await page.goto(BASE_URL + "/collections", {
      waitUntil: "domcontentloaded",
      timeout: 45_000
    });
    await page.waitForTimeout(700);

    const nebula = page.getByRole("link", { name: /Nebula/i }).first();
    await Promise.all([
      page.waitForURL(/\/collections\/nebula/, { timeout: 20_000 }),
      nebula.click()
    ]);

    const arriving = page.locator(
      '.collectionDetail[data-inherited="true"][data-arrival-phase="arrived"]'
    );

    await arriving.waitFor({ state: "visible", timeout: 8_000 }).catch(() => {});
    await page.waitForTimeout(80);

    const arrivalPath = path.join(
      profileDir,
      "interaction__collection-arrival.png"
    );
    await page.screenshot({
      path: arrivalPath,
      fullPage: false,
      animations: "allow"
    });

    await page.waitForTimeout(1200);

    const settledPath = path.join(
      profileDir,
      "interaction__collection-settled.png"
    );
    await page.screenshot({
      path: settledPath,
      fullPage: false,
      animations: "allow"
    });

    manifest.interactions.push({
      id: "collection-memory",
      profile: profile.id,
      screenshots: {
        arrival: path.relative(OUTPUT_ROOT, arrivalPath).replaceAll("\\", "/"),
        settled: path.relative(OUTPUT_ROOT, settledPath).replaceAll("\\", "/")
      },
      url: page.url()
    });

    await page.close();
  }

  // Carry: source lift → route recomposition → settled product.
  {
    const page = await context.newPage();
    await page.goto(BASE_URL + "/collections/nebula", {
      waitUntil: "domcontentloaded",
      timeout: 45_000
    });
    await page.waitForTimeout(700);

    const product = page.locator(".collectionProduct").first();
    await product.scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);

    await product.click();
    await page.waitForTimeout(36);

    const liftPath = path.join(profileDir, "interaction__carry-lift.png");
    await page.screenshot({
      path: liftPath,
      fullPage: false,
      animations: "allow"
    });

    await page.waitForURL(/\/shop\//, { timeout: 20_000 });
    await page
      .locator('.carryOverlay[data-phase="recomposing"]')
      .waitFor({ state: "visible", timeout: 6_000 })
      .catch(() => {});
    await page.waitForTimeout(90);

    const recomposePath = path.join(
      profileDir,
      "interaction__carry-recompose.png"
    );
    await page.screenshot({
      path: recomposePath,
      fullPage: false,
      animations: "allow"
    });

    await page.waitForTimeout(760);

    const settledPath = path.join(
      profileDir,
      "interaction__carry-settled.png"
    );
    await page.screenshot({
      path: settledPath,
      fullPage: false,
      animations: "allow"
    });

    manifest.interactions.push({
      id: "carry-micro-depth",
      profile: profile.id,
      screenshots: {
        lift: path.relative(OUTPUT_ROOT, liftPath).replaceAll("\\", "/"),
        recompose: path.relative(OUTPUT_ROOT, recomposePath).replaceAll("\\", "/"),
        settled: path.relative(OUTPUT_ROOT, settledPath).replaceAll("\\", "/")
      },
      url: page.url()
    });

    await page.close();
  }

  // Studio: real-image composition at the opening and mid-sequence.
  {
    const page = await context.newPage();
    await page.goto(BASE_URL + "/studio", {
      waitUntil: "domcontentloaded",
      timeout: 45_000
    });
    await page.waitForTimeout(700);

    const frames = page.locator(".studioEvidence__frame");

    if ((await frames.count()) > 0) {
      await frames.first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);

      const openingPath = path.join(
        profileDir,
        "interaction__studio-evidence-opening.png"
      );
      await page.screenshot({
        path: openingPath,
        fullPage: false,
        animations: "disabled"
      });

      const middle = frames.nth(Math.min(2, (await frames.count()) - 1));
      await middle.scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);

      const middlePath = path.join(
        profileDir,
        "interaction__studio-evidence-middle.png"
      );
      await page.screenshot({
        path: middlePath,
        fullPage: false,
        animations: "disabled"
      });

      manifest.interactions.push({
        id: "studio-evidence",
        profile: profile.id,
        screenshots: {
          opening: path.relative(OUTPUT_ROOT, openingPath).replaceAll("\\", "/"),
          middle: path.relative(OUTPUT_ROOT, middlePath).replaceAll("\\", "/")
        },
        url: page.url()
      });
    }

    await page.close();
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
