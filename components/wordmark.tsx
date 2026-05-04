/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Switch to "text" to fall back to a typographic wordmark. */
const LOGO_MODE: "text" | "image" = "image";

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "notagline" | "tagline";
type Tone = "default" | "inverse";

type Props = {
  size?: Size;
  /** "notagline" renders the emblem only, circle-cropped to drop the marble background */
  variant?: Variant;
  /** Color treatment for the text fallback. Ignored in image mode. */
  tone?: Tone;
  asLink?: boolean;
  className?: string;
};

const sizeHeight: Record<Size, string> = {
  sm: "h-12 md:h-14",
  md: "h-14 md:h-16",
  lg: "h-32 md:h-40",
  xl: "h-40 md:h-48",
};

const textSizeClass: Record<Size, string> = {
  sm: "text-lg md:text-xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-5xl",
};

const SRC: Record<Variant, string> = {
  notagline: "/logo-notagline.png",
  tagline: "/logo-tagline.png",
};

export function Wordmark({
  size = "md",
  variant = "notagline",
  tone = "default",
  asLink = false,
  className,
}: Props) {
  let inner: React.ReactNode;

  if (LOGO_MODE === "image") {
    inner = (
      <img
        src={SRC[variant]}
        alt="Raaga Sudha Sabha"
        className={cn("block w-auto", sizeHeight[size], className)}
      />
    );
  } else {
    inner = (
      <span
        className={cn(
          "font-display italic font-medium leading-none tracking-[0.005em] whitespace-nowrap",
          textSizeClass[size],
          tone === "inverse" ? "text-cream" : "text-brand-purple",
          className
        )}
      >
        Raaga Sudha Sabha
      </span>
    );
  }

  if (!asLink) return inner;

  return (
    <Link
      href="/"
      aria-label="Raaga Sudha Sabha — home"
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
