# Mobile illustrated book carousel — visual QA

final result: passed

## Target and evidence

- Selected visual truth: /Users/gaiaghezzi/.codex/generated_images/01a1d594-915d-74b1-9b20-855cf9c79a25/exec-c0a06076-7b43-4621-ab4d-2b7c9ee29730.png (852 × 1846 px).
- Implementation: http://127.0.0.1:4188/#stories-title.
- Final screenshot: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-carousel-2026-11-15/mobile-final.jpg (390 × 844 px).
- State: first book, The Night Circus, light theme, mobile viewport 390 × 844 CSS px, device pixel ratio 1.
- Density normalization: source resized to 390 × 844; implementation already 1:1. No device/browser chrome in either comparison.
- Full-view comparison: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-carousel-2026-11-15/comparison-final.jpg.
- Focused cover comparison: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-carousel-2026-11-15/cover-comparison-final.jpg.
- Supporting captures in the same directory: mobile-320.jpg, mobile-dark.jpg, book-sheet.jpg. Dark capture verifies the theme, with the top of the book region visible; it is not the primary fidelity comparison.

## Findings and accepted adaptations

No remaining actionable P0/P1/P2 findings in the implemented scope.

- Fonts/typography: existing Cormorant Garamond heading, Jost description and Kalam handwritten caption retained. Heading is 30–38 px on mobile, body 15 px. The selected concept has more display whitespace and a larger title; the implementation intentionally follows Gaia’s compact mobile typography direction from the preceding hero work. Text remains selectable, legible and unclipped at 320 and 390 px.
- Spacing/layout: one dominant central book, smaller partially visible neighbors, original botanical sprig near its lower-left corner, and italic memory line below. The real page preserves the quote before/after this section. Decorative star/dividers from the mock are omitted as nonessential polish, keeping the mobile page quieter and avoiding additional dash-like decorations. Cover size and emphasis match the selected concept’s intent, while reduced header whitespace fits the actual landing.
- Color/tokens: ivory/plum/lilac palette retained. Thin arrows are at the outside viewport edges, without circles, cards, backgrounds or progress marks. A subtle contrasting stroke halo keeps the small glyph legible over either a binding or the ivory surface. The 44 px interaction targets remain generous although the icons are small.
- Imagery/asset fidelity: ten original clothbound front-cover illustrations generated in the selected painterly/gold style, with an actual transparent lilac sprig. No official publisher cover scans or code-drawn artwork. Originals and full-size lossless variants remain intact; separate 600 × 840 responsive copies are checked losslessly against their resized source rasters. ACOTAR uses a text-free original floral binding with semantic HTML title/author, retaining the same visual direction and readable lettering. All other titles/authors are part of their cover images. The existing mobile book sheet now displays the same curated cover.
- Copy/content: existing section heading, paragraph, ten titles/authors and book-sheet content preserved. The selected concept’s line “The ending I still think about.” is retained as illustrative marketing copy, with no named testimonial or invented reader identity. No new routes or product features added.
- Interaction/accessibility: native horizontal scrolling and snap, keyboard arrows with focus transferred to the new book, existing book dialogs, 44 px arrow buttons, and a screen-reader-only current-book status. Duplicate end covers are inert decorative elements rather than duplicate buttons. No autoplay on mobile. Reduced-motion preference removes smooth motion and transitions through the existing media query.

## Comparison/fix history

1. First capture used the larger side-cover scale and uncontrasted plum arrows. The arrows disappeared over dark bindings (P2). Added a subtle opposite-color glyph halo without a circle/background.
2. Direct input and keyboard review found that rapid arrow presses needed a stable pending target and keyboard focus needed to follow the selected book (P2). Implemented both and checked two quick Next presses reached the third book, keyboard Right focused the fourth book, and Enter opened its matching dialog.
3. Width changes could reinterpret an old scroll offset as a different book (P2). Added a measured-width guard and alignment on resize. Verified ACOTAR remains selected when changing 390 → 650 → 390 px.
4. Source comparison showed neighboring books too prominent and the center binding too flat (P2 visual drift). Reduced neighbors to 70% scale, refined the central book angle/depth and moved the real flower asset outward. Compared the revised full view and detailed cover crop. Final captures show the selected hierarchy with discreet outer arrows.
5. Reload/viewport operations occasionally returned stale raster content or reset scroll to the hero. Those captures were rejected; the final screenshot was taken only after positioning the section and verifying actual rendered bounds/state.

## Verification

