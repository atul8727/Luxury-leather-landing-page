import Link from "next/link";

const variants = {
  primary:
    "bg-navbar text-navbar-text hover:bg-[#4f372d] focus-visible:outline-navbar",
  secondary:
    "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink/5 focus-visible:outline-ink",
  light:
    "bg-cream text-ink hover:bg-white focus-visible:outline-ink",
  outlineLight:
    "bg-transparent text-navbar-text border border-navbar-text/60 hover:bg-navbar-text/10 focus-visible:outline-navbar-text",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  as,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-3.5 text-[13px] font-medium tracking-[0.06em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Comp = as || "button";
  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}