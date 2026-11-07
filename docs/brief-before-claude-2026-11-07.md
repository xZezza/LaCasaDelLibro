# The Salon — brief della landing

## Obiettivo e vincoli

La landing presenta un’app in sviluppo per lettrici e lettori appassionati di fantasy, saghe e mondi distopici, dai 15–16 anni in su, senza limite massimo d’età. Unisce libreria personale, diario delle emozioni di lettura e community facoltativa. Deve portare ai profili social reali, quando saranno forniti gli URL.

Testi pubblici in inglese; comunicazioni con Gaia in italiano. Astro statico con pnpm. Tutte le modifiche restano locali: niente commit, push o deploy senza richiesta esplicita. Nessuna testimonianza, statistica, community attiva o data di lancio inventata.

## Identità scelta

Nome: **The Salon**. Logo con libro aperto riconoscibile, rifiniture oro e nastro segnalibro dorato con piega e punta a coda di rondine. Marchio vettoriale in `public/images/the-salon-mark.svg`, nome verde a fianco. Favicon con fondo verde in `public/favicon.svg`. La frase sotto al nome è stata rimossa. Le proposte precedenti con pennino, piuma, viola e rosa non sono state scelte.

## Prima schermata

- Titolo: “A home for the stories that warm your heart.”
- Soprattitolo: “YOUR NEXT CHAPTER STARTS HERE”, preceduto da un piccolo pennino.
- Descrizione: “A personal 3D bookshelf, a private reading journal, and a community for fantasy readers.”
- Invito principale: “Discover the project”, verso le anteprime di diario e community.
- Navbar sottile, avorio semitrasparente, sovrapposta alla scena.
- Scelta sole/luna: bosco di giorno con sedia sospesa oscillante; stanza calda di notte con poltrona e neve animata fuori dalle finestre. Scelta ricordata nel browser.
- La scena principale mantiene tutta la propria larghezza; le estensioni ambientali superiori danno spazio alla navbar evitando lo zoom che tagliava libreria e sedute. Le particelle di neve e la sedia seguono la stessa scala dell’immagine.
- “EXPLORE THE LIBRARY” e lente senza riquadro, alla base e centrati fra le lucine anteriori della libreria. Testo verde scuro, contorno bianco e pulsazione di 4,2 secondi; rispettate le preferenze di movimento ridotto.

## Libreria dimostrativa

Finestra compatta senza “Your little library” o “Your reading corner”. Montagne verdi visibili attorno alla preview, cielo appena azzurro e riquadro ristretto ai lati.

Ventisette libri tra Read (18) e To be read (9), su due ripiani per raccolta. Copertine e dorsi dimostrativi originali di The Salon, con titoli e nomi delle autrici reali; non riproducono edizioni ufficiali. Primi volumi di copertina e alcuni volumi orizzontali; grafiche vettoriali e riferimenti bibliografici nel catalogo locale. Le liste sono esempi, non una cronologia personale salvata.

Hover, focus e clic mostrano copertina, titolo, autrice, saga/volume e stato nel riquadro a destra. Filtri e riquadro insieme hanno la stessa altezza della libreria. Vista del volume in 3D con angolo fisso: il comando Rotate è stato tolto; nessun pulsante Move o stato Read nella scheda: si trascina direttamente. Doppio clic su un libro per alternare dorso e copertina, anche dalla preview; Shift+Invio offre la stessa azione da tastiera. Il modello non riproduce la quarta di copertina.

Lucine, edera ricadente verso l’esterno con vaso appoggiato, drago nero poggiato accanto a Fourth Wing, collana dei Doni della Morte drappeggiata sul primo Harry Potter. Indicazioni e crediti in toni bruni leggibili, raccolti e centrati sotto la sola libreria.

## Carosello

Venti titoli fantasy, romantasy e distopici recenti e classici, con copertine dimostrative originali di The Salon. Selezione editoriale con fonti conservate in `src/data/popular-books.json`; non è una classifica globale o un feed aggiornato in tempo reale. Rimossa la riga pubblica con data e fonti.

