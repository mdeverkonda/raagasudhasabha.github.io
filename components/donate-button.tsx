import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "nav";

type Props = {
  variant?: Variant;
  children?: React.ReactNode;
  className?: string;
};

const variantClass: Record<Variant, string> = {
  primary:
    "smallcaps inline-flex min-h-12 items-center justify-center border border-maroon bg-maroon px-6 py-3 text-cream",
  outline:
    "smallcaps inline-flex min-h-12 items-center justify-center border border-maroon bg-transparent px-6 py-3 text-maroon",
  nav: "smallcaps text-sm inline-flex min-h-11 items-center rounded-none border border-maroon bg-maroon px-5 py-2 text-cream",
};

// TODO: re-enable when a real Stripe / PayPal / Donorbox giving flow is wired up.
export function DonateButton({
  variant = "primary",
  children = "Donate",
  className,
}: Props) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="Donations launching soon"
      className={cn(
        variantClass[variant],
        "cursor-not-allowed opacity-60",
        className
      )}
    >
      {children}
    </button>
  );
}
