/* global React */
/* Smart Pixel — QuoteCard */

export function QuoteCard({ quote, name, role, dark = false, accent = false, style: extra = {} }) {
  const bg = accent ? 'var(--sp-red, #F0391C)' : dark ? 'var(--sp-ink-2, #18191C)' : '#fff';
  const ink = accent || dark ? '#fff' : 'var(--sp-ink, #101113)';
  const sub = accent ? 'rgba(255,255,255,.75)' : dark ? 'var(--sp-txd-3, rgba(255,255,255,.44))' : 'var(--sp-tx-3, #8B8983)';
  const mono = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 10.5, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' };
  return (
    <figure style={{
      margin: 0, background: bg, borderRadius: 'var(--r-lg, 14px)',
      border: dark || accent ? 'none' : '1px solid var(--sp-line, #E2DFD7)',
      padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 22, minWidth: 0, ...extra,
    }}>
      <span aria-hidden="true" style={{ width: 10, height: 10, background: accent ? '#fff' : 'var(--sp-red, #F0391C)', display: 'block' }}></span>
      <blockquote style={{ margin: 0, fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 600, fontSize: 19, lineHeight: 1.35, letterSpacing: '-0.01em', color: ink }}>
        „{quote}"
      </blockquote>
      <figcaption style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: `1px solid ${accent ? 'rgba(255,255,255,.3)' : dark ? 'var(--sp-line-d, rgba(255,255,255,.14))' : 'var(--sp-line, #E2DFD7)'}`, paddingTop: 14 }}>
        <span style={{ ...mono, color: ink }}>{name}</span>
        <span style={{ ...mono, color: sub }}>{role}</span>
      </figcaption>
    </figure>
  );
}
