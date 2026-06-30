#!/usr/bin/env bun
/**
 * run-lighthouse.ts — Lighthouse CI com Chromium do Playwright.
 */

import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function findPlaywrightChromium(): string | undefined {
  const base = path.join(homedir(), '.cache/ms-playwright');
  if (!existsSync(base)) return undefined;

  const versions = readdirSync(base)
    .filter((name) => name.startsWith('chromium-'))
    .sort()
    .reverse();

  for (const version of versions) {
    const candidate = path.join(base, version, 'chrome-linux/chrome');
    if (existsSync(candidate)) return candidate;
  }

  return undefined;
}

function resolveChromePath(): string {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const playwrightChrome = findPlaywrightChromium();
  if (playwrightChrome) return playwrightChrome;

  console.error(
    'Chrome/Chromium não encontrado. Instale com:\n  bunx playwright install chromium',
  );
  process.exit(1);
}

const chromePath = resolveChromePath();
const lhciBin = path.join(ROOT, 'node_modules/.bin/lhci');

console.log(`▶ Lighthouse CI (Chrome: ${chromePath})`);

const result = Bun.spawnSync([lhciBin, 'autorun'], {
  cwd: ROOT,
  env: { ...process.env, CHROME_PATH: chromePath },
  stdout: 'inherit',
  stderr: 'inherit',
});

process.exit(result.exitCode ?? 1);
