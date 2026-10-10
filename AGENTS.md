# Instruções de continuidade — Goakit

## Escopo e fontes

- Leia `docs/product.md`, `docs/architecture.md`, `docs/decisions.md` e `docs/delivery.md` antes de alterar funcionalidades.
- O briefing principal está linkado em `docs/product.md`. Instruções explícitas atuais de Gabriel delimitam a entrega e prevalecem sobre propostas técnicas.
- Gabriel pediu para aguardar as telas do Paper antes de implementar a UI. Não invente telas, identidade visual ou fluxos novos enquanto esse material não chegar. A tela do setup não é design aprovado do produto.
- A próxima fase é interface com dados simulados e estado em memória. Não adicione backend, persistência, autenticação real, links públicos ou integrações sem nova autorização de escopo. Bruno é responsável pela infraestrutura futura.

## Stack e organização

- Expo + React Native + TypeScript estrito + Gluestack UI. NativeWind é o motor existente; não misture com UniWind.
- Verifique `package.json`, `package-lock.json` e `.nvmrc`. Use documentação compatível com as versões instaladas, incluindo [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/) e [Gluestack v5](https://v5.gluestack.io/ui/docs/home/getting-started/installation). NativeWind está em preview; não aplique receitas de v4 automaticamente.
- Expo Router é proposta, não dependência instalada. Não migre a entrada sem registrar a decisão.
- Consulte `components/ui/` antes de criar componentes. Mantenha telas/lógica por feature, dados fictícios centralizados em `src/mocks/` quando necessários e tipos em `src/types/`.
- Não concentre toda a aplicação em `App.tsx`. Não crie abstrações de backend ou pastas vazias preventivamente.
- Tokens de cores existentes estão em `global.css`; não duplique seus valores em componentes. Escalas de tipografia, espaçamento, formas e estados serão refinadas com Paper. Prefira papéis semânticos e variantes reutilizáveis.

## Invariantes

- Conclusão é um booleano por item. Progresso é individual e derivado; não implemente etapas comprar/separar/embalar.
- Cópia/reaproveitamento têm identidade própria e objetos independentes. Não propague alterações entre original e cópia.
- Adaptações são propostas com motivo; somente aceitas alteram a nova lista. Preserve escolhas pessoais.
- Nunca compartilhe o objeto pessoal inteiro. Gere uma projeção explícita apenas com campos permitidos, sem progresso ou itens privados.
- Padrões de privacidade e precedência de exceções ainda estão abertos. Não decida implicitamente por defaults.
- Não represente feedback fictício como conta, link, sincronização ou publicação real. Não peça senhas reais no protótipo.
- Tipos são preliminares para apresentação, não contratos definitivos de API/banco.

## Verificação e entrega

- Documentação: confira consistência, referências e decisões. Tipos: execute `npm run typecheck`.
- Mudanças de UI/navegação/dependências: execute checks de compatibilidade e bundles conforme README; registre quais aparelhos foram testados. Não afirme teste mobile só porque a exportação passou.
- Quando implementar regras, teste comportamentos relevantes (privacidade, independência da cópia, aplicação única de adaptações, lista vazia). Evite testes redundantes de documentação/tipos.
- Preserve credenciais fora do Git. Use branches e pull requests para revisão; não faça merge sem autorização.
- Documente o que funciona, o que é simulado, decisões pendentes e pontos de integração do Bruno. Não anuncie fluxos planejados como concluídos.
