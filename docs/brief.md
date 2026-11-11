# The Salon — brief della landing

## Riferimento attuale: 7 novembre 2026
Il progetto Claude Design consegnato in `design_handoff_the_salon` sostituisce tutte le precedenti linee grafiche e la struttura della landing. Il brief precedente è stato rimosso su richiesta di Gaia.

## Obiettivo
Presentare una futura app per conservare libri, ricordi di lettura e pensieri personali, con una community in cui condividere solo ciò che si sceglie. Pubblico dai 15 anni in su, senza limite superiore, con particolare attenzione a fantasy, romantasy e distopia. Landing in inglese, progetto ancora in sviluppo. Conversione principale verso i social; Instagram confermato: https://www.instagram.com/therealbooksalon/. URL TikTok e Threads ancora da fornire.

## Nuova identità e struttura
Carta avorio, inchiostro prugna, lilla e giallo caldo. Cormorant Garamond, Jost e Kalam. Logo e due illustrazioni forniti con l’handoff. Nuova hero, citazioni animate, carosello di libri, libreria personalizzabile, scheda diario, anteprima libro/saga, community e invito a seguire il progetto. Mantenere composizione e interazioni del riferimento, adattando accessibilità e telefono.

Il titolo principale è stato ridotto su richiesta di Gaia: `clamp(38px, 5.25vw, 72px)`, mantenendo font ed evidenziatura del nuovo design.

L’illustrazione della hero è sollevata di 40–72 px su desktop/tablet per ridurre lo spazio sopra la libreria; la composizione separata del telefono mantiene la propria posizione. Il bordo inferiore della scena sfuma gradualmente nello sfondo, anche dopo lo spostamento verso l’alto.

Tutte le voci della navbar hanno la stessa evidenziatura gialla al passaggio del mouse e al focus da tastiera.

Ridotta la distanza tra hero e prima citazione: padding iniziale della sezione da 70–110 px a 40–60 px.

Carosello: ombre dei libri più leggere e spazio di sfumatura sufficiente nel contenitore, senza il bordo orizzontale causato dal taglio delle ombre. Spaziatura complessiva della sezione mantenuta.

La prima citazione è visibile già nell’HTML iniziale, senza dipendere dallo scroll o dal caricamento delle animazioni. All’ingresso nella schermata mantiene un’animazione morbida delle parole, che parte da testo già visibile.

## Interazioni dimostrative
Libreria con ricerca nel catalogo dimostrativo, tre ripiani, spostamento e orientamento dei libri, colori, pareti, lucine, decorazioni e ordinamento. Carosello continuo bidirezionale con sequenze di riserva ai lati, frecce precedente/successivo, trascinamento e scheda libro. Diario con colori, valutazioni e scelta privata/condivisa collegata alla preview della community. “Save changes” compare solo in presenza di modifiche rispetto all’ultimo salvataggio (o allo stato iniziale) e scompare dopo aver salvato, con conferma per tre secondi. Il pulsante conserva disposizione dei libri, decorazioni, colori, parete, lucine e angolo della libreria nel browser, anche dopo un ricaricamento. Gli altri dati restano dimostrativi in memoria; nessun account, pubblicazione reale dei pensieri o backend. La finestra della libreria si ridimensiona proporzionalmente per entrare nella schermata desktop. Le pagine complete non sono ancora disponibili. Instagram rimanda al profilo ufficiale https://www.instagram.com/therealbooksalon/; TikTok e Threads restano dimostrativi e lo dichiarano in una finestra dedicata.

