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

Ventisette libri tra Read (18) e To be read (9), su due ripiani per raccolta. Dorsi fotografici di 25 edizioni reali, copertina esposta quando manca il dorso autentico. Primi volumi di copertina e alcuni volumi orizzontali; copertine e fonti nel catalogo locale. Le liste sono esempi, non una cronologia personale salvata.

Hover, focus e clic mostrano copertina, titolo, autrice, saga/volume e stato nel riquadro a destra. Filtri e riquadro insieme hanno la stessa altezza della libreria. Vista del volume in 3D con angolo fisso: il comando Rotate è stato tolto; resta Move, con trascinamento per riordinare i libri. Il modello non riproduce la quarta di copertina.

Lucine, edera ricadente verso l’esterno con vaso appoggiato, drago nero poggiato accanto a Fourth Wing, collana dei Doni della Morte drappeggiata sul primo Harry Potter. Indicazioni e crediti bianchi e leggibili.

## Carosello

Venti titoli fantasy, romantasy e distopici con copertine autentiche, recenti e classici. Selezione editoriale con fonti conservate in `src/data/popular-books.json`; non è una classifica globale o un feed aggiornato in tempo reale. Rimossa la riga pubblica con data e fonti.

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
