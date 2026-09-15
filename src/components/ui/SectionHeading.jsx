export default function SectionHeading({
  eyebrow,
  title,
  description,
  titleColor = "#614338",
  eyebrowColor = "#8A7368",
  descriptionColor = "#101010",
  maxWidth = "max-w-[791px]",
}) {
  return (
    <div className="w-full text-center">
      {eyebrow && (
        <p
          className="text-sm font-semibold uppercase tracking-wide text-center"
          style={{ color: eyebrowColor }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mx-auto mt-2 text-center uppercase ${maxWidth}`}
        style={{
          fontFamily: "'Roboto Slab', serif",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 6vw, 3.125rem)", // ~28px mobile -> 50px desktop
          lineHeight: "1.2",
          letterSpacing: "0%",
          color: titleColor,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-[13px] sm:text-[15px] leading-relaxed"
          style={{ color: descriptionColor }}
        >
          {description}
        </p>
      )}
    </div>
  );
}