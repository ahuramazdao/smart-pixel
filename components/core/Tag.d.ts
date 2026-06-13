/** Chip pill (mono uppercase) — kategorie projektów, filtry, meta. */
export interface TagProps {
  children: React.ReactNode;
  /** Wypełnienie ink (wybrany filtr) */
  active?: boolean;
  dark?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
