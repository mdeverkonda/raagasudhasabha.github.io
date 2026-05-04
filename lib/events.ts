import data from "@/content/events.json";

export type EventStatus = "upcoming" | "past";

export type Event = {
  id: string;
  title: string;
  artists: string[];
  date: string;
  venue: string;
  city: string;
  description: string;
  image: string | null;
  ticketUrl: string | null;
  status: EventStatus;
};

const all: Event[] = data as Event[];

export function getAllEvents(): Event[] {
  return all;
}

export function getUpcoming(): Event[] {
  return all
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

export function getPast(): Event[] {
  return all
    .filter((e) => e.status === "past")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getFeaturedUpcoming(): Event | null {
  return getUpcoming()[0] ?? null;
}

export function formatEventDate(iso: string) {
  const d = new Date(iso);
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const day = d.toLocaleDateString("en-US", { day: "numeric" });
  const year = d.getFullYear();
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return { month, day, year, time, weekday: d.toLocaleDateString("en-US", { weekday: "long" }) };
}
