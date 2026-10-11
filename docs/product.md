# Goakit foundations

## Source and scope

Main reference: [Festival checklist app brief](https://docs.google.com/document/d/1bDFO0IcOABNzh1txCChQS_F3TNGzH141BjY0kG8kkes/edit), by Gabriel Guerguen, consulted on October 10, 2026. The brief guides the product; Gabriel's instructions in this conversation define the current delivery. This document is a working synthesis, not a copy or replacement of the brief. Future changes to the source require reviewing this synthesis.

**Now: the first UI block based on the received Paper screens: home/lists, checklist, and adding/editing/removing items.** See [implementation status](implementation.md). The foundations continue to guide the remaining flows.

**Next stage: a navigable interface with mock data and in-memory state.** Bruno will implement infrastructure and integrations later. Persistence, public links, and real accounts are not part of the prototype. The brief's requirement to preserve data after closing and reopening belongs to the final product, not this demonstration's acceptance criteria.

## Problem and value hypothesis

Preparing a festival trip involves remembering items and adapting luggage to the context. A generic list may omit necessities or accumulate unnecessary items. When reusing a list, people need to understand what has changed without losing their choices.

Hypothesis to validate: contextual, editable, reusable suggestions reduce preparation effort. Sharing checklist knowledge while preserving each recipient's autonomy may make the app useful to friends and the psytrance community.

The initial audience includes Gabriel, his friends, newcomers, and experienced festivalgoers. Monetization does not guide this phase. The usefulness of the item catalog and understanding of the flows still need to be observed; they are not proven outcomes.

## Product principles

- **Personal control:** suggestions are explained and can be rejected. Adaptations do not silently change a list.
- **Individual progress:** each person has their own list and preparation. Completion is binary; there are no separate purchase, prepare, or pack stages.
- **Independent copies:** sharing transfers content; it does not create collaborative editing or synchronization between lists.
- **Verifiable privacy:** previews match the shareable content; hidden items and personal progress are excluded.
- **Account-free use:** creating and using lists does not require identification. Publishing a link includes an identification flow.
- **Honest simulation:** publication, account, and connection states are demonstrations and must be labeled accordingly.

## Vocabulary

| Concept | Meaning |
| --- | --- |
| Trip context | Duration, user-provided weather, accommodation, transport, and thermal sensitivity |
| Catalog | Mock reference used to generate suggestions; not the personal list |
| Personal checklist | Categories, items, quantities, completion, and privacy choices |
| Adaptation | A proposal to add, remove, or adjust a quantity, with a reason and decision |
| Shareable content | A projection containing only visible names and quantities, organized by category |
| Publication | A shareable version used to demonstrate what a recipient would see |
| Copy | A new list with its own identity and no update relationship with its source |

## Flows to implement after design

| Flow | Expected demonstration outcome |
| --- | --- |
| My lists | Browse examples or a deliberately selectable empty state |
| Quiz → suggestion | Provide context; generate a list using simple local rules; review before use |
| Preparation | Add, edit, delete, change quantities, and complete items; progress follows changes |
| Reuse | Provide new context, review proposals, and create an independent list |
| Privacy → preview | Configure categories and item exceptions; inspect exposed items and quantities |
| Share | Switch between link, JPG image, and text previews with simulated feedback |
| Publish link | Navigate mock identification/registration and publication states |
| Receive → copy | Browse shared content and choose direct copying or an adaptation quiz |

The final product anticipates viewing links in a browser and installing the app to copy and check off items. In this phase, represent the recipient experience inside the prototype; do not build a complete web application or actual store redirects.

## Boundaries

Do not implement a backend, database, real authentication, account recovery, synchronization, backup, store publication, hosting, or integrations with weather, festivals, or social networks. Do not collect real passwords in the simulation.

Equipment allocation among friends, collaborative editing, official festival lists and rules, public profiles, influencers, and affiliates are future features. Do not imply that the mock catalog provides official safety or health recommendations.

The complete app must work offline with persistence. The future prototype will use in-memory state during a session without promising recovery after restart. Pending publications and failures will be controlled visual scenarios, not a real synchronization queue.
