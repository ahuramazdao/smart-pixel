Pill button — primary jest czerwony i może wystąpić maksymalnie raz na widok; pozostałe warianty niosą resztę akcji.

```jsx
<Button variant="primary" arrow>Umów rozmowę</Button>
<Button variant="outline">Zobacz projekty</Button>
<Button variant="inverse" size="sm">Na ciemnym tle</Button>
```

Warianty: `primary` (red→red-hover), `dark` (ink→ink-3), `outline` (zalewka ink na hover), `ghost`, `inverse` (biały, na ink/red). Rozmiary `sm|md|lg`. `arrow` dodaje → z przesunięciem +4px na hover. `as="a"` + `href` renderuje link.
