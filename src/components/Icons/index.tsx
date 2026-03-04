export function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      {/* Compound path: rounded rect + play triangle punched out via evenodd */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.8 5.8a2.46 2.46 0 0 1 1.74 1.74C22 9.22 22 12 22 12s0 2.78-.46 4.46a2.46 2.46 0 0 1-1.74 1.74C18.12 18.66 12 18.66 12 18.66s-6.12 0-7.8-.46a2.46 2.46 0 0 1-1.74-1.74C2 14.78 2 12 2 12s0-2.78.46-4.46A2.46 2.46 0 0 1 4.2 5.8C5.88 5.34 12 5.34 12 5.34s6.12 0 7.8.46zM10 15l5-3-5-3v6z"
      />
    </svg>
  );
}
