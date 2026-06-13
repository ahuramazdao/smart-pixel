/* global React */
/* Smart Pixel — ServiceRow: wiersz-akordeon usługi z indeksem /01 */

export function ServiceRow({ index, title, lead, items = [], timeframe, open: openProp, onToggle, dark = false, style: extra = {} }) {
  const [openState, setOpenState] = React.useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const toggle = () => (onToggle ? onToggle() : setOpenState(!openState));
  const ink = dark ? '#fff' : 'var(--sp-ink, #101113)';
  const mono = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' };
  return (
    <div style={{ borderTop: `1px solid ${dark ? 'var(--sp-line-d, rgba(255,255,255,.14))' : 'var(--sp-line, #E2DFD7)'}`, ...extra }}>
      <button
        onClick={toggle}
        aria-expanded={open}
        style={{ all: 'unset', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 20, width: '100%', padding: '22px 0' }}
      >
        <span style={{ ...mono, color: 'var(--sp-red, #F0391C)', flex: 'none', width: 40 }}>/{index}</span>
        <span style={{ fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1, color: open ? ink : (dark ? 'var(--sp-ghost-d, rgba(255,255,255,.24))' : 'var(--sp-ghost, #C9C5BC)'), transition: 'color 240ms', flex: 1, minWidth: 0 }}>{title}</span>
        <span aria-hidden="true" style={{ fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontSize: 20, color: ink, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 240ms cubic-bezier(.2,.6,.2,1)', flex: 'none' }}>+</span>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 240ms cubic-bezier(.2,.6,.2,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, padding: '0 0 26px 60px' }}>
            {lead && <p style={{ fontFamily: "var(--font-body, 'Archivo', sans-serif)", fontSize: 16, lineHeight: 1.55, color: dark ? 'var(--sp-txd-2, rgba(255,255,255,.68))' : 'var(--sp-tx-2, #5C5B57)', margin: 0, maxWidth: 380, flex: '1 1 280px' }}>{lead}</p>}
            {items.length > 0 && (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: '1 1 220px', minWidth: 0, display: 'grid', gridTemplateColumns: items.length > 4 ? '1fr 1fr' : '1fr', columnGap: 24 }}>
                {items.map((it) => (
                  <li key={it} style={{ ...mono, color: ink, padding: '5px 0' }}>{it}</li>
                ))}
              </ul>
            )}
            {timeframe && (
              <div style={{ flex: 'none' }}>
                <div style={{ ...mono, color: dark ? 'var(--sp-txd-3, rgba(255,255,255,.44))' : 'var(--sp-tx-3, #8B8983)' }}>Czas</div>
                <div style={{ ...mono, color: ink, marginTop: 4 }}>{timeframe}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
