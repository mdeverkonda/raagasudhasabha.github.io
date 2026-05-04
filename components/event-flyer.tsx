"use client";

import { useRef } from "react";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** "full" = thumbnail occupies the parent (events page); "compact" = capped width (home page) */
  size?: "full" | "compact";
  className?: string;
};

export function EventFlyer({ src, alt, size = "full", className }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open concert flyer at full size"
        className={cn(
          "group relative block overflow-hidden border border-pink-deep bg-cream-deep/40 transition hover:border-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
          size === "compact" ? "mx-auto w-full max-w-md" : "w-full",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block h-auto w-full transition group-hover:opacity-95"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-2 bg-cream/90 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-maroon shadow-sm transition group-hover:bg-cream"
        >
          <ZoomIn size={14} strokeWidth={1.75} />
          View Full Size
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        className="m-auto max-h-[100dvh] max-w-[100vw] border-0 bg-transparent p-0 backdrop:bg-ink/85"
        aria-label="Concert flyer"
      >
        <div className="relative">
          <button
            type="button"
            onClick={close}
            aria-label="Close flyer"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-cream/95 text-maroon shadow hover:bg-cream"
          >
            <X size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="block max-h-[100dvh] max-w-[100vw] object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
