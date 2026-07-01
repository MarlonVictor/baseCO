/**
 * Resolve o executável do Chromium instalado pelo Playwright.
 * Preferir esta função em vez de caminhos hardcoded (chrome-linux vs chrome-linux64).
 */

import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";

export function resolvePlaywrightChromium(): string | undefined {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const executablePath = chromium.executablePath();
  return existsSync(executablePath) ? executablePath : undefined;
}
