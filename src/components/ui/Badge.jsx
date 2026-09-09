export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-ink/15 bg-white/60 px-4 py-1.5 text-[12px] tracking-[0.14em] text-ink-soft ${className}`}
    >
      {children}
    </span>
  );
}
