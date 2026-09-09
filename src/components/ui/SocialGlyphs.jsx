export function InstagramGlyph({ size = 17, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookGlyph({ size = 17, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13.6 20V13h2.1l.3-2.4h-2.4V9.1c0-.7.2-1.2 1.2-1.2h1.3V5.7c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.7H8.9V13h2.1v7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppGlyph({ size = 17, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.4 20 7.5 16.3A7.4 7.4 0 1 1 10.4 19Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 9.6c.2-.5.4-.5.6-.5h.4c.2 0 .4 0 .5.4.2.5.6 1.4.6 1.5.1.1.1.3 0 .4-.2.3-.3.4-.5.6-.2.2-.4.4-.2.7.2.4 1 1.5 2.1 2 .3.2.5.1.6 0 .2-.2.5-.6.7-.8.1-.2.3-.2.5-.1l1.4.7c.2.1.3.1.4.3.1.2.1.9-.2 1.3-.3.5-1.2.9-1.8.9-.5 0-1.6-.2-3-1.5-1.8-1.6-2.9-3.5-3-3.9-.1-.4-.6-1.1-.1-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function YouTubeGlyph({ size = 17, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor" />
    </svg>
  );
}
