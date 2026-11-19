# Hoang Minh Anh — portfolio

A single-page static portfolio for Hoang Minh Anh, Key Account Executive at DIGIWORLD (Ho Chi Minh City).

## Stack

React 19, Vite, TypeScript (strict), plain CSS. Tests with Playwright and axe.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — typecheck, production build, and a `404.html` copy of the page
- `npm run preview` — serve the built site
- `npm run lint` — ESLint
- `npm run test:e2e` — Playwright suite against the build, served at `/`
- `npm run test:e2e:base` — same suite with `VITE_BASE=/mia-portfolio/`, including the base-path checks
- `npm run og` — regenerate `public/og-image.png`

## Content

All copy lives in `src/content/profile.ts`.

## Deploy

The site is hosted on Vercel. Import this repository once at vercel.com/new (framework preset: Vite; `vercel.json` sets the build command and output directory). After that, every push to `main` deploys to production and every pull request gets a preview URL.

Canonical, Open Graph and JSON-LD URLs are filled in at build time from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. For a custom domain, either make it the project's production domain or set a `SITE_URL` environment variable (e.g. `https://example.com`).

Hosting under a sub-path also works: build with `VITE_BASE=/sub-path/` (see `npm run test:e2e:base`).

## TODO

- About text
- Selected-work write-ups
- CV PDF
