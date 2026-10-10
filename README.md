# Goakit

Aplicativo para Android, iOS e web com Expo, React Native, TypeScript e Gluestack UI.

## Começar

Use Node.js 22 (veja `.nvmrc`).

```sh
nvm install
nvm use
npm ci
npm start
```

Abra o QR code no Expo Go compatível com o SDK instalado. No terminal, pressione `a` para Android ou `i` para o simulador de iOS (macOS com Xcode). Para web:

```sh
npm run web
```

## Estrutura

- `App.tsx`: entrada e tela inicial.
- `components/ui/`: componentes Gluestack que podem ser personalizados.
- `global.css`: estilos e tokens do tema.
- `assets/`: imagens e ícones.
- `.github/workflows/ci.yml`: verificações automáticas de tipos, dependências e geração dos bundles.

## Verificação

```sh
npm run typecheck
npx expo install --check
npx expo export --platform all
```

A exportação verifica os bundles JavaScript; não gera binários para as lojas nem substitui testes em dispositivos.

## Novos componentes

```sh
npx gluestack-ui@latest add input
```

O instalador atual utiliza Gluestack UI v5 alpha e NativeWind v5. As versões resolvidas estão registradas no `package-lock.json`; use `npm ci` para reproduzir a instalação.

## Configuração

Copie `.env.example` para `.env` se precisar de variáveis de ambiente. Variáveis `EXPO_PUBLIC_` ficam disponíveis no aplicativo e não devem conter segredos. Nunca envie tokens, senhas ou chaves privadas ao GitHub.

## Publicação nas lojas

O projeto ainda não está vinculado a uma conta Expo/EAS. Antes de distribuir, defina os identificadores de Android e iOS, substitua os ícones padrão, configure o EAS e as credenciais das lojas.

## Referências

- [Expo e TypeScript](https://docs.expo.dev/guides/typescript/)
- [Instalação do Gluestack UI](https://v5.gluestack.io/ui/docs/home/getting-started/installation)

## Estado das dependências

Na configuração inicial, `npm audit` reportou 21 alertas em dependências transitivas do Expo/Metro (7 moderados e 14 altos). A correção sem mudanças incompatíveis foi tentada; os alertas permanecem. Revise as atualizações do SDK antes de distribuir o aplicativo. Não aplique `npm audit fix --force` automaticamente: a sugestão atual inclui regressão para versões antigas do Expo.