## Personaggi e animali: contenuti protetti dalla migrazione
Conservare tutti gli asset originali già approvati in `public/images/characters/`, il catalogo `src/data/library-visitors.json` e la documentazione della loro creazione. Le 22 comparse sono conservate e compaiono nella landing: ospite casuale nella scena iniziale, Ron Weasley, Edvige o Grattastinchi accanto alla citazione di Harry Potter, personaggi ACOTAR nella citazione delle stelle e solo personaggi di Trono di Vetro nella citazione finale (per ora Aelin/Celaena e Rowan, nessun animale). Nella libreria piccola compaiono solo gli animaletti, collocati in uno spazio libero sul ripiano: nessuna comparsa se manca lo spazio e pausa quando si spostano libri o decorazioni. Gli animaletti restano per circa 12 secondi, poi dopo una pausa di 3 secondi ne compare uno nuovo. Sono vicini ai libri, con il nome sopra la figura per evitare il bordo del ripiano. Dimensioni dei personaggi aumentate di circa il 12%, mantenendo proporzioni e appoggio a terra. Gli animali hanno una scala distinta e più piccola, soprattutto gatti e civetta; solo accanto alla citazione di Harry Potter sono più grandi per renderli protagonisti. La citazione finale è centrata sullo stesso asse del titolo e dei pulsanti, indipendentemente dal personaggio sulla destra. Nome centrato rispetto alla figura e distanziato dai piedi, senza riquadro, bordo o sfondo: nero nelle sezioni chiare, bianco nella citazione stellata. Nelle sezioni della landing una nuova comparsa a ogni rientro nella sezione, con rotazione senza ripetizioni in ciascun gruppo e senza coprire testi o pulsanti. Feyre mantiene abito azzurro e stivali avorio. Le preferenze di movimento ridotto disattivano le comparse. Nessuna nuova illustrazione sostituisce quelle approvate.

## Prima della pubblicazione
Fornire i veri indirizzi TikTok e Threads, definire la privacy del servizio effettivo e controllare i contenuti editoriali finali. Valutare con Gaia qualità e coerenza delle immagini del nuovo handoff. Per ora mantenere `noindex, nofollow`. Modifiche locali: nessun commit, push o deploy senza richiesta esplicita.

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

8 novembre — aggiunto Ron Weasley in due pose originali, con libro chiuso e in lettura, su sfondo trasparente. Incluso nella rotazione della hero e della citazione di Harry Potter. Harry, Hermione e Hagrid restano richiesti ma non inseriti: il generatore ha bloccato i rispettivi risultati; nessun asset fittizio o sostituzione dei personaggi già approvati.

8 novembre — scelta approvata: menu con evidenziatore giallo sotto il testo, senza capsula esterna. Stesso trattamento condiviso per azioni principali, pulsanti social, salvataggio/scarto e controlli testuali delle anteprime; focus da tastiera e movimento ridotto rispettati. Icone, colori e valutazioni mantengono controlli dedicati. Corrette tutte le citazioni animate: spazi reali tra le parole, ritorno a capo naturale e centratura, senza perdere le animazioni.

8 novembre — rifinitura confermata: rimossi entrambi i pulsanti iniziali della hero. Tutti i tasti testuali sono privi di bordo, capsula o riquadro, inclusi social, ordinamento, Read/To read, Private/Shared e controlli della scheda. La selezione resta riconoscibile con evidenziatura del solo testo; altrimenti la pennellata compare su hover/focus. Anche le etichette dei personaggi e l’invito dimostrativo alla discussione perdono la capsula. Conservati focus da tastiera, area cliccabile e funzioni esistenti.

8 novembre — i tre comandi Tidy by (Colour, Height, Title) hanno 24 px di spazio orizzontale, con ritorno a capo sui pannelli stretti.

8 novembre — prova cromatica: i titoletti Characters, Forum e Leave a thought nella scheda di anteprima passano a un lilla più deciso, mantenendo testi e fondi esistenti.

8 novembre — maggiore distanza tra i link Instagram, TikTok e Threads: 24–40 px secondo la larghezza dello schermo, mantenendo centratura e ritorno a capo.

8 novembre — nella citazione stellata lo spazio riservato alle comparse comprende l’ingrandimento al 120%, margine superiore/laterale di 24 px e spazio inferiore per il nome. Su telefono aumenta la zona dedicata sotto la citazione; personaggi e animazioni mantengono le dimensioni approvate.

9 novembre — verifica delle comparse in tutte le sezioni: la hero riserva una corsia accanto al testo su tablet e mantiene l’area illustrata separata su telefono. Le citazioni Potter e Trono di Vetro riservano ingrandimento, nome e margini; su schermi stretti le comparse occupano una zona sotto il testo. La citazione stellata usa la stessa scala condivisa e una zona dedicata su tablet/telefono. Ingresso/uscita delle comparse limitato a 12 px, senza cambiare le illustrazioni. I compagni fissi hanno un ingombro che comprende lo zoom, evitando i libri adiacenti; le visite temporanee misurano sia larghezza sia altezza libera e includono il nome, oppure non compaiono. Tutte le immagini approvate, i comportamenti di rotazione e il movimento ridotto sono conservati. Controlli geometrici e rendering locale; verifica visiva nel browser non disponibile. Nessun commit, push o deploy.

