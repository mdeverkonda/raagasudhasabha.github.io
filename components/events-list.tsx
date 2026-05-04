"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/event-card";
import { type Event } from "@/lib/events";
import { cn } from "@/lib/utils";

type Props = { events: Event[] };

export function EventsList({ events }: Props) {
  const years = useMemo(() => {
    const set = new Set<number>();
    events.forEach((e) => set.add(new Date(e.date).getFullYear()));
    return Array.from(set).sort((a, b) => b - a);
  }, [events]);

  const [year, setYear] = useState<number | "all">("all");

  const filtered = useMemo(
    () => (year === "all" ? events : events.filter((e) => new Date(e.date).getFullYear() === year)),
    [events, year]
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter events by year"
      >
        <FilterPill active={year === "all"} onClick={() => setYear("all")}>
          All years
        </FilterPill>
        {years.map((y) => (
          <FilterPill key={y} active={year === y} onClick={() => setYear(y)}>
            {y}
          </FilterPill>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-muted">No events for {String(year)}.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "smallcaps min-h-11 border px-4 py-2 transition",
        active
          ? "border-maroon bg-maroon text-cream"
          : "border-pink-deep bg-cream text-maroon hover:bg-pink/40"
      )}
    >
      {children}
    </button>
  );
}
