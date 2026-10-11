# Local iPhone testing

The current approach uses Xcode on a Mac and a free Apple account (Personal Team). It does not require an Expo/EAS account or distribute the app through TestFlight. Free signing is temporary; rebuilding and reinstalling may be necessary after seven days.

## Preparation

1. Install and open Xcode, finish its initial components, and add the account in Settings → Apple Accounts.
2. Connect the iPhone by cable, unlock it, trust the Mac, and finish pairing in Window → Devices and Simulators.
3. Enable Developer Mode on the iPhone when Xcode requests it. This may require restarting and confirming on the device.
4. Install Node 22 and CocoaPods compatible with the Ruby available on the Mac.

## Generate and install

From the project root:

```sh
npm ci
npx expo prebuild --platform ios --no-install
cd ios
pod install
```

Open `ios/goakit.xcworkspace` in Xcode (after installing pods). In the goakit target's Signing & Capabilities settings, select your Personal Team and automatic signing. The initial identifier is `com.gabrielguerguen.goakit`; if Apple reports a conflict, use a unique identifier and update `app.json` to preserve the choice.

The iPhone should appear as a run destination. To test without a development server, select Release in Product → Scheme → Edit Scheme → Run → Build Configuration and run the app. There is also `npm run ios:device`, which uses Release; signing and the connection must already be ready.

Do not record device IDs, certificates, credentials, or personal signing configuration in Git. The generated `ios/` folder remains ignored; `app.json` is the source of shared configuration. Prebuild must not erase necessary manual changes without reviewing them first.

## Limits

On October 10, 2026, the Release version was compiled in Xcode 26.6 and installation was confirmed in the Devices panel for an iPhone 15 running iOS 26.6.2. The first launch was blocked by trust in the personal certificate: Settings → General → VPN & Device Management → Developer App → Apple account → Trust. Confirmation must be performed by the person on the device.

Opening and interactions on the device still need confirmation before claiming iOS flow validation. Data remains in memory and is restored when the app restarts. Generating native files or bundles does not prove installation.

References: [free Apple account](https://developer.apple.com/support/compare-memberships/), [local Expo builds](https://docs.expo.dev/guides/local-app-overview/), and [Developer Mode](https://docs.expo.dev/guides/ios-developer-mode/).
