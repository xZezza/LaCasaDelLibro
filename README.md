# The Salon

Landing page per presentare il progetto di un’app dedicata alla lettura e invitare a seguirne lo sviluppo sui profili social.

## Stato attuale

Landing locale Astro con pnpm: logo libro/segnalibro oro e favicon verde, navbar trasparente, atmosfera giorno/notte, libreria con dorsi fotografici e spostamento dei libri, carosello continuo con frecce e trackpad. Anteprime del diario in stile quaderno e della community, con brani condivisi e forum dimostrativi. Layout responsive; movimento ridotto rispettato.

Diario, profili e risposte sono esempi interattivi locali: nessun backend e nessuna pubblicazione dei testi. Il comando Rotate è stato rimosso; il volume mantiene una vista 3D fissa.

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
