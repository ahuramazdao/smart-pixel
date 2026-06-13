/* global React */
/* Smart Pixel — Header (sticky, paper + blur, hairline) */

export function SPLogo({ white = false, height = 22 }) {
  const ink = white ? '#FFFFFF' : '#101113';
  return (
    <svg viewBox="0 0 320 44" height={height} style={{ display: 'block' }} role="img" aria-label="Smart Pixel">
      <g transform="translate(0,7) scale(0.5)">
        <rect x="0" y="0" width="26" height="26" fill={ink} />
        <rect x="0" y="34" width="26" height="26" fill={ink} />
        <rect x="34" y="34" width="26" height="26" fill={ink} />
        <rect x="38" y="-4" width="26" height="26" fill="#F0391C" />
      </g>
      <text x="48" y="33" fontFamily="Archivo, 'Helvetica Neue', Arial, sans-serif" fontWeight="800" fontSize="30" letterSpacing="-0.6">
        <tspan fill={ink}>SMART</tspan><tspan fill="#F0391C" dx="6">PIXEL</tspan>
      </text>
    </svg>
  );
}

function SPNavLink({ label, href, active, onNavigate }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(href); } }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 11.5, fontWeight: 500,
        letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
        color: active || hover ? 'var(--sp-ink, #101113)' : 'var(--sp-tx-2, #5C5B57)',
        borderBottom: active ? '1px solid var(--sp-red, #F0391C)' : hover ? '1px solid var(--sp-ink, #101113)' : '1px solid transparent',
        paddingBottom: 3, transition: 'color 140ms, border-color 140ms',
      }}
    >{label}</a>
  );
}

export function Header({ links = [], active, onNavigate, ctaLabel = 'Umów rozmowę', onCta, sticky = true, style: extra = {} }) {
  const [ctaHover, setCtaHover] = React.useState(false);
  return (
    <header style={{
      position: sticky ? 'sticky' : 'static', top: 0, zIndex: 50,
      background: 'rgba(244,242,237,.82)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--sp-line, #E2DFD7)', ...extra,
    }}>
      <div style={{ maxWidth: 'var(--container, 1320px)', margin: '0 auto', padding: '0 var(--gutter, 32px)', height: 'var(--header-h, 72px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="#start" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('#start'); } }} style={{ textDecoration: 'none', flex: 'none' }}>
          <SPLogo height={20} />
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map((l) => <SPNavLink key={l.href} {...l} active={active === l.href} onNavigate={onNavigate} />)}
        </nav>
        <button
          onClick={onCta}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            fontFamily: "var(--font-body, 'Archivo', sans-serif)", fontWeight: 600, fontSize: 13.5,
            padding: '10px 20px', borderRadius: 999, border: '1px solid var(--sp-ink, #101113)',
            background: ctaHover ? 'var(--sp-ink, #101113)' : 'transparent',
            color: ctaHover ? '#fff' : 'var(--sp-ink, #101113)',
            cursor: 'pointer', transition: 'background 140ms, color 140ms', flex: 'none', whiteSpace: 'nowrap',
          }}
        >{ctaLabel}</button>
      </div>
    </header>
  );
}