- pnpm check passed: 69 reachable source files and referenced assets verified.
- pnpm test passed: 18 existing regression tests.
- pnpm images:optimize, responsive cover generation and pnpm images:check passed: 41 full-size lossless variants plus ten checked responsive cover copies.
- pnpm build passed after the final CSS refinement.
- Browser-tested previous/next, two consecutive Next presses, wrap 1 → 10 → 1, native horizontal scroll, keyboard navigation and Enter, correct book-sheet opening/closing, and light/dark theme.
- 320/390/650 px mobile: no horizontal page overflow. At 651 px the mobile component is hidden and the previous desktop/tablet carousel is displayed.
- Browser error log returned no errors.
- No commit, push or deployment for this iteration. Existing unrelated hero changes and the nested app repository were preserved.

## Implementation checklist

- [x] All ten book assets and the botanical sprig installed, documented and optimized.
- [x] Central book, neighbor peeks, thin outside arrows, no visible indicators.
- [x] Existing book sheets preserved with matching mobile cover art.
- [x] Scroll, loop, keyboard focus and resizing checked in browser.
- [x] Final full/focused comparisons inspected; P0/P1/P2 findings resolved.
- [x] Local build preview retained for Gaia.

## Remaining limits / P3 polish

Physical-device finger swipes and a complete screen-reader audit were not run. Native horizontal browser scrolling was tested. The existing following quote reveals only after crossing its visibility threshold, so the next section may initially appear as blank breathing space near the lower viewport. That behavior is unchanged and outside this carousel redesign. Further cover/background ornament polish can follow Gaia’s visual feedback.

## User-directed compact cover revision

Gaia requested substantially smaller books because the earlier spotlight repeated the visual weight of the hero illustration. This instruction supersedes the large-book proportions in the generated concept. At 390 CSS px, cover width is now 132.594 px rather than 226.2 px (about 41% smaller), with a 110–170 px responsive range. Track spacing, flower sprig and memory line are reduced proportionally; ACOTAR live title/author lettering and image sizes were updated for the smaller frame. Heading/body, original cover artwork, arrow targets and existing sheet behavior are preserved.

Latest implementation screenshot: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-carousel-2026-11-15/mobile-smaller.jpg (390 × 844 px, device ratio 1). Previous approved large-cover capture and latest capture compared together at identical density and viewport: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-carousel-2026-11-15/smaller-comparison.jpg. The comparison clearly shows the requested reduction and more compact section. Fonts, colors, artwork sharpness, wrapping and spacing remain appropriate; no actionable P0/P1/P2 findings. Next/previous browser check passed with correct status and ACOTAR title fit; no horizontal page overflow. pnpm check, 18 tests and pnpm build passed. No publication.

final result: passed

## Upright covers and bright arrows — user refinement

Gaia requested upright books and more visible white arrows. The mobile binding transform is now none; book sizes stay in the approved compact range. Both arrow glyphs are pure #fff, 20 px with a 2 px stroke and a subtle dark shadow for contrast over cover art and ivory; 44 px targets and the outside placement are preserved. Browser-computed transform none and rgb(255,255,255) confirmed at 390 px, without horizontal overflow. Screenshot: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-carousel-2026-11-15/mobile-upright-white-arrows.jpg. The requested straight presentation intentionally supersedes the angled concept. Visual review found no actionable P0/P1/P2 issue. Check, 18 tests and build passed. Still local.

final result: passed


---

# Mobile Library — selected SVG implementation

- Source visual truth: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/library-svg-2026-11-15/01-mensola-personale.png
- Implementation: http://127.0.0.1:4188/#library
- Browser screenshot: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-library-2026-11-15/390-light-final.png
- Full-view comparison: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-library-2026-11-15/comparison.png
- Additional evidence: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-library-2026-11-15/390-dark.png; /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-library-2026-11-15/library-inside-current.png
- Viewport: 390 × 844 CSS px, light theme, Walnut selected, closed library.
- Density normalization: source 780 × 1600 pixels normalized to 390 × 800; implementation screenshot 390 × 844, section aligned at y=22 and cropped to 390 × 800 for comparison. Section actual height 808 px.

## Findings and comparison history

1. Initial browser observation showed the heading wrapping onto three lines and 20 px side padding. Fixed the heading max-width (13ch) and raised the scoped section selector specificity so the intended 28 px padding wins. Adjusted copy, section, and control gaps to recover the selected compact composition.
2. Post-fix comparison: no actionable P0/P1/P2 differences. The same original four books, plant, vase and shelf are used with the exact reference crops. Their placement and scale match the selected SVG. No new illustrations or approximation art were introduced.

## Required fidelity surfaces

- Typography: production retains the official Cormorant Garamond and Jost families. SVG raster previews used locally available fallbacks; small glyph/weight differences are intentional. Main heading now has the selected two-line wrapping. Caption and controls remain legible.
- Spacing and layout: single shelf, short copy, caption, five material swatches and bottom action follow the selected hierarchy. Real 44 px swatch targets widen the row slightly compared with the mock; intentional accessibility adaptation. Existing marker appears on CTA hover/focus, preserving the shared site behavior; no permanent marker or decorative arrow was added.
- Colours/tokens: site paper and ink colours retained, with readable dark-theme text and matching artwork. Material selections update the illustrated shelf using colour filters while preserving the approved source art.
- Images: exact original reference artwork reused, in the same crop proportions as the SVG. Original illustration and protected character catalog unchanged. Background transparency inspected on light and dark themes.
- Copy/content: selected short English text reproduced. Existing desktop/tablet copy retained.

