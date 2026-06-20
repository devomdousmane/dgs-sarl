# Page Override: Home (/)
> Surcharge du MASTER.md pour la page d'accueil uniquement.

## Déviations

### Scènes et pattern
- Pattern: **Horizontal Scroll Journey** (scroll-jacking par scènes 500vh/420vh)
- 9 scènes : Hero → Immobilier → Interior → Auto → Construction → Gallery → Vision → Numbers → Contact

### Couleurs spécifiques
- Hero (Scene1) : overlays `rgba(10,10,10,…)` hardcodés — toujours sombre (sur vidéo)
- Scene4 Auto : overlay cinéma `rgba(10,10,10,…)` hardcodé — effet night cinéma
- Scene6 Gallery desktop : GSAP horizontal scroll, désactivé si `prefers-reduced-motion`

### Typographie hero
```css
font-size: clamp(2.8rem, 10vw, 10rem);
line-height: 0.82;
font-weight: 800;
```

### Chargement
- Loader initial avec animation puis `display: none` après mount
- Lenis smooth scroll (désactivé si `prefers-reduced-motion`)
