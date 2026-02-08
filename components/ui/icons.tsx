import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width={20}
      height={20}
      {...props}
    >
      {children}
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 4h4l2 5-2 2a14 14 0 0 0 4 4l2-2 5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </BaseIcon>
  );
}

export function FileTextIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 3h8l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M13 3v6h6" />
      <path d="M10 13h8" />
      <path d="M10 17h8" />
    </BaseIcon>
  );
}

export function MessageCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 11a8 8 0 1 1-4.7-7.3A8 8 0 0 1 20 11Z" />
      <path d="m8 18-4 3 1.2-4.5" />
    </BaseIcon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3 4.5 6v6.5C4.5 17.5 8 21 12 22c4-1 7.5-4.5 7.5-9.5V6L12 3Z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.2" />
    </BaseIcon>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m3 7 9-4 9 4-9 4-9-4Z" />
      <path d="m3 7 9 4 9-4" />
      <path d="M3 7v10l9 4 9-4V7" />
      <path d="M12 11v10" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </BaseIcon>
  );
}

export function RouteIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 6h4a4 4 0 0 1 4 4v2" />
      <path d="M16 14h-4a4 4 0 0 0-4 4" />
    </BaseIcon>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 9h2" />
      <path d="M13 9h2" />
      <path d="M9 13h2" />
      <path d="M13 13h2" />
      <path d="M10 21v-4h4v4" />
    </BaseIcon>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M2 8h11v7H2z" />
      <path d="M13 11h4.5l2.5 2.5V15h-7v-4Z" />
      <circle cx="6.5" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
    </BaseIcon>
  );
}
