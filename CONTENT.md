# Content placeholders to swap before launch

Search the codebase for `// TODO:` to find every placeholder. This file is the human-readable inventory.

## Confirmed organizational details (already wired)

These are no longer placeholders — they're set in the codebase.

| Item | Value |
|---|---|
| Org email | `info@raagasudhasabha.org` |
| Mailing address | `1101 Hoskins Lane, San Ramon, CA, USA` |
| Federal Tax ID (EIN) | `42-2139154` |
| 501(c)(3) status | Stated in header band, footer, About |
| Board | Sudha Dusi (President), Jayaram Manda (Secretary), Madhav Deverkonda (Treasurer) |
| Advisory Committee | Santosh Dusi, Siddhartha Dusi, Krishna Nadiminti, Padmanjali Deverkonda, Purna Manda |

## Still to provide / confirm

| Item | Where | Action |
|---|---|---|
| **Logo file size** | [public/rss_logo.png](public/rss_logo.png) | ~915 KB. Fine for launch, but compressing to ~150–300 KB (Squoosh / ImageOptim, or convert to WebP) would still trim every page load. |
| **Phone for Madhav Deverkonda** | [app/about/page.tsx](app/about/page.tsx) | Treasurer card has no phone wired — add it if it should appear. |

## The current concert flyer

The Events page and the Home-page Upcoming section both render the flyer image set by [lib/upcoming.ts](lib/upcoming.ts).

Current state: `FLYER_SRC = "/events/flyer.svg"` — a placeholder ([public/events/flyer.svg](public/events/flyer.svg)) that says "Replace this file with the real flyer."

**To swap in a real flyer:**

1. Drop the image (PNG/JPG/SVG, portrait orientation works best) at e.g. `public/events/2026-09-flyer.png`.
2. Update [lib/upcoming.ts](lib/upcoming.ts):
   ```ts
   export const FLYER_SRC: string | null = "/events/2026-09-flyer.png";
   export const FLYER_ALT = "Sanjay Subrahmanyan in concert — September 12, 2026, Mission San Jose Auditorium, Fremont CA";
   ```
3. When there is no current flyer, set `FLYER_SRC = null` — the pages will show a "next concert being announced" empty state instead.

Click on the flyer (in either page) opens it at full size in a modal.

## Logo

The site logo is loaded from [public/rss_logo.png](public/rss_logo.png) by [components/wordmark.tsx](components/wordmark.tsx) and rendered in the nav (every page) and footer (every page).

To swap in a different logo, replace `public/rss_logo.png` (or update the `SRC` map in the Wordmark component to point at a new filename). Keep the alt text in the Wordmark component up to date.

## Integrations / forms

There are currently **no forms** on the site. The newsletter form (footer) and contact form (/contact) were removed because no submission backend was wired. To re-introduce them later:

- Newsletter — recreate a client component that posts to Mailchimp / ConvertKit / Buttondown, mount it in [components/site-footer.tsx](components/site-footer.tsx) below the description.
- Contact form — recreate a client component that posts to Formspree (easiest) or Netlify Forms (if hosting on Netlify with `data-netlify="true"`), and add it back to [app/contact/page.tsx](app/contact/page.tsx) inside a `<section>` above the "Reach us" block.

The Donate button is also currently disabled site-wide ([components/donate-button.tsx](components/donate-button.tsx)) — re-enable by swapping it for a real Stripe / PayPal / Donorbox link when ready.

## RSVP (Google Forms-backed)

The site has a built-in RSVP modal ([components/rsvp-modal.tsx](components/rsvp-modal.tsx)) that embeds a Google Form in an iframe. It appears on the home page, the events page, and on individual upcoming event cards when enabled. Responses flow into the form's linked Google Sheet.

**Switch it on:**

1. Build a Google Form with whatever fields you need (Name, Email, Phone, Number of attendees, etc.).
2. In the form editor → **Responses** tab → link it to a **Google Sheet** so submissions collect in one place.
3. (Optional) **Settings → Responses → "Get email notifications for new responses"** so each RSVP emails you.
4. Click **Send** → the **`<>`** (embed) tab → copy the URL from the iframe `src`. The plain "viewform" share link also works — the modal appends `?embedded=true` automatically.
5. Open [lib/upcoming.ts](lib/upcoming.ts) and set:
   ```ts
   export const RSVP_GOOGLE_FORM_URL =
     "https://docs.google.com/forms/d/e/FORM_ID/viewform";
   export const RSVP_OPEN = true;
   export const RSVP_EVENT_LABEL = "Sanjay Subrahmanyan — September 12, 2026";
   ```
6. Commit and push — the deploy workflow rebuilds the site and the RSVP buttons appear.

**Between concerts:** set `RSVP_OPEN = false` (or `RSVP_GOOGLE_FORM_URL = ""`) — all RSVP buttons disappear site-wide until the next concert.

**Customising the form:** anything you change inside Google Forms (fields, theming, confirmation message) takes effect immediately — no rebuild required. The site only stores the form URL.

## Past events

[content/events.json](content/events.json) is currently `[]`. As concerts complete, append entries with `status: "past"`:

```ts
{
  id: string;              // url-safe slug
  title: string;
  artists: string[];       // primary first, then accompaniments in parentheses
  date: string;            // ISO 8601 with timezone
  venue: string;
  city: string;            // "City, State"
  description: string;
  image: string | null;    // optional
  ticketUrl: string | null;
  status: "upcoming" | "past";
}
```

The Past section on the events page renders empty-state copy until the array has entries.

## History (About page)

[app/about/page.tsx](app/about/page.tsx) — the History section is a 2-paragraph placeholder. Swap for the real founding story when ready.

## Imagery

The site currently ships **no photographic imagery** — only the flyer placeholder, the favicon, and the cream/maroon/purple palette. Slots that could later receive real photos:

- **Hero** — currently text-only on a faint radial-tint cream background. A real Sabha event photo, audience shot, or instrument detail (tanpura close-up, mridangam) would fit. Drop into `public/hero/` and add `next/image` to [app/page.tsx](app/page.tsx).
- **Board cards** — `public/board/<slug>.jpg`, then add to the `<article>` in [app/about/page.tsx](app/about/page.tsx).

**Anti-recommendation**: do not use stock musicians-with-headphones photos. Use real Sabha photos or commissioned imagery only.

## Archive page

[app/archive/page.tsx](app/archive/page.tsx) — currently a Coming-soon landing with four planned content categories. When the first releases are ready, replace the page body with a real collection grid.

## SEO

- Per-page metadata is defined via `export const metadata` in each `app/*/page.tsx`.
- `app/sitemap.ts` and `app/robots.ts` use a hardcoded `SITE_URL = "https://www.raagasudhasabha.org"` — update if the production URL changes.
- Default OG image is not set. If you want a custom OG image, add `public/og.png` (1200×630) and set `openGraph.images` in [app/layout.tsx](app/layout.tsx).
