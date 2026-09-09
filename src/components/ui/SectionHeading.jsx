export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className = "",
}) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const toneEyebrow = tone === "light" ? "text-navbar-text/80" : "text-ink-soft";
  const toneTitle = tone === "light" ? "text-navbar-text" : "text-ink";
  const toneDesc = tone === "light" ? "text-navbar-text/85" : "text-ink-soft";

  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <span className={`font-body text-[13px] tracking-[0.18em] ${toneEyebrow}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.15] ${toneTitle}`}>
        {title}
      </h2>
      {description && (
        <p className={`font-body text-[15px] leading-relaxed ${toneDesc}`}>{description}</p>
      )}
    </div>
  );
}