## Focused comparison

The 390 px source/implementation side-by-side displays book crops, small text, material rings and action at their native CSS size; a separate enlarged crop was unnecessary because these details were readable in that comparison. Dark-theme image separately inspected for halos and contrast.

## Interaction and responsive checks

- Sage selection updates pressed state, selected material and shelf filter; Walnut restored.
- Both the illustrated shelf and the text action open the existing full library; Close returns to the page.
- 320 px: no horizontal overflow, all five material buttons remain 44 px.
- 650 px: mobile composition visible, prior composition hidden, no overflow.
- 651 px and 1440 px: mobile composition hidden, prior composition visible, no overflow.
- Dark theme: screenshot captured and inspected; light theme restored.
- Browser error log: empty.
- pnpm check passed (71 reachable source files); 18 tests passed; final build passed. No new tests needed for this presentation change.

## Follow-up / limits

Internal library mobile layout remains unchanged and is the next design task. Phone checks use browser viewport emulation, not a physical device. No commit, push or deploy.

final result: passed


---

# Your library — mobile flow QA · 15 November 2026

## Result

No actionable P0/P1/P2 issues remain. The approved Shelves / List / Edit flow is implemented on phones up to 650 px. The existing tablet and desktop library is retained above that boundary.

## Visual truth and captures

- Source: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/library-flow-svg-2026-11-15/01-shelves.svg, 02-list.svg, 03-edit.svg, 04-edit-completo.svg.
- User correction: replace “Livia’s Library” with “Your library”. Normalized copies: reference-shelves.svg, reference-list.svg, reference-edit.svg in this folder.
- Implementation: http://127.0.0.1:4188/#library (main preview, left open in Edit).
- Actual user-facing captures: preview-shelves.jpg, preview-list.jpg, preview-edit.jpg; combined preview-flow.png.
- Full-view side-by-side comparisons: comparison-shelves.png, comparison-list.png, comparison-edit.png.
- Focused control comparison: comparison-edit-controls.png (source and implementation crops y355–775).
- Phone frames: 390×844 CSS px. SVG references normalized to 390×844; browser screenshots are 390×844, no device chrome or density mismatch. The light comparison uses Linen, Daylight and Walnut. Existing collection order and edition modes are preserved in the main preview; the SVG list used a shorter illustrative ordering.

## Comparison history and fixes

1. P2: the former shelf sprite included painted ivy, so removing the ivy object left leaves on the shelf. Added a clean isolated shelf image with genuine transparency, kept originals, and rendered ivy as a separate approved cutout. Verified zero ivy items after switching it off; ivy-off.jpg. Final shelf comparison shows two clean supports and independent foliage.
2. P2: Edit settings had accumulated excess vertical gaps compared with the SVG, moving the Shelves controls below the first viewport. Reduced field spacing while retaining 44 px controls. Evidence: comparison-edit-before-spacing.png versus final comparison-edit.png and focused comparison-edit-controls.png.
3. P2: the companion selector’s implicit label included its option text. Added explicit “Keep a companion” labeling. Browser lookup then resolves one selector and all eight existing companions. Adding Hedwig works and Discard removes the test addition.
4. P2: shared marker styles overrode the reading-filter colours. Scoped responsive colour rules restore purple To read, amber Reading and green Read. Verified final List captures.
5. Interaction refinements: book targets are at least 24 px, empty shelf space accepts drops, and every successful Save returns to Shelves even if Edit was opened from List.

## Required fidelity surfaces

- Typography: production uses the established Cormorant Garamond, Jost and Kalam families. SVG previews rendered with local fallback fonts, so minor glyph differences are expected. Headings, names, long titles and small labels are readable, with no clipped primary controls.
- Spacing/layout: the same three-view hierarchy, single shelf zoom, persistent preview, scrolling settings and fixed save bar are present. 44 px settings targets are an intentional accessibility adaptation. A decorative caption can sit just below the fold in the full three-shelf view; this does not obscure books or actions.
- Colours/tokens: warm ivory, plum ink, lilac accents and the existing yellow marker treatment are retained. All five wall choices, two wood choices and Daylight/Evening feed the actual scene. Dark-theme UI remains legible; the room keeps its explicitly chosen lighting and wall colour.
- Images/assets: approved book and botanical artwork is reused. Five new raster assets supply the missing objects and clean shelf; originals and separate display crops are kept. Nothing replaces the protected character catalogue. Sprite foliage uses the existing precise cutout, and complete shelf/artwork assets are not approximated with CSS drawings.
- Copy/content: “Your library” is the default title. All requested English options are present. List uses actual demo titles/authors and stable reading statuses, rather than the shorter arbitrary ordering in the reference. Reading state remains independent of physical shelf position.

