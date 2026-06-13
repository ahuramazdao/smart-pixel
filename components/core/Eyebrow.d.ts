/** Otwarcie sekcji: czerwony kwadrat-piksel + mono etykieta, opcjonalna notka po prawej. */
export interface EyebrowProps {
  children: React.ReactNode;
  /** Notka mono po prawej stronie, np. "(2023—2026)" */
  note?: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}
