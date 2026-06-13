/* global React */
/* Smart Pixel — Button */

const SP_BTN_VARIANTS = {
  primary: { bg: 'var(--sp-red, #F0391C)', color: '#fff', border: '1px solid transparent', hoverBg: 'var(--sp-red-hover, #D92E12)', hoverColor: '#fff' },
  dark:    { bg: 'var(--sp-ink, #101113)', color: '#fff', border: '1px solid transparent', hoverBg: 'var(--sp-ink-3, #232529)', hoverColor: '#fff' },
  outline: { bg: 'transparent', color: 'var(--sp-ink, #101113)', border: '1px solid var(--sp-ink, #101113)', hoverBg: 'var(--sp-ink, #101113)', hoverColor: '#fff' },
  ghost:   { bg: 'transparent', color: 'var(--sp-ink, #101113)', border: '1px solid transparent', hoverBg: 'rgba(16,17,19,.06)', hoverColor: 'var(--sp-ink, #101113)' },
  inverse: { bg: '#fff', color: 'var(--sp-ink, #101113)', border: '1px solid transparent', hoverBg: 'var(--sp-paper-2, #EBE8E1)', hoverColor: 'var(--sp-ink, #101113)' },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  disabled = false,
  as = 'button',
  href,
  target,
  onClick,
  type = 'button',
  style: extra = {},
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = SP_BTN_VARIANTS[variant] || SP_BTN_VARIANTS.primary;
  const pad = size === 'sm' ? '9px 18px' : size === 'lg' ? '17px 34px' : '13px 26px';
  const fs = size === 'sm' ? 13 : size === 'lg' ? 16 : 14.5;

  const base = {
    fontFamily: "var(--font-body, 'Archivo', sans-serif)",
    fontWeight: 600,
    fontSize: fs,
    letterSpacing: '-0.005em',
    lineHeight: 1,
    padding: pad,
    borderRadius: 999,
    border: v.border,
    background: hover && !disabled ? v.hoverBg : v.bg,
    color: hover && !disabled ? v.hoverColor : v.color,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.35 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transform: press && !disabled ? 'scale(.98)' : 'none',
    transition: 'background 140ms cubic-bezier(.2,.6,.2,1), color 140ms, transform 80ms',
    ...extra,
  };
  const handlers = disabled ? {} : {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onClick,
  };
  const arrowEl = arrow
    ? React.createElement('span', {
        'aria-hidden': true,
        style: { display: 'inline-block', transform: hover ? 'translateX(4px)' : 'none', transition: 'transform 140ms cubic-bezier(.2,.6,.2,1)' },
      }, '→')
    : null;

  if (as === 'a') {
    return React.createElement('a', { href, target, style: base, ...handlers }, children, arrowEl);
  }
  return React.createElement('button', { type, disabled, style: base, ...handlers }, children, arrowEl);
}
