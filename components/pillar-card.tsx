import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  title: string;
  body: string;
  emphasis?: boolean;
};

export function PillarCard({ icon: Icon, title, body, emphasis = false }: Props) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 border border-pink bg-cream/60 p-6 transition md:p-8",
        emphasis && "bg-cream-deep/70 border-pink-deep md:p-10"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center border border-maroon/30 text-maroon",
          emphasis && "h-14 w-14 text-maroon"
        )}
        aria-hidden="true"
      >
        <Icon size={emphasis ? 26 : 22} strokeWidth={1.5} />
      </div>

      <h3
        className={cn(
          "font-display text-xl text-maroon md:text-2xl",
          emphasis && "md:text-3xl"
        )}
      >
        {title}
      </h3>

      <p className="text-base leading-relaxed text-ink/85">
        {body}
      </p>
    </article>
  );
}
