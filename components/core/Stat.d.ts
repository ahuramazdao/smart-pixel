/** Statystyka: wielka cyfra display 800 + jednostka mono w indeksie górnym (czerwona) + etykieta nad regułą 1px. */
export interface StatProps {
  /** Liczba, np. "120" */
  value: React.ReactNode;
  /** Jednostka w indeksie górnym: "%", "+", "tyg" */
  unit?: string;
  /** Mono etykieta pod regułą */
  label?: string;
  /** Krótki opis (2 zdania max) */
  desc?: string;
  dark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
