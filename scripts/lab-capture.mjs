import { chromium } from "playwright";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = (process.env.LAB_BASE_URL || "http://127.0.0.1:3200").replace(/\/$/, "");
const OUTPUT_ROOT = path.resolve("visual-review", "lab");

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
  profiles,
  shots: []
};

async function waitForVisualReady(page) {
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
        Array.from(document.images)
          .filter((image) => image.getBoundingClientRect().top < window.innerHeight * 1.25)
          .every((image) => image.complete && image.naturalWidth > 0),
      undefined,
      { timeout: 15_000 }
    )
    .catch(() => {});

  await page.waitForTimeout(350);
}

async function recordShot(page, profileDir, profileId, id, note) {
  const filePath = path.join(profileDir, `${id}.png`);
  const metrics = await page.evaluate(() => ({
    scrollY: window.scrollY,
    scrollHeight: Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight || 0
    ),
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: Math.max(
      document.documentElement.scrollWidth,
      document.body?.scrollWidth || 0
    )
  }));

  await page.screenshot({
    path: filePath,
    fullPage: false,
    animations: "allow"
  });

  manifest.shots.push({
    id,
    profile: profileId,
    note,
    path: path.relative(OUTPUT_ROOT, filePath).replaceAll("\\", "/"),
    url: page.url(),
    metrics: {
      ...metrics,
      horizontalOverflow: Math.max(0, metrics.scrollWidth - metrics.clientWidth)
    }
  });
}

async function open(page, route) {
  const response = await page.goto(BASE_URL + route, {
    waitUntil: "domcontentloaded",
    timeout: 45_000
  });

  await waitForVisualReady(page);

  return response;
}

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

  // 00 — Lab index
  {
    const page = await context.newPage();
    await open(page, "/lab");
    await recordShot(
      page,
      profileDir,
      profile.id,
      "00-lab-index",
      "Lab index before evaluating any experiment"
    );
    await page.close();
  }

  // 01 — Material Memory: static → interaction trace
  {
    const page = await context.newPage();
    await open(page, "/lab/material-memory");
    await recordShot(
      page,
      profileDir,
      profile.id,
      "01-material-memory-initial",
      "Material field before pointer input"
    );

    const vp = page.viewportSize();
    if (vp) {
      const points = [
        [0.24, 0.38],
        [0.31, 0.44],
        [0.39, 0.49],
        [0.47, 0.44],
        [0.54, 0.37]
      ];

      await page.mouse.move(vp.width * points[0][0], vp.height * points[0][1]);
      await page.mouse.down();

      for (const [x, y] of points.slice(1)) {
        await page.mouse.move(vp.width * x, vp.height * y, { steps: 7 });
      }

      await page.mouse.up();
      await page.waitForTimeout(90);
    }

    await recordShot(
      page,
      profileDir,
      profile.id,
      "01-material-memory-trace",
      "Material field immediately after a pressed pointer gesture"
    );

    await page.waitForTimeout(1200);

    await recordShot(
      page,
      profileDir,
      profile.id,
      "01-material-memory-settling",
      "Trace during finite decay"
    );

    await page.close();
  }

  // 02 — Carry Becomes Space: source → travel → target
  {
    const page = await context.newPage();
    await open(page, "/lab/carry-space");

    await recordShot(
      page,
      profileDir,
      profile.id,
      "02-carry-source",
      "Spatial carry before interaction"
    );

    const trigger = page.getByRole("button", { name: "Carry this object" });
    await trigger.click();

    await page.waitForTimeout(300);
    await recordShot(
      page,
      profileDir,
      profile.id,
      "02-carry-travel",
      "Object during spatial travel"
    );

    await page.waitForTimeout(720);
    await recordShot(
      page,
      profileDir,
      profile.id,
      "02-carry-target",
      "Object after recomposition at target"
    );

    await page.close();
  }

  // 03 — Kiln Threshold: four scroll states
  {
    const page = await context.newPage();
    await open(page, "/lab/kiln-threshold");

    const stages = [
      ["soft", 0.02],
      ["hold", 0.29],
      ["surface", 0.56],
      ["settle", 0.84]
    ];

    for (const [name, ratio] of stages) {
      await page.evaluate((scrollRatio) => {
        const max = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );
        window.scrollTo(0, max * scrollRatio);
      }, ratio);
      await page.waitForTimeout(520);

      await recordShot(
        page,
        profileDir,
        profile.id,
        `03-kiln-${name}`,
        `Kiln Threshold at ${name} state`
      );
    }

    await page.close();
  }

  // 04 — Collection Inheritance: choice → arrival → settle
  {
    const page = await context.newPage();
    await open(page, "/lab/collection-inheritance");

    await recordShot(
      page,
      profileDir,
      profile.id,
      "04-inheritance-choice",
      "Collection inheritance before selecting a surface"
    );

    const nebula = page.getByRole("link", { name: /Nebula/i }).first();
    await Promise.all([
      page.waitForURL(/\/lab\/collection-inheritance\/nebula/, {
        timeout: 20_000
      }),
      nebula.click()
    ]);

    await waitForVisualReady(page);
    await page.waitForTimeout(80);

    await recordShot(
      page,
      profileDir,
      profile.id,
      "04-inheritance-arrival",
      "Inherited material field immediately after route navigation"
    );

    await page.waitForTimeout(1050);

    await recordShot(
      page,
      profileDir,
      profile.id,
      "04-inheritance-settled",
      "Destination after inherited state contracts into a quiet edge"
    );

    await page.close();
  }

  // 05 — Studio Contact Sheet: opening → middle evidence state
  {
    const page = await context.newPage();
    await open(page, "/lab/studio-contact-sheet");

    await recordShot(
      page,
      profileDir,
      profile.id,
      "05-studio-contact-opening",
      "Contact sheet opening composition"
    );

    await page.evaluate(() => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      window.scrollTo(0, max * 0.48);
    });
    await page.waitForTimeout(600);

    await recordShot(
      page,
      profileDir,
      profile.id,
      "05-studio-contact-middle",
      "Contact sheet while a mid-sequence real image is active"
    );

    await page.evaluate(() => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      window.scrollTo(0, max * 0.78);
    });
    await page.waitForTimeout(600);

    await recordShot(
      page,
      profileDir,
      profile.id,
      "05-studio-contact-late",
      "Contact sheet late-sequence composition"
    );

    await page.close();
  }

  await context.close();
}

await browser.close();

const overflows = manifest.shots.filter(
  (shot) => shot.metrics.horizontalOverflow > 1
);

manifest.summary = {
  shotCount: manifest.shots.length,
  overflowCount: overflows.length
};

await writeFile(
  path.join(OUTPUT_ROOT, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);

console.log("");
console.log(`Lab capture complete: ${OUTPUT_ROOT}`);
console.log(`Shots: ${manifest.shots.length}`);
console.log(`Horizontal-overflow flags: ${overflows.length}`);
console.log("Manifest: visual-review/lab/manifest.json");
