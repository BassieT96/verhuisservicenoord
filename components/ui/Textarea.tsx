import styles from "@/components/ui/ui.module.css";

type TextareaProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
};

export function Textarea({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  placeholder,
  error,
}: TextareaProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className={styles.textarea}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className={styles.errorText}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
