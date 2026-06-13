/** Select natywny w skórze systemu: mono etykieta, czerwona strzałka. */
export interface SelectProps {
  label?: string;
  /** Lista opcji: string[] lub {value, label}[] */
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  required?: boolean;
  dark?: boolean;
  style?: React.CSSProperties;
}
