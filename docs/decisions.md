# Registro de decisões

Estado em 10/10/2026. “Proposta” não significa aprovado. Registrar mudanças aqui com motivo e impacto, preservando a referência ao briefing.

## Confirmado para esta etapa

| ID | Decisão | Consequência |
| --- | --- | --- |
| D01 | Aguardar telas do Paper antes de implementar a UI | Esta entrega altera documentação e tipos, não telas |
| D02 | Protótipo futuro com dados fictícios e estado local em memória | Sem backend, persistência ou serviços reais |
| D03 | Progresso binário e pessoal | Sem etapas comprar/separar/embalar e sem colaboração |
| D04 | Cópias independentes | Alterações em qualquer direção não propagam entre listas |
| D05 | Adaptações exigem aprovação | Propostas explicadas, aceitas ou rejeitadas |
| D06 | Compartilhar itens e quantidades respeitando privacidade | Progresso excluído de link, texto e imagem |
| D07 | Uso sem conta; identificação ao publicar link | Identificação apenas simulada no protótipo |
| D08 | Gabriel conduz design; Bruno implementará infraestrutura | Tipos e limites documentados, serviços não antecipados |

## Direção técnica de continuidade

Manter o setup existente de Expo + TypeScript + Gluestack + NativeWind, sem segundo motor de estilos. As versões preliminares precisam de revisão antes da UI. Não há aprovação de identidade visual final, Expo Router, backend ou fornecedor de autenticação.

## Questões a resolver

| ID | Tema | Proposta para discutir | Momento / responsável sugerido |
| --- | --- | --- | --- |
| Q01 | Visibilidade padrão | Privacidade deve ser uma escolha clara; não inferir por nomes de categorias | Antes de privacidade e compartilhamento; Gabriel |
| Q02 | Exceção por item | `inherit` segue categoria; `visible`/`hidden` substituem categoria. Mostrar origem da decisão | Antes de implementar projeção pública; Gabriel |
| Q03 | Campos do quiz | Definir dias/noites, valores, obrigatoriedade, resposta desconhecida e possibilidade de voltar sem perder respostas | Design do quiz; Gabriel |
| Q04 | Quantidades | Começar com inteiros positivos; confirmar frações/unidades e regras por duração | Antes de edição e geração; Gabriel |
| Q05 | Reaproveitamento | Reiniciar conclusão na nova viagem, preservar itens personalizados e sua privacidade | Antes de duplicação; Gabriel |
| Q06 | Sugestões rejeitadas | Na primeira simulação, decisões pertencem à revisão atual. Memória entre viagens requer decisão separada | Antes de adaptação; Gabriel |
| Q07 | Itens personalizados | Evitar remoção/ajuste automático; propostas devem identificar o item e explicar o motivo | Antes do motor local; Gabriel |
| Q08 | Identificação para texto/JPG | Não exigir conta por extensão da regra de links sem confirmação | Design do compartilhamento; Gabriel |
| Q09 | Atualização de links | Demonstrar versão publicada e alterações pendentes; não escolher automática vs. manual para produto real | Protótipo com Gabriel; infraestrutura com Bruno |
| Q10 | Persistência para testes | Permanecer em memória; adicionar armazenamento somente por necessidade explícita dos testes | Antes de testes longitudinais; Gabriel e Bruno |
| Q11 | Expo Router | Avaliar após mapa de fluxos; rotas finas com telas nas features | Antes de navegação; Gabriel/desenvolvimento |
| Q12 | Versões preliminares | Revisar risco e compatibilidade da base atual antes de desenvolver telas | Antes da UI; desenvolvimento/Bruno |
| Q13 | Festival e datas | Definir papel de nome, datas e identificação; não exigir cadastro real de festivais | Design do quiz e listas; Gabriel |
| Q14 | Essenciais/opcionais | Não criar classificação obrigatória antes de validar sua utilidade | Conteúdo e design; Gabriel |
| Q15 | Desfazer e cancelamento | Definir exclusão, retorno durante quiz e saída de revisão com propostas pendentes | Design dos estados; Gabriel |

## Como tratar questões abertas

Não ocultar uma proposta em um default de código. Antes de implementar comportamento dependente, registrar a decisão ou um acordo explicitamente temporário para o cenário demonstrativo. A UI pode avançar em partes independentes, sem transformar a dúvida em bloqueio de todo o projeto.

Escolhas de banco, APIs, autenticação, hospedagem, sincronização e backup ficam fora deste registro de implementação até a avaliação do Bruno. Não inferir essas escolhas a partir dos tipos preliminares.
