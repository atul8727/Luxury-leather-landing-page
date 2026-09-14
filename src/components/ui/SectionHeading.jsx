export default function SectionHeading({
  eyebrow,
  title,
  description,
  titleColor = "#614338",
  eyebrowColor = "#8A7368",
  descriptionColor = "#101010",
  maxWidth = "791px",
}) {
  return (
    <div>
      {eyebrow && (
        <p
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: eyebrowColor }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="mx-auto mt-2 text-center uppercase"
        style={{
          fontFamily: "'Roboto Slab', serif",
          fontWeight: 700,
          fontSize: "50px",
          lineHeight: "60px",
          letterSpacing: "0%",
          color: titleColor,
          width: maxWidth,
          maxWidth: "100%",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed"
          style={{ color: descriptionColor }}
        >
          {description}
        </p>
      )}
    </div>
  );
}