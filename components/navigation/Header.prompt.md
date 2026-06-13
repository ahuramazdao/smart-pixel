Sticky header: logo Smart Pixel, mono nav (aktywny link = czerwone podkreślenie), outline CTA (zalewka ink na hover).

```jsx
<Header
  links={[{label:'Projekty',href:'#projekty'},{label:'Usługi',href:'#uslugi'},{label:'Proces',href:'#proces'}]}
  active="#projekty" onNavigate={go} onCta={() => go('#kontakt')}
/>
```

`SPLogo` (eksport pomocniczy) — lockup w SVG, `white` na ciemne tła.
