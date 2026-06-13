/* global React */
/* Smart Pixel — ProjectCard */

export function ProjectCard({ image, title, client, tags = [], href = '#', year, ratio = '4 / 3', style: extra = {} }) {
  const [hover, setHover] = React.useState(false);
  const mono = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 10.5, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' };
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'block', textDecoration: 'none', minWidth: 0, ...extra }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--r-md, 8px)', aspectRatio: ratio, background: 'var(--sp-ink-2, #18191C)' }}>
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hover ? 'scale(1.03)' : 'scale(1)', transition: 'transform 600ms cubic-bezier(.2,.6,.2,1)' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
            <span aria-hidden="true" style={{ width: 10, height: 10, background: 'var(--sp-red, #F0391C)' }}></span>
            <span style={{ ...mono, color: 'rgba(255,255,255,.4)' }}>Zdjęcie projektu</span>
          </div>
        )}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute', right: 14, top: 14, width: 36, height: 36, borderRadius: 999,
            background: 'var(--sp-red, #F0391C)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontSize: 16,
            opacity: hover ? 1 : 0, transform: hover ? 'translate(0,0)' : 'translate(-4px,4px)',
            transition: 'opacity 140ms, transform 140ms cubic-bezier(.2,.6,.2,1)',
          }}
        >↗</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginTop: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', color: 'var(--sp-ink, #101113)', borderBottom: hover ? '1px solid var(--sp-ink, #101113)' : '1px solid transparent', display: 'inline', transition: 'border-color 140ms' }}>{title}</div>
          {client && <div style={{ ...mono, color: 'var(--sp-tx-3, #8B8983)', marginTop: 6 }}>{client}</div>}
        </div>
        <div style={{ ...mono, color: 'var(--sp-tx-2, #5C5B57)', flex: 'none', display: 'flex', gap: 10 }}>
          {tags.slice(0, 2).map((t) => <span key={t}>{t}</span>)}
          {year && <span style={{ color: 'var(--sp-tx-3, #8B8983)' }}>({year})</span>}
        </div>
      </div>
    </a>
  );
}