Ciclo continuo senza fine bianca, pausa quando il mouse o il focus sono sui libri. Frecce alle due estremità, scorrimento orizzontale nativo con trackpad e swipe. Clic su una copertina: breve introduzione originale senza spoiler. Le copie necessarie al ciclo riutilizzano gli stessi asset. Il movimento automatico rispetta la preferenza di movimento ridotto.

## Diario e community: cuore della landing

Apertura: “A page for every book, a place for every thought. Capture how a story made you feel, keep adding to it, and return to your words whenever you want.”

Due slogan distinti:

- Sinistra: “A space that’s just yours.”
- Destra: “Share only what feels right.”

Esempio: **Sunrise on the Reaping**, Suzanne Collins. Stile quaderno con righe e nastro adesivo, carattere stampato a mano Patrick Hand, più leggibile di Caveat. **La variante pergamena è stata scartata.**

L’anteprima chiusa termina prima di My thoughts: lingua, tempo di lettura, personaggio preferito e meno amato, frase preferita e cosa non è piaciuto. La frase preferita è un campo vuoto, senza citazioni inventate. Freccia e “Click here” aprono pensieri e valutazioni. Font, sottolineatura, grassetto, evidenziatura e dimensioni modificabili. Valutazioni di cinque simboli per giudizio finale, romanticismo, avventura e mistero.

Copertina con zoom/apertura del libro e pagine decorative animate su hover; clic apre una vista più grande. Non vengono riprodotte pagine del testo originale.

A destra: profilo dimostrativo di Mia, Shared thoughts e Book discussion. La discussione include copertina e illustrazione concettuale originale, non materiale ufficiale del film. Nell’anteprima resta il commento di Mia: “The feeling, more than any single scene. I’m glad there’s a place to talk about it.” Altre risposte e modulo si aprono con una freccia nello stesso stile del diario.

Le anteprime chiuse hanno la stessa altezza e i due comandi sono allineati; su telefono si dispongono in verticale. Dal diario si può selezionare un brano, rivederlo e condividerlo nella demo: il resto del testo non viene copiato. Profili e messaggi iniziali sono esplicitamente esempi. Risposte e condivisioni restano nella pagina locale e si azzerano ricaricando; non esistono backend, account reali o pubblicazione esterna.

## Da completare prima del lancio

URL social reali, dominio e canonical definitivi. La bozza mantiene `noindex, nofollow`: rimuoverlo solo per il lancio approvato. Non sono state aggiunte raccolta email o date di disponibilità.

## Revisione della gerarchia della landing

Prima semplificazione su `dev`: un unico titolo introduce diario e community, eliminando il doppio blocco introduttivo. Il carosello ha un titolo e un solo paragrafo; nell’hero resta una breve indicazione che l’app è in sviluppo. Nome coerente per l’apertura della libreria. Le schede mantengono quaderno, profilo, funzioni e slogan distinti; etichette e testi sono più leggibili. I due comandi sono “Read my thoughts” e “Read the conversation”, con frecce statiche. L’avvertenza sui contenuti dimostrativi compare una sola volta sotto le schede. Nessuna modifica alle illustrazioni, alle scene giorno/notte, al catalogo o alla pubblicazione.

Prossimi interventi, da affrontare uno alla volta come richiesto da Gaia: consolidare coerenza dello stile e percorso desktop; aumentare il peso delle immagini; ripensare la versione mobile. La passata corrente si limita alla gerarchia desktop, non conclude la revisione mobile.

## Dettagli in lavorazione: libreria e stati della community

La preview libreria riprende ora l’ambiente della stanza principale: struttura in legno caldo intagliato e venato, ripiani fotografici profondi e fondale da angolo lettura con piano di legno. I libri restano elementi HTML interattivi con copertine e dorsi dimostrativi originali; il mobile illustrato non contiene libri generati. La scheda del volume resta a destra, allineata con i filtri all’altezza della libreria. I precedenti asset con montagne sono conservati.

