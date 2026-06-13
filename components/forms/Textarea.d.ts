/** Wieloliniowe pole tekstowe — spójne z Input. */
export interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  rows?: number;
  required?: boolean;
  dark?: boolean;
  style?: React.CSSProperties;
}
