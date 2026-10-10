# Goakit

Aplicativo de checklists para festivais de música, com foco inicial em psytrance, para Android e iOS. Base técnica com Expo, React Native, TypeScript e Gluestack UI. O suporte web existente serve para prévia de desenvolvimento; um aplicativo web completo está fora do escopo.

## Momento do projeto

O primeiro bloco de interface foi implementado a partir do Paper: Minhas listas, estado vazio, checklist, adicionar/editar/remover itens e progresso. Veja [como testar e limites da entrega](docs/implementation.md).

A interface usa dados fictícios e estado em memória. Quiz, reaproveitamento, privacidade e compartilhamento são próximos blocos, ainda indisponíveis. Não há backend, persistência ou integrações reais; Bruno cuidará da infraestrutura posteriormente.

## Fundamentação

- [Produto e recorte atual](docs/product.md)
- [Organização, tipos e fronteiras técnicas](docs/architecture.md)
- [Decisões confirmadas, propostas e questões abertas](docs/decisions.md)
- [Sequência de entrega, cenários de aceite e passagem para Bruno](docs/delivery.md)
- [Instruções para desenvolvimento com IA](AGENTS.md)

O [briefing principal](https://docs.google.com/document/d/1bDFO0IcOABNzh1txCChQS_F3TNGzH141BjY0kG8kkes/edit) orienta o produto. A documentação local distingue o produto final do protótipo atual.

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

- `App.tsx`: providers e entrada da aplicação.
- `components/ui/`: componentes Gluestack que podem ser personalizados.
- `global.css`: estilos e tokens do tema.
- `assets/`: imagens e ícones.
- `src/types/`: tipos preliminares usados pelas telas e pelo estado local.
- `src/features/checklists/`: telas, navegação e regras locais do primeiro fluxo.
- `src/components/`: componentes reutilizáveis do aplicativo.
- `src/mocks/` e `src/theme/`: dados fictícios e padrões visuais do Paper.
- `docs/`: fundamentação, implementação e planejamento.
- `.github/workflows/ci.yml`: verificações automáticas de tipos, dependências e geração dos bundles.

## Verificação

```sh
npm run typecheck
npm test
npx expo install --check
npx expo export --platform all
```

A exportação verifica os bundles JavaScript; não gera binários para as lojas nem substitui testes em dispositivos.

## Novos componentes

Antes de adicionar componentes, confirme uma versão do CLI Gluestack compatível com a stack instalada e use o comando `add` dessa versão. Revise o diff gerado; não atualize a stack implicitamente para adicionar um componente.

O setup utiliza Gluestack UI v5 (apresentado como alpha pelo instalador). NativeWind `5.0.0-rc.0` e `react-native-css@3.1.0-rc.0` estão fixados como par compatível de versões preliminares. As versões resolvidas estão registradas no `package-lock.json`; use `npm ci` para reproduzir a instalação. UniWind não está instalado. O primeiro bloco usa navegação local; Expo Router permanece uma proposta.

## Configuração

Copie `.env.example` para `.env` se precisar de variáveis de ambiente. Variáveis `EXPO_PUBLIC_` ficam disponíveis no aplicativo e não devem conter segredos. Nunca envie tokens, senhas ou chaves privadas ao GitHub.

## Publicação nas lojas

O projeto ainda não está vinculado a uma conta Expo/EAS. Antes de distribuir, defina os identificadores de Android e iOS, substitua os ícones padrão, configure o EAS e as credenciais das lojas.

## Referências

- [Expo e TypeScript](https://docs.expo.dev/guides/typescript/)
- [Instalação do Gluestack UI](https://v5.gluestack.io/ui/docs/home/getting-started/installation)

## Estado das dependências

Na configuração inicial, `npm audit` reportou 21 alertas em dependências transitivas do Expo/Metro (7 moderados e 14 altos). A correção sem mudanças incompatíveis foi tentada; os alertas permanecem. Revise as atualizações do SDK antes de distribuir o aplicativo. Não aplique `npm audit fix --force` automaticamente: a sugestão atual inclui regressão para versões antigas do Expo.