## Browser interactions verified

- Shelves/List switches, 16-book counts and all status filters; seven To read results.
- Title/author search (Bardugo returns Six of Crows and Shadow and Bone); catalogue search and adding Crooked Kingdom; Discard returns to 16 books.
- List display selector moves the chosen cover onto its selected shelf while retaining reading status.
- Real pointer drag of a book between shelves and within their order; no leftover drag ghost. The moved Read book remains Read.
- All together, By reading status and By saga; Saga, Colour, Height, Author and My order.
- Shelf cover choices, including None, top/middle/bottom, and exclusive cover selection.
- Wall, light and wood updates; four new decoration toggles; preview stays in place while settings scroll.
- Name/settings/object save, reload, and Discard restore; new decoration and cover choices survive reload.
- Save opened from List returns to Shelves. Failed storage stays editable and dirty (unit test).
- More treasures retains existing objects and all eight permanent companions.
- Escape leaves Edit, then closes the library. Shift+Tab/Tab wrap inside the dialog; background scrolling and focus recover on close.
- 320×700: no overflow, settings remain scrollable, save bar ends at y700. 650×844: no overflow and save bar ends at y844.
- 651 and 1440 px: previous tablet/desktop dialog is active, no horizontal page overflow; focus still works after the responsive switch.
- Dark theme inspected: dark-edit.jpg. Minimum phone width inspected: 320-edit.jpg.
- Browser error logs: empty in completed runs.
- Final main-preview test arrangement restored to its original book order; Your library, Walnut, Linen and Daylight left selected.

## Automated validation

- pnpm check passed: 77 reachable source files, image references, 22 protected visitors and responsive boundaries checked.
- 24 tests passed, including grouping, ordering, status separation, cover selection, new decoration persistence, old snapshot compatibility and failed-storage retry.
- pnpm images:check passed: 46 full-size lossless variants plus existing responsive cover delivery; original hashes, visible pixels and alpha verified.
- Final Astro build passed. git diff --check passed. No new package dependencies.

## Asset paths, prompts and generator

Built-in image_gen generated hourglass, framed illustration, bookends and sleeping cat, and edited the approved shelf into a clean version. Exact final prompts, crop bounds and original/display paths are recorded in:

/Users/gaiaghezzi/Desktop/Progetti/LaCasaDelLibro/docs/library-mobile-artwork.json

Original PNGs and separate display crops:

/Users/gaiaghezzi/Desktop/Progetti/LaCasaDelLibro/public/images/decorations/library-mobile/

Lossless display WebPs:

/Users/gaiaghezzi/Desktop/Progetti/LaCasaDelLibro/public/images/optimized/decorations/library-mobile/

## Limits / follow-up polish

Phone verification uses browser viewport emulation and pointer interaction, not a physical touch device. Existing saved layouts may contain more than one face-out book on a shelf; they are preserved until a new single-cover choice is made. Shelf spacing responds to the real collection size, and overflow stays within the shelf. No backend/account behavior was added. No commit, push or deploy.

final result: passed


## Update · requested removal of More treasures

Removed the complete More treasures block from mobile Edit, including its extra object grid and companion picker. The eleven primary On the shelves options remain. Asset files, catalogue and existing shelf placements are preserved. Browser verification: extra block absent, eleven primary options present; evidence: /Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/mobile-library-flow-2026-11-15/edit-without-more-treasures.jpg. Structure, 24 tests and build passed. Search-bar wording remains a proposal pending the user’s choice.

final result: passed


## Update · approved search preview and smaller decoration tiles

Search is now a native disabled search input, labeled “Search for a book”, with the associated description “Book search is coming in the app”. Mobile query filtering and catalogue result/add controls were removed; reading-status filters continue to show the existing demo collection. The eleven decoration toggles use four columns, smaller icons/labels, 65 px minimum height (two-line labels can grow slightly), and retain their pressed states. Browser check at 390 px: native input disabled, exact note present, zero catalogue containers, eleven tiles, four 81 px columns. At 320 px: four 63.5 px columns, no overflow and targets remain above 44 px. Browser error log empty. Structure, 24 existing tests, build and diff whitespace check passed. Evidence: search-preview.jpg, compact-objects.jpg and search-and-compact-objects.png in this report folder. No commit/push/deploy.

final result: passed


## Update · search bar removed

