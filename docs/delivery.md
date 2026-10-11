# Implementation and validation plan

## Current delivery

Foundations completed and the first UI block implemented: lists, checklist, and in-memory item editing. See [implementation, validation, and limits](implementation.md). Generation, adaptation, privacy filtering, authentication, and publication remain planned.

## Implementation sequence from the received Paper designs

1. Map each screen and state to the flow in `product.md`; identify gaps, open questions, and existing components before coding.
2. Agree on decisions affecting the first flow: versions, navigation, minimum list fields, and quantities. Record tokens and variants from the design, keeping the identity provisional.
3. Implement the structure and functional checklist with centralized data and in-memory editing. Validate consistent progress and navigation between screens.
4. Add the quiz and local generation; then reuse and adaptation review.
5. Define privacy before implementing previews, identification, and simulated publication. Add the recipient experience and independent copying.
6. Run the scenarios below and record limitations for Bruno. Check Android and iOS before claiming mobile validation; exporting bundles is not a substitute.

Each delivery must support the flows it announces, without buttons that appear connected to nonexistent services. The prototype may have a clearly labeled demonstration scenario selector for empty, offline, and failure states; the format of this control depends on design.

## Acceptance scenarios for the future prototype

| Scenario | Expected evidence |
| --- | --- |
| No lists | Empty state allows starting the quiz; examples can be restored without restarting the app |
| Quiz | Moving forward/back preserves the draft; context is understandable; generation does not require networking |
| Edit list | Valid names and quantities are applied; canceling preserves the original; errors do not corrupt state |
| Complete | Checking/unchecking updates the counter; quantities greater than 1 remain binary |
| Remove last item | List becomes empty without errors or an invalid percentage |
| Reuse | Original preserved; suggestions have reasons; only accepted ones affect the new list |
| Reject proposal | Content does not change; navigating between screens preserves the decision during the session |
| Apply again | An accepted proposal does not duplicate an item or apply an adjustment twice |
| Custom item | Preserved according to the agreed policy; adaptation does not silently remove it |
| Categories and exceptions | Exercise visible/hidden categories × inherited/visible/hidden items according to Q01/Q02 |
| Link, JPG, and text previews | Same allowed items and quantities; no progress or private content |
| Publish link | Mock identification is labeled; never requests a real password or generates a public URL |
| Offline/failure | Local editing preserved; pending status visible; latest simulated publication remains; retry does not lose data |
| Make private after publication | Current preview hides the item; previous publication remains until simulated update; explain the difference |
| Browse and copy | Recipient accesses only the public projection; can copy directly or take the quiz |
| Edit copy | Changes do not affect the original and vice versa; does not inherit the author's personal progress |
| Restart | Data may return to the initial scenario; in-memory limitation is explicit during testing |

“JPG,” “link,” and “text” in this phase describe options/previews and feedback; file export, clipboard, share sheets, and public addresses are not implicitly included. Decide separately whether any local native capability is needed for testing.

## Proportionate technical checks

Documentation: review consistency and internal links. Types: `npm run typecheck`. Component, styling, or navigation changes: check dependencies and export bundles, in addition to testing states on available devices.

When rules are implemented, create behavior tests for relevant boundaries: public filtering without private fields/progress, copies without shared references, adaptations applied once, and empty-list progress. Do not create tests that merely reproduce types or static document content.

## What to observe with people

Can they understand a list's context, adjust a suggestion, and finish preparing? Can they distinguish a personal list, a preview, and a published version? Do they understand why an adaptation appeared and that they can reject it? Do they know the copy is independent? Where does the item base need correction? In the simulated recipient experience, would installation interrupt the intention to copy?

These are research questions, not metrics already achieved. Do not add real analytics to answer them in this phase.

## Handoff to Bruno

Deliver the list of flows actually implemented, reproducible mock scenarios, resolved/open decisions, reviewed types, and an inventory of simulated operations. Distinguish what was tested on devices, only exported, and not yet checked.

Discuss explicitly: storage and migrations, publication identity, minimum public payloads, version control, removal of private content, pending operations, failures/retries, public access and deep links, recovery, and possible synchronization. Do not promise deadlines, architecture, or infrastructure before this assessment.
