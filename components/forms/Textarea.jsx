/* global React */
/* Smart Pixel — Textarea */

export function Textarea({ label, placeholder, value, onChange, rows = 4, required = false, dark = false, style: extra = {} }) {
  const [focus, setFocus] = React.useState(false);
  const mono = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 10.5, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' };
  return (
    <label style={{ display: 'block', minWidth: 0, ...extra }}>
      {label && (
        <span style={{ ...mono, color: dark ? 'var(--sp-txd-2, rgba(255,255,255,.68))' : 'var(--sp-tx-2, #5C5B57)', display: 'block', marginBottom: 8 }}>
          {label}{required && <span style={{ color: 'var(--sp-red, #F0391C)' }}> *</span>}
        </span>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-body, 'Archivo', sans-serif)", fontSize: 15, lineHeight: 1.5,
          width: '100%', boxSizing: 'border-box', padding: '13px 14px', resize: 'vertical',
          borderRadius: 4, outline: 'none',
          background: dark ? 'var(--sp-ink-2, #18191C)' : '#fff',
          color: dark ? '#fff' : 'var(--sp-ink, #101113)',
          border: `1px solid ${focus ? 'var(--sp-red, #F0391C)' : dark ? 'var(--sp-line-d, rgba(255,255,255,.14))' : 'var(--sp-line, #E2DFD7)'}`,
          boxShadow: focus ? '0 0 0 3px rgba(240,57,28,.14)' : 'none',
          transition: 'border-color 140ms, box-shadow 140ms',
        }}
      />
    </label>
  );
}
