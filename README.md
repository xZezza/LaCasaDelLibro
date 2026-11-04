# La casa del libro

Landing page per presentare il progetto di un’app dedicata alla lettura e invitare a seguirne lo sviluppo sui profili social.

## Stato attuale

Base tecnica Astro con pnpm. La pagina iniziale contiene soltanto un messaggio di preparazione: testi e grafica della landing devono ancora essere sviluppati.

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

La pubblicazione su Vercel è un passaggio successivo. Prima occorre caricare i file su GitHub e verificare lo spazio Vercel e il piano adatti al progetto.

La pagina di preparazione usa `noindex, nofollow`; aggiornare questa scelta quando la landing definitiva sarà pronta per il pubblico.

## Contenuti

Le decisioni già definite e quelle ancora aperte sono in `docs/brief.md`.
