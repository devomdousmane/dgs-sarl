# DGS SARL — Design System MASTER
> Source de vérité globale. Les fichiers `pages/` peuvent surcharger des règles spécifiques.

---

## 1. Identité de marque

**Société :** D Global Services SARL  
**Secteurs :** BTP & Génie Civil · Immobilier · Automobile  
**Positionnement :** Groupe multi-métiers de référence en Guinée — excellence, rigueur, durabilité  
**Style UI :** Exaggerated Minimalism × Dark OLED Luxury  
**Pattern de page :** Horizontal Scroll Journey (storytelling par scènes)

---

## 2. Palette de couleurs

### Couleurs de marque (extraites du logo officiel)

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| **Brand Red** | Rouge DGS | `#CC1418` | CTA primaires, accents, logo, lignes de séparation |
| **Brand Red Dark** | Rouge foncé | `#A50F12` | Hover sur CTA rouges |
| **Brand Red Glow** | Rouge glow | `#CC1418/20` | Ombre portée, halo décoratif |
| **Brand Gold** | Or DGS | `#B8966E` | Titres secondaires, eyebrows, icônes premium |
| **Brand Gold Light** | Or clair | `#D4AF8A` | Hover sur éléments gold |
| **Brand Gold Muted** | Or atténué | `#8A6E50` | Texte tertiaire gold |

### Thème sombre (mode dark — défaut)

| Variable CSS | Hex | Usage |
|-------------|-----|-------|
| `--bg` | `#0A0A0A` | Fond principal (OLED deep black) |
| `--bg-2` | `#111111` | Cartes, panneaux, surfaces élevées |
| `--bg-3` | `#1A1A1A` | Hover states, inputs, surfaces tertiaires |
| `--fg` | `#F4F1EB` | Texte principal (warm white, non pur pour éviter fatigue) |
| `--fg-muted` | `rgba(244,241,235,0.65)` | Texte secondaire, descriptions |
| `--fg-subtle` | `rgba(244,241,235,0.38)` | Texte tertiaire, métadonnées, placeholders |
| `--border` | `rgba(244,241,235,0.08)` | Bordures subtiles |
| `--glass-bg` | `rgba(17,17,17,0.85)` | Navbar glassmorphism |

### Thème clair (mode light)

| Variable CSS | Hex | Usage |
|-------------|-----|-------|
| `--bg` | `#FAFAF8` | Fond chaud (non pur blanc) |
| `--bg-2` | `#F0EDE6` | Cartes, surfaces |
| `--bg-3` | `#E8E4DC` | Hover, inputs |
| `--fg` | `#1A1614` | Texte principal (charcoal chaud) |
| `--fg-muted` | `rgba(26,22,20,0.65)` | Texte secondaire |
| `--fg-subtle` | `rgba(26,22,20,0.40)` | Texte tertiaire |
| `--border` | `rgba(26,22,20,0.12)` | Bordures visibles en light mode |
| `--glass-bg` | `rgba(250,250,248,0.88)` | Navbar glassmorphism light |

### Couleurs fonctionnelles (toujours hardcodées, jamais via CSS var)

| Couleur | Hex | Raison |
|---------|-----|--------|
| Rouge CTA | `#CC1418` | Couleur de marque, invariable |
| Or accent | `#B8966E` | Couleur de marque, invariante |
| WhatsApp | `#25D366` | Couleur plateforme officielle |
| Overlay hero | `rgba(10,10,10,…)` | Toujours sombre — sur image/vidéo |
| Overlay cinéma | `rgba(0,0,0,…)` | Toujours sombre — scènes night |

---

## 3. Typographie

### Polices actuelles (déjà en production)

| Rôle | Famille | Variable Tailwind | Caractère |
|------|---------|-------------------|-----------|
| **Heading** | Clash Display | `font-heading` | Ultra-bold, géométrique, modern construction |
| **Display / Italic** | Satoshi | `font-display` | Élégant, italic, éditorial |
| **Body** | Satoshi | `font-body` | Lisible, professionnel, neutre |

### Règles typographiques

```css
/* Titres héros */
font-size: clamp(2.8rem, 10vw, 10rem);
font-weight: 800;
line-height: 0.82;
letter-spacing: -0.02em;
text-transform: uppercase;

/* Titres section */
font-size: clamp(2rem, 6vw, 6rem);
font-weight: 700;
line-height: 0.85;
letter-spacing: -0.01em;

/* Eyebrows / Labels */
font-size: 10px;
letter-spacing: 0.4em;
text-transform: uppercase;
color: #B8966E;

/* Corps de texte */
font-size: clamp(0.9rem, 1.5vw, 1.125rem);
line-height: 1.65;
font-weight: 300–400;

/* Texte muted */
color: var(--fg-muted);
max-width: 65ch; /* longueur de ligne max */
```

---

## 4. Espacement & Layout

```css
/* Container */
max-width: 1280px;
margin: 0 auto;
padding: 0 1.5rem; /* mobile */
padding: 0 3.5rem; /* desktop (md+) */

/* Sections */
padding-top: clamp(5rem, 10vw, 11rem);
padding-bottom: clamp(5rem, 10vw, 11rem);

/* Gap grilles */
gap: 1.5rem; /* mobile */
gap: 2rem;   /* desktop */
```

### Grille Z-index

| Niveau | Valeur | Usage |
|--------|--------|-------|
| Base | `z-0` | Arrière-plans, images |
| Content | `z-10` | Overlays, gradients |
| UI | `z-20` | Texte des scènes |
| Float | `z-30` | Éléments flottants |
| Overlay | `z-40` | Modales légères |
| Cursor | `z-50` | Curseur custom |
| Navbar | `z-[60]` | Navigation sticky |
| Loader | `z-[100]` | Loader initial |