Removed the mobile search field and its icon/styles. Only “Book search is coming in the app” remains beneath Shelves / List. Browser check at 390 px: zero search inputs inside the mobile dialog; exact note present. Compact eleven-object grid unchanged. Evidence: search-note-only.jpg. Structure, 24 existing tests, build and diff whitespace check passed. Local only.

final result: passed


---

# Mobile reading journal — 15 November 2026

Source visual truth: `/Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/journal-mobile-svg-2026-11-15/03-diario-a-schede.svg`.
Source browser capture: `reference.jpg` in this directory.
Implementation: `http://127.0.0.1:4188/#journal`, browser capture `memories.jpg`.

## Evidence and normalization

Both source and implementation were captured at 390 CSS pixels wide, light theme, Memories selected, first thought Shared and review Private. Both comparison crops are 390 × 950 pixels; 1 image pixel equals 1 CSS pixel. The implementation crop starts at the top of `.mobile-reading-journal`, excluding unrelated landing sections. Full evidence: `comparison-final.png` (source left, implementation right). Focused tabs, privacy and writing comparison: `comparison-details-final.png`.

Additional rendered evidence: `characters.jpg`, `ratings.jpg`, `320-memories.jpg`, `320-ratings.jpg`, and `dark-memories.jpg`. The 320 px captures were repeated after verifying the actual browser width was 320; earlier captures with the wrong viewport were replaced.

## Findings and comparison history

Initial full and focused comparison (`comparison.png`, `comparison-details.png`):

- [P2, fixed] Handwriting was thinner than the approved SVG, and the small uppercase labels were undersized. Changed mobile Kalam from 300 to 400, labels from 9 to 10 px, and aligned tracking. Recaptured and compared in the final comparison files.
- [P2, fixed] At 320 px the preferred SVG line breaks could leave a single word on a line. A component container query restores continuous text flow below 270 px of available notebook content width. The updated `320-memories.jpg` confirms natural wrapping and reachable controls.
- Earlier spacing adjustments aligned the notebook start, tab borders and writing rhythm with the source, keeping 44 px privacy/navigation targets and at least 24 px colour targets.

Final comparison: no actionable P0/P1/P2 findings remain.

## Required fidelity surfaces

- Fonts/typography: project Cormorant Garamond, Jost and Kalam; approved 36 px display heading, 25 px book title, 18/29 px handwritten notes and 10 px labels. Natural wrapping on narrow phones. No truncation.
- Spacing/layout: notebook starts at approximately the source's 227 px position; intro, tab separators, ruled writing, common metadata and pagination follow the selected composition. Content grows naturally on smaller screens and Ratings; no fixed-height clipping. Tablet and desktop retain the original layout.
- Colors/tokens: warm ivory, plum, lilac and marker selection match the reference. Dark theme has dedicated readable paper/ink/divider values. Book colour and rating colours remain connected to existing state.
- Images/assets: bookmark is extracted unchanged from the selected SVG; static Feather MIT lock/check/music/chevron assets follow the existing icon system. No raster illustrations were needed for this UI. Approved artwork and original image variants are intact; image verification passes.
- Copy/content: selected Memories copy and short heading retained. All original eight book colours remain selectable (the SVG shows five). Dynamic privacy summary replaces the static privacy sentence to accurately reflect the demo selection. The song artist, reading time and language appear in Ratings. Existing book/saga preview actions are retained under an expandable section below the main composition.

## Browser interaction verification

- Memories/Characters/Ratings select the appropriate panel; hidden panels leave the accessibility tree.
- Footer previous/next wraps through all three pages and updates the live page count.
- Keyboard Home, ArrowRight and End select/focus the expected tabs.
- Independent sharing controls reach both-shared, one-shared and all-private states, updating the live summary.
- Book colour changes the book accent. Rating value and colour choices update visibly (Romance 2/5 and third palette colour verified).
- Book and saga actions update the expanded preview to The Ember Crown / The Ashborn Saga.
- Actual 320, 390 and 650 px widths show the mobile layout without horizontal overflow. At 651 and 1440 px the original journal is visible and the mobile component is hidden, with no horizontal overflow.
- Light and dark themes inspected; light theme and initial demo state restored for handoff.
- Browser console error log: empty.

## Verification and follow-up

`pnpm check`, 24 tests, `pnpm images:check`, `pnpm build` and `git diff --check` pass. All commands used the project pnpm dependency-verification bypass already used in this workspace.

P3 only: minor differences in heading baseline, marker width and notebook edge shadows relative to the SVG. The small extra notebook height accommodates real control hit areas and all existing colour choices. Physical touch-device testing was not performed; browser mobile viewport and native pointer/keyboard input were used.

Implementation checklist: completed. No commit, push or deployment requested for this iteration.

final result: passed

---

# Mobile book sheet — 23 November 2026

final result: passed

## Target and evidence

