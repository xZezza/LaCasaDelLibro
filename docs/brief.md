# The Salon — brief della landing

## Riferimento attuale: 7 novembre 2026
Il progetto Claude Design consegnato in `design_handoff_the_salon` sostituisce tutte le precedenti linee grafiche e la struttura della landing. La versione precedente è conservata in `brief-before-claude-2026-11-07.md` come storico, non come specifica attiva.

## Obiettivo
Presentare una futura app per conservare libri, ricordi di lettura e pensieri personali, con una community in cui condividere solo ciò che si sceglie. Pubblico dai 15 anni in su, senza limite superiore, con particolare attenzione a fantasy, romantasy e distopia. Landing in inglese, progetto ancora in sviluppo. Conversione principale verso i social; URL reali ancora da fornire.

## Nuova identità e struttura
Carta avorio, inchiostro prugna, lilla e giallo caldo. Cormorant Garamond, Jost e Kalam. Logo e due illustrazioni forniti con l’handoff. Nuova hero, citazioni animate, carosello di libri, libreria personalizzabile, scheda diario, anteprima libro/saga, community e invito a seguire il progetto. Mantenere composizione e interazioni del riferimento, adattando accessibilità e telefono.

Il titolo principale è stato ridotto su richiesta di Gaia: `clamp(38px, 5.25vw, 72px)`, mantenendo font ed evidenziatura del nuovo design.

L’illustrazione della hero è sollevata di 40–72 px su desktop/tablet per ridurre lo spazio sopra la libreria; la composizione separata del telefono mantiene la propria posizione. Il bordo inferiore della scena sfuma gradualmente nello sfondo, anche dopo lo spostamento verso l’alto.

Tutte le voci della navbar hanno la stessa evidenziatura gialla al passaggio del mouse e al focus da tastiera.

Ridotta la distanza tra hero e prima citazione: padding iniziale della sezione da 70–110 px a 40–60 px.

Carosello: ombre dei libri più leggere e spazio di sfumatura sufficiente nel contenitore, senza il bordo orizzontale causato dal taglio delle ombre. Spaziatura complessiva della sezione mantenuta.

La prima citazione è visibile già nell’HTML iniziale, senza dipendere dallo scroll o dal caricamento delle animazioni. All’ingresso nella schermata mantiene un’animazione morbida delle parole, che parte da testo già visibile.

## Interazioni dimostrative
Libreria con ricerca nel catalogo dimostrativo, tre ripiani, spostamento e orientamento dei libri, colori, pareti, lucine, decorazioni e ordinamento. Carosello continuo bidirezionale con sequenze di riserva ai lati, frecce precedente/successivo, trascinamento e scheda libro. Diario con colori, valutazioni e scelta privata/condivisa collegata alla preview della community. “Save changes” compare solo in presenza di modifiche rispetto all’ultimo salvataggio (o allo stato iniziale) e scompare dopo aver salvato, con conferma per tre secondi. Il pulsante conserva disposizione dei libri, decorazioni, colori, parete, lucine e angolo della libreria nel browser, anche dopo un ricaricamento. Gli altri dati restano dimostrativi in memoria; nessun account, pubblicazione reale dei pensieri o backend. La finestra della libreria si ridimensiona proporzionalmente per entrare nella schermata desktop. Le pagine complete e i profili social non sono ancora disponibili. I bottoni social lo dichiarano in una finestra dedicata.

## Personaggi e animali: contenuti protetti dalla migrazione
Conservare tutti gli asset originali già approvati in `public/images/characters/`, il catalogo `src/data/library-visitors.json` e la documentazione della loro creazione. Le 21 comparse continuano ad apparire all’apertura della libreria, una alla volta, senza ripetersi fino a completare il giro. Feyre mantiene abito azzurro e stivali avorio. Le preferenze di movimento ridotto disattivano le comparse. Nessuna nuova illustrazione sostituisce quelle approvate.

## Prima della pubblicazione
Fornire i veri indirizzi social, definire la privacy del servizio effettivo e controllare i contenuti editoriali finali. Valutare con Gaia qualità e coerenza delle immagini del nuovo handoff. Per ora mantenere `noindex, nofollow`. Modifiche locali: nessun commit, push o deploy senza richiesta esplicita.
