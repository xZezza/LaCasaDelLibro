# The Salon

- Usare pnpm per installazioni e comandi; mantenere un solo lockfile, `pnpm-lock.yaml`.
- Il progetto è una landing Astro statica destinata a Vercel.
- Usare il nome ufficiale “The Salon”.
- Leggere `docs/brief.md` per obiettivo, decisioni confermate e stato del lavoro.
- I testi rivolti al pubblico sono in inglese. Le comunicazioni con Gaia restano in italiano.
- Non inventare link social, testimonianze, numeri di utenti o funzioni già disponibili.
- Aggiornare il brief quando la conversazione modifica una decisione di prodotto.
- Prima della consegna di modifiche al sito, eseguire `pnpm check`, `pnpm test`, `pnpm build` e verificare il percorso interessato in anteprima quando disponibile.

- Mantenere le modifiche locali: niente push su GitHub o deploy finché l’utente non li richiede esplicitamente.
- Breakpoint unici: desktop sopra 960px; tablet 651–960px (`@media (max-width: 960px)`, solo-tablet con `and (min-width: 651px)`); telefono fino a 650px (`@media (max-width: 650px)`). Limite massimo del layout desktop: 1440px, con margini simmetrici oltre questa larghezza.

- Dal 7 novembre 2026 l’handoff Claude Design sostituisce la precedente grafica. Riferimento attivo: `docs/brief.md`; il vecchio brief è stato rimosso su richiesta di Gaia.
- Conservare tutti i personaggi e animaletti approvati: non eliminare o sovrascrivere `public/images/characters/`, `src/data/library-visitors.json` e i documenti di provenienza. Le comparse attive della nuova landing sono in `src/components/landing/StoryGuests/index.jsx`.

- Organizzazione: ogni componente visivo in `src/components/landing/NomeComponente/index.jsx`, con `styles.css` importato nello stesso componente. Dati in `src/data/`, hook in `src/hooks/`, utility in `src/lib/`, configurazione in `src/config/`.
- Ordine CSS dichiarato in `src/styles/global.css`: components → refinements → guests → responsive. Conservare questo ordine per non perdere le rifiniture precedenti. Gli stili realmente condivisi sono in components/landing/shared; global.css contiene solo fondamenti, token e accessibilità generale. Non aggiungere fogli di override generici.
- Asset attivi in `public/images/{branding,hero,community,decorations,characters}`; favicon e manifest nella radice pubblica. Non reintrodurre gli asset della vecchia landing nel build.
