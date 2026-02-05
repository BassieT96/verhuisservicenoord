import Link from "next/link";
import styles from "@/components/ui/ui.module.css";

type Variant = "primary" | "secondary" | "tertiary";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  dataTrackEvent?: string;
  dataTrackLabel?: string;
  dataTrackLocation?: string;
};

type ButtonLinkProps = CommonProps & {
  href: string;
};

type ButtonExternalProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonNativeProps = CommonProps & {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

function variantClass(variant: Variant) {
  if (variant === "secondary") return styles.secondary;
  if (variant === "tertiary") return styles.tertiary;
  return styles.primary;
}

function buildClass(variant: Variant, className?: string) {
  return `${styles.button} ${variantClass(variant)} ${className ?? ""}`.trim();
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className,
  ariaLabel,
  dataTrackEvent,
  dataTrackLabel,
  dataTrackLocation,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buildClass(variant, className)}
      aria-label={ariaLabel}
      data-track-event={dataTrackEvent}
      data-track-label={dataTrackLabel}
      data-track-location={dataTrackLocation}
    >
      {children}
    </Link>
  );
}

export function ButtonNative({
  children,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
  className,
  ariaLabel,
}: ButtonNativeProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buildClass(variant, className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export function ButtonExternal({
  children,
  href,
  target,
  rel,
  variant = "primary",
  className,
  ariaLabel,
  dataTrackEvent,
  dataTrackLabel,
  dataTrackLocation,
}: ButtonExternalProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={buildClass(variant, className)}
      aria-label={ariaLabel}
      data-track-event={dataTrackEvent}
      data-track-label={dataTrackLabel}
      data-track-location={dataTrackLocation}
    >
      {children}
    </a>
  );
}
