type Props = { className?: string };

export function Ornament({ className }: Props) {
  return (
    <svg
      viewBox="0 0 120 12"
      role="presentation"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <line x1="0" y1="6" x2="46" y2="6" />
      <line x1="74" y1="6" x2="120" y2="6" />
      <circle cx="60" cy="6" r="3.5" />
      <circle cx="60" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <line x1="50" y1="6" x2="55" y2="6" />
      <line x1="65" y1="6" x2="70" y2="6" />
    </svg>
  );
}
