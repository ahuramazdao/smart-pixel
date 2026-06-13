/* global React */
/* Smart Pixel — UI kit: strona główna */
import { Button } from '../../components/core/Button.jsx';
import { ArrowLink } from '../../components/core/ArrowLink.jsx';
import { Eyebrow } from '../../components/core/Eyebrow.jsx';
import { Tag } from '../../components/core/Tag.jsx';
import { Stat } from '../../components/core/Stat.jsx';
import { ProjectCard } from '../../components/content/ProjectCard.jsx';
import { ServiceRow } from '../../components/content/ServiceRow.jsx';
import { QuoteCard } from '../../components/content/QuoteCard.jsx';

const WRAP = { maxWidth: 'var(--container, 1320px)', margin: '0 auto', padding: '0 var(--gutter, 48px)' };
const MONO = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 11.5, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' };
const DISPLAY = { fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 0.97, margin: 0 };

/* Reactive line-grid: a mesh of semi-transparent lines that springs and
   ripples away from the cursor as it moves across the hero. */
function GridMesh() {
  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const SP = 54;            // grid spacing
    const R = 190;            // cursor influence radius
    let W = 0, H = 0, cols = 0, rows = 0, pts = [], raf = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    const idx = (c, r) => r * cols + c;

    function build() {
      const rect = wrap.getBoundingClientRect();
      W = Math.max(1, rect.width); H = Math.max(1, rect.height);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / SP) + 2;
      rows = Math.ceil(H / SP) + 2;
      pts = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * SP - SP / 2, oy = r * SP - SP / 2;
          pts.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    }

    function seg(p, q, a) {
      ctx.globalAlpha = a;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      // base mesh — horizontal, vertical + one diagonal, faint
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = pts[idx(c, r)];
          const right = c < cols - 1 ? pts[idx(c + 1, r)] : null;
          const down = r < rows - 1 ? pts[idx(c, r + 1)] : null;
          const diag = c < cols - 1 && r < rows - 1 ? pts[idx(c + 1, r + 1)] : null;
          // brightness rises near the cursor → the mesh "lights up" where you move
          const dm = mouse.active ? Math.hypot(p.x - mouse.x, p.y - mouse.y) : 1e9;
          const glow = dm < R ? (1 - dm / R) : 0;
          if (right) seg(p, right, 0.05 + glow * 0.4);
          if (down) seg(p, down, 0.05 + glow * 0.4);
          if (diag) seg(p, diag, 0.018 + glow * 0.16);
        }
      }
      // node dots that brighten under the cursor + a red core at the cursor
      for (const p of pts) {
        const dm = mouse.active ? Math.hypot(p.x - mouse.x, p.y - mouse.y) : 1e9;
        if (dm < R) {
          const g = 1 - dm / R;
          ctx.globalAlpha = g * 0.85;
          ctx.fillStyle = g > 0.62 ? '#F0391C' : 'rgba(255,255,255,0.95)';
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.1 + g * 1.6, 0, 6.2832); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      // ease cursor toward target for a smooth trailing ripple
      mouse.x += (mouse.tx - mouse.x) * 0.16;
      mouse.y += (mouse.ty - mouse.y) * 0.16;
      for (const p of pts) {
        let fx = (p.ox - p.x) * 0.10, fy = (p.oy - p.y) * 0.10; // spring home
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < R) {
            const f = (1 - d / R) * 24;
            fx += (dx / (d || 1)) * f;
            fy += (dy / (d || 1)) * f;
          }
        }
        p.vx = (p.vx + fx) * 0.80;
        p.vy = (p.vy + fy) * 0.80;
        p.x += p.vx; p.y += p.vy;
      }
      draw();
      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      if (inside) {
        if (!mouse.active) { mouse.x = x; mouse.y = y; }
        mouse.tx = x; mouse.ty = y; mouse.active = true;
      } else {
        mouse.active = false; mouse.tx = -9999; mouse.ty = -9999;
      }
    }

    build();
    if (reduce) { draw(); }
    else {
      window.addEventListener('mousemove', onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    }
    const ro = new ResizeObserver(() => { build(); if (reduce) draw(); });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />
      {/* vignette so the grid reads as a stage light, fading to ink at the edges */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 70% 30%, rgba(240,57,28,0.10), rgba(16,17,19,0) 42%), linear-gradient(180deg, rgba(16,17,19,0) 55%, rgba(16,17,19,0.85) 100%)' }} />
    </div>
  );
}