10 novembre — verifica visiva effettuata in Brave locale isolato, senza pubblicazione: 32 prove di ingrandimento nelle quattro sezioni a 320, 390, 650, 651, 768, 960, 961 e 1440 px; altre 27 prove con animali, compagni fissi e visualizzazione touch a 320/390 px. Nessuna sovrapposizione o uscita dai bordi nei casi verificati e nessun errore JavaScript rilevato. Schermate reali e rapporti conservati nella cartella di lavoro output/visual-qa-2026-11-10. Si tratta di emulazione nel browser, non di una verifica su telefono fisico. Nessun push o deploy.

10 novembre — nuovo tentativo richiesto per Hermione, con due pose originali coerenti con Ron e sfondo trasparente: generazione bloccata in uscita dal servizio immagini, senza motivazione specifica. Nessun nuovo asset prodotto o inserito; catalogo e illustrazioni esistenti invariati.

10 novembre — carosello con trackpad: il gesto orizzontale viene gestito localmente in entrambe le direzioni da un listener nativo non passivo e dal contenimento dell’overscroll orizzontale; scorrimento verticale e pinch-to-zoom restano nativi. I movimenti ravvicinati sono raccordati su frame con una risposta breve di 32 ms, senza aggiungere una seconda inerzia al gesto. Normalizzate le unità pixel/riga/pagina; la rotazione automatica resta in pausa durante l’interazione. Frecce e trascinamento riprendono il controllo senza animazioni concorrenti. Nessun push o deploy.

10 novembre — scheda aperta dal carosello: conservati titolo, autrice e introduzione. Rimossi i controlli To read/Reading/Read e i salti alle sezioni esterne; Start my journal e Forum cambiano pagina nello stesso riquadro, con evidenziatore sul tab selezionato e animazione CSS di cambio pagina. Diario con cinque stelle selezionabili anche da tastiera, voto conservato in memoria per il libro durante la visita e suggerimenti grigi che si scrivono a ogni apertura della pagina. Forum esplicitamente dimostrativo con lettrici fittizie. Colonna del libro come tavolo di lettura, con carta, segnalibro e occhiali, senza scritte decorative; nessuna copertina originale aggiunta. Movimento ridotto rispettato.

10 novembre — prima citazione più vicina alla hero: animazione avviata quando almeno il 30% della citazione entra nell’area di lettura, con effetto più visibile e ripetizione al rientro; il testo rimane presente prima dell’animazione. Citazione stellata senza trattino, con ritorno a capo prima di “and”.

10 novembre — rifinitura della scheda: eliminate le scritte aggiunte a sinistra; restano solo libro, carta, segnalibro e occhiali. Rimossa l’altezza minima del diario e il margine automatico del piè di pagina, ridotti gli spazi del pannello per far entrare la scheda nella schermata desktop. Su telefono il contenuto resta leggibile e scorre quando necessario.

10 novembre — verifiche locali delle modifiche: 48 prove browser sul carosello (gesti orizzontali, inversioni, unità del wheel, scorrimento verticale, frecce e trascinamento); controlli di diario/forum, valutazione, animazioni e accessibilità da tastiera a 320, 390, 768 e 1440 px; tutte le dieci schede nelle due viste entrano senza scorrimento interno nei tre desktop provati (1024×650, 1280×720, 1440×900), per 60 combinazioni. Il gesto fisico di navigazione del trackpad macOS richiede una prova sul dispositivo; nel browser verificata la cancellazione degli eventi orizzontali e il passaggio di quelli verticali. Controllo struttura, dieci test e build superati. Nessun commit, push o deploy.

10 novembre — sfondo della colonna sinistra della scheda libro: trama raster originale di carta avorio artigianale con fibre fini e irregolarità naturali, ispirata ai campioni forniti da Gaia. Sostituisce le righe regolari precedenti; nessun testo, pergamena stampata o collage di pagine. Illustrazione generata con image_gen, originale conservato, copia WebP senza perdita risolta dal catalogo immagini. Dimensioni della scheda, libro, occhiali, segnalibro e interazioni conservati.