- Selected visual truth: `/Users/gaiaghezzi/.codex/generated_images/01a1e00a-c9a4-7881-ba55-83561cd4f64b/exec-9e0a9296-941b-4198-bf56-2f4c07e6e904.png`.
- This is the user's selected first editorial proposal, revised so My journal starts closed and opens only on request.
- Implementation: `http://localhost:4175/`, production build preview. The development page at `http://localhost:4321/` uses the same source changes.
- Evidence directory: `/Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/book-sheet-mobile-2026-11-23/`.
- Final implementation: `mobile-final.jpg`, The Cruel Prince, light theme, To read, favourite unset, journal/forum/cover preview closed, empty notes.
- Source image: 852 × 1846 pixels. Normalized source: `reference-normalized.png`, 390 × 844 pixels. Browser CSS viewport: 390 × 844; screenshot: 390 × 844 pixels, effective screenshot density 1. No phone frame or browser chrome included in comparison.
- Full comparison: `comparison-final.png`, normalized source on the left, implementation on the right.
- Focused controls comparison: `comparison-controls.png`, source/implementation crops around reading status, disclosures and the preview note. Both crops keep 1:1 CSS-pixel scale; a 10-pixel vertical crop offset aligns the same controls.
- Other accepted evidence: `journal-open.jpg`, `journal-scrolled.jpg`, `long-title-final.jpg`, `width-320.jpg`, `width-650.jpg`, `width-651.jpg`, `width-1440.jpg`, and `dark-journal.jpg`.

## Findings and fixes

No actionable P0/P1/P2 findings remain in this implementation scope.

1. [P2, fixed] Initial typography and gaps pushed the disclosure controls materially lower than the selected mock. Evidence: `implementation-initial.jpg` and `comparison-initial.png`. Increased synopsis weight, adjusted its size/line height, reduced redundant gaps, and tightened the identity block. Recaptured after fixes: `mobile-final.jpg` and `comparison-final.png`. Primary content now follows the selected compact hierarchy; the remaining small baseline and control-height differences are acceptable accommodations for the real font and 44-pixel hit targets.
2. [P2, fixed] At 320 pixels, A Court of Thorns and Roses inherited 24-pixel cover lettering, clipping its title and author inside the small cover. Evidence: `long-title-initial.jpg`. Added a MobileBookSheet-only lettering rule in the existing responsive CSS layer, preserving the original art and other cover presentations. A first rule in the components layer was overridden by BookCover's responsive layer and was rejected after inspection. The final responsive rule renders 13-pixel lettering at 320 pixels. Evidence: `long-title-final.jpg`; browser measurement confirms every lettering element ends within the cover bounds.
3. [P2 prevention] Capped thumbnail width at 140 pixels on wider phones; it is 96 pixels at 320 pixels and 140 pixels at 650 pixels. This keeps a compact identity band rather than recreating the previous large cover hero. Browser measurements and captures confirm no horizontal overflow.
4. Rejected transition captures: the first 651-pixel capture caught the inherited desktop opening animation; it was replaced with a stable capture. An initial dark capture preceded cover-image completion; later dark journal/scroll captures contain the actual illustrated cover. A dark closed-state capture caught the chevron transition and is not the accepted static-fidelity reference.

## Required fidelity surfaces

- **Fonts/typography:** existing Cormorant Garamond title, Jost UI/body and Kalam handwritten inputs. Title 34 pixels; synopsis 16 pixels with 1.4 line height; field text 19 pixels. Compact labels retain the selected tracking. The long-title check covers the smallest phone and the only cover with live HTML lettering. No clipped primary text or controls observed.
- **Spacing/layout:** compact cover-left/title-right identity; synopsis and View cover beneath; reading status; separate My journal and Forum rows; preview note. My journal is closed initially. Toolbar sits outside the scrollable content so Close remains at y=8 even after 156 pixels of journal scrolling. Mobile uses the whole available surface rather than nesting the experience in another card. Tablet/desktop retain the previous component and composition.
- **Colours/tokens:** warm ivory matched approximately to the reference, plum type, lavender separators/open-state accents, inherited gold reading-status marker. Existing dark-theme colours remain supported. The journal uses the approved light paper texture with dark ink in both themes. Minor font and marker differences from ImageGen are accepted P3 polish.
- **Images/assets:** original approved illustrated book covers and paper texture are reused, preserving cover typography inside the artwork. The approved journal bookmark is reused when the journal opens. Feather MIT icons provide heart, star, arrow, close and chevrons; the filled heart/star variants alter only the standard asset's fill. No generated replacement cover, approximate illustration, new raster art, package dependency or protected character change.
- **Copy/content:** title, author, genre, existing synopsis and existing journal fields retained. My journal is a disclosure, not an initially selected tab. Forum is a second disclosure and still clearly labels its fictional sample conversation. Removed the generic automatic-metadata promise from mobile. Preview disclaimer matches the selected mock. No new account, API, publishing or persistence claims.