function DarkLineBtn({ children, href }) {
  const [h, setH] = React.useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "var(--font-body, 'Archivo', sans-serif)", fontWeight: 600, fontSize: 16,
        letterSpacing: '-0.005em', lineHeight: 1, padding: '17px 34px', borderRadius: 999,
        border: '1px solid rgba(255,255,255,.28)', background: h ? '#fff' : 'transparent',
        color: h ? 'var(--sp-ink)' : '#fff', textDecoration: 'none', display: 'inline-flex',
        alignItems: 'center', gap: 10, whiteSpace: 'nowrap', cursor: 'pointer',
        transition: 'background 140ms cubic-bezier(.2,.6,.2,1), color 140ms, border-color 140ms',
      }}
    >{children}</a>
  );
}

function Hero({ onCta }) {
  const clients = ['Media Marketing', 'Webzo', 'eCentrum Logistyczne', 'Programy dla Klubów', 'GMC Rent', 'MediaDevices', 'KDK Group', 'Lex Korp', 'Eformica', 'KoszulkaSublimowana.pl'];
  return (
    <section id="start" style={{ position: 'relative', background: 'var(--sp-ink)', color: '#fff', overflow: 'hidden' }}>
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="hero-background.webp"
        ref={(el) => { if (el) el.muted = true; }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }}
      >
        <source src="hero-background.mp4" type="video/mp4" />
      </video>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(16,17,19,0.72) 0%, rgba(16,17,19,0.30) 38%, rgba(16,17,19,0.08) 70%, rgba(16,17,19,0.34) 100%)' }} />
      <GridMesh />
      <div style={{ ...WRAP, position: 'relative', minHeight: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px var(--gutter, 48px) 0', boxSizing: 'border-box' }}>
        <div style={{ ...MONO, color: 'var(--sp-txd-3)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, background: 'var(--sp-red)', display: 'inline-block' }}></span>
            Agencja digital
          </span>
          <span>strony www · aplikacje webowe · automatyzacje</span>
        </div>

        <h1 style={{ ...DISPLAY, fontSize: 'clamp(56px, 8.6vw, 132px)', margin: '48px 0' }}>
          <span style={{ color: 'var(--sp-ghost-d)', display: 'block' }}>Dobra strona</span>
          <span style={{ color: 'var(--sp-ghost-d)', display: 'block' }}>to za mało.</span>
          <span style={{ display: 'block' }}>Budujemy systemy,</span>
          <span style={{ display: 'block' }}>które <span style={{ color: 'var(--sp-red)' }}>pracują.</span></span>
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 56 }}>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--sp-txd-2)', maxWidth: 480, margin: 0 }}>
            Smart Pixel to niezależne studio z Polski. Projektujemy, wdrażamy
            i automatyzujemy w jednym zespole — to, co zobaczysz w projekcie,
            jest tym, co dostaniesz na produkcji.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button variant="primary" size="lg" arrow onClick={onCta}>Umów rozmowę</Button>
            <DarkLineBtn href="#projekty">Zobacz projekty</DarkLineBtn>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', borderTop: '1px solid var(--sp-line-d)', padding: '16px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ ...MONO, color: 'var(--sp-txd-2)', flex: 'none', paddingLeft: 'var(--gutter, 48px)' }}>Zaufali nam</span>
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 5%, #000 92%, transparent 100%)', maskImage: 'linear-gradient(90deg, transparent 0, #000 5%, #000 92%, transparent 100%)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 44, whiteSpace: 'nowrap', animation: 'sp-marquee 48s linear infinite', willChange: 'transform' }}>
              {[...clients, ...clients].map((c, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, flex: 'none' }}>
                  <span aria-hidden="true" style={{ width: 6, height: 6, background: 'var(--sp-red)', display: 'inline-block', flex: 'none' }}></span>
                  <span style={{ fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', color: '#fff' }}>{c}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [open, setOpen] = React.useState(0);
  const rows = [
    { title: 'Strony internetowe', lead: 'Strona to system, nie wizytówka. Projektujemy pod konkretny cel: zapytania, sprzedaż, rekrutację — i mierzymy, czy go realizuje.', items: ['UX/UI', 'CMS', 'SEO techniczne', 'Wydajność', 'Analityka'], timeframe: '4–8 tyg.' },
    { title: 'Aplikacje webowe', lead: 'Panele, portale klienta i narzędzia wewnętrzne. Jeden zespół od makiety po produkcję — bez zgubionych detali po drodze.', items: ['Architektura', 'Frontend', 'Backend', 'Integracje API', 'Utrzymanie'], timeframe: '6–16 tyg.' },
    { title: 'Automatyzacje', lead: 'Łączymy systemy, które dziś sklejasz ręcznie. Oferty, faktury, raporty i powiadomienia robią się same.', items: ['Integracje', 'Workflow', 'AI w procesach', 'Dashboardy'], timeframe: '2–6 tyg.' },
    { title: 'Opieka i rozwój', lead: 'Po starcie nie znikamy. Stały rytm: monitoring, drobne zmiany w 48 h, kwartalny przegląd wyników.', items: ['Monitoring', 'SLA 48 h', 'Eksperymenty', 'Raporty'], timeframe: 'abonament' },
  ];
  return (
    <section id="uslugi" style={{ padding: '96px 0' }}>
      <div style={WRAP}>
        <Eyebrow note="Zakres i czas — bez domysłów">Usługi</Eyebrow>
        <h2 style={{ ...DISPLAY, fontSize: 'clamp(40px, 4.8vw, 72px)', margin: '28px 0 48px' }}>
          <span style={{ color: 'var(--sp-ghost)' }}>Trzy rzeczy.</span><br />
          Robione do końca.
        </h2>
        <div style={{ borderBottom: '1px solid var(--sp-line)' }}>
          {rows.map((r, i) => (
            <ServiceRow key={r.title} index={String(i + 1).padStart(2, '0')} title={r.title} lead={r.lead} items={r.items} timeframe={r.timeframe} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = React.useState('Wszystkie');
  const cats = ['Wszystkie', 'Strony www', 'Aplikacje', 'Automatyzacje'];
  const projects = [
    { title: 'Panel B2B Hurtex', client: 'Hurtex', cat: 'Aplikacje', year: '2026', ratio: '4 / 3' },
    { title: 'Rezerwacje online', client: 'Klinika Vita', cat: 'Strony www', year: '2025', ratio: '4 / 3' },
    { title: 'Ofertowanie w 20 minut', client: 'Stalmet', cat: 'Automatyzacje', year: '2025', ratio: '4 / 3' },
    { title: 'Portal floty', client: 'Logistic Pro', cat: 'Aplikacje', year: '2024', ratio: '4 / 3' },
    { title: 'Strona + SEO', client: 'Kancelaria Lege', cat: 'Strony www', year: '2024', ratio: '4 / 3' },
    { title: 'Zamówienia → ERP', client: 'Foodly', cat: 'Automatyzacje', year: '2026', ratio: '4 / 3' },
  ];
  const shown = projects.filter((p) => filter === 'Wszystkie' || p.cat === filter);
  return (
    <section id="projekty" style={{ background: 'var(--sp-ink)', padding: '96px 0' }}>
      <div style={WRAP}>
        <Eyebrow dark note="Wyniki, nie obietnice">Wybrane projekty</Eyebrow>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between', alignItems: 'flex-end', margin: '28px 0 40px' }}>
          <h2 style={{ ...DISPLAY, fontSize: 'clamp(40px, 4.8vw, 72px)', color: '#fff' }}>
            <span style={{ color: 'var(--sp-ghost-d)' }}>Kiedy praca jest dobra,</span><br />
            liczby przychodzą same.
          </h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cats.map((c) => <Tag key={c} dark active={filter === c} onClick={() => setFilter(c)}>{c}</Tag>)}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px 28px' }}>
          {shown.map((p) => (
            <div key={p.title} style={{ filter: 'invert(0)' }}>
              <ProjectCard title={p.title} client={p.client} tags={[p.cat]} year={p.year} ratio={p.ratio}
                style={{ '--sp-ink': '#fff', '--sp-tx-2': 'rgba(255,255,255,.68)', '--sp-tx-3': 'rgba(255,255,255,.44)' }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <ArrowLink dark href="#kontakt">Twój projekt może być następny</ArrowLink>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section style={{ padding: '96px 0' }}>
      <div style={WRAP}>
        <Eyebrow note="Stan na 2026">Smart Pixel w liczbach</Eyebrow>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start', marginTop: 40 }}>
          <h2 style={{ ...DISPLAY, fontSize: 'clamp(34px, 3.6vw, 54px)', maxWidth: 460, flex: '1 1 320px' }}>
            <span style={{ color: 'var(--sp-ghost)' }}>Bierzemy mniej projektów.</span><br />
            Każdy dostaje pełną uwagę.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 'clamp(24px, 4vw, 64px)', flex: '2 1 480px' }}>
            <Stat value="120" unit="+" label="Wdrożeń" desc="Strony, aplikacje i automatyzacje od 2018 roku." />
            <Stat value="98" unit="%" label="Klientów wraca" desc="Powtórna współpraca to najczystszy sygnał, że proces działa." />
            <Stat value="48" unit="h" label="Czas reakcji" desc="Tyle maksymalnie czekasz na odpowiedź w trakcie współpracy." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { t: 'Odkrycie', d: 'Najpierw problem, nie rozwiązanie. Kontekst, cel, ograniczenia.', tf: '2–3 dni' },
    { t: 'Strategia', d: 'Decydujemy, co ma znaczenie, zanim cokolwiek powstanie.', tf: '3–5 dni' },
    { t: 'Projekt', d: 'System, hierarchia, pełne uzasadnienie każdej decyzji.', tf: '1–2 tyg.' },
    { t: 'Budowa', d: 'Wdrażamy dokładnie to, co zaprojektowano. Bez strat w tłumaczeniu.', tf: '4–8 tyg.' },
    { t: 'Start i rozwój', d: 'Uruchamiamy, gdy jest gotowe — nie wcześniej. Potem mierzymy i poprawiamy.', tf: 'stale' },
  ];
  return (
    <section id="proces" style={{ background: 'var(--sp-paper-2)', padding: '96px 0' }}>
      <div style={WRAP}>
        <Eyebrow note="Od myślenia do formy">Proces</Eyebrow>
        <h2 style={{ ...DISPLAY, fontSize: 'clamp(40px, 4.8vw, 72px)', margin: '28px 0 48px' }}>
          <span style={{ color: 'var(--sp-ghost)' }}>Nie zaczynamy od odpowiedzi.</span><br />
          Zaczynamy od właściwych pytań.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, borderLeft: '1px solid var(--sp-line)' }}>
          {steps.map((s, i) => (
            <div key={s.t} style={{ borderRight: '1px solid var(--sp-line)', borderTop: '1px solid var(--sp-line)', borderBottom: '1px solid var(--sp-line)', background: '#fff', padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 190, boxSizing: 'border-box' }}>
              <span style={{ ...MONO, color: 'var(--sp-red)' }}>/{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em' }}>{s.t}</span>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--sp-tx-2)', margin: 0, flex: 1 }}>{s.d}</p>
              <span style={{ ...MONO, color: 'var(--sp-tx-3)' }}>{s.tf}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quotes() {
  return (
    <section style={{ padding: '96px 0' }}>
      <div style={WRAP}>
        <Eyebrow note="Zaufanie trwa dłużej niż projekt">Opinie</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 40 }}>
          <QuoteCard quote="Skrócili nam ofertowanie z trzech dni do dwudziestu minut. Handlowcy w końcu sprzedają, nie kopiują dane." name="Marta Lis" role="COO, Hurtex" />
          <QuoteCard accent quote="Pierwsza agencja, która zapytała, ile mamy zarobić — zanim zapytała o kolory." name="Tomasz Gajda" role="Właściciel, Stalmet" />
          <QuoteCard quote="Panel zrobił w trzy miesiące to, czego poprzedni wykonawca nie domknął w rok." name="Anna Czerwińska" role="Dyrektor IT, Logistic Pro" />
        </div>
      </div>
    </section>
  );
}

function CtaPanel({ onCta }) {
  return (
    <section style={{ padding: '0 0 120px' }}>
      <div style={WRAP}>
        <div style={{ background: 'var(--sp-red)', borderRadius: 'var(--r-lg, 14px)', padding: 'clamp(40px, 6vw, 88px)', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <span style={{ ...MONO, color: 'rgba(255,255,255,.75)' }}>Pierwszy krok jest darmowy</span>
            <h2 style={{ ...DISPLAY, color: '#fff', fontSize: 'clamp(36px, 4.4vw, 64px)', marginTop: 20 }}>
              <span style={{ color: 'rgba(255,255,255,.55)' }}>Nie wysyłamy ofert z szuflady.</span><br />
              Zaczynamy od rozmowy.
            </h2>
          </div>
          <Button variant="inverse" size="lg" arrow onClick={onCta}>Umów rozmowę</Button>
        </div>
      </div>
    </section>
  );
}

export function Home({ onCta }) {
  return (
    <main>
      <Hero onCta={onCta} />
      <Services />
      <Projects />
      <Numbers />
      <Process />
      <Quotes />
      <CtaPanel onCta={onCta} />
    </main>
  );
}
