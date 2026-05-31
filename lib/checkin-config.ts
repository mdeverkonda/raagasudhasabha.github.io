/**
 * Check-in API endpoint.
 *
 * Currently points at a Cloudflare Worker proxy that forwards requests to
 * the Apps Script /exec URL. The proxy exists because Apps Script's redirect
 * to googleusercontent.com is blocked by iOS Safari's Intelligent Tracking
 * Prevention; serving via Workers' own domain avoids that.
 *
 * Worker source: dashboard.cloudflare.com → Workers & Pages → rsvp-checkin-proxy.
 * The worker forwards every query param to the Apps Script /exec URL.
 *
 * Set CHECKIN_ENABLED to false to render a "not configured" placeholder
 * (useful when there is no active concert).
 */
export const CHECKIN_APPS_SCRIPT_URL =
  "https://rsvp-checkin-proxy.mdeverkonda.workers.dev/";

export const CHECKIN_ENABLED = true;
