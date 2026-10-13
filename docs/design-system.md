# Refração design system — first implementation

Source: [Paper, Design system · Refração](https://app.paper.design/file/01M4KR6Y8Z07QQ9QRST4MB8DEP/p-2-0), revision 0.2, inspected on October 12, 2026. Values and structure were read from Paper tokens and JSX; screenshots supported visual review. This implements the supplied direction for the prototype and does not freeze future brand decisions.

## Foundation

- `src/theme/tokens.ts` is the single palette source. `ThemeProvider` resolves light/dark values into NativeWind variables; `global.css` maps them to semantic utilities. Use `useAppTheme().colors` only for props requiring native values (gradient, placeholder, status bar, error border).
- Themes follow the operating system. Demonstration controls offer System, Light, and Dark overrides in memory. Switching themes does not reset lists or drafts. Modals receive the same variable scope, including web portals.
- Bundled Inter faces: 400, 500, 600, and 700. Only these four files are imported. Runtime loading works with Expo Go and web previews and requires no font service. If loading fails, the interface remains usable with a system font.
- Use `font-app-medium`, `font-app-semibold`, and `font-app-bold` with `font-normal`. Each name selects the actual static face, avoiding synthetic weights and collisions with Tailwind's weight utilities. Shared typography lives in `patterns.ts`.

| Role | Light | Dark |
| --- | --- | --- |
| Background | `#FFFFFF` | `#19132A` |
| Surface/card/muted | `#F8F1F6` | `#291A2F` |
| Text | `#231532` | `#F8F1F6` |
| Supporting text | `#693F59` | `#CBA1A3` |
| Border/input | `#916469` | `#9D86A2` |
| Primary | `#A13F7D` | `#E3B6B2` |
| On primary | `#FFFFFF` | `#451E3B` |
| Gradient end | `#7F3A82` | `#F3C39F` |
| Success | `#356B59` | `#95C9B1` |
| Warning | `#8A4E24` | `#FCAC75` |
| Error/destructive | `#9F2949` | `#F3A0AE` |

Amber accent is `#FCAC75` in both modes. It is not a general hover background.

Typography: display 40/48, screen title 32/40, section 24/32, subtitle 20/28, body/action 16/24, caption 14/20. Display/title tracking is −0.03em. Spacing follows 4, 8, 12, 16, 24, 32, 48, and 64. Mobile horizontal padding is 24. Radii: badges 8, controls 12, panels 16; checkbox 6. Interactive targets are at least 48 × 48; checklist rows are at least 64 high and expand for long labels.

## Applied components

The existing lists, checklist, editor, confirmations, and demonstration controls now share these tokens. `AppButton` composes the installed Gluestack Button with an Expo LinearGradient for enabled primary actions. Secondary/destructive actions and disabled primary actions stay solid. Primary gradients project a CSS-equivalent 120° direction onto the measured button; pressed feedback overlays 8% of the text color. Disabled opacity is 45%. Paper specifies Oklab interpolation; Expo's platform gradients approximate the transition using the same endpoints. Verify final rendering on devices before claiming pixel parity.

Checklist rows have fixed checkbox, quantity, and edit-action lanes. Completion remains binary, indicated by a checkmark; custom items have an explicit supporting label. Selection has an accessibility state. Inputs include theme-aware placeholders, focus styling, and an error message next to the field. No decorative illustration, icon package, or additional styling engine was introduced.

## Validation and limits

Type checks, the five existing state tests, compatibility checks, and Android/iOS/web bundle export are required. Web review at a 390 × 844 viewport covered both palettes, Inter weights, progress and filters, editing name/quantity, cancellation, validation feedback, and themed category dialogs. Mobile screen readers, enlarged system text, keyboards, and physical iOS/Android rendering still need validation; web preview and bundles are not device tests.

The existing iPhone Release app must be rebuilt to receive these changes. Expo Font and Expo LinearGradient are SDK-compatible native modules; follow [local iPhone testing](ios-local-testing.md) to regenerate/install pods and build again. The compatibility check requested the Expo 57.0.28 patch; the SDK, React Native, Gluestack, and NativeWind versions otherwise remain unchanged.

This delivery does not implement quiz generation, reuse, privacy filtering, sharing, or publication. Paper's offline/publication examples are not copied as active product messages: the app still uses in-memory mock data. Quiz screens and controls in Paper are the next implementation reference; required answers, camping-level rules, accommodation changes, and calendar behavior need explicit demonstration decisions.

Technical references: [Expo Font, SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/font/), [Expo LinearGradient, SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/linear-gradient/), and the installed NativeWind 5.0.0-rc.0 / react-native-css 3.1.0-rc.0 `VariableContextProvider` API.
