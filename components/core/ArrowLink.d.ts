/** Mono-link ze strzałką → / ↗ (czerwona, przesuwa się na hover). */
export interface ArrowLinkProps {
  children: React.ReactNode;
  href?: string;
  /** ↗ zamiast → (linki zewnętrzne) */
  external?: boolean;
  /** Wersja na ciemnym tle */
  dark?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