10 novembre — nuova scheda libro approvata tramite mockup PNG: paesaggio illustrato stellato nella colonna del libro, senza alterare Cormorant Garamond, Jost e Kalam. Reintrodotti To read/Reading/Read con la pennellata gialla del testo selezionato, come nel riferimento approvato. My journal diventa una pagina di quaderno avorio con righe, margine rosato, carta materica, ombra leggera e segnalibro oro. Personaggio, canzone e ricordo sono modificabili; stelle, preferito e stato di lettura restano in memoria per ciascun libro durante la visita, senza salvataggio remoto. Controlli della copertina per vista e angolazione; Start my journal e Forum restano nella scheda, mantenendo discussione dimostrativa e valutazione accessibile da tastiera. La nuova illustrazione è un asset separato, generato dal mockup approvato: il libro e tutti i controlli sono elementi reali. Su telefono illustrazione e contenuti si dispongono in verticale, con campi su una colonna. Nessun commit, push o deploy.

10 novembre — focus della scheda libro riallineato alla UI: nessun riquadro viola sui link testuali, che usano la pennellata gialla già presente; nei campi del diario linea dorata e lieve evidenziatura della sola etichetta. Pulsanti circolari e pagina del quaderno hanno un richiamo oro; le stelle mostrano un contorno oro più netto. Focus da tastiera conservato e modifica limitata alla scheda libro. Nessun commit o push.

10 novembre — autorizzati commit e push delle modifiche approvate esclusivamente sul branch di sviluppo esistente `dev` (`origin/dev`); il remoto non contiene un branch `develop`. Nessuna modifica a `main` e nessun deploy manuale. Revisione di componente, chiamanti, accessibilità, stato locale e immagini senza problemi bloccanti; controllo struttura, dieci test, verifica immagini senza perdita e build superati. Interazioni e focus verificati nel browser durante lo sviluppo, anche su viewport tablet/telefono.


10 novembre — schede personaggi approvate: ritratto editoriale avorio/lilla con arco sottile, mini descrizione, personalità, punti di forza e fragilità. Nessun journal o forum. Tutte le 22 comparse del catalogo, inclusi gli animali, aprono la propria scheda al tocco o con tastiera. Una breve rotazione CSS della sagoma introduce il ritratto una sola volta per apertura; non è un modello 3D e non aggiunge viste posteriori all’illustrazione. Movimento ridotto: rotazione disattivata. Dialogo nativo con Escape, chiusura sullo sfondo, focus e blocco dello scorrimento; le comparse restano presenti durante la consultazione. Contenuti descrittivi brevi senza eventi finali o sviluppi di trama. Nessun push o deploy.

10 novembre — rotazione del ritratto rallentata a 2,8 secondi, con accelerazione e rallentamento simmetrici e figura visibile fin dall’inizio. Tocco/clic sul ritratto nella scheda ripete il giro; il comando è accessibile anche con Invio/Spazio e conserva il focus durante il riavvio. Nessun ciclo automatico; movimento ridotto rispettato.

10 novembre — ritratti confinati alla propria colonna: eliminati gli ingrandimenti al 145–165%, figura al 100% dello spazio disponibile e contenimento durante il giro. Prima posa visualizzata tramite viewport SVG con separazione misurata tra le pose per ogni asset, evitando frammenti della seconda figura; immagini originali intatte. Scheda libro: all’apertura copertina e sei fogli si aprono a ventaglio e si richiudono in 3,2 secondi. Tocco sulla copertina ripete soltanto una rotazione di 2,8 secondi. Controlli di vista e angolazione conservati; comandi accessibili da tastiera e movimento ridotto rispettato.

10 novembre — corretto ingombro del ventaglio: libro limitato al 68% dello spazio illustrato (massimo 240 px), anche su tablet; durante l’apertura si riduce gradualmente al 78% e si sposta leggermente verso il centro della scena, poi ritorna alla posizione iniziale. Ridotti gli angoli di copertina e pagine per conservare margini intorno all’intera animazione.

10 novembre — ventaglio libro aggiornato su richiesta: 18 pagine anziché sei, copertina aperta a 180°, ciclo di apertura e chiusura accelerato a 1,8 secondi. All’apertura il libro si riduce al 60% e il dorso si avvicina al centro dello spazio illustrato, riservando spazio a entrambe le metà. Il clic successivo mantiene la sola rotazione da 2,8 secondi.

10 novembre — su richiesta, rotazione dei personaggi riportata a 1,15 secondi, mantenendo accelerazione e arresto morbidi, ritaglio della prima posa, contenimento nella colonna, riavvio al tocco e rispetto del movimento ridotto. Animazione dei libri invariata.

