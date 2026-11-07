# The Salon

Landing page per presentare il progetto di un’app dedicata alla lettura e invitare a seguirne lo sviluppo sui profili social.

## Stato attuale

Landing Astro statica con pnpm e componenti React per le interazioni. La grafica segue l’handoff Claude Design del 7 novembre 2026: carta avorio, prugna, lilla e giallo caldo; nuovi logo, illustrazioni, font e struttura.

Libreria dimostrativa con ricerca, tre ripiani, spostamenti, orientamento dei volumi, colori, pareti, lucine e decorazioni. Carosello continuo con apertura della scheda libro. Diario con valutazioni e scelta privata/condivisa collegata alla preview della community. “Save changes” conserva la libreria in questo browser; il pulsante appare solo per le modifiche non salvate. Gli altri dati restano in memoria e si ripristinano ricaricando la pagina: nessun account, backend o pubblicazione reale dei testi.

Tutti i 21 personaggi e animaletti approvati sono conservati: compaiono nella scena iniziale e, per saga, accanto alle citazioni. Nella libreria piccola possono comparire solo gli animaletti, negli spazi liberi dei ripiani. Le illustrazioni sono caricate una alla volta; il giro senza ripetizioni viene ricordato nel browser. Movimento ridotto rispettato, finestre utilizzabili da tastiera e layout adattato al telefono.

Le modifiche rimangono locali: non sono state inviate a GitHub né pubblicate su Vercel. I collegamenti social verranno aggiunti quando saranno disponibili gli URL reali.

Repository: https://github.com/xZezza/LaCasaDelLibro

## Comandi

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

- `pnpm dev`: anteprima locale durante lo sviluppo.
- `pnpm build`: genera il sito statico nella cartella `dist/`.
- `pnpm preview`: mostra localmente il sito generato.

Usare pnpm 11.15.0, come indicato in `package.json`; conservare `pnpm-lock.yaml` nella repository.

## Vercel

- Repository: `xZezza/LaCasaDelLibro`.
- Application Preset: Astro.
- Root Directory: `./`.
- Build Command: `pnpm build`.
- Output Directory: `dist`.
- Lasciare inizialmente il rilevamento automatico del package manager, basato sul lockfile.
- Per usare esattamente la versione pnpm dichiarata, abilitare Corepack nelle impostazioni Vercel (`ENABLE_EXPERIMENTAL_COREPACK=1`).
- Per questa base non servono API key, database o altre variabili d’ambiente.

Il progetto è già collegato a GitHub e Vercel. Le nuove modifiche locali diventeranno online soltanto dopo un push autorizzato e il relativo deployment.

La bozza usa `noindex, nofollow`; rimuovere questa direttiva quando la landing definitiva sarà pronta per essere indicizzata.

## Contenuti

Le decisioni già definite e quelle ancora aperte sono in `docs/brief.md`.

## Struttura della nuova landing

- `src/pages/index.astro`: pagina statica, metadati e font.
- `src/components/landing/`: sezioni del nuovo handoff, logica interattiva e stili.
- `public/images/claude/`: illustrazioni e logo del nuovo design.
- `public/images/characters/`: personaggi e compagni conservati dalla versione precedente.
- `src/data/library-visitors.json`: catalogo delle 21 comparse.
- `docs/brief-before-claude-2026-11-07.md`: decisioni della vecchia versione, solo come storico.

Il codice di anteprima proprietario di Claude (`support.js`, `sc-for`, `sc-if`, `DCLogic`) è stato convertito in normali componenti React. Non è necessario per eseguire o pubblicare il sito. I componenti della precedente landing rimangono disponibili come archivio e non vengono caricati dalla nuova pagina.
