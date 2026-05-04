import Link from "next/link";
import { type Event, formatEventDate } from "@/lib/events";
import { cn } from "@/lib/utils";

type Props = {
  event: Event;
  variant?: "grid" | "featured";
};

export function EventCard({ event, variant = "grid" }: Props) {
  const { month, day, year, time, weekday } = formatEventDate(event.date);
  const featured = variant === "featured";

  return (
    <article
      className={cn(
        "group flex flex-col border border-pink bg-cream/70 p-6 transition hover:border-pink-deep md:p-8",
        featured && "md:flex-row md:items-stretch md:gap-10 md:p-10"
      )}
    >
      {/* Date pull-element */}
      <div
        className={cn(
          "flex shrink-0 flex-col items-start border-b border-pink pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-8",
          featured && "md:items-center md:text-center"
        )}
      >
        <span className="smallcaps text-brand-purple/80">{month}</span>
        <span
          className={cn(
            "font-display text-5xl leading-none text-maroon md:text-6xl",
            featured && "md:text-7xl"
          )}
        >
          {day}
        </span>
        <span className="mt-1 smallcaps text-muted">{year}</span>
        {featured && (
          <span className="mt-3 text-sm text-ink/70">
            {weekday} · {time}
          </span>
        )}
      </div>

      <div className={cn("mt-5 flex flex-1 flex-col md:mt-0 md:pl-8", featured && "md:pl-0")}>
        <h3
          className={cn(
            "font-display text-2xl leading-snug text-maroon md:text-3xl",
            featured && "md:text-4xl"
          )}
        >
          {event.title}
        </h3>

        <p className="mt-2 font-display italic text-ink/85">
          {event.artists.join(" · ")}
        </p>

        <p className="mt-3 text-sm text-muted">
          {event.venue} · {event.city}
        </p>

        {featured && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/85">
            {event.description}
          </p>
        )}

        {event.status === "upcoming" && (
          <div className="mt-5 flex flex-wrap gap-3">
            {event.ticketUrl ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener"
                className="smallcaps inline-flex min-h-11 items-center border border-maroon bg-maroon px-5 py-2 text-cream transition hover:bg-maroon-deep"
              >
                Tickets
              </a>
            ) : (
              <span className="smallcaps inline-flex min-h-11 items-center border border-pink-deep bg-pink/40 px-5 py-2 text-maroon">
                Tickets — coming soon
              </span>
            )}
            <Link
              href={`/events#${event.id}`}
              className="smallcaps inline-flex min-h-11 items-center border border-maroon/70 px-5 py-2 text-maroon transition hover:bg-maroon/10"
            >
              Details
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
