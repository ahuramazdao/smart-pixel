/* global React */
/* Smart Pixel — Eyebrow: otwarcie sekcji (czerwony piksel + mono label + notka) */

export function Eyebrow({ children, note, dark = false, style: extra = {} }) {
  const mono = {
    fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
    fontSize: 11.5,
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  };
  return React.createElement('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, width: '100%', ...extra },
  },
    React.createElement('span', { style: { ...mono, color: dark ? '#fff' : 'var(--sp-ink, #101113)', display: 'inline-flex', alignItems: 'center', gap: 10 } },
      React.createElement('span', { 'aria-hidden': true, style: { width: 8, height: 8, background: 'var(--sp-red, #F0391C)', display: 'inline-block', flex: 'none' } }),
      children
    ),
    note ? React.createElement('span', { style: { ...mono, color: dark ? 'var(--sp-txd-3, rgba(255,255,255,.44))' : 'var(--sp-tx-3, #8B8983)' } }, note) : null
  );
}
