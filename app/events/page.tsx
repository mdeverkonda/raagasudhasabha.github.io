import type { Metadata } from "next";
import { EventsList } from "@/components/events-list";
import { EventFlyer } from "@/components/event-flyer";
import { Ornament } from "@/components/ornament";
import { getUpcoming, getPast } from "@/lib/events";
import { FLYER_SRC, FLYER_ALT } from "@/lib/upcoming";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past concerts presented by Raaga Sudha Sabha — featuring world-class Indian Classical artists.",
};

export default function EventsPage() {
  const upcoming = getUpcoming();
  const past = getPast();
  const hasFlyer = !!FLYER_SRC;

  return (
    <>
      <PageHeader
        kicker="Concerts & Festivals"
        title="Events"
        sub="Concerts, festivals and workshops featuring world-class Indian Classical artists."
      />

      {/* UPCOMING — flyer-driven */}
      <section className="bg-cream-deep/30">
        <div className="container-edge py-14 md:py-20">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="font-display text-display-md text-maroon">Upcoming</h2>
          </div>

          <div className="mt-8">
            {hasFlyer ? (
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <EventFlyer src={FLYER_SRC!} alt={FLYER_ALT} />
                </div>
                <div className="lg:col-span-5">
                  <p className="kicker">Next on Stage</p>
                  <h3 className="mt-3 font-display text-3xl text-maroon md:text-4xl">
                    Our next concert
                  </h3>
                  <Ornament className="mt-5 h-3 w-24 text-brand-purple/70" />
                  <p className="mt-6 text-lg leading-relaxed text-ink/85">
                    Click the flyer for a full-size view with all the details
                    on artists, programme, date, venue and tickets.
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    For partnership or press enquiries, write to{" "}
                    <a className="link-purple" href="mailto:info@raagasudhasabha.org">
                      info@raagasudhasabha.org
                    </a>
                    .
                  </p>
                </div>
              </div>
            ) : upcoming.length > 0 ? (
              <EventsList events={upcoming} />
            ) : (
              <EmptyState message="The next concert is being announced. Sign up below for the newsletter to be the first to know." />
            )}
          </div>
        </div>
      </section>

      {/* PAST */}
      <section className="bg-cream">
        <div className="container-edge py-14 md:py-20">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="font-display text-display-md text-maroon">Past</h2>
            {past.length > 0 && (
              <span className="smallcaps text-muted">archive</span>
            )}
          </div>
          <div className="mt-8">
            {past.length > 0 ? (
              <EventsList events={past} />
            ) : (
              <EmptyState message="Past concerts will be archived here as the season fills out." />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function PageHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <section className="border-b border-pink bg-cream">
      <div className="container-edge py-14 md:py-20">
        <p className="kicker">{kicker}</p>
        <Ornament className="mt-5 h-3 w-24 text-brand-purple/70" />
        <h1 className="mt-5 font-display text-display-lg text-maroon">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/85">{sub}</p>
      </div>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="border border-pink bg-cream/60 p-10 text-center md:p-14">
      <p className="font-display text-2xl italic text-brand-purple md:text-3xl">
        {message}
      </p>
    </div>
  );
}
