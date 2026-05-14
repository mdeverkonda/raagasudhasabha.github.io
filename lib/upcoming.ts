/**
 * Configuration for the current "next concert" — flyer and RSVP.
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
 *
 * To enable RSVPs (Google Forms-backed):
 *   1. Build a Google Form (responses can flow into a Google Sheet).
 *   2. Click Send → the <> embed tab → copy the URL from the iframe src,
 *      or just paste the form's normal "viewform" link below.
 *   3. Paste it into RSVP_GOOGLE_FORM_URL and set RSVP_OPEN = true.
 *   4. (Optional) set RSVP_EVENT_LABEL to a short string shown above the form,
 *      e.g. "Sanjay Subrahmanyan — September 12, 2026".
 *
 * Setting RSVP_OPEN = false (or RSVP_GOOGLE_FORM_URL = "") hides all RSVP
 * buttons site-wide; useful between concerts.
 */
export const FLYER_SRC: string | null = "/events/June7th-Flyer.jpeg";

export const FLYER_ALT =
  "Grand Inaugural Concert flyer — Sri Abhishek Raghuram (Vocal) with Sri Patri Satish Kumar (Mridangam), Sri Kamalakiran Vinjamuri (Violin), Sri Ravi Balasubramanian (Ghatam). Sunday, June 7, 2026, 4:00 PM PDT at Lakireddy Hall, Livermore Hindu Temple.";

export const RSVP_GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeCNbW_niJtQP2VTVBYSFW3nDSnhGcC_JUac0TcAf83_VT88g/viewform";
export const RSVP_OPEN = true;
export const RSVP_EVENT_LABEL = "Sri Abhishek Raghuram · Sunday, June 7, 2026";
