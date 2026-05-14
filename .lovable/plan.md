## Obiettivo

Trasformare CIRCLE in un'app **dark cinematic** ispirata al riferimento: fondali scuri con glow rosso/bordeaux, vetro smerigliato (glassmorphism), tipografia display molto grande, foto in bianco-e-nero con luce calda, chip pill morbidi, FAB tondi luminosi, micro-animazioni eleganti.

Nessun cambio di funzionalità: solo skin, design tokens e componenti UI.

---

## 1. Ridisegno design system (`src/styles.css`)

Passaggio a **tema dark di default** (stop alla dipendenza dalla classe `.dark`).

- Background base: nero caldo `oklch(0.13 0.015 25)`.
- Surface / card: vetro scuro traslucido + blur 28px + bordo `rgba(255,255,255,.06)`.
- Foreground: bianco caldo `oklch(0.97 0.01 60)`, muted `white/55`.
- Primary: rosso brand `oklch(0.62 0.22 25)` con variante glow `oklch(0.72 0.24 28)`.
- Nuovi token:
  - `--gradient-cinematic-bg`: radiale rosso-bordeaux dall'alto → nero in basso (lo "sfondo sala" visibile in tutta l'app).
  - `--gradient-ember`: rosso → ambra per CTA primarie, bubble inviati, FAB like.
  - `--gradient-text-display`: bianco → grigio caldo per titoli giganti.
  - `--shadow-ember`: glow rosso diffuso per FAB e bottoni primari.
  - `--shadow-lift`: ombra profonda nera per card in primo piano.
  - `--blur-glass`: 28px saturate(160%).
- Tipografia: heading `Inter Tight` semibold tracking `-0.04em` (display XL fino a 56px); body `Inter` 14/15px.
- `body` riceve il `bg-cinematic` fisso (attached) così tutte le pagine ereditano l'atmosfera.
- Utility nuove: `.glass-card`, `.glass-pill`, `.text-display`, `.bg-cinematic`, `.bg-ember`, `.ring-glow`, `.shadow-ember`.
- Ritiro graduale di `bg-paper`, `bg-login`, `text-ink/*`: sostituiti con i nuovi token.

## 2. Shell e navigazione

`AppShell`, `BottomNav`, `__root`:

- Header: trasparente con blur, titolo display grande, avatar tondo a sinistra, icona "filtro/discover" tonda glass a destra (vedi mock "Doris Crawford").
- BottomNav: pill **galleggiante** centrata, vetro scuro, icone monocrome, tab attiva con pillola rossa glow + icona bianca; tab centrale CIRCLE come FAB più grande in gradient ember + `shadow-ember`.
- Safe area paddings, edge-to-edge, niente più sfondo paper.

## 3. Componenti riusabili

Stessa firma, nuova pelle:

- `Chip` → **glass-pill** scuro con bordo alpha; varianti `solid` (ember) e `ghost`.
- `JobCard` e card profilo → **glass-card** con foto B/N desaturata + tinta rossa ambient overlay; titolo display, meta riga discreta, CTA tonda ember in basso a destra.
- `SwipeStack`: card fullbleed con foto B/N + gradient overlay in basso; nome in display XL bianco; chip skill orizzontali; tre FAB tondi (skip / info / like) — like centrale grande in ember con glow, come nel riferimento.
- `MatchModal`: schermata immersiva con radiale ember, due avatar tondi che si avvicinano con glow, titolo display "È un match", CTA "Scrivi ora" pill ember.
- `ProfileDetailSheet`, `FiltersSheet`, `ShareSheet`: bottom sheet vetro scuro con drag handle e divider sottili.

## 4. Reskin per schermata

Stessa logica per ogni route: `bg-cinematic` ereditato, header glass, contenuto in glass-card, accenti ember.

- **welcome**: hero display gigante, card "loggato come Guido Gargiullo" già in dark glass, CTA pill ember con badge IMDb.
- **role**, **subscription**: card scelta in glass-card, bordo che diventa ember se selezionata.
- **index** / **search**: griglia foto B/N stile "Explore" del riferimento (mosaico 2×N), chip filtri glass in alto, FAB filtro tondo a destra.
- **jobs** + **jobs.$id** + **apply.$id**: card annunci glass scuri, tag ruolo come glass-pill, CTA "Candidati" ember.
- **community** (Circle/swipe): adottare il layout centrale del mock — foto fullbleed, nome display XL in basso, chip skill scorrevoli, tre FAB; striscia avatar in basso opzionale.
- **messages** + **messages.$id**: lista chat con avatar + dot online verde, nome display, anteprima muted; thread con bubble inviati in gradient ember e ricevuti in glass scuro; input "Scrivi un messaggio…" pill vetro con FAB invio ember.
- **profile**, **producer**, **studio**, **marketplace**, **film-commission**, **applications**, **saved**, **notifications**, **settings**: header display + sezioni glass-card, divider sottili, niente toni paper.

## 5. Micro-interazioni (framer-motion)

- Fade + rise (12px, 600ms) su hero e card all'ingresso.
- Scale 0.97 attivo sui bottoni.
- Glow pulse leggero sul FAB centrale CIRCLE.
- Tilt parallax raffinato sulla card profilo durante lo swipe (già esistente, da rifinire).
- Transizioni schermata: opacity + y 8px (no slide pesanti).

## 6. Asset

- Generare 4–5 ritratti B/N cinematografici (luce rossa ambient) per swipe, profile, messages, home.
- Background grain + vignette rossa opzionale come overlay `.bg-cinematic`.

---

## Tecnico

- Sostituzioni globali con `rg`: `bg-card`, `border-ink/10`, `bg-white`, `text-ink/*` → `glass-card` / `border-white/10` / `text-foreground/*`.
- Root applica `bg-cinematic` su `<body>` + un wrapper fisso z-index -1 con `--gradient-cinematic-bg`.
- Niente toggle light/dark in questo round.
- Nessun cambio a routing, mock data (a parte i nuovi path immagine), o logica swipe / match / IMDb.

## Fuori scopo

- Niente refactor strutturale dei componenti oltre lo styling (firma invariata).
- Nessuna modifica auth o business logic.
- Non si tocca `mock-data.ts` se non per aggiungere nuovi asset.
