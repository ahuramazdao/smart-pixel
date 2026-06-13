/* global React */
/* Smart Pixel — Stat: wielka cyfra + jednostka + etykieta */

export function Stat({ value, unit, label, desc, dark = false, size = 'md', style: extra = {} }) {
  const ink = dark ? '#fff' : 'var(--sp-ink, #101113)';
  const fs = size === 'lg' ? 104 : size === 'sm' ? 56 : 76;
  return React.createElement('div', { style: { minWidth: 0, ...extra } },
    React.createElement('div', {
      style: {
        fontFamily: "var(--font-display, 'Archivo', sans-serif)",
        fontWeight: 800,
        fontSize: fs,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: ink,
      },
    },
      value,
      unit ? React.createElement('span', {
        style: { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: Math.round(fs * 0.27), fontWeight: 500, verticalAlign: 'super', color: 'var(--sp-red, #F0391C)', marginLeft: 3 },
      }, unit) : null
    ),
    label ? React.createElement('div', {
      style: {
        fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 10.5, fontWeight: 500,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: dark ? 'var(--sp-txd-2, rgba(255,255,255,.68))' : 'var(--sp-tx-2, #5C5B57)',
        borderTop: `1px solid ${ink}`, marginTop: 10, paddingTop: 9,
      },
    }, label) : null,
    desc ? React.createElement('p', {
      style: { fontFamily: "var(--font-body, 'Archivo', sans-serif)", fontSize: 13.5, lineHeight: 1.5, color: dark ? 'var(--sp-txd-3, rgba(255,255,255,.44))' : 'var(--sp-tx-3, #8B8983)', margin: '8px 0 0', maxWidth: 280 },
    }, desc) : null
  );
}