## Interaction and responsive checks

- Opening The Cruel Prince starts with journal, forum and enlarged cover hidden; hidden journal fields have zero visible client rectangles.
- Clicking My journal opens its fields; pressing Enter on the same control closes/reopens it. Character, song, multi-line memory and score remain in React state while switching panels.
- Entered demo notes, selected 3 stars and moved to 4 stars using ArrowRight. The visible radio selection and live announcement agree.
- Opening Forum hides My journal. Both can be closed by pressing their row again.
- Favourite toggle, Reading status selection and View cover/Hide cover work. Selected favourite and stars use the standard filled icon variants.
- Data is held per book during the current visit, as before; no new persistent storage or backend.
- Close remains reachable while the journal scrolls. Shift+Tab from Close wraps to Forum; Tab wraps back to Close. Escape closes the sheet and restores background scrolling.
- Tested 320, 390 and 650 pixels on mobile, with no horizontal page or dialog overflow. At 651 and 1440 pixels, the previous tablet/desktop sheet is used. Resizing switches components and restores focus to Close.
- Dark theme inspected with the journal open and scrolled; original light theme restored for handoff.
- Browser error log: empty in the final run.
- Final demo notes remain empty and the selected book is left on To read, with My journal closed, for the user's local review. Temporary viewport override reset after capture.

## Validation

- `pnpm check`: 82 reachable source files, asset references, protected visitors and breakpoint rules passed.
- Existing regression suite: 24 tests passed.
- `pnpm images:check`: 46 lossless variants verified; original hashes, visible pixels, alpha and dimensions preserved.
- `pnpm build`: passed after the final responsive CSS correction.
- `git diff --check`: passed.
- Changes are local to this requested implementation; no new commit, push or deployment.

## Remaining limits / P3 polish

Physical touch-device/virtual-keyboard testing, a full screen-reader audit and text-zoom testing were not performed. ImageGen's slightly brighter book-cover rendering is deliberately not used to replace the approved original. Small marker-shape, separator-tone and font-baseline differences remain; they do not change hierarchy or usability. Existing unrelated edits to MobileReadingJournal, QuoteStars and the product brief were preserved.

## Implementation checklist

- [x] Exact revised visual target resolved and compared at matched density.
- [x] Mobile-specific component integrated using the project's shared phone breakpoint.
- [x] Closed-by-default journal, forum, notes, rating, favourite and cover controls implemented.
- [x] Persistent close toolbar and keyboard navigation checked.
- [x] Narrow/long-title and wider-phone behaviour checked; tablet/desktop retained.
- [x] Full and focused post-fix comparisons inspected; no outstanding P0/P1/P2 findings.
- [x] Existing regression checks and build pass; local preview left open.

final result: passed

---

# Mobile character portraits — 23 November 2026

final result: passed

## Visual target and evidence

- Selected direction: the second character concept, Taccuino, with the user's confirmed request to keep Personality, Strengths and Vulnerability closed on opening and align the typography/separators with the book sheet.
- Source: `/Users/gaiaghezzi/.codex/generated_images/01a1e00a-c9a4-7881-ba55-83561cd4f64b/exec-2104a107-c3d8-43a6-9ca5-71be7da754d1.png`.
- Implementation: `http://localhost:4175/#star-quote`, current production build preview. The same source is available through the development server on port 4321.
- Evidence folder: `/Users/gaiaghezzi/Documents/ChatGPT/LaCasaDelLibro/output/character-sheet-mobile-2026-11-23/`.
- Source 852 × 1846 pixels, normalized to 390 × 844 CSS pixels in `reference-normalized.png`; implementation capture `mobile-final.jpg` is 390 × 844 pixels, effective screenshot density 1. Both show Rhysand, light paper and all three sections closed, without a phone frame or browser toolbar.
- Full comparison: `comparison-final.png` (source left, implementation right). Focused accordion comparison: `comparison-controls.png`, matching 342 × 210 pixel control crops at 1:1 CSS scale, with a 24-pixel vertical crop adjustment to align the same rows.
- Additional accepted captures: `feyre-initial.jpg`, `strengths-final.jpg`, `320-open-scrolled.jpg`, `width-320.jpg` (320 × 700), `width-650.jpg`, `width-651.jpg`, `width-1440.jpg`.

## Findings and comparison history

No actionable P0/P1/P2 findings remain in the requested scope.

