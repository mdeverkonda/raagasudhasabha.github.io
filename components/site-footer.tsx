import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-maroon-deep text-cream/90">
      <div className="container-edge grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex flex-col items-center gap-5 text-center">
            <Wordmark size="lg" variant="notagline" />
            <p className="font-display italic text-3xl leading-none text-cream md:text-4xl">
              Raaga Sudha Sabha
            </p>
          </div>
          <p className="mt-5 max-w-sm text-sm text-cream/70">
            A non-profit cultural arts organization preserving and promoting
            Indian classical music.
          </p>
        </div>

        <div>
          <p className="smallcaps text-cream/60">Visit</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/events" className="hover:text-gold">Events</Link></li>
            <li><Link href="/about" className="hover:text-gold">About</Link></li>
            <li><Link href="/archive" className="hover:text-gold">Archive</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="smallcaps text-cream/60">Connect</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="mailto:info@raagasudhasabha.org" className="hover:text-gold">
                info@raagasudhasabha.org
              </a>
            </li>
            <li className="text-cream/70">
              <address className="not-italic">
                1101 Hoskins Lane<br />
                San Ramon, CA, USA
              </address>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-edge flex flex-col gap-3 py-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            A sister initiative of{" "}
            <a
              href="https://www.raagasudha.net"
              className="text-gold underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener"
            >
              Raaga Sudha School of Music
            </a>
            .
          </p>
          <p>
            Tax exempt under section 501(c)(3).
            {" "}Federal Tax ID: <span className="font-mono">42-2139154</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
