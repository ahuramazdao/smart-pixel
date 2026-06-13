/** Cytat klienta: piksel ■, display 600, podpis mono nad hairline. */
export interface QuoteCardProps {
  /** Bez cudzysłowów — dodawane automatycznie („…") */
  quote: string;
  name: string;
  role?: string;
  dark?: boolean;
  /** Pełna zalewka czerwieni (max 1 na widok) */
  accent?: boolean;
  style?: React.CSSProperties;
}
