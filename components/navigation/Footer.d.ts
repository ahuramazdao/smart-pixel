/** Stopka na ink: kolumny linków, e-mail z czerwonym podkreśleniem, gigantyczny wordmark SMARTPIXEL, mono bottom bar. */
export interface FooterProps {
  columns?: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  /** Mono opis nad e-mailem */
  note?: string;
  email?: string;
  city?: string;
  year?: string;
  onNavigate?: (href: string) => void;
  style?: React.CSSProperties;
}
