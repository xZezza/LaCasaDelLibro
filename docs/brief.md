# The Salon — brief della landing

## Riferimento attuale: 7 novembre 2026
Il progetto Claude Design consegnato in `design_handoff_the_salon` sostituisce tutte le precedenti linee grafiche e la struttura della landing. Il brief precedente è stato rimosso su richiesta di Gaia.

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
Conservare tutti gli asset originali già approvati in `public/images/characters/`, il catalogo `src/data/library-visitors.json` e la documentazione della loro creazione. Le 21 comparse sono conservate e compaiono nella landing: ospite casuale nella scena iniziale, Edvige o Grattastinchi accanto alla citazione di Harry Potter, personaggi ACOTAR nella citazione delle stelle e solo personaggi di Trono di Vetro nella citazione finale (per ora Aelin/Celaena e Rowan, nessun animale). Nella libreria piccola compaiono solo gli animaletti, collocati in uno spazio libero sul ripiano: nessuna comparsa se manca lo spazio e pausa quando si spostano libri o decorazioni. Gli animaletti restano per circa 12 secondi, poi dopo una pausa di 3 secondi ne compare uno nuovo. Sono vicini ai libri, con il nome sopra la figura per evitare il bordo del ripiano. Dimensioni dei personaggi aumentate di circa il 12%, mantenendo proporzioni e appoggio a terra. Gli animali hanno una scala distinta e più piccola, soprattutto gatti e civetta; solo accanto alla citazione di Harry Potter sono più grandi per renderli protagonisti. La citazione finale è centrata sullo stesso asse del titolo e dei pulsanti, indipendentemente dal personaggio sulla destra. Nome centrato rispetto alla figura e distanziato dai piedi, senza riquadro, bordo o sfondo: nero nelle sezioni chiare, bianco nella citazione stellata. Nelle sezioni della landing una nuova comparsa a ogni rientro nella sezione, con rotazione senza ripetizioni in ciascun gruppo e senza coprire testi o pulsanti. Feyre mantiene abito azzurro e stivali avorio. Le preferenze di movimento ridotto disattivano le comparse. Nessuna nuova illustrazione sostituisce quelle approvate.

## Prima della pubblicazione
Fornire i veri indirizzi social, definire la privacy del servizio effettivo e controllare i contenuti editoriali finali. Valutare con Gaia qualità e coerenza delle immagini del nuovo handoff. Per ora mantenere `noindex, nofollow`. Modifiche locali: nessun commit, push o deploy senza richiesta esplicita.

## Ultimi dettagli confermati
Favicon ufficiali fornite da Gaia il 7 novembre, collegate in tutte le dimensioni disponibili, icona Apple e manifest. I pulsanti Instagram, TikTok e Threads hanno fondo trasparente a riposo e diventano gialli solo al passaggio del mouse. Decorate comprende “Keep a companion”: scelta tra gli otto animali approvati, aggiunta permanente alla libreria, trascinamento/rimozione come le altre decorazioni e inclusione nel salvataggio locale. Le visite temporanee continuano ad alternarsi negli spazi liberi.

“Discard changes” appare insieme a “Save changes” solo con modifiche non salvate e ripristina l’ultimo salvataggio locale (oppure la configurazione iniziale se non è mai stato salvato). Ripristina anche decorazioni e animaletti fissi, colori, lucine e angolo. Nessun dato salvato viene eliminato dal browser.

## Rientro nelle sezioni e correzione Discard
Tornando alla hero o a una citazione dopo averla lasciata, compare un nuovo personaggio del gruppo previsto; la scelta prosegue la coda senza ripetere subito lo stesso ospite. Nella libreria resta l’alternanza temporizzata. La citazione stellata è centrata sull’intero pannello con spazi laterali simmetrici; su telefono il personaggio ha uno spazio sotto al testo. Discard collega direttamente l’azione ai controlli renderizzati, evitando il pulsante senza funzione sulle istanze rimaste aperte durante gli aggiornamenti di sviluppo; ripristina il salvataggio e chiude anche ricerca, selezione ed espansioni temporanee.

