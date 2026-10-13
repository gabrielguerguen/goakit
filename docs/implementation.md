# First block — lists and checklist

## References

[Paper: wireframes and wireflows](https://app.paper.design/file/01M4KR6Y8Z07QQ9QRST4MB8DEP/p-1-0), consulted during this implementation. First scope: 01 empty home, 02 my lists, 07 checklist, 08 add, and 09 edit. Styles came from Paper's exported JSX, rather than estimates from screenshots.

The `prototipo-checklists-festivais.html` file provided by Gabriel guides interactions. Its choices of localStorage, URLs containing payloads, real exports, and privacy defaults were not carried into the app. The wireframes' “FLUXO/PROPOSTA” notes are documentation, not screen content.

## What works

- Two independent mock lists: Festival da Serra (8/24) and Festival do Vale (18/18).
- Opening lists, checking/unchecking items, Todos/Pendentes/Concluídos (All/Pending/Completed) filters, collapsing categories, and progress derived from items.
- Adding/editing names, quantities, and categories; separate drafts, cancellation without applying changes, and name/quantity validation.
- Removal with confirmation. Removing the last item produces an empty state with 0 of 0 progress.
- Returning home updates counters. Android hardware back is handled; there are no public routes/deep links.
- Home demonstration controls to start without lists, restore examples, and create an empty test list. Destructive scenario changes require confirmation.

Quiz, reuse, and sharing are unavailable with an explanation of the next block. No button announces a nonexistent publication or integration. The empty scenario can be explored and reversed through test controls.

## Organization

`src/features/checklists/` separates state/navigation, screens, and the reducer. `src/components/checklist/` contains reusable items and sections. `src/components/shared/` contains buttons, headings, notes, and dialogs. `src/mocks/` creates fresh fixtures on each reset; it is not the final catalog. `src/theme/patterns.ts` collects the scale extracted from Paper, using semantic colors from `global.css` and NativeWind.

The initial wireframe scale below has been superseded by [Refração 0.2](design-system.md), applied to these screens on October 12, 2026.

Original wireframe scale: title 28/36, card title 20/28, section 18/26, body 16/24, and caption/label 14/22. Horizontal padding 24, main gap 16, control radius 8, minimum button height 48. Smaller interaction targets in the wireframes were enlarged to at least 44; no status bar is drawn because the system supplies the real one.

The example's private categories are not an approved policy: there is no public filter in this delivery. Visibility markers are preserved during editing and are not sent anywhere.

## Trying it out

Run the README commands. Open Festival da Serra, toggle Barraca, filter Pendentes, and edit Lanterna. Change the name/quantity/category and save; then try canceling another edit. On the home screen, open the controls to test a no-lists state or an empty list, add an item, and remove it.

Everything stays in memory. Reloading restores the examples. There are no accounts, storage, application networking, backup, synchronization, or contextual generation.

## Validation

- `npm run typecheck`: screen, prop, and model types.
- `npm test`: binary progress, isolation between lists, editing by ID with duplicate names, rejection of invalid input, the last item, and independent resets.
- `npx expo install --check` and export for Android, iOS, and web.
- Interactive web preview review: opening, progress, filters, editing name/quantity/category, canceling without applying, required names, adding/removing the last item, no-lists state, and reset on reload.

Do not claim Android/iOS device tests: they were not performed for this delivery. The web preview supports UI review without expanding scope to a complete web product. Native screen reader accessibility, physical keyboards, and mobile virtual keyboards still require device validation.

## Continuity with Bruno

The reducer receives actions without external services; fixtures enter only at feature composition. Future integration should replace initial loading and operation submission while keeping screens and components decoupled. Persistence and contracts remain open. The next blocks are quiz/suggested list, then adaptation, and only then simulated privacy/sharing.
