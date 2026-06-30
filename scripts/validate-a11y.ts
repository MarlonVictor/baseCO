#!/usr/bin/env bun
/**
 * validate-a11y.ts — pa11y-ci contra o site buildado (preview local).
 */

import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PREVIEW_URL = 'http://localhost:4322';
const PREVIEW_PORT = 4322;
const DIST_INDEX = path.join(ROOT, 'dist/index.html');

function findPlaywrightChromium(): string | undefined {
  const base = path.join(process.env.HOME ?? '', '.cache/ms-playwright');
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

async function waitForServer(url: string, timeoutMs = 60_000): Promise<void> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // servidor ainda não disponível
    }
    await Bun.sleep(500);
  }

  throw new Error(`Servidor não respondeu em ${url} após ${timeoutMs}ms`);
}

async function main(): Promise<void> {
  const skipBuild = process.env.SKIP_BUILD === '1' || existsSync(DIST_INDEX);

  if (!skipBuild) {
    console.log('▶ Build...');
    const build = Bun.spawn([process.execPath, 'run', 'build'], {
      cwd: ROOT,
      stdout: 'inherit',
      stderr: 'inherit',
    });
    if ((await build.exited) !== 0) process.exit(1);
  } else {
    console.log('▶ Usando build existente (dist/index.html presente)');
  }

  console.log('▶ Iniciando preview...');
  const preview = Bun.spawn([process.execPath, 'run', 'preview', '--', '--port', String(PREVIEW_PORT)], {
    cwd: ROOT,
    stdout: 'pipe',
    stderr: 'pipe',
  });

  try {
    await waitForServer(PREVIEW_URL);

    console.log('▶ Executando pa11y-ci...');
    const pa11yConfig = path.join(ROOT, '.pa11yci.json');
    const pa11yBin = path.join(ROOT, 'node_modules/.bin/pa11y-ci');
    const chromePath = process.env.CHROME_PATH ?? findPlaywrightChromium();

    const pa11y = Bun.spawn([pa11yBin, '--config', pa11yConfig], {
      cwd: ROOT,
      stdout: 'inherit',
      stderr: 'inherit',
      env: {
        ...process.env,
        ...(chromePath ? { CHROME_PATH: chromePath, PUPPETEER_EXECUTABLE_PATH: chromePath } : {}),
      },
    });

    const code = await pa11y.exited;
    if (code !== 0) process.exit(code);
    console.log('✓ pa11y-ci passou sem erros');
  } finally {
    preview.kill();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