## Organizzazione del codice — 7 novembre
Ogni sezione visiva è nella propria cartella con `index.jsx` e `styles.css`; gli stili condivisi sono in `src/components/landing/shared/`; `global.css` contiene solo fondamenti, token e accessibilità generale. Dati, utility, hook e configurazione sono separati. Immagini attive divise per branding, hero, community, decorazioni e personaggi. Il materiale della vecchia landing è stato archiviato fuori dal progetto attivo prima della rimozione. Tutte le illustrazioni approvate e le varianti sono conservate. Fasce responsive confermate: desktop oltre 960 px, tablet 651–960 px, telefono fino a 650 px; il desktop resta fluido su schermi grandi. Controlli ripetibili: `pnpm check`, `pnpm test`, `pnpm build`.

## Apertura su schermi grandi
Il layout desktop cresce fino a un massimo di 1440 px; sopra questa larghezza resta centrato con margini simmetrici. Testo, scena e navbar usano lo stesso limite. L’illustrazione ha una sfumatura destra più ampia e un raccordo cromatico a tutta larghezza: nessun bordo verticale netto e nessun ingrandimento continuo della libreria sui monitor molto larghi. Le soglie telefono/tablet restano 650 e 960 px.

## Ingrandimento delle comparse
Passando con il mouse su un personaggio o un animale, la figura si ingrandisce dolcemente del 20% e torna alla dimensione normale quando il mouse si allontana. Il punto di appoggio resta fisso; il nome accompagna la figura. Il comportamento vale nelle sezioni della landing, per gli animali in visita e per i compagni fissi della libreria, incluso il draghetto decorativo. Non modifica lo spazio occupato dai libri e non interferisce con le animazioni di comparsa. Attivo solo con puntatore preciso e hover, rispettando il movimento ridotto.

## Pulizia degli stili e delle animazioni
CSS globale limitato a reset, token e accessibilità. Stili comuni definiti una sola volta e importati dalle sezioni che li usano. Citazioni, stelle, lucine e filo del diario hanno componenti dedicati: CSS controlla animazioni, colori, geometria 3D dei libri, stati selezionati e transizioni; JavaScript gestisce visibilità, misure e interazioni effettive. Conservati tutti i personaggi e gli animaletti approvati.

Verifica della pulizia: sei test di stato superati, nove combinazioni di anteprima aperta (tre orientamenti × tre impostazioni lucine) renderizzate senza valori mancanti, 24 file di illustrazioni/catalogo con impronta invariata e risposta corretta dell’anteprima locale. Build e controllo della struttura completati. Verifica visiva nel browser non disponibile durante questo intervento. Nessun commit, push o deploy.

Hero: ridotta la velatura sul lato del testo. La maschera sinistra raggiunge la piena visibilità al 18% anziché al 34% e la velatura avorio termina al 58% anziché al 72%, avvicinando visivamente la stanza alle scritte. Conservati raccordo destro, composizione mobile e limite desktop di 1440 px.

8 novembre: l’intera anteprima dello scaffale nella sezione Library apre la libreria completa con un clic o un tocco, inclusi i libri e il ripiano. Accessibile anche con Tab e Invio/Spazio tramite un pulsante nativo; i controlli Read/To read e i colori restano separati.

8 novembre — ottimizzazione immagini: copie WebP senza perdita per 22 immagini attive, alla risoluzione originale. Verificati pixel visibili e canale alpha identici; nessun ridimensionamento, modifica grafica o sostituzione degli originali. Le immagini attive passano complessivamente da 28.37 MB a 18.77 MB (−33.84%). È il totale delle risorse attive, non il peso di un singolo caricamento. Catalogo originale e documenti di provenienza intatti; URL di visualizzazione risolti tramite src/lib/image-assets.js e src/data/image-variants.json. I JPEG restano originali se già più leggeri. Refactoring strutturale rimandato; nessun push o deploy.

8 novembre — tipografia ridotta a tre famiglie: Cormorant Garamond per titoli, citazioni, libri e nomi delle comparse; Jost per testi, navigazione e controlli; Kalam per diario e accenti scritti a mano. Rimosso Georgia dai nomi di personaggi e animali, mantenendo dimensioni, colori e posizione delle etichette.
