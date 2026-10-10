# Testes locais no iPhone

O caminho atual usa Xcode no Mac e uma conta Apple gratuita (Personal Team). Não requer conta Expo/EAS nem distribui o aplicativo pelo TestFlight. A assinatura gratuita é temporária; pode ser necessário compilar e instalar novamente após sete dias.

## Preparação

1. Instalar e abrir Xcode, concluir os componentes iniciais e adicionar a conta em Settings → Apple Accounts.
2. Conectar o iPhone por cabo, desbloquear, confiar no Mac e concluir o pareamento em Window → Devices and Simulators.
3. Ativar Modo de Desenvolvedor no iPhone quando solicitado pelo Xcode. Isso pode exigir reiniciar e confirmar no aparelho.
4. Instalar Node 22 e CocoaPods compatível com o Ruby disponível no Mac.

## Gerar e instalar

Na raiz do projeto:

```sh
npm ci
npx expo prebuild --platform ios --no-install
cd ios
pod install
```

Abra `ios/goakit.xcworkspace` no Xcode (após instalar os pods). No target goakit, em Signing & Capabilities, selecione seu Personal Team e assinatura automática. O identificador inicial é `com.gabrielguerguen.goakit`; se a Apple informar conflito, use um identificador exclusivo e atualize `app.json` para preservar a escolha.

O iPhone deve aparecer como destino de execução. Para testes sem servidor de desenvolvimento, selecione configuração Release em Product → Scheme → Edit Scheme → Run → Build Configuration e execute o aplicativo. Também existe `npm run ios:device`, que usa a configuração Release; requer que a assinatura e a conexão já estejam prontas.

Não registre IDs de aparelho, certificados, credenciais ou a configuração pessoal de assinatura no Git. A pasta `ios/` gerada permanece ignorada; `app.json` é a fonte da configuração compartilhada. O prebuild não deve apagar mudanças manuais necessárias sem antes revisá-las.

## Limites

Em 10/10/2026, a versão Release foi compilada no Xcode 26.6 e a instalação foi confirmada no painel Devices de um iPhone 15 com iOS 26.6.2. A primeira abertura foi bloqueada pela confiança no certificado pessoal: Ajustes → Geral → VPN e Gerenciamento de Dispositivo → App de Desenvolvedor → conta Apple → Confiar. A confirmação deve ser feita pela pessoa no aparelho.

Ainda é necessário confirmar abertura e interações no aparelho antes de declarar validação dos fluxos no iOS. Os dados continuam em memória e são restaurados ao reiniciar o app. Gerar arquivos nativos ou bundles não comprova instalação.

Referências: [conta gratuita Apple](https://developer.apple.com/support/compare-memberships/), [builds locais Expo](https://docs.expo.dev/guides/local-app-overview/) e [Modo de Desenvolvedor](https://docs.expo.dev/guides/ios-developer-mode/).
