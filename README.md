# Raaga Sudha Sabha

Marketing site for **Raaga Sudha Sabha**, a 501(c)(3) cultural arts non-profit and sister initiative of [Raaga Sudha School of Music](https://www.raagasudha.net).

Production domain: `www.raagasudhasabha.org`

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with custom design tokens
- `next/font` (Cormorant Garamond + Inter)
- `lucide-react` icons
- Static export (`output: 'export'`) — no Node runtime required to host

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
npm run lint
```

The static build emits everything to `./out`. Any static host can serve it.

## Project layout

```
app/                  routes (App Router)
  layout.tsx          fonts, nav, footer, persistent Tyagaraja band, OG/metadata
  page.tsx            Home — hero, mission, four pillars, featured event, Endaro quote
  events/page.tsx     Events — upcoming + past, filterable by year
  about/page.tsx      Mission, history, board placeholder, 501(c)(3) info
  archive/page.tsx    Coming-soon archive landing
  contact/page.tsx    Form, email, address, socials
  sitemap.ts          /sitemap.xml
  robots.ts           /robots.txt
components/           UI components (server + client islands)
content/events.json   Source-of-truth events feed
lib/events.ts         Typed accessors over events.json
public/               Static assets
raagasudha.github.io/ READ-ONLY reference snapshot of the parent site
```

## Editing content

- **Events** — edit [content/events.json](content/events.json). Schema: `id`, `title`, `artists[]`, `date` (ISO 8601), `venue`, `city`, `description`, `image`, `ticketUrl`, `status` ("upcoming" | "past"). The home page automatically pulls the next upcoming event as the Featured concert.
- **Page copy** — edit the page file directly (e.g. [app/about/page.tsx](app/about/page.tsx)).
- **Placeholders to swap** — see [CONTENT.md](CONTENT.md) for the full inventory.

## Design tokens

Defined in [tailwind.config.ts](tailwind.config.ts) and [app/globals.css](app/globals.css).

| Token | Hex | Role |
|---|---|---|
| `cream` | `#F4ECDD` | Page background |
| `cream-deep` | `#EFE3CB` | Card / surface |
| `maroon` | `#6B1F2A` | Headlines, primary CTAs, institutional voice |
| `brand-purple` | `#7A007F` | Inline links, kicker accents — exact parent-site purple, the family link |
| `pink` | `#EAC5D2` | Hairline borders, soft surfaces — pulled from parent site |
| `gold` | `#B08838` | Hairline ornaments only (fails AA on cream as type) |
| `ink` | `#2A1B14` | Body text |
| `muted` | `#7A6A56` | Captions, secondary text |

Fonts: Cormorant Garamond (display) + Inter (body), both via `next/font`.

## Deploy

The site is a fully static export. The `out/` directory is the deployable artifact.

### Netlify

1. Connect this repo in Netlify.
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
3. (Optional) add a `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "out"
   ```
4. Set the production domain to `www.raagasudhasabha.org` and add the `apex → www` redirect in Netlify DNS.

### Cloudflare Pages

1. Create a new Pages project from this repo.
2. Build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 20
3. Add `www.raagasudhasabha.org` as a custom domain.

### Vercel

1. Import the repo. Vercel detects Next.js automatically.
2. Because the site uses `output: 'export'`, Vercel will serve the static export — no serverless runtime billed.

## Wiring up the placeholder integrations

Search the codebase for `// TODO:` to find every placeholder. The big ones:

- **Donation link** — currently `#donate`. Set in [components/site-nav.tsx](components/site-nav.tsx) and [app/page.tsx](app/page.tsx). Point at Stripe Checkout / PayPal / Donorbox.
- **Newsletter signup** — currently no-op. [components/newsletter-form.tsx](components/newsletter-form.tsx). Wire to Mailchimp / Buttondown / ConvertKit.
- **Contact form** — currently no-op. [components/contact-form.tsx](components/contact-form.tsx). Easiest path: Formspree or Netlify Forms (works out of the box on Netlify with the `data-netlify="true"` attribute).
- **Email, mailing address, EIN, social URLs** — see [CONTENT.md](CONTENT.md).

## Accessibility

- Semantic HTML, `<main>` landmark, skip-to-content link.
- Touch targets ≥ 44px on mobile.
- Visible focus rings (`ring-2 ring-maroon`).
- Headings sequence per page (single `<h1>`, then `<h2>` groups).
- Maroon-on-cream and ink-on-cream pass WCAG AA at all sizes; gold is restricted to hairlines and decorative marks only.

## Reference

The folder [raagasudha.github.io/](raagasudha.github.io/) is a frozen copy of the parent site (`raagasudha.net`) used as the design source. Do not edit it from this repo — it's the read-only sibling reference.