Shared thoughts mostra due brevi pensieri di esempio di Mia, con spazi più compatti. Il comando della conversazione è assente in questo stato e viene ripristinato solo su Book discussion. Le due aperture usano un piccolo medaglione con chevron, al posto delle frecce lunghe. La discussione espansa include altre brevi risposte dimostrative per accompagnare la lunghezza della scheda diario.

La preview riduce il piano di legno visibile e gli spazi esterni. L’istruzione di trascinamento e i crediti sono centrati sotto gli scaffali, non rispetto all’intero dialog. La scheda del volume è più corta e trasparente, lascia intravedere la stanza e presenta un libro più grande.

Interazioni libreria: i ripiani hanno altezza fissa; riordino e cambio faccia verificano tutti i libri in entrambe le dimensioni e ripristinano la disposizione se manca spazio. Le due raccolte mantengono separatamente la disposizione finché la pagina resta aperta. Drago e vaso sono trascinabili; il vaso rimane appoggiato al ripiano scelto. Legno e stanza più luminosi, titolo del volume selezionato bianco con ombra per leggibilità.

Chiusura della preview: icona X vettoriale simmetrica e centrata in un cerchio traslucido di 40px (fondo al 42% di opacità, più trasparente anche in hover), con distanze identiche dai bordi superiore e destro, hover e focus visibili.

Profondità: ombra morbida proiettata dal mobile sul piano, ombre di contatto lungo i ripiani e dietro i volumi. Corretto il cambio di faccia dei libri originariamente orizzontali: il dorso verticale azzera la precedente rotazione e riempie l’intero volume.

Inserimento nelle pile: il rilascio considera anche la posizione verticale del puntatore. Allegiant può essere inserito dopo Insurgent dentro la pila e assume la posizione orizzontale corretta; a destra o sinistra di una pila si inserisce accanto. I gruppi rimasti vuoti non occupano spazio.

Spostamenti tra ripiani: prima di rifiutare un inserimento, la libreria riduce automaticamente i vuoti tra i gruppi e, se necessario, mostra di dorso le copertine esposte del ripiano di arrivo. Il volume trascinato mantiene la propria faccia quando possibile. Un ripiano si considera pieno solo dopo questo assestamento; tutte le modifiche vengono annullate insieme se non entra. Verifica di riferimento: Hunger Games dal ripiano superiore a quello inferiore partendo dalla disposizione iniziale.

La copertina nella scheda laterale trascina sempre il libro attualmente mostrato, anche se la selezione precedente era diversa. Il doppio clic prova a fare spazio senza annullare silenziosamente la faccia richiesta per quel volume.

Compatibilità trascinamento: i discendenti grafici dei libri non intercettano il puntatore; drag nativo di immagini/SVG e selezione vengono bloccati nella preview, lasciando il gesto al gestore dei libri. Il rilascio viene intercettato sulla finestra (pointerup e fallback mouseup), con pulizia garantita dell’anteprima; non dipende più dalla cattura del puntatore sul libro. Verificato trascinamento sul ripiano inferiore nella finestra Brave dell’utente.


## Atmosfera della preview

Il pop-up della libreria ha un alone esterno caldo e morbido, realizzato con ombre luminose esterne. La libreria a due ripiani è soltanto un esempio per la landing: nella futura app la libreria personale potrà essere più alta e grande, con più ripiani; questa passata non implementa ancora tale espansione.

Crepitio di camino in loop, spento all’apertura e attivabile dal comando “Fireplace sound”: nella scena principale è disponibile di notte; nel pop-up della stanza è sempre disponibile. Volume discreto al 18%; i due comandi condividono lo stesso stato. Passando alla modalità giorno l’audio si ferma. Se attivato nel pop-up mentre la scena principale è di giorno, si ferma chiudendo il pop-up. Effetto sonoro CC0 di SFXMint, conservato in locale con provenienza in `public/audio/fireplace-license.txt`.


## Grafica dei libri nella landing — decisione del 6 novembre 2026

La landing conserva titoli, autrici, saghe, descrizioni originali e tutte le interazioni esistenti. Le copertine editoriali e le fotografie dei dorsi sono sostituite in libreria, carosello, diario, forum e anteprime 3D da grafiche tipografiche vettoriali originali: palette calda, tessuto, bordi sottili e ornamenti geometrici astratti. Nessun logo editoriale o illustrazione ufficiale. Le grafiche sono indicate come illustrative e non come edizioni reali.