1. [P2, fixed] The initial keyboard test allowed Shift+Tab to leave the page controls instead of wrapping from the close button to the last trait. Added explicit Tab/Shift+Tab boundary handling inside the existing native dialog. Post-fix browser inspection confirms backward focus on the Vulnerability button and forward focus on Close character portrait. The native modal still provides background inertness, Escape and focus restoration.
2. [P2, fixed] The first full comparison showed a visible end to the paper texture where content ended, while the selected concept is one continuous notebook surface. Set the mobile article minimum height to the viewport minus its toolbar, with start-aligned grid tracks. The latest full comparison shows continuous paper without stretching the identity/content layout. Evidence: `comparison-initial.png` versus `comparison-final.png`.
3. Initial rapid viewport-change screenshots were rejected where the browser compositor retained the preceding size, producing clipped or black capture areas. Recaptured 320, 650 and 1440 pixel views after a separate fresh state check and visually inspected the replacements. DOM measurements independently confirm no horizontal dialog overflow at every tested breakpoint.

## Fidelity surfaces

- **Typography:** Cormorant Garamond for the name, italic series and accordion headings; Jost for the utility header, biography and expanded details. Using Jost for the biography is the intentional, user-confirmed alignment with the book sheet, instead of copying the mock's serif body. Name size responds to available width; longer names use a smaller scale and natural wrapping. All three section labels are readable in the focused comparison.
- **Spacing/layout:** compact name/series on the left and full original figure on the right, then biography and three separated disclosure rows. No large circular backdrop on mobile. The native dialog fills the phone surface; the close toolbar stays at the top while the content scrolls. At 320 × 620 with Vulnerability open and scrollTop 136.5, Close remains at y=8. At 651 and 1440 pixels the original desktop/tablet portrait composition and definition list remain visible.
- **Colours/tokens:** warm ivory paper, plum type, lavender series/separators/bookmark and the book sheet's small gold utility underline. The approved paper texture is displayed at low opacity. The character dialog retains its existing light colour scheme, including when opened over a darker page; no new dark character art or theme was invented.
- **Image quality/assets:** the actual approved illustrations are retained, rather than the mock's regenerated interpretation of their faces. A separate JSON file describes mobile SVG viewports within the original front-pose sprite frames. All 22 viewports were checked for positive size and containment within the existing cut/height bounds. The image files, existing frame catalogue, visitor catalogue and profile texts have no Git diff. Existing standard x/chevron icons and the approved bookmark/texture are reused. No new raster art or dependencies.
- **Copy/content:** all existing biographies, Personality text, Strengths/detail and Vulnerability/detail are preserved. No extra lore, quotes, editing, liking or account features. Each row opens only on request, one section at a time; selecting the open row closes it. Existing portrait-turn behaviour is retained, with the existing reduced-motion rule.

## Browser checks

- Opened the portrait through actual visible character buttons in the star-window scene. Feyre, Azriel, Cassian and Rhysand opened with the shared template.
- All three sections are closed initially and their hidden content is absent from the accessibility tree.
- Personality opens its existing traits; opening Strengths hides Personality and reveals the existing explanation. Enter closes the selected section; Space opens Vulnerability.
- Verified post-fix keyboard wrapping, Escape closure, restored focus to About Rhysand, and restored body overflow after closure.
- Native modal background interaction blocking is retained. Closing and reopening creates a fresh, closed disclosure state.
- Mobile 320/390/650 widths: no horizontal dialog overflow; exactly one visible close button and three visible section controls. At 651 and 1440 pixels there are no visible mobile disclosure controls and the previous layout is active.
- Switching across the phone breakpoint moves focus to the correct visible close button.
- Small-height phone check confirms scrolling content and a reachable close toolbar.
- Browser error log: empty in the final run. Temporary viewport override reset for the user's preview; Rhysand left open with all sections closed.

## Validation

- `pnpm check`: 83 reachable source files and required asset/visitor/breakpoint checks passed.
- Existing regression suite: 24 tests passed after the keyboard fix.
- `pnpm images:check`: 46 lossless variants verified; original hashes, pixels, alpha and dimensions preserved.
- Final `pnpm build` passed after the paper-surface refinement.
- `git diff --check` passed.
- No commit, push or deployment for this iteration. Unrelated book-sheet and documentation work preserved.

## Limits / P3 polish

Physical touch-device and complete screen-reader/text-zoom testing were not performed. All 22 portrait viewport definitions were checked as data; browser visual inspection covered four human characters, not every creature. Minor paper-grain, figure scale and typography-baseline differences remain from ImageGen; the real approved figures are intentionally preserved. The biography's sans-serif font and slightly larger rhythm follow the confirmed book-sheet consistency direction.

## Implementation checklist

- [x] Exact second visual target selected and inspected.
- [x] Mobile layout implemented; tablet/desktop presentation retained.
- [x] Three closed-by-default disclosures with keyboard behaviour verified.
- [x] Original character artwork/text/catalogues preserved; 22 viewport bounds checked.
- [x] Full and focused final comparisons inspected after fixes.
- [x] Existing checks and build pass; local preview left open.

final result: passed
