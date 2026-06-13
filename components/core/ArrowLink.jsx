/* global React */
/* Smart Pixel — ArrowLink: mono uppercase link ze strzałką */

export function ArrowLink({ children, href = '#', external = false, dark = false, onClick, style: extra = {} }) {
  const [hover, setHover] = React.useState(false);
  const color = dark ? '#fff' : 'var(--sp-ink, #101113)';
  return React.createElement('a', {
    href,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
      fontSize: 11.5,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      borderBottom: hover ? `1px solid ${dark ? '#fff' : 'var(--sp-ink, #101113)'}` : '1px solid transparent',
      paddingBottom: 2,
      transition: 'border-color 140ms',
      ...extra,
    },
  },
    children,
    React.createElement('span', {
      'aria-hidden': true,
      style: {
        color: 'var(--sp-red, #F0391C)',
        display: 'inline-block',
        transform: hover ? (external ? 'translate(3px,-3px)' : 'translateX(4px)') : 'none',
        transition: 'transform 140ms cubic-bezier(.2,.6,.2,1)',
      },
    }, external ? '↗' : '→')
  );
}
