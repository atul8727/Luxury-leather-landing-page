export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[20px] border border-ink/10 bg-white/70 backdrop-blur-[2px] ${className}`}
    >
      {children}
    </div>
  );
}