Asset in `public/images/demo-books/`, generatore ripetibile `node scripts/generate-demo-book-art.mjs`. Gli originali precedenti sono conservati fuori dalla directory pubblica nel workspace di lavoro, non vengono distribuiti con il sito. Questo intervento riguarda soltanto la landing: nessuna integrazione di Open Library e nessuna decisione definitiva sul catalogo dell’app futura.


## Visitatori della libreria — 6 novembre 2026

Undici interpretazioni illustrate nuove: Rhysand, Azriel, Feyre, Nesta, Aelin/Celaena, Rowan, Poppy, Casteel, Katniss, Peeta e Cassian. Le fan art inviate da Gaia servono a riconoscere le caratteristiche; non sono incluse nel sito. Ogni asset trasparente contiene due pose, libro chiuso e libro aperto; i prompt e la provenienza da image_gen sono documentati in `docs/character-artwork.json`. Questo non costituisce una verifica o concessione di diritti sui personaggi letterari.

A ogni apertura della preview compare un solo visitatore in miniatura sul bordo di un ripiano. Ingresso breve, passaggio alla posa di lettura, uscita dopo circa 7,6 secondi. Un lieve bagliore identifica un libro correlato, quando presente nella raccolta attiva, altrimenti un volume dimostrativo. Il libro resta disponibile: non cambia stato, ordine o selezione.

Rotazione casuale senza ripetizioni fino a completare il gruppo, ricordata in locale; evitata anche la ripetizione tra un giro e il successivo. Il caricamento delle immagini è su richiesta, una sola figura per apertura. Nessuna comparsa automatica durante la lettura del diario. L’animazione si interrompe quando si interagisce con libri, oggetti, filtri o tastiera, alla chiusura, al ridimensionamento o quando la pagina passa in secondo piano. Nessuna comparsa con movimento ridotto. Implementazione locale, senza backend, push o deploy.

Feyre: abito aggiornato ad azzurro chiaro con ricami argentati su richiesta di Gaia; gli altri dieci personaggi restano invariati.

Feyre: stivaletti avorio caldo con dettagli argento, approvati da Gaia, coordinati all’abito azzurro chiaro.


## Nuovi visitatori — 7 novembre 2026

Aggiunti Violet e Xaden, entrambi con due pose trasparenti nello stesso stile dei precedenti. Violet: treccia castana con estremità argentate e abbigliamento da cavallerizza scuro. Xaden: capelli scuri, pelle bronzea, abbigliamento da combattimento e tatuaggi astratti. Entrambi si associano ai volumi The Empyrean presenti nella raccolta attiva. I visitatori disponibili sono ora tredici.

La coda casuale viene rinnovata quando cambia il catalogo dei personaggi, così include anche le aggiunte senza dipendere dalla coda precedente salvata nel browser. Il resto del comportamento è invariato.

Richiesti anche Harry Potter, Ron Weasley e Hermione Granger: la generazione delle tre immagini è stata bloccata dallo strumento senza un motivo specifico utilizzabile. Questi tre personaggi non sono ancora stati creati né inseriti nella landing. Le immagini di riferimento non sono state copiate nel sito.


## Compagni animali — 7 novembre 2026

Aggiunti Hedwig/Edvige, Crookshanks/Grattastinchi, Fleetfoot, Abraxos, Tairn, Andarna nella fase dorata iniziale, Sgaeyl e Buttercup/Ranuncolo. Nuove illustrazioni trasparenti in due pose, con gesti specifici al libro; scala ridotta per civetta, gatti e giovane Andarna. Gli otto compagni si alternano autonomamente ai tredici personaggi già disponibili: totale ventuno comparse. Fonti e distinzione tra caratteristiche documentate e scelte creative in `docs/creature-research.md`. Nessuna aggiunta dei tre personaggi Harry/Ron/Hermione bloccati dal generatore.
