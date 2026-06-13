/** Wiersz-akordeon usługi: /index + tytuł display (ghost → ink po otwarciu) + lista zakresu. */
export interface ServiceRowProps {
  /** "01", "02"… */
  index: string;
  title: string;
  /** Akapit 2–3 zdania */
  lead?: string;
  /** Zakres, mono */
  items?: string[];
  /** Np. "4–8 tyg." */
  timeframe?: string;
  /** Kontrolowane otwarcie (z onToggle); bez tego stan własny */
  open?: boolean;
  onToggle?: () => void;
  dark?: boolean;
  style?: React.CSSProperties;
}
