/* global React */
/* Smart Pixel — Tag: chip pill */

export function Tag({ children, active = false, dark = false, onClick, style: extra = {} }) {
  const [hover, setHover] = React.useState(false);
  const base = dark
    ? { border: '1px solid var(--sp-line-d, rgba(255,255,255,.14))', color: 'var(--sp-txd-2, rgba(255,255,255,.68))', bg: 'transparent' }
    : { border: '1px solid var(--sp-line, #E2DFD7)', color: 'var(--sp-tx-2, #5C5B57)', bg: '#fff' };
  const isOn = active;
  return React.createElement('span', {
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '6px 14px',
      borderRadius: 999,
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      lineHeight: 1.2,
      cursor: onClick ? 'pointer' : 'default',
      background: isOn ? 'var(--sp-ink, #101113)' : base.bg,
      color: isOn ? '#fff' : base.color,
      border: isOn ? '1px solid var(--sp-ink, #101113)' : base.border,
      ...(hover && onClick && !isOn ? { borderColor: dark ? '#fff' : 'var(--sp-ink, #101113)', color: dark ? '#fff' : 'var(--sp-ink, #101113)' } : {}),
      transition: 'all 140ms',
      ...extra,
    },
  }, children);
}
