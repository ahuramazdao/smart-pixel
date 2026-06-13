/**
 * Smart Pixel button — pill, jeden akcent czerwieni na widok.
 * @startingPoint section="Core" subtitle="Przycisk pill: primary / dark / outline / ghost / inverse" viewport="700x220"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** 'primary' (czerwony, max 1 na widok) | 'dark' | 'outline' | 'ghost' | 'inverse' (na ciemnym tle) */
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  /** Strzałka → przesuwająca się o 4px na hover */
  arrow?: boolean;
  disabled?: boolean;
  /** 'button' | 'a' */
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  style?: React.CSSProperties;
}