10 novembre — Instagram ufficiale confermato da Gaia: https://www.instagram.com/therealbooksalon/. Il collegamento Instagram della sezione finale apre il profilo reale; TikTok e Threads conservano la finestra dimostrativa in attesa degli indirizzi confermati. Nessuna modifica grafica; nessun commit, push o deploy per questo intervento.


10 novembre — Book Forum: la sezione community mostra solo il forum della pagina libro, con un unico foglio a righe e conversazione illustrativa approvata (prova 2). Eliminati dalla sezione i riquadri saga e gruppo di lettura. Conservati Jost, Cormorant Garamond e Kalam. Cartolina: ingresso in avanti con ingrandimento e ritorno in 3,8 secondi, una volta quando entra in vista; movimento attenuato su telefono e disattivato con movimento ridotto. Modifiche locali, senza push o deploy.

10 novembre — sfondi dei ritratti diversificati per personaggio con cinque tinte pastello della palette esistente: lilla, rosa, oro, salvia e azzurro. Tinta stabile per ogni personaggio, sfumatura morbida e bordo dell’arco coordinato. Rotazione e dimensioni invariate.

10 novembre — cartolina community: corretto lo zoom che usciva dal lato sinistro. Riservato spazio nella colonna e ancorato l’ingrandimento in alto a sinistra, verso lo spazio libero a destra e in basso. Durata ridotta a 1,6 secondi, ripetibile al clic, tocco e Invio/Spazio. Conservato il rispetto del movimento ridotto.

10 novembre — cartolina: su correzione di Gaia il movimento parte al montaggio della pagina e si ripete entrando con il mouse sulla cartolina; rimossi riavvio al clic e semantica di pulsante. Durata 1,6 secondi e movimento ridotto conservati.

10 novembre — comportamento definitivo cartolina: primo avvio quando il 55% della cartolina entra nella vista, una sola volta per apertura della pagina; successive ripetizioni al passaggio del mouse. Nessun avvio fuori schermo al caricamento. Durata 1,6 secondi e movimento ridotto conservati.

10 novembre — rimosso il testo “Continue in the book forum →” dal foglio Book Forum su richiesta di Gaia.


10 novembre — approvata direzione libreria illustrata materica: noce, fondo avorio neutro, dorsi in tela con titoli orizzontali e fregi botanici dorati. Applicata a mini libreria e libreria completa tramite soli stili, senza sostituire la scena con un'immagine. Conservati handler, stato, dimensioni dei libri, trasformazioni 3D, trascinamento, rotazione, impilamento, personalizzazione e salvataggio. Nessun push o deploy.

10 novembre — prova modalità scura richiesta da Gaia: fondo prugna molto scuro, testi avorio e accenti lavanda, logo chiaro. Invito finale compattato con titolo massimo 48 px e padding ridotto. Modifiche locali.

10 novembre — prova scura schiarita su richiesta: prugna polveroso al posto dello sfondo quasi nero. Ampliata la citazione finale su desktop per evitare tre righe, conservando testo e dimensioni.

10 novembre — fedeltà al mockup della mini libreria: integrata l’illustrazione approvata su livelli indipendenti, con sette dorsi, mensola, supporti, edera e vaso di lavanda. Originale trasparente generato separatamente e conservato in public/images/decorations/library-editorial. Read usa i sette titoli illustrati approvati; To read conserva titoli dinamici, tela e fregi. Cinque materiali principali e comando More per tutti i colori esistenti; filtri della sola mensola mantengono la personalizzazione. Verifiche visive in corso: obiettivo di fedeltà non ancora dichiarato concluso. Nessun push o deploy.

10 novembre — correzione: pagina chiara per impostazione iniziale; modalità scura opzionale con pulsante luna/sole nella navbar. Banner compatto conservato.

10 novembre — tema opzionale definitivo ink (`html[data-theme="ink"]`): palette fornita da Gaia, superfici hue 15/chroma .028, testi avorio, accenti rimappati e filtri immagini/logo. Tema chiaro iniziale conservato.

10 novembre — mini libreria allineata all’illustrazione approvata: stato iniziale Read/Noce con composizione originale completa (carta, filetti, titoli, campioni, mensola, libri, edera e lavanda). Al passaggio sui singoli libri la base viene mascherata solo sotto quel libro, che si solleva come livello separato senza duplicati. I controlli HTML restano attivi sopra la composizione; colori, More e To read usano la versione a livelli con contenuti dinamici. Su telefono pannello più alto e controlli più leggibili; nota decorativa interna omessa per evitare sovrapposizioni, istruzione esterna conservata. Verificati 320, 390 e 768 px e desktop, cambio materiali, apertura/chiusura More, To read/Read e accesso alla libreria completa. Nessun push o deploy.

