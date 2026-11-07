# Migrazione Claude Design — 7 novembre 2026

## Consegna locale
Nuovo riferimento: `design_handoff_the_salon` fornito da Gaia. Le sezioni HTML e la logica del prototipo sono state convertite in componenti React, renderizzati staticamente da Astro e attivati nel browser. Non viene caricato il runtime proprietario del prototipo. I precedenti componenti non sono più importati dalla pagina principale e restano conservati.

## Protezione dei contenuti
Verificati con SHA-256 tutti i 27 file del manifesto di protezione: nessuna differenza rispetto alla copia precedente alla migrazione. Include asset dei personaggi, catalogo, componente originale e documentazione. Le 21 comparse funzionano nella nuova finestra della libreria; caricano solo l’immagine scelta e conservano il giro senza ripetizioni nel browser.

Copie di sicurezza nello spazio di lavoro Documents/ChatGPT/LaCasaDelLibro/work/backups:
- the-salon-before-claude-handoff-2026-11-07.tar.gz
- design-handoff-claude-2026-11-07.tar.gz
- preserved-characters-2026-11-07.json

## Controlli effettuati
- `pnpm build`: completato senza errori.
- `git diff --check`: completato senza errori.
- Pagina locale: risposta HTTP 200, nessun errore o avviso nella console durante i percorsi verificati.
- Desktop 1280 px, tablet 768 px, telefoni 390 e 320 px: nessuno scorrimento orizzontale della pagina.
- Hero del telefono: illustrazione separata dal testo per mantenerlo leggibile; navbar adattata.
- Libreria: ricerca Harry Potter e aggiunta a Read, trascinamento di Hunger Games dal ripiano superiore al centrale, disposizione orizzontale e aggiunta del cactus.
- Scheda libro del carosello: apertura da tastiera, introduzione e modifica dello stato di lettura.
- Diario: passaggio Shared → Private con rimozione del pensiero dalla preview della community e aggiornamento del riepilogo; valutazione Romance modificata; passaggio libro/saga.
- Social: finestra Coming soon esplicita, nessun indirizzo inventato.
- Finestre: focus iniziale, chiusura Escape e ripristino del focus al pulsante di apertura.
- Comparse osservate nella nuova libreria: Aelin e Fleetfoot; nessun asset modificato.

## Limiti della dimostrazione
Stati dimostrativi in memoria, ripristinati ricaricando la pagina. Catalogo limitato ai titoli inclusi. Nessun account, forum realmente pubblicato o profilo social collegato. Sul telefono lo spostamento dispone anche dei controlli a freccia dopo la selezione del libro.

## Prossima revisione con Gaia
La nuova illustrazione della stanza si integra con i colori della pagina. L’immagine della community ha invece un taglio fotografico/cosplay più ricco e diverso: valutare una scena di lettura più coerente con l’illustrazione principale. Nessuna immagine sostituita autonomamente durante la migrazione.

Nessun commit, push o deploy eseguito.
