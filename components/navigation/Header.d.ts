/** Sticky header 72px: papier z blur(16px), hairline od dołu, logo + mono nav + outline CTA. Eksportuje też SPLogo. */
export interface HeaderProps {
  /** [{ label, href }] */
  links?: Array<{ label: string; href: string }>;
  /** href aktywnego linku */
  active?: string;
  /** Przejęcie nawigacji (SPA/prototyp) */
  onNavigate?: (href: string) => void;
  ctaLabel?: string;
  onCta?: () => void;
  sticky?: boolean;
  style?: React.CSSProperties;
}
