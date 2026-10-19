interface IconProps {
  size?: number;
}

const s = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

function Svg({ size = 20, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

const icons: Record<string, (p: IconProps) => React.ReactElement> = {
  "status-change": ({ size }) => (
    <Svg size={size}>
      <path d="M4 12a8 8 0 0 1 13.3-6M20 12a8 8 0 0 1-13.3 6" {...s} />
      <path d="M17.3 3v3.5h-3.5M6.7 21v-3.5h3.5" {...s} />
    </Svg>
  ),
  missiles: ({ size }) => (
    <Svg size={size}>
      <path d="M12 2.5c2.2 2.3 3 5 3 8.5 0 3-.9 6-3 10.5-2.1-4.5-3-7.5-3-10.5 0-3.5.8-6.2 3-8.5Z" {...s} />
      <path d="M9.5 13 7 15.5M14.5 13l2.5 2.5" {...s} />
      <circle cx="12" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  ),
  "damage-site": ({ size }) => (
    <Svg size={size}>
      <path d="M12 2.5 13.6 9l5.9-1.8-3.8 4.8 3.8 4.8-5.9-1.8L12 21.5l-1.6-6.5-5.9 1.8 3.8-4.8-3.8-4.8L10.4 9 12 2.5Z" {...s} strokeLinejoin="round" />
    </Svg>
  ),
  evacuation: ({ size }) => (
    <Svg size={size}>
      <path d="M10.5 4H5.5a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 5.5 20h5" {...s} />
      <path d="M12 12h9M17.5 8.5 21 12l-3.5 3.5" {...s} />
    </Svg>
  ),
  shelters: ({ size }) => (
    <Svg size={size}>
      <path d="M4 11.5 12 4l8 7.5" {...s} />
      <path d="M6 10v9.5h12V10" {...s} />
      <path d="M9.8 19.5v-5.3h4.4v5.3" {...s} />
    </Svg>
  ),
  electricity: ({ size }) => (
    <Svg size={size}>
      <path d="M13 2.5 5.5 13.5h5L9 21.5l9-11.5h-5.3L13 2.5Z" {...s} strokeLinejoin="round" fill="currentColor" fillOpacity="0.14" />
    </Svg>
  ),
  "water-food": ({ size }) => (
    <Svg size={size}>
      <path d="M12 3c3 4 6 7.6 6 11.3A6 6 0 0 1 6 14.3C6 10.6 9 7 12 3Z" {...s} />
    </Svg>
  ),
  comms: ({ size }) => (
    <Svg size={size}>
      <path d="M6 20 9.5 17H19a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 19 6H5a1.5 1.5 0 0 0-1.5 1.5V17" {...s} />
      <path d="M8 10h8M8 13h5" {...s} />
    </Svg>
  ),
  fire: ({ size }) => (
    <Svg size={size}>
      <path
        d="M12 2.8c1 2.4-.3 3.8-1.6 5.2C9 9.3 7.7 11 8 13.3a4 4 0 0 0 8 .2c.3-2-1-3.3-1.4-5-1.3 1-2.3 2.5-2.1 4.2a2 2 0 1 1-3.6-1.4c.6-1.5 2.4-2.3 3.1-4.2.7-1.8.3-3-.9-4.3Z"
        {...s}
        fill="currentColor"
        fillOpacity="0.14"
      />
    </Svg>
  ),
  hazmat: ({ size }) => (
    <Svg size={size}>
      <path d="M12 2.5 22 20.5H2L12 2.5Z" {...s} strokeLinejoin="round" />
      <path d="M12 9.5v5.3" {...s} />
      <circle cx="12" cy="17.3" r="1" fill="currentColor" stroke="none" />
    </Svg>
  ),
  earthquake: ({ size }) => (
    <Svg size={size}>
      <path d="M2.5 14.5h3l2-5 3 9 2.5-11 2 7h3l1.5-3h2" {...s} />
    </Svg>
  ),
  services: ({ size }) => (
    <Svg size={size}>
      <rect x="4" y="9.5" width="7" height="9.5" {...s} />
      <rect x="13" y="4.5" width="7" height="14.5" {...s} />
      <path d="M16.5 8.5h.01M16.5 11.5h.01M16.5 14.5h.01M7 13h.01M7 16h.01" {...s} strokeWidth="2.2" />
    </Svg>
  ),
  rumors: ({ size }) => (
    <Svg size={size}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v8A1.5 1.5 0 0 1 18.5 15H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 13.5v-8Z" {...s} />
      <path d="m9 7 6 6M15 7l-6 6" {...s} />
    </Svg>
  ),
  volunteers: ({ size }) => (
    <Svg size={size}>
      <circle cx="9" cy="8" r="2.6" {...s} />
      <circle cx="16" cy="9.3" r="2.1" {...s} />
      <path d="M3.5 19.5c.6-3.3 2.8-5.2 5.5-5.2s4.9 1.9 5.5 5.2" {...s} />
      <path d="M14.8 14.7c2 .2 3.6 1.9 4.1 4.8" {...s} />
    </Svg>
  ),
  recovery: ({ size }) => (
    <Svg size={size}>
      <path d="M4 14.5 9 9.5l3.5 3.5L20 5.5" {...s} />
      <path d="M14.5 5.5H20v5.5" {...s} />
      <path d="M4 19.5h16" {...s} />
    </Svg>
  ),
  infiltration: ({ size }) => (
    <Svg size={size}>
      <path d="M12 2.5 4.5 5.5V11c0 5.2 3.2 8.9 7.5 10.5 4.3-1.6 7.5-5.3 7.5-10.5V5.5L12 2.5Z" {...s} />
      <path d="M12 8v5M12 15.8h.01" {...s} strokeWidth="2.1" />
    </Svg>
  ),
  "hostile-aircraft": ({ size }) => (
    <Svg size={size}>
      <path
        d="M12 3.5c.7 0 1.2.6 1.2 1.3v5l6.8 3.9v1.8l-6.8-2.2v3.6l2 1.5v1.5l-3.2-1-3.2 1v-1.5l2-1.5v-3.6l-6.8 2.2v-1.8l6.8-3.9v-5c0-.7.5-1.3 1.2-1.3Z"
        {...s}
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.14"
      />
    </Svg>
  ),
  floods: ({ size }) => (
    <Svg size={size}>
      <path d="M2.5 10c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" {...s} />
      <path d="M2.5 15.5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" {...s} />
    </Svg>
  ),
  announcements: ({ size }) => (
    <Svg size={size}>
      <path d="M3.5 10v4h3l6 4V6l-6 4h-3Z" {...s} strokeLinejoin="round" />
      <path d="M15.5 9.3a4 4 0 0 1 0 5.4M18.3 7a8 8 0 0 1 0 10" {...s} />
    </Svg>
  ),
};

export function CategoryIcon({ id, size = 20 }: { id: string; size?: number }) {
  const Icon = icons[id];
  if (!Icon) return null;
  return Icon({ size });
}
