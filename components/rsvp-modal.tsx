"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  formUrl: string;
  label?: string;
  variant?: "primary" | "outline";
  eventLabel?: string;
  className?: string;
};

/** Append ?embedded=true (or &embedded=true) to a Google Forms viewform URL. */
function toEmbedUrl(url: string): string {
  if (url.includes("embedded=true")) return url;
  return url + (url.includes("?") ? "&" : "?") + "embedded=true";
}

export function RsvpModal({
  formUrl,
  label = "RSVP",
  variant = "primary",
  eventLabel,
  className,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  if (!formUrl) return null;

  const open = () => {
    setMounted(true);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={cn(
          "smallcaps inline-flex items-center transition",
          variant === "primary"
            ? "min-h-12 border border-maroon bg-maroon px-6 py-3 text-cream hover:bg-maroon-deep"
            : "min-h-11 border border-maroon/70 px-5 py-2 text-maroon hover:bg-maroon/10",
          className
        )}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        className="m-auto w-[min(640px,100vw)] max-h-[92dvh] border-0 bg-transparent p-0 backdrop:bg-ink/85"
        aria-label="RSVP form"
      >
        <div className="relative flex max-h-[92dvh] flex-col bg-cream shadow-2xl">
          <button
            type="button"
            onClick={close}
            aria-label="Close RSVP form"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-cream/95 text-maroon shadow hover:bg-cream"
          >
            <X size={22} />
          </button>
          <div className="px-6 pb-2 pt-10 md:px-10 md:pt-12">
            {eventLabel && <p className="kicker mb-3">{eventLabel}</p>}
            <h2 className="font-display text-3xl text-maroon md:text-4xl">
              RSVP
            </h2>
            <p className="mt-2 text-sm text-muted">
              Let us know you&rsquo;re coming — it helps us plan the venue.
            </p>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden px-2 pb-2 md:px-4 md:pb-4">
            {mounted && (
              <iframe
                src={toEmbedUrl(formUrl)}
                title="RSVP form"
                className="block h-[70vh] w-full"
                width="100%"
                height="100%"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
              >
                Loading…
              </iframe>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
