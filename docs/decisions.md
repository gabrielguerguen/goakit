# Decision log

Status as of October 10, 2026. “Proposed” does not mean approved. Record changes here with their reason and impact, preserving the reference to the brief.

## Confirmed for this phase

| ID | Decision | Consequence |
| --- | --- | --- |
| D01 | Wait for Paper screens before implementing UI | Material received; implementation started with screens 01, 02, 07, 08, and 09 |
| D02 | Future prototype with mock data and local in-memory state | No backend, persistence, or real services |
| D03 | Binary, personal progress | No purchase/prepare/pack stages or collaboration |
| D04 | Independent copies | Changes in either direction do not propagate between lists |
| D05 | Adaptations require approval | Explained proposals that can be accepted or rejected |
| D06 | Share items and quantities while respecting privacy | Progress excluded from links, text, and images |
| D07 | Account-free use; identification when publishing a link | Identification is simulated in the prototype |
| D08 | Gabriel leads design; Bruno will implement infrastructure | Types and boundaries documented; services not implemented in advance |

## Technical direction

Keep the existing Expo + TypeScript + Gluestack + NativeWind setup without a second styling engine. Prerelease versions need review before UI implementation. Final visual identity, Expo Router, backend, and authentication providers have not been approved.

## Open questions

| ID | Topic | Proposal for discussion | Suggested timing / owner |
| --- | --- | --- | --- |
| Q01 | Default visibility | Privacy should be a clear choice; do not infer it from category names | Before privacy and sharing; Gabriel |
| Q02 | Item exceptions | `inherit` follows the category; `visible`/`hidden` override it. Show the decision's origin | Before implementing the public projection; Gabriel |
| Q03 | Quiz fields | Define days/nights, values, required answers, unknown answers, and returning without losing answers | Quiz design; Gabriel |
| Q04 | Quantities | Start with positive integers; confirm fractions/units and duration rules | Before editing and generation; Gabriel |
| Q05 | Reuse | Reset completion for the new trip; preserve custom items and their privacy | Before duplication; Gabriel |
| Q06 | Rejected suggestions | In the first simulation, decisions belong to the current review. Memory across trips requires a separate decision | Before adaptation; Gabriel |
| Q07 | Custom items | Avoid automatic removal/adjustment; proposals should identify the item and explain the reason | Before the local rule engine; Gabriel |
| Q08 | Identification for text/JPG | Do not extend the link account requirement without confirmation | Sharing design; Gabriel |
| Q09 | Link updates | Demonstrate published versions and pending changes; do not choose automatic vs. manual for the real product | Prototype with Gabriel; infrastructure with Bruno |
| Q10 | Persistence for testing | Stay in memory; add storage only for an explicit testing need | Before longitudinal testing; Gabriel and Bruno |
| Q11 | Expo Router | Evaluate after mapping flows; thin routes with screens in features | Before navigation; Gabriel/development |
| Q12 | Prerelease versions | Review risks and compatibility of the current foundation before developing screens | Before UI; development/Bruno |
| Q13 | Festival and dates | Define the role of names, dates, and identification; do not require a real festival registry | Quiz and list design; Gabriel |
| Q14 | Essential/optional | Do not create a required classification before validating its usefulness | Content and design; Gabriel |
| Q15 | Undo and cancellation | Define deletion, going back during the quiz, and leaving reviews with pending proposals | State design; Gabriel |

## Handling open questions

### Temporary choices for the first block

- Typed local navigation without Expo Router for home/checklist/editor. Q11 remains open for evolution.
- Integer quantities from 1 to 999, edited with a stepper as in the reference, as a demonstration hypothesis (Q04), without generation rules.
- Saving confirms the draft; canceling/going back discards only that draft. Deletion requires confirmation (Q15).
- Fixtures have explicit, hypothetical visibility. New items use `inherit` as a marker without executing a public filter; empty test lists use hidden categories. Q01/Q02 have not been resolved as product policy, and this delivery has no sharing.
- NativeWind RC0 aligned with its `react-native-css` RC0 peer after an observed web preview failure. Q12 remains open for stabilization before distribution.

Do not hide a proposal in a code default. Before implementing dependent behavior, record the decision or an explicitly temporary agreement for the demonstration scenario. UI work can advance in independent areas without turning uncertainty into a blocker for the entire project.

Database, API, authentication, hosting, synchronization, and backup choices remain outside this implementation record until Bruno's assessment. Do not infer them from preliminary types.

## October 12, 2026 — Refração implementation

Gabriel supplied the Paper design system and requested development. Adopt Refração 0.2 for the prototype's existing screens: semantic light/dark themes, bundled Inter, shared typography/geometry, and primary-action gradients. This does not finalize the brand or resolve quiz/privacy behavior. See [implementation details and limits](design-system.md). NativeWind remains the only styling engine. Expo Font and LinearGradient use SDK 57-compatible versions; Expo was patched from 57.0.27 to 57.0.28 because the online compatibility check required it. No SDK migration or other stack upgrade was performed.