10 novembre — stesso stile illustrato applicato alla libreria completa: rilegature e palette dei sette titoli della landing, dorsi illustrati per le sei edizioni dritte, copertine con cornice botanica e celeste, pagine avorio stratificate, carta neutra sulla parete e legno materico sulle mensole. Decorazione confinata alle facce 3D; wrapper trascinabili, handler, geometria dei libri, viste, salvataggio, ricerca, luci, decorazioni e comparse conservati. Nessun push o deploy.

10 novembre — controllo contrasti: citazione stellata sempre bianca sul pannello viola; ripristinati testi chiari dei controlli su fondo scuro, schiariti input e nomi forum in ink e nomi delle comparse. Superfici editoriali rimaste chiare mantengono testo scuro.

10 novembre — contrasto ink: navbar con fondo inchiostro al 94% per separare i testi dalla scena; evidenziature hero e comandi prugna-lavanda scuro al posto dell’oro, con testo avorio. Tema chiaro invariato.

10 novembre — hero ink: variante notturna generata della stanza originale, con pareti bordeaux, luce lunare e lucine ambrate. Asset diurno conservato per modalità chiara; variante solo in ink.

10 novembre — hero notturna: sfumatura trasparente esplicita sui bordi alto e basso, anche su telefono, per raccordare l’immagine allo sfondo ink senza stacchi.

10 novembre — corretto lo stacco navbar/hero ink: eliminati bordo e fondo uniforme della navbar, sostituiti da gradiente trasparente verso la scena sul medesimo fondo ink della pagina. Rimosso alone dorato globale in ink che schiariva il bordo alto della scena.

10 novembre — correzione definitiva navbar ink: completamente trasparente come il tema chiaro, immagine notturna visibile dietro al menu; nessuna sfumatura superiore su desktop/tablet, conservato raccordo inferiore.

10 novembre — rimossa la scheda To read dalla mini libreria della landing su richiesta di Gaia. Read centrato; coperta anche la scritta incorporata nel riferimento illustrato. Libreria completa e suoi ripiani invariati.

10 novembre — scheda libro sempre chiara anche in ink, compresi diario e forum. Mini libreria ink con superficie scura e composizione ritagliata interattiva, senza cartolina avorio incorporata; testi chiari coordinati.

10 novembre — sviluppo libreria interna dal mockup illustrato approvato: atlante di sei rilegature senza testo, con titoli live in Cormorant Garamond e palette della landing; atlante separato per edera, lavanda, lanterna, tazza, fiori e luna. Nuove decorazioni aggiungibili, spostabili e salvabili con il catalogo esistente; comparse approvate conservate. Ingrandimento delle sole dimensioni di presentazione dei libri, mantenendo geometria coerente per dorso, copertina e libro sdraiato; dati salvati originali non riscalati. Mensole aperte, supporti e carta materica. Verifiche in corso, obiettivo ancora attivo.

10 novembre — revisione visiva ink e struttura: corretti i testi sui cartoncini pastello del diario con schema chiaro locale; schede libro/personaggio isolate in light, immagini escluse dal filtro ink. Rimossi dal globale filtri di prodotto e selettore data-hl inutilizzato; gestione accessibilità senza UI spostata in hooks, tutti i componenti visivi index hanno CSS accanto.

10 novembre — corretto il fondo che si sollevava insieme ai libri della mini libreria: durante hover viene usato il ritaglio trasparente, con ombra lieve e fondo avorio sotto la maschera. Libreria interna: titoli resi nuovamente visibili sopra le nuove rilegature; dimensioni di presentazione più larghe per leggibilità, senza mutare dimensioni salvate. Tre copertine iniziali esposte sul ripiano centrale e pila sul terzo; composizioni già salvate rispettate. Atlanti serviti in WebP senza perdita, originali conservati e verificati dal catalogo.

10 novembre — correzione finale hover mini libreria: creato sfondo con mensola realmente vuota e parete continua. I sette libri trasparenti sono ora sempre elementi separati; rimossa la mascheratura a sagoma durante il sollevamento, causa della zona chiara netta segnalata da Gaia.

