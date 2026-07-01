#!/usr/bin/env bun
/**
 * run-lighthouse.ts — Lighthouse CI com Chromium do Playwright.
 * URLs coletadas automaticamente de dist/ (todas as páginas públicas).
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  discoverDistRoutes,
  routeToDistUrl,
} from "../testing/discover-routes.ts";
import { resolvePlaywrightChromium } from "../testing/playwright-chrome.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST_INDEX = path.join(ROOT, "dist/index.html");

function resolveChromePath(): string {
  const playwrightChrome = resolvePlaywrightChromium();
  if (playwrightChrome) return playwrightChrome;

  console.error(
    "Chrome/Chromium não encontrado. Instale com:\n  bunx playwright install chromium",
  );
  process.exit(1);
}

async function ensureBuild(): Promise<void> {
  if (process.env.SKIP_BUILD === "1" || existsSync(DIST_INDEX)) return;

  console.log("▶ Build...");
  const build = Bun.spawn([process.execPath, "run", "build"], {
    cwd: ROOT,
    stdout: "inherit",
    stderr: "inherit",
  });
  if ((await build.exited) !== 0) process.exit(1);
}

function buildLighthouseConfig(): string {
  const routes = discoverDistRoutes(ROOT);
  const urls = routes.map(routeToDistUrl);

  console.log(`▶ Lighthouse em ${urls.length} rota(s): ${routes.join(", ")}`);

  const basePath = path.join(ROOT, "lighthouserc.json");
  const baseConfig = JSON.parse(readFileSync(basePath, "utf8")) as {
    ci: { collect: Record<string, unknown> };
  };

  baseConfig.ci.collect.url = urls;

  const generatedPath = path.join(ROOT, ".lighthouserc.generated.json");
  writeFileSync(generatedPath, `${JSON.stringify(baseConfig, null, 2)}\n`);
  return generatedPath;
}

await ensureBuild();

const chromePath = resolveChromePath();
const configPath = buildLighthouseConfig();
const lhciBin = path.join(ROOT, "node_modules/.bin/lhci");

console.log(`▶ Lighthouse CI (Chrome: ${chromePath})`);

const result = Bun.spawnSync([lhciBin, "autorun", `--config=${configPath}`], {
  cwd: ROOT,
  env: { ...process.env, CHROME_PATH: chromePath },
  stdout: "inherit",
  stderr: "inherit",
});

process.exit(result.exitCode ?? 1);
