# Development continuity instructions — Goakit

## Scope and sources

- Read `docs/product.md`, `docs/architecture.md`, `docs/decisions.md`, and `docs/delivery.md` before changing functionality.
- The main brief is linked in `docs/product.md`. Gabriel's current explicit instructions define the delivery and take precedence over technical proposals.
- The Paper screens have been received; the reference and first implementation scope are in `docs/implementation.md`. Consult the material before expanding the UI. Do not invent a visual identity or new flows; the old setup screen was not an approved product design.
- The current phase is an interface with mock data and in-memory state. Do not add a backend, persistence, real authentication, public links, or integrations without new scope authorization. Bruno is responsible for future infrastructure.

## Stack and organization

- Expo + React Native + strict TypeScript + Gluestack UI. NativeWind is the existing styling engine; do not mix it with UniWind.
- Check `package.json`, `package-lock.json`, and `.nvmrc`. Use documentation matching the installed versions, including [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) and [Gluestack v5](https://v5.gluestack.io/ui/docs/home/getting-started/installation). NativeWind is in preview; do not automatically apply v4 recipes.
- Expo Router is a proposal, not an installed dependency. Do not migrate the entry point without recording the decision.
- Consult `components/ui/` before creating components. Keep screens/logic organized by feature, mock data centralized in `src/mocks/` when needed, and types in `src/types/`.
- Do not put the entire application in `App.tsx`. Do not create backend abstractions or empty folders preemptively.
- Color values live in `src/theme/tokens.ts`; `ThemeProvider` resolves them and `global.css` exposes NativeWind utilities. Do not duplicate values in components. Read `docs/design-system.md` before visual changes; typography and interaction patterns live in `src/theme/patterns.ts`. Use the bundled Inter face utilities and semantic roles.

## Invariants

- Completion is one boolean per item. Progress is personal and derived; do not implement separate purchase/prepare/pack stages.
- Copies and reused lists have their own identities and independent objects. Do not propagate changes between an original and a copy.
- Adaptations are proposals with reasons; only accepted proposals change the new list. Preserve personal choices.
- Never share the entire personal object. Generate an explicit projection containing only allowed fields, without progress or private items.
- Privacy defaults and exception precedence remain open. Do not decide them implicitly through defaults.
- Do not present mock feedback as a real account, link, synchronization, or publication. Do not request real passwords in the prototype.
- Types are preliminary presentation types, not final API/database contracts.

## Verification and delivery

- Documentation: check consistency, references, and decisions. Types: run `npm run typecheck`.
- UI/navigation/dependency changes: run compatibility and bundle checks as described in the README; record which devices were tested. Do not claim mobile testing just because export passed.
- When implementing rules, test relevant behavior (privacy, copy independence, applying adaptations once, empty lists). Avoid redundant documentation/type tests.
- Keep credentials out of Git. Use branches and pull requests for review; do not merge without authorization.
- Document what works, what is simulated, open decisions, and Bruno's integration points. Do not announce planned flows as completed.

## Documentation language

Maintain repository documentation in English. The application interface and mock content remain in Portuguese unless Gabriel explicitly requests a product-language change. Preserve exact UI labels when they help someone find a control while testing.
