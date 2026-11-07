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

## Rifiniture successive della landing
- Libreria proporzionata alla finestra desktop: verificata a 1280×720 e 1280×600, senza scorrimento interno.
- Save changes appare solo dopo una modifica reale; tornando allo stato salvato scompare. Salvataggio locale verificato ricaricando la pagina. Conferma temporanea dopo il salvataggio.
- Prima citazione presente e leggibile nell’HTML iniziale; animazione leggera all’ingresso, senza fase invisibile.
- Carosello con quattro sequenze di riserva, frecce nei due sensi e trascinamento bidirezionale.
- Comparse rimosse dalla libreria e collegate alle scene della landing: tutti i 27 file originali protetti restano invariati.
- Osservati Buttercup nell’hero, Crookshanks/Edvige per Harry Potter, Azriel per ACOTAR e Rowan per Trono di Vetro. Nessuna nuova illustrazione generata.
- Controllata larghezza telefono 390 px: nessun debordamento orizzontale.

## Verifica finale — dettagli 19:50–20:00
Queste decisioni sostituiscono le precedenti note sulla rimozione di tutte le comparse dalla libreria: i personaggi restano nelle sezioni della landing; solo gli animali visitano a turno gli spazi liberi della libreria. Osservata in anteprima l’alternanza Andarna → Tairn, senza sovrapposizione ai libri. Nome sopra la figura e appoggio al ripiano.

Aggiunto Keep a companion, otto animali approvati come decorazioni permanenti trascinabili. Verificati aggiunta di Crookshanks, salvataggio, ricaricamento con persistenza, stato pulito senza pulsanti. Aggiunti Hedwig e colore Cream senza salvare; Discard changes ha rimosso Hedwig, conservato Crookshanks e ripristinato il colore precedente. Entrambi i pulsanti nascosti dopo annullamento. Freccia del selettore centrata con icona dedicata.

Pulsanti social trasparenti a riposo; in anteprima solo TikTok con hover è risultato giallo, gli altri due trasparenti. Citazione finale e titolo centrati sullo stesso asse; Aelin sulla destra, solo personaggi ToG. Favicon fornite da Gaia copiate identiche e collegate (ICO, PNG, Apple, manifest). Verificati 27 file protetti invariati rispetto al manifest. pnpm build e git diff --check superati. Nessun push/deploy.

## Correzioni successive — 7 novembre, ore 20:07
Segnalazione Gaia: Discard non funziona sulla pagina aperta. Riprodotto callback undefined su istanza conservata priva del nuovo campo di classe; collegamento spostato direttamente nei valori dei controlli renderizzati. Verifiche automatiche superate: ripristino iniziale dopo aggiunta animale, spostamento libro e cambio di tutti i parametri; ripristino dopo salvataggio con conservazione dell’animale salvato e storage invariato. Reset anche di ricerca ed espansioni.

Citazione stellata: padding laterali simmetrici per centrare testo, stelle e attribuzione sull’intero pannello; spazio separato sotto il testo su telefono. Comparse: riattivazione dopo uscita completa e rientro nella sezione. Test mirato della logica di visibilità passato per hero, ACOTAR, ToG e HP, con ospite diverso e filtri di saga rispettati. pnpm build superato. In questo passaggio lo strumento di controllo browser non era disponibile: manca una nuova verifica visiva, da distinguere dai controlli automatici. Nessun push/deploy.
