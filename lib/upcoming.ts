/**
 * Configuration for the current "next concert flyer."
 *
 * Set FLYER_SRC to null when there is no current flyer to show; both the
 * /events page and the home-page upcoming-events section will then render
 * an empty state instead.
 *
 * To swap in a new flyer:
 *   1. Drop the image at e.g. public/events/2026-09-flyer.png
 *   2. Update FLYER_SRC to "/events/2026-09-flyer.png"
 *   3. Update FLYER_ALT to a one-sentence description (used for screen
 *      readers and SEO).
 */
export const FLYER_SRC: string | null = "/events/Flyer-1.png";

export const FLYER_ALT =
  "Upcoming Raaga Sudha Sabha concert flyer — click to view full size.";
