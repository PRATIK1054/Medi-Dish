import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <g stroke="currentColor" strokeWidth="6">
        {/* Fork */}
        <path d="M78 30 v40" strokeLinecap="round"/>
        <path d="M78 40 C 70 30, 70 20, 72 15" strokeLinecap="round" />
        <path d="M78 40 C 86 30, 86 20, 84 15" strokeLinecap="round" />
        <path d="M78 22 v-7" strokeLinecap="round"/>

        {/* Plate */}
        <circle cx="45" cy="45" r="25" />
      </g>
      {/* Inner part of the plate */}
      <circle cx="45" cy="45" r="18" fill="#F97316" />
      {/* Pill */}
      <g transform="translate(35, 35) rotate(45)">
        <rect x="0" y="0" width="20" height="10" rx="5" fill="currentColor"/>
        <rect x="0" y="0" width="10" height="10" rx="5" fill="white"/>
        <path d="M10 0 L10 10" stroke="currentColor" strokeWidth="1"/>
        <path d="M5 0 L5 10" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.5"/>
        <path d="M15 0 L15 10" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.5"/>
      </g>
    </svg>
  );
}
