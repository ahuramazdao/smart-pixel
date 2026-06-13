/** Pole tekstowe: mono etykieta, biały field, hairline, focus = czerwona ramka + miękki ring. */
export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: any) => void;
  required?: boolean;
  /** Komunikat błędu (mono, --sp-err) */
  error?: string;
  dark?: boolean;
  style?: React.CSSProperties;
}
