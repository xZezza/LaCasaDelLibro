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

## Struttura

- `src/pages/index.astro`: ingresso della pagina, metadati, font e favicon.
- `src/components/landing/index.jsx`: composizione delle sezioni.
- `src/components/landing/NomeComponente/index.jsx` e `styles.css`: componente e stile nella stessa cartella.
- `src/components/landing/LandingController.js`: stato condiviso e azioni della dimostrazione.
- `src/data/landing/`: catalogo dimostrativo, colori e configurazioni dei libri.
- `src/data/library-visitors.json`: catalogo delle comparse approvate.
- `src/hooks/`: comportamento riutilizzabile, come il ridimensionamento della finestra della libreria.
- `src/lib/`: utility per serializzare la libreria.
- `src/config/breakpoints.js`: soglie dei dispositivi usate dal comportamento JavaScript.
- `src/styles/global.css`: fondazioni e stili condivisi tra sezioni.
- `public/images/`: sottocartelle `branding`, `hero`, `community`, `decorations`, `characters`.
- `tests/`: controlli sullo stato della libreria; `scripts/check-project.mjs`: verifica della struttura e degli asset.

Gli stili restano vicini al componente. Le regole comuni sono condivise; l’ordine dei livelli CSS è dichiarato una volta nelle fondazioni: `components`, `refinements`, `guests`, `responsive`. Questo conserva le priorità delle rifiniture e delle comparse dopo il riordino.

## Dispositivi

| Fascia | Larghezza |
| --- | --- |
| Desktop | oltre 960 px, senza limite massimo rigido |
| Tablet | da 651 a 960 px inclusi |
| Telefono | fino a 650 px incluso |

Il desktop resta fluido anche su schermi più grandi di 1440 px. Le sezioni principali usano due colonne su desktop e una su tablet/telefono. La libreria entra nella schermata desktop; sui dispositivi più piccoli può scorrere verticalmente.

## Controlli

```sh
pnpm check
pnpm test
pnpm build
```

Il primo comando controlla import, raggiungibilità dei file, riferimenti alle immagini, comparse approvate, manifest e soglie responsive. I test verificano salvataggio/annullamento, spostamento dei libri, animali fissi e geometria dei volumi. La build genera il sito statico.

Il codice e gli asset della precedente landing sono stati tolti dai percorsi attivi dopo aver creato un archivio locale completo. I 21 personaggi/animali approvati, le varianti originali e i documenti di provenienza sono conservati. Vedi `docs/code-review-2026-11-07.md` per controlli e archivio.
