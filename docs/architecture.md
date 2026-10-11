# Organization and technical boundaries

## Existing foundation

The repository contains Expo SDK 57, React Native, strict TypeScript, Gluestack UI v5, and NativeWind v5 preview. `package.json` declares dependencies; `package-lock.json` records resolved versions. The installer presents Gluestack as alpha. The foundation passed type checks, Expo compatibility checks, and bundle generation during setup; this does not amount to testing product flows on devices.

Keep NativeWind as the only main styling system in this foundation, without adding UniWind alongside it. This choice uses the existing setup and can be revisited. Before implementing screens, review with Gabriel whether to keep prerelease versions; a migration requires its own validation. Do not upgrade dependencies or run `@latest` installers as part of routine visual changes.

The first block uses local state navigation with typed routes in `ChecklistApp`, including Android back handling. This keeps the flow testable without introducing Expo Router prematurely. Router remains an option for upcoming blocks; it is not installed. `App.tsx` contains only providers and the feature entry point.

During implementation, NativeWind, already resolved as `5.0.0-rc.0`, was pinned alongside its required peer dependency `react-native-css@3.1.0-rc.0`. The legacy `nativewind/babel` preset was removed, keeping the Expo preset and Metro integration; duplicate transformation prevented the web preview from opening. Tokens use the light theme from Paper, without `:root.light`/`:root.dark` selectors that are incompatible with the current native compiler. The styling engine and Expo version were not changed. Reference: [NativeWind v5 installation](https://www.nativewind.dev/v5/getting-started/installation).

## Incremental structure

| Location | Responsibility | Status |
| --- | --- | --- |
| `App.tsx` | Current entry point | Existing; do not expand it to contain entire flows |
| `components/ui/` | Installed Gluestack components | Keep the current path to avoid a migration without benefit |
| `global.css` | Color tokens and NativeWind configuration | Existing; values are not an approved visual identity |
| `src/types/` | Preliminary domain and demonstration types | Added with the foundations |
| `src/features/` | Screens, state, and presentation logic by feature | First flow in `checklists/` |
| `src/components/checklist/` | Reusable feature components | Checklist item and section |
| `src/mocks/` | Catalog, scenarios, and simulated operations | Fresh fixtures on each reset |
| `src/theme/` | Shared scales and conventions beyond colors | `patterns.ts` documents the Paper scale |
| `app/` | Thin routes and layouts | Create only if Expo Router is adopted |
| `docs/` | Product, decisions, architecture, and validation plan | Continuity documentation |

Do not create empty folders, a generic API layer, abstract repositories, or infrastructure configuration in advance. If a feature needs local rules, keep them in pure functions near the feature; extract them only when there is actual reuse.

## Dependencies and state

Intended direction: navigation entry points → features → reusable components. Local rules depend on types and data without importing components, navigation, or external SDKs. Types do not depend on UI.

In the demonstration, simple shared state (Context + reducer, if sufficient) should keep lists and drafts consistent between screens. Components receive data and actions; they do not load mocks or access services directly. Changes are immutable. The catalog is a reference; personal edits must not modify it.

Separate quiz/editing drafts from the confirmed list. Going back or canceling must not silently apply partial changes. Stable identifiers distinguish lists, categories, and items; duplicating a list requires new identities and copies of nested objects. Do not use names or array positions as identity.

The types in `src/types/index.ts` are a proposed representation to discuss with Gabriel and Bruno, not API or database contracts. Quiz options are provisional and do not prescribe labels, order, required answers, or visual controls. Runtime validation will be necessary when behaviors are implemented; TypeScript alone does not validate input.

## Local rules to implement later

- Progress derives from completed items / total items. Quantity does not create partial completion. An empty list shows 0 of 0 without division by zero. Privacy does not change personal progress.
- Quantity must be positive and finite; decide on integers, fractions, and units before the final form. Do not infer clinical quantities or medical recommendations.
- Generation combines a recurring base with conditional suggestions. Accommodation and transport are user-provided choices; weather can combine cold, heat, and rain. Do not automatically fetch a forecast.
- Adaptation keeps proposals separate from the list, with a reason and pending/accepted/rejected state. Apply a proposal only once; rejection does not change content. Confirm only after reviewing pending proposals. If the base changes during review, recalculate or invalidate proposals while explicitly preserving choices.
- Switching from own camping to a hotel may suggest removing a tent. The presence of a tent alone does not authorize automatically removing a custom item.
- Reuse and copying do not share mutable references with the original. The policy for resetting completion when reusing a list will be validated before UI implementation; a received copy never inherits the author's progress.

## Sharing boundary

Do not serialize an entire `Checklist` for sharing. Build a new `ShareableChecklist` with an explicit allowlist of fields after resolving visibility policy. Do not include completion, personal item IDs, private preferences, or trip context for convenience. Context can reveal personal data and is not part of the agreed minimum content.

Categories without visible items should be omitted from the proposed projection to avoid exposing private category names. Precedence and default policies still require approval; until defined, do not implement a filter with implicit defaults.

A preview and its simulated publication must use the same projection. The public type alone does not guarantee privacy: transformation and tests must verify actual field exclusion, including in text/images. Copying shared content can only use what reached the recipient, without retrieving private items from the original list in the mocks.

Keep a snapshot of the latest simulated publication separate from the current personal list. Local edits do not change that snapshot until another successful simulated publication. This allows discussion of pending changes and failures without deciding whether the real product will update links automatically or through new versions.

## Design and components

Reuse existing `Box`, `Text`, `Heading`, `VStack`, `Button`, and provider components. Component candidates after receiving Paper: `ChecklistItem`, `ChecklistSection`, `QuizOption`, and `AdaptationSuggestion`. Create variants when a pattern repeats; avoid implementing everything preemptively.

Map existing semantic roles: `background`/`foreground` for the base, `card` for surfaces, `muted`/`muted-foreground` for secondary content, `primary` for main actions, `border` for outlines, and `destructive` for destructive actions. Current values are provisional. After Paper, document typography, spacing, radii, control dimensions, and states before scattering values across screens.

Completion, selection, privacy, focus, disabled, and error states need indicators beyond color. Plan for screen readers, enlarged text, keyboards, touch targets, and deletion confirmation/recovery according to the design. Do not confuse neutral medium-fidelity design with a lack of accessible states.

## Future boundary with Bruno

Once there is a concrete integration, replace simulated operations near features with adapters that accept and return agreed types. Do not couple screens to tables or raw responses. Keep progress derivation and presentation rules independent of networking.

Bruno will assess storage and migrations, identification, publication and versioning, public reading, deep links, offline queues/retries, conflicts, backup, and recovery. The demonstration does not choose these services. Public payloads must also be validated in the infrastructure; the UI filter cannot be the only privacy guarantee.