---

## 5. Composants & Effets visuels

### Boutons

```css
/* CTA Principal — Rouge */
background: #CC1418;
color: #FFFFFF;
font-size: 11px;
letter-spacing: 0.28em;
text-transform: uppercase;
padding: 1rem 2rem;
min-height: 52px; /* touch target */
transition: background 300ms;
hover: background #A50F12;

/* CTA Secondaire — Outline */
border: 1px solid rgba(244,241,235,0.3);
color: var(--fg);
hover: border-color #CC1418, background rgba(204,20,24,0.1);

/* CTA Gold */
color: #B8966E;
border: 1px solid rgba(184,150,110,0.4);
hover: border-color #B8966E, background rgba(184,150,110,0.08);
```

### Cartes

```css
background: var(--bg-2);
border: 1px solid var(--border);
/* Pas de border-radius sur les cartes principales — style architectural */
border-radius: 0;

/* Hover */
.card:hover { border-color: rgba(184,150,110,0.3); }
```

### Ligne de séparation luxe (`.hr-luxury`)

```css
height: 1px;
background: linear-gradient(to right, transparent, #B8966E, transparent);
```

### Glassmorphism navbar

```css
background: var(--glass-bg);
backdrop-filter: blur(20px);
border-bottom: 1px solid var(--border);
```

### Glass rouge (`.glass-rouge`)

```css
background: rgba(204, 20, 24, 0.08);
border: 1px solid rgba(204, 20, 24, 0.2);
backdrop-filter: blur(10px);
```

---

## 6. Animations & Motion

### Règles générales

```css
/* Micro-interactions */
transition-duration: 150–300ms;
transition-timing-function: ease (cubic-bezier recommandé: [0.16, 1, 0.3, 1]);

/* Entrées de sections */
initial: { opacity: 0, y: 40 }
animate: { opacity: 1, y: 0 }
duration: 0.8–1.2s
ease: [0.16, 1, 0.3, 1] (spring-like)

/* Parallax */
utiliser: useTransform() de Framer Motion
amplitude: ±5% à ±10% max (subtil)
toujours conditionnel: if (shouldReduce) retourner valeur neutre
```

### Respect prefers-reduced-motion

```tsx
// Toutes les scènes avec parallax / scroll-jacking
const shouldReduce = useReducedMotion()
const bgY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['-8%', '8%'])

// Lenis (SmoothScroll.tsx)
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

// GSAP (Scene6Gallery)
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
```

---

## 7. Accessibilité

| Règle | Valeur | Status |
|-------|--------|--------|
| Contraste texte normal | 4.5:1 minimum | ✅ |
| Contraste texte large | 3:1 minimum | ✅ |
| Touch targets | 44px minimum | ✅ (`min-h-[52px]`) |
| Focus rings | `focus:ring-2 focus:ring-[#B8966E]` | ✅ |
| Alt text images | Descriptif | ✅ |
| Labels formulaires | `<label htmlFor>` | ✅ |
| Reduced motion CSS | `@media (prefers-reduced-motion)` | ✅ |
| Reduced motion JS | `useReducedMotion()` + `matchMedia` | ✅ |

---

## 8. Icônes

- **Bibliothèque :** SVG inline uniquement (Heroicons style, viewBox 16×16 ou 24×24)
- **Taille standard :** `w-4 h-4` (small), `w-5 h-5` (medium), `w-6 h-6` (large)
- **Couleur :** `currentColor` (hérite du parent)
- **Interdits :** emojis comme icônes UI

---

## 9. Images & Médias

```tsx
// Next.js Image — toujours avec sizes
<Image
  src="..."
  alt="Description précise — DGS SARL [contexte]"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>

// Formats : WebP en priorité, JPEG fallback
// Videos : MP4 h.264, poster obligatoire
// Lazy loading : par défaut (sauf images above-the-fold → priority)
```

---

## 10. Responsive Breakpoints

| Breakpoint | Largeur | Usage |
|------------|---------|-------|
| Mobile | 375px | Base design |
| Tablet | 768px | `md:` — grilles 2 cols, marges +  |
| Desktop | 1024px | `lg:` — layouts 2–3 cols |
| Large | 1440px | `xl:` — max-width container atteint |

---

## 11. Anti-patterns à éviter

- Gradients violet/rose IA (Canva style)
- `border-radius` sur les éléments architecturaux (cartes, sections)
- Texte `color: white` pur en dark mode (utiliser `#F4F1EB`)
- Hardcoder des neutres (`#0A0A0A`, `#111111`, `#F4F1EB`) hors overlays hero
- Deux attributs `style` sur le même élément JSX
- Emojis comme icônes
- `outline-none` sans focus ring de remplacement
- Lenis / GSAP sans vérification `prefers-reduced-motion`

---

## 12. Stack technique

| Technologie | Version | Notes |
|------------|---------|-------|
| Next.js | 16 | App Router, static export |
| React | 19 | `'use client'` sur composants interactifs |
| TypeScript | strict: false | moduleResolution: bundler |
| Tailwind | v4 (CSS-first) | `@theme` dans globals.css |
| Framer Motion | via `motion/react` | useReducedMotion obligatoire |
| GSAP + ScrollTrigger | latest | Scene6 uniquement, guard reduced-motion |
| Lenis | latest | SmoothScroll, guard reduced-motion |

---

*Généré le 2026-06-19 · Basé sur les visuels officiels DGS SARL (docs/IMG-20260609-WA0023.jpg)*
