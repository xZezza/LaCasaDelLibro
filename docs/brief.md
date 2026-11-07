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
Conservare tutti gli asset originali già approvati in `public/images/characters/`, il catalogo `src/data/library-visitors.json` e la documentazione della loro creazione. Le 21 comparse sono conservate e compaiono nella landing: ospite casuale nella scena iniziale, Edvige o Grattastinchi accanto alla citazione di Harry Potter, personaggi ACOTAR nella citazione delle stelle e solo personaggi di Trono di Vetro nella citazione finale (per ora Aelin/Celaena e Rowan, nessun animale). Nella libreria piccola compaiono solo gli animaletti, collocati in uno spazio libero sul ripiano: nessuna comparsa se manca lo spazio e pausa quando si spostano libri o decorazioni. Gli animaletti restano per circa 12 secondi, poi dopo una pausa di 3 secondi ne compare uno nuovo. Sono vicini ai libri, con il nome sopra la figura per evitare il bordo del ripiano. Dimensioni dei personaggi aumentate di circa il 12%, mantenendo proporzioni e appoggio a terra. Gli animali hanno una scala distinta e più piccola, soprattutto gatti e civetta; solo accanto alla citazione di Harry Potter sono più grandi per renderli protagonisti. La citazione finale è centrata sullo stesso asse del titolo e dei pulsanti, indipendentemente dal personaggio sulla destra. Nome centrato rispetto alla figura e distanziato dai piedi, senza riquadro, bordo o sfondo: nero nelle sezioni chiare, bianco nella citazione stellata. Una comparsa per sezione e per visita, con rotazione senza ripetizioni in ciascun gruppo e senza coprire testi o pulsanti. Feyre mantiene abito azzurro e stivali avorio. Le preferenze di movimento ridotto disattivano le comparse. Nessuna nuova illustrazione sostituisce quelle approvate.

## Prima della pubblicazione
Fornire i veri indirizzi social, definire la privacy del servizio effettivo e controllare i contenuti editoriali finali. Valutare con Gaia qualità e coerenza delle immagini del nuovo handoff. Per ora mantenere `noindex, nofollow`. Modifiche locali: nessun commit, push o deploy senza richiesta esplicita.