10 novembre — verifica ink a 1440×1000, 820×1180 e 390×844: nessun overflow orizzontale della pagina; controllati menu, focus tastiera, hover marker, materiali libreria, social, scheda libro/diario/forum e ritratto personaggio. Corretto alone caldo della hero in ink e stacco superiore su telefono; regole responsive consolidate nel CSS Hero. Escape chiude la scheda personaggio; entrambe le schede restano chiare.

10 novembre — audit interazioni della libreria illustrata: verificati nel browser trascinamento del libro dal primo al secondo ripiano, Cover out/Lay flat e Discard; nuova decorazione Blossoms salvata, ritrovata dopo ricaricamento e poi rimossa ripristinando la composizione. Su telefono verificati comandi e assenza di overflow orizzontale della finestra. Aggiunta regola condivisa per identità delle rilegature: Tidy by Colour ordina ora i colori effettivamente visibili anziché i precedenti colori casuali. Altezza utile dei ripiani aumentata per non tagliare la selezione sollevata.

10 novembre — rifiniti i ritagli dell’atlante oggetti per eliminare il margine trasparente inferiore che lasciava vaso e tazza sospesi. Verificati ricerca Caraval, apertura del catalogo completo delle decorazioni e contenimento della finestra a 320, 390 e 768 px.

10 novembre — ritocco richiesto da Gaia da eseguire dopo la libreria interna: eliminare il rettangolo chiaro attorno a Read nella mini libreria, integrando titolo e texture senza stacchi visibili (screenshot 22.33.51).

10 novembre — attenzione a sottolineature e contrasti richiesta da Gaia: More treasures usa ora la stessa pennellata dei comandi testuali della landing; nessuna pennellata gialla sotto il testo chiaro del pulsante Save pieno. Testi secondari e placeholder con colori più leggibili nelle due modalità, selezione riconoscibile e focus oro conservato.

10 novembre — proporzioni della libreria interna: misurata e rimossa la doppia riserva verticale delle lucine (30 px per ripiano oltre all’aria già presente sopra i libri), ridotti margini e altezza delle etichette. La scena occupa una porzione maggiore della finestra, senza riscalare nuovamente le dimensioni salvate né ridurre gli spazi necessari alla selezione.

10 novembre — completato il ritocco Read richiesto: nuovo sfondo con texture continua anche nell’intestazione, senza le vecchie scritte incorporate. Read resta testo HTML con pennellata della landing; eliminata del tutto la copertura rettangolare.

10 novembre — verifica finale delle copertine esposte: temi distinti per Throne of Glass (lilla), Shadow and Bone (blu) e Mistborn (salvia), mantenendo identità stabili dopo spostamenti e ordinamento. Titoli, palette e font della landing restano elementi reali; l’illustrazione guida materiali e composizione senza sostituire la libreria con un’immagine statica.

10 novembre — audit conclusivo libreria interna: composizione a tre mensole aperte con supporti intagliati, tela e fregi dorati, copertine con paesaggi, carta avorio e oggetti botanici separati. Conservati libri e disposizioni salvate, font Cormorant Garamond/Jost/Kalam e palette della landing. Verificati nel browser ricerca, trascinamento reale tra ripiani, dorso/copertina/libro sdraiato, Discard, aggiunta e rimozione di decorazioni, salvataggio con ricaricamento e temi chiaro/ink; finestra contenuta a 320, 390 e 768 px. Tredici test superati, controllo struttura e build riusciti; 28 varianti WebP verificate senza perdita. Completato anche il ritocco Read senza rettangolo e conservato il fondo continuo per il sollevamento dei libri nella mini libreria. Anteprima finale in outputs/verifica-libreria-interna/libreria-interna-finale.jpg nella cartella di lavoro ChatGPT. Nessun push o deploy.

11 novembre — rifinitura della libreria interna richiesta da Gaia: pennellate più sottili, uniformi e limitate alle etichette, selezioni con peso tipografico distinto, testi secondari più leggibili in light/ink. Campioni colore con doppio anello e focus distinto; menu compagno con freccia nativa leggibile nei due temi, Save attivo/disabilitato con colori espliciti. Nessuna modifica a handler, animazioni, geometria, dati o salvataggi. Modifiche locali.

