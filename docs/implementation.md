# Primeiro bloco — listas e checklist

## Referências

[Paper: wireframes e wireflows](https://app.paper.design/file/01M4KR6Y8Z07QQ9QRST4MB8DEP/p-1-0), consultado nesta implementação. Primeiro recorte: 01 início vazio, 02 minhas listas, 07 checklist, 08 adicionar e 09 editar. Estilos obtidos do JSX exportado do Paper; não estimados de screenshots.

O HTML `prototipo-checklists-festivais.html` enviado por Gabriel orienta interações. Suas escolhas de localStorage, URL contendo payload, exportação real e defaults de privacidade não foram transportadas para o app. As notas “FLUXO/PROPOSTA” dos wireframes são documentação, não conteúdo das telas.

## O que funciona

- Duas listas fictícias independentes: Festival da Serra (8/24) e Festival do Vale (18/18).
- Abrir listas, marcar/desmarcar itens, filtros Todos/Pendentes/Concluídos, recolher categorias e progresso derivado dos itens.
- Adicionar/editar nome, quantidade e categoria; rascunho separado, cancelamento sem aplicar; validação de nome e quantidade.
- Remover com confirmação. Remover o último item produz estado vazio com progresso 0 de 0.
- Voltar à home atualiza contadores. Retorno físico Android é tratado; não há rotas públicas/deep links.
- Controles de demonstração na home para começar sem listas, restaurar exemplos e criar uma lista vazia de teste. Troca de cenário destrutiva pede confirmação.

Quiz, reaproveitamento e compartilhar aparecem indisponíveis com explicação do próximo bloco. Nenhum botão anuncia publicação ou integração inexistente. O cenário vazio pode ser explorado e revertido pelos controles de teste.

## Organização

`src/features/checklists/` separa estado/navegação, telas e reducer. `src/components/checklist/` contém item e seção reutilizáveis. `src/components/shared/` contém botões, cabeçalho, notas e diálogo. `src/mocks/` fabrica fixtures novas a cada reset; não é catálogo final. `src/theme/patterns.ts` reúne a escala extraída do Paper, usando cores semânticas de `global.css` e NativeWind.

Escala inicial: título 28/36, título de card 20/28, seção 18/26, corpo 16/24 e legenda/label 14/22. Margem horizontal 24, gap principal 16, raio de controles 8, botão mínimo 48. Alvos de interação menores do wireframe foram ampliados para pelo menos 44; não há barra de status desenhada, pois o sistema fornece a real.

As categorias privadas do exemplo não são uma política aprovada: não existe filtro público nesta entrega. Os marcadores de visibilidade são preservados na edição e não são enviados a lugar algum.

## Como experimentar

Execute os comandos do README. Abra Festival da Serra, marque Barraca, filtre Pendentes e edite Lanterna. Altere nome/quantidade/categoria e salve; depois experimente cancelar outra edição. Na home, abra os controles para testar estado sem listas ou uma lista vazia, adicionar um item e removê-lo.

Tudo fica em memória. Recarregar restaura os exemplos. Não há conta, armazenamento, rede de aplicação, backup, sincronização ou geração contextual.

## Validação

- `npm run typecheck`: tipos de telas, props e modelo.
- `npm test`: testes de progresso binário, isolamento entre listas, edição por ID com nomes duplicados, rejeição de entradas inválidas, último item e independência dos resets.
- `npx expo install --check` e exportação para Android, iOS e web.
- Revisão interativa da prévia web: abertura, progresso, filtros, edição de nome/quantidade/categoria, cancelar sem aplicar, nome obrigatório, adicionar/remover último item, estado sem listas e reset ao recarregar.

Não afirmar testes em aparelho Android/iOS: não foram executados nesta entrega. A prévia web ajuda a revisar a UI, sem ampliar o escopo para um produto web completo. Acessibilidade em leitor de tela nativo, teclado físico e teclado virtual mobile ainda precisa de validação em aparelho.

## Continuidade com Bruno

O reducer recebe ações sem serviços externos; fixtures entram apenas na composição da feature. A futura integração deve substituir a carga inicial e o envio de operações mantendo telas e componentes desacoplados. Persistência e contratos continuam abertos. Os próximos blocos são quiz/lista sugerida, depois adaptação e só então privacidade/compartilhamento simulado.
