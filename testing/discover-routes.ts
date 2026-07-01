/**
 * discover-routes.ts — rotas estáticas públicas para testes e quality gates.
 *
 * Ignora: pastas/arquivos com `_`, rotas dinâmicas `[param]`, `/admin`.
 */

import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = path.resolve(MODULE_DIR, "..");

const SKIP_DIRS = new Set(["admin", "_assets", "assets"]);

function isDynamicSegment(name: string): boolean {
  return name.includes("[") || name.includes("]");
}

function normalizeRoute(route: string): string {
  const cleaned = route.replace(/\/+/g, "/");
  return cleaned || "/";
}

/**
 * Descobre rotas a partir de `src/pages/` (rotas estáticas Astro).
 */
export function discoverSourceRoutes(rootDir = PROJECT_ROOT): string[] {
  const pagesDir = path.join(rootDir, "src/pages");
  if (!existsSync(pagesDir)) return ["/"];

  const routes: string[] = [];

  function walk(dir: string, prefix: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const { name } = entry;
      if (name.startsWith("_") || isDynamicSegment(name)) continue;

      const abs = path.join(dir, name);

      if (entry.isDirectory()) {
        const route = normalizeRoute(`${prefix}/${name}`);
        if (existsSync(path.join(abs, "index.astro"))) {
          routes.push(route);
        }
        walk(abs, route);
        continue;
      }

      if (!name.endsWith(".astro") || isDynamicSegment(name)) continue;

      if (name === "index.astro") {
        routes.push(prefix || "/");
      } else {
        const slug = name.replace(/\.astro$/, "");
        routes.push(normalizeRoute(prefix ? `${prefix}/${slug}` : `/${slug}`));
      }
    }
  }

  walk(pagesDir, "");
  return [...new Set(routes)].sort();
}

/**
 * Descobre rotas a partir de `dist/` após `astro build`.
 */
export function discoverDistRoutes(rootDir = PROJECT_ROOT): string[] {
  const distDir = path.join(rootDir, "dist");
  if (!existsSync(distDir)) return ["/"];

  const routes: string[] = [];

  if (existsSync(path.join(distDir, "index.html"))) {
    routes.push("/");
  }

  function walk(dir: string, routePrefix: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;

      const { name } = entry;
      if (SKIP_DIRS.has(name) || name.startsWith(".") || name.startsWith("_"))
        continue;

      const childDir = path.join(dir, name);
      const route = normalizeRoute(`${routePrefix}/${name}`);

      if (existsSync(path.join(childDir, "index.html"))) {
        routes.push(route);
      }

      walk(childDir, route);
    }
  }

  walk(distDir, "");
  return [...new Set(routes)].sort();
}

/** Converte rota pública em URL relativa de HTML no `dist/` (Lighthouse CI). */
export function routeToDistUrl(route: string): string {
  if (route === "/") return "http://localhost/index.html";
  return `http://localhost${route}/index.html`;
}

/** Converte rota pública em URL de preview local (pa11y / e2e). */
export function routeToPreviewUrl(route: string, port: number): string {
  const base = `http://localhost:${port}`;
  if (route === "/") return `${base}/`;
  return `${base}${route}`;
}