11 novembre — Gaia conferma il gesto di posa: trascinare e rilasciare per appoggiare, senza doppio clic. Applicato a tutti i libri della libreria interna: presa centrale per spostare tra ripiani, bordi per girare/inclinare senza selettore. Anteprima segue il puntatore fuori dal contenitore scalato; annullamento con Escape/interruzione. Rotazioni individuali persistono con Save e vengono ripristinate da Discard; le viste dorso/copertina/sdraiato restano scorciatoie. Conservati ordinamento, ricerca, decorazioni e comparse. Modifiche locali, verifiche in corso.

11 novembre — estesi presa centrale, trascinamento tra ripiani e appoggio al rilascio anche agli oggetti. Per gli oggetti illustrati la presa ai bordi regola l’inclinazione sul piano, senza fingere retro o volume assenti nei ritagli; originali e comparse conservati. Nuovo disegno degli oggetti richiesto come anteprima da vedere in chat prima di sostituire gli asset.

11 novembre — verifiche finali dei gesti: provati nel browser spostamento reale di un libro tra ripiani, rotazione dal bordo e inclinazione/spostamento del vaso di lavanda. Corretto l’ingombro prospettico per l’appoggio dei libri ruotati; aggiunta sesta faccia inferiore. Controllata finestra a 390 px; 18 test, struttura e build superati. Anteprima dei sei nuovi oggetti generata e conservata in outputs/oggetti-libreria/proposta-botanica.png nella cartella ChatGPT, non ancora sostituita agli asset del sito. Nessun push o deploy.

11 novembre — Gaia approva la proposta botanica: applicati i sei nuovi oggetti (edera in vaso, lavanda, lanterna, tazza, fiori e luna) come elementi separati dello stesso atlante trasparente, senza sovrascrivere i disegni precedenti. Conservati i gesti diretti e i salvataggi. Mensole desktop accorciate riducendo la finestra da 1440 a 1200 px e la colonna dei comandi da 320 a 300 px. Eliminata la campitura rettangolare dietro ai titoli dei dorsi: testo direttamente sulla tela, con contrasto tramite colore e ombra.

11 novembre — proporzioni richieste da Gaia: libri della libreria interna ridotti uniformemente del 20% in altezza, larghezza e spessore rispetto alla versione precedente, senza modificare le dimensioni salvate. Oggetti botanici conservati nelle misure approvate; altezza utile dei ripiani ridotta da 220 a 200 px, mantenendo spazio per presa e rotazione.

11 novembre — riferimento di Gaia delle 23.58: la libreria deve apparire molto più grande, con proporzioni leggibili. Rimossa la riduzione automatica dell’intera finestra per far stare tre ripiani sullo schermo. Vista desktop ora ampia fino a 1440 px, scorribile verticalmente, con comandi laterali da 280 px; ripiani alti 260 px. Ingranditi insieme libri e oggetti del 15% rispetto all’ultimo equilibrio approvato, senza alterarne il rapporto né le dimensioni salvate. La composizione può occupare più di una schermata, come nel riferimento.

12 novembre — ulteriore ingrandimento richiesto da Gaia per ridurre lo spazio vuoto: tutti i libri e oggetti aumentati del 30% con un unico fattore di presentazione condiviso. Conservati lunghezza delle mensole e rapporto tra gli elementi, senza aumentare la distanza verticale desktop; ripiani tablet/telefono portati alla stessa altezza utile per non tagliare le sagome. Titoli ingranditi in proporzione, sempre senza riquadri. Dati salvati, gesti e animazioni invariati.

12 novembre — Gaia richiede tutti i ripiani in una schermata e titoli dei dorsi più leggibili. Conservati i rapporti dimensionali correnti; compattati intestazione, etichette e comandi e ripristinato adattamento uniforme della finestra desktop al viewport. Titoli verticali lungo il dorso, più grandi e semibold, oro chiaro/ink sulla tela senza alcuna campitura rettangolare. Gesti e dati salvati conservati.

12 novembre — preferenza di Gaia: oggetti e comparse si possono spostare e appoggiare ma non ruotare, anche prendendoli dai bordi. Eventuali inclinazioni nei vecchi salvataggi vengono mostrate dritte senza cambiare i dati memorizzati. Rotazione dei soli libri conservata; istruzioni aggiornate.

12 novembre — corretto l’appoggio delle piante dopo l’ingrandimento: l’edera ora si ancora alla base del vaso, consentendo ai tralci di scendere sotto la mensola. Compensati anche i margini trasparenti inferiori di piantina e lavanda. Offset proporzionali all’altezza effettiva, senza rotazione o modifiche ai dati salvati.
