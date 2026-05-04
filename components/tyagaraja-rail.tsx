import { Ornament } from "@/components/ornament";

/**
 * Persistent Tyagaraja kriti band — the family signature carried over
 * from raagasudha.net, where the same kriti appears on every page.
 * Sits just above the footer on every route as the spiritual seal of the site.
 */
export function TyagarajaRail() {
  return (
    <aside
      aria-label="Tyagaraja kriti"
      className="border-y border-pink bg-cream-deep/50"
    >
      <div className="container-edge flex flex-col items-center gap-4 py-10 text-center md:py-14">
        <Ornament className="h-2 w-24 text-brand-purple/70" />
        <blockquote className="max-w-2xl">
          <p className="font-display text-2xl italic leading-snug text-brand-purple md:text-3xl">
            &ldquo;Sangeetha Gnyanamu, Bhakthi vina, Sanmargamu kalade.&rdquo;
          </p>
          <p className="mt-3 text-base text-ink/80 md:text-lg">
            Can the knowledge of music find the right path without devotion?
          </p>
          <footer className="smallcaps mt-4 text-muted">— Sri Tyagaraja</footer>
        </blockquote>
        <Ornament className="h-2 w-24 text-brand-purple/70" />
      </div>
    </aside>
  );
}
