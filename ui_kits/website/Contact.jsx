/* global React */
/* Smart Pixel — UI kit: kontakt */
import { Button } from '../../components/core/Button.jsx';
import { ArrowLink } from '../../components/core/ArrowLink.jsx';
import { Eyebrow } from '../../components/core/Eyebrow.jsx';
import { Input } from '../../components/forms/Input.jsx';
import { Textarea } from '../../components/forms/Textarea.jsx';
import { Select } from '../../components/forms/Select.jsx';

const WRAP2 = { maxWidth: 'var(--container, 1320px)', margin: '0 auto', padding: '0 var(--gutter, 48px)' };
const MONO2 = { fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)", fontSize: 11.5, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' };
const DISPLAY2 = { fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 700, letterSpacing: '-0.01em' };
const EMAIL = 'piotr@smartpixel.pl';

function PersonCard() {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--sp-line)', borderRadius: 'var(--r-lg, 14px)', overflow: 'hidden' }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 5', background: 'var(--sp-paper-2)' }}>
        <img
          src="piotr-bak.jpg"
          alt="Piotr Bąk — Founder &amp; CEO Smart Pixel"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%' }}
        />
      </div>
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <div style={{ ...MONO2, color: 'var(--sp-red)', marginBottom: 8 }}>Founder &amp; CEO</div>
          <h3 style={{ ...DISPLAY2, fontWeight: 800, fontSize: 28, margin: 0, lineHeight: 1 }}>Piotr Bąk</h3>
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--sp-tx-2)', margin: 0 }}>
          Za każdym projektem stoi konkretna osoba. U nas to ja — czytam każde
          zapytanie osobiście, odbieram telefon i prowadzę współpracę od pierwszej
          rozmowy do startu. Bez działu obsługi pomiędzy.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4, borderTop: '1px solid var(--sp-line)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ ...MONO2, color: 'var(--sp-tx-3)' }}>E-mail</span>
            <a href={`mailto:${EMAIL}`} style={{ ...DISPLAY2, fontWeight: 700, fontSize: 16, color: 'var(--sp-ink)', textDecoration: 'none', borderBottom: '1px solid var(--sp-red)', paddingBottom: 2, alignSelf: 'flex-start' }}>{EMAIL}</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ ...MONO2, color: 'var(--sp-tx-3)' }}>Telefon</span>
            <a href="tel:+48798690557" style={{ ...DISPLAY2, fontWeight: 700, fontSize: 16, color: 'var(--sp-ink)', textDecoration: 'none' }}>798 690 557</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', topic: '', budget: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = `Zapytanie ze strony — ${form.topic || 'projekt'}`;
    const body = [
      `Imię i nazwisko: ${form.name}`,
      `E-mail: ${form.email}`,
      form.phone ? `Telefon: ${form.phone}` : null,
      `Zakres: ${form.topic}`,
      form.budget ? `Budżet: ${form.budget}` : null,
      '',
      'O projekcie:',
      form.message,
    ].filter((l) => l !== null).join('\r\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <main style={{ padding: '96px 0 120px' }}>
      <div style={WRAP2}>
        <Eyebrow note="Odpowiadamy w 48 h">Kontakt</Eyebrow>
        <h1 style={{ fontFamily: "var(--font-display, 'Archivo', sans-serif)", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.025em', lineHeight: 0.97, fontSize: 'clamp(44px, 6vw, 92px)', margin: '28px 0 56px' }}>
          <span style={{ color: 'var(--sp-ghost)', display: 'block' }}>Bez pitchu.</span>
          <span>Po prostu <span style={{ color: 'var(--sp-red)' }}>rozmowa.</span></span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.5fr) minmax(280px, 1fr)', gap: 64, alignItems: 'start' }}>
          {sent ? (
            <div style={{ background: '#fff', border: '1px solid var(--sp-line)', borderRadius: 'var(--r-lg, 14px)', padding: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
              <span aria-hidden="true" style={{ width: 12, height: 12, background: 'var(--sp-ok)' }}></span>
              <h3 style={{ ...DISPLAY2, fontWeight: 700, fontSize: 26, margin: 0 }}>Gotowe — otwieramy Twoją pocztę.</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--sp-tx-2)', margin: 0, maxWidth: 460 }}>
                Przygotowaliśmy gotową wiadomość do <strong>{EMAIL}</strong> z Twoimi danymi —
                wystarczy ją wysłać w kliencie poczty. Jeśli okno się nie otworzyło, napisz
                bezpośrednio na <a href={`mailto:${EMAIL}`} style={{ color: 'var(--sp-red)', textDecoration: 'none', borderBottom: '1px solid var(--sp-red)' }}>{EMAIL}</a>.
                Czytam każde zgłoszenie osobiście i odzywam się w ciągu 48 godzin.
              </p>
              <Button variant="outline" onClick={() => setSent(false)}>Wróć do formularza</Button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 20px' }}>
              <Input label="Imię i nazwisko" placeholder="Jan Kowalski" required value={form.name} onChange={set('name')} />
              <Input label="E-mail" type="email" placeholder="jan@firma.pl" required value={form.email} onChange={set('email')} />
              <Select
                label="Czego potrzebujesz?"
                required
                options={['Strona www', 'Aplikacja webowa', 'Automatyzacja', 'Nie wiem — doradźcie']}
                value={form.topic}
                onChange={set('topic')}
              />
              <Input label="Telefon (opcjonalnie)" type="tel" placeholder="+48 600 000 000" value={form.phone} onChange={set('phone')} />
              <Input label="Budżet (orientacyjnie)" placeholder="np. 20–40 tys. zł" value={form.budget} onChange={set('budget')} style={{ gridColumn: '1 / -1' }} />
              <Textarea label="O projekcie" placeholder="Co budujemy i po co? Dwa zdania wystarczą." rows={5} required value={form.message} onChange={set('message')} style={{ gridColumn: '1 / -1' }} />
              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <Button variant="primary" size="lg" arrow type="submit">Wyślij zapytanie</Button>
                <span style={{ ...MONO2, color: 'var(--sp-tx-3)' }}>Trafia prosto do Piotra. Zero spamu.</span>
              </div>
            </form>
          )}
          <aside>
            <PersonCard />
          </aside>
        </div>
      </div>
    </main>
  );
}
