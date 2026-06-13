/* global React */
/* Smart Pixel — Footer (ink, wielki wordmark, mono bottom bar) */

export function Footer({ columns = [], note = 'Strony www · aplikacje webowe · automatyzacje', email = 'piotr@smartpixel.pl', city = 'Polska / zdalnie', year = '2026', onNavigate, style: extra = {} }) {
  const mono = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' };
  return (
    <footer style={{ background: 'var(--sp-ink, #101113)', color: '#fff', ...extra }}>
      <div style={{ maxWidth: 'var(--container, 1320px)', margin: '0 auto', padding: '72px var(--gutter, 32px) 28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'space-between', borderBottom: '1px solid var(--sp-line-d, rgba(255,255,255,.14))', paddingBottom: 48 }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{ ...mono, color: 'var(--sp-txd-3, rgba(255,255,255,.44))', marginBottom: 14 }}>{note}</div>
            <a href={`mailto:${email}`} style={{ fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em', color: '#fff', textDecoration: 'none', borderBottom: '1px solid var(--sp-red, #F0391C)', paddingBottom: 2 }}>{email}</a>
          </div>
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            {columns.map((col) => (
              <div key={col.title}>
                <div style={{ ...mono, color: 'var(--sp-txd-3, rgba(255,255,255,.44))', marginBottom: 14 }}>{col.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {col.links.map((l) => (
                    <a key={l.href} href={l.href}
                      onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(l.href); } }}
                      style={{ fontFamily: "var(--font-body, 'Archivo', sans-serif)", fontSize: 14.5, color: 'var(--sp-txd-2, rgba(255,255,255,.68))', textDecoration: 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--sp-txd-2, rgba(255,255,255,.68))'; }}
                    >{l.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden="true" style={{
          fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '-0.025em', lineHeight: 0.9, fontSize: 'clamp(64px, 11vw, 168px)',
          color: '#fff', padding: '56px 0 8px', whiteSpace: 'nowrap', overflow: 'hidden',
        }}>
          SMART<span style={{ color: 'var(--sp-red, #F0391C)' }}>PIXEL</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', borderTop: '1px solid var(--sp-line-d, rgba(255,255,255,.14))', paddingTop: 18 }}>
          <span style={{ ...mono, color: 'var(--sp-txd-3, rgba(255,255,255,.44))' }}>© {year} Smart Pixel. Wszystkie prawa zastrzeżone.</span>
          <span style={{ ...mono, color: 'var(--sp-txd-3, rgba(255,255,255,.44))' }}>{city}</span>
        </div>
      </div>
    </footer>
  );
}
