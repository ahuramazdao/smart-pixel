/* global React */
/* Smart Pixel — Select */

export function Select({ label, options = [], value, onChange, placeholder = 'Wybierz…', required = false, dark = false, style: extra = {} }) {
  const [focus, setFocus] = React.useState(false);
  const mono = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 10.5, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' };
  return (
    <label style={{ display: 'block', minWidth: 0, position: 'relative', ...extra }}>
      {label && (
        <span style={{ ...mono, color: dark ? 'var(--sp-txd-2, rgba(255,255,255,.68))' : 'var(--sp-tx-2, #5C5B57)', display: 'block', marginBottom: 8 }}>
          {label}{required && <span style={{ color: 'var(--sp-red, #F0391C)' }}> *</span>}
        </span>
      )}
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            fontFamily: "var(--font-body, 'Archivo', sans-serif)", fontSize: 15,
            width: '100%', boxSizing: 'border-box', padding: '13px 38px 13px 14px',
            borderRadius: 4, outline: 'none', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
            background: dark ? 'var(--sp-ink-2, #18191C)' : '#fff',
            color: value ? (dark ? '#fff' : 'var(--sp-ink, #101113)') : 'var(--sp-tx-3, #8B8983)',
            border: `1px solid ${focus ? 'var(--sp-red, #F0391C)' : dark ? 'var(--sp-line-d, rgba(255,255,255,.14))' : 'var(--sp-line, #E2DFD7)'}`,
            boxShadow: focus ? '0 0 0 3px rgba(240,57,28,.14)' : 'none',
            transition: 'border-color 140ms, box-shadow 140ms',
          }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span aria-hidden="true" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-58%) rotate(90deg)', fontFamily: "var(--font-display, 'Archivo', sans-serif)", color: 'var(--sp-red, #F0391C)', pointerEvents: 'none', fontSize: 15 }}>→</span>
      </div>
    </label>
  );
}
