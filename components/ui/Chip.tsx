import styles from "@/components/ui/ui.module.css";

type ChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  ariaControls?: string;
};

export function Chip({ label, active = false, onClick, ariaControls }: ChipProps) {
  return (
    <button
      type="button"
      className={styles.chip}
      onClick={onClick}
      data-active={active}
      aria-pressed={active}
      aria-controls={ariaControls}
    >
      {label}
    </button>
  );
}
