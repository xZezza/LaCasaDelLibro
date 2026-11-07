# Revisione del codice — 7 novembre 2026

## Riordino applicato

Il punto d’ingresso resta `src/pages/index.astro`. La composizione è in `src/components/landing/index.jsx`. Ogni sezione e finestra visiva ha una cartella dedicata con `index.jsx` e `styles.css`. Il componente di accessibilità produce solo comportamento e non richiede CSS. Dati statici in `src/data/landing`, hook in `src/hooks`, utility in `src/lib`, soglie in `src/config`. Il controller condiviso mantiene le interazioni dimostrative e il formato di salvataggio già presente.

Immagini in `public/images/branding`, `hero`, `community`, `decorations` e `characters`. Le otto decorazioni vettoriali sono file SVG, anziché stringhe incorporate nella logica. Le favicon rimangono nella radice pubblica, coerentemente con il manifest.

## Pulizia

Rimosse 39 proprietà dichiarate ma non usate nelle sezioni, dieci valori restituiti senza utilizzatori, tredici variabili derivate, la vecchia citazione non renderizzata e il generatore di particelle non renderizzato. Rimossi dal progetto attivo undici componenti Astro della vecchia landing, tre cataloghi non importati, lo script storico per le copertine e i vecchi asset non usati. Circa 23,85 MiB in meno nella cartella pubblica. Nessuna dipendenza aggiunta.

Prima della pulizia è stato salvato l’intero progetto, esclusi dipendenze/build/Git, in:
`/Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/work/code-review-2026-11-07/before-cleanup.tar.gz`

I 27 file del precedente manifest di conservazione risultano integri: le immagini approvate, il catalogo e i documenti rimangono nel progetto; solo il vecchio componente non usato `LibraryVisitors.astro` è conservato nell’archivio. Il rapporto con hash è nella stessa cartella di lavoro.

## Correzioni

La gestione del focus delle finestre comprende ora anche select, textarea e campi modificabili. Il timer di misurazione iniziale viene pulito quando la pagina viene smontata. Corretto il ripristino dei salvataggi con lucine Off: ora la validazione include esplicitamente lo stato spento; un test controlla anche impostazioni sconosciute e ID duplicati. Gli ancoraggi delle sezioni hanno spazio per la navbar fissa.

CSS separati mantenendo livelli espliciti: components, refinements, guests, responsive. Conservate tutte le 2135 dichiarazioni CSS uniche precedenti ancora utili, adattando solo i percorsi delle immagini; rimossa l’animazione ember inutilizzata. Breakpoint senza sovrapposizioni: desktop >960 px, tablet 651–960 px, telefono ≤650 px. Le griglie principali sono esplicite a due colonne su desktop e una nelle altre fasce; la libreria scorre sui dispositivi piccoli.

## Verifiche

- Confrontati 119 valori realmente consumati dalle sezioni prima/dopo il riordino: tutti uguali, normalizzando i nuovi percorsi delle decorazioni.
- Sei test automatici per ripristino iniziale, salvataggio e annullamento, riordino tra ripiani, animali fissi e geometria dei volumi.
- Verifica degli import e della raggiungibilità dei file attivi, delle immagini, del catalogo comparse, delle icone e delle soglie CSS.
- Build statica e controllo del diff.

Lo strumento di controllo del browser non è disponibile in questa sessione: resta da eseguire una nuova verifica visiva alle larghezze reali, soprattutto per i layout tablet/telefono. I controlli statici non la sostituiscono.

Nessun commit, push o deploy. Gli URL social reali restano da fornire e la bozza mantiene noindex.
