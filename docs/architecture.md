# Organização e limites técnicos

## Base existente

O repositório contém Expo SDK 57, React Native, TypeScript em modo estrito, Gluestack UI v5 e NativeWind v5 preview. `package.json` declara dependências; `package-lock.json` registra versões resolvidas. O instalador apresenta o Gluestack como alpha. A base passou por checagem de tipos, compatibilidade Expo e geração de bundles no setup; isso não equivale a testar os fluxos do produto em aparelhos.

Manter NativeWind como único sistema principal de estilos nesta base, sem adicionar UniWind em paralelo. Essa escolha aproveita o setup existente e é revisável. Antes das telas, avaliar com Gabriel a permanência nas versões preliminares; uma migração precisa de validação própria. Não atualizar dependências ou executar instaladores `@latest` como parte de uma alteração visual rotineira.

Expo Router é recomendado para avaliar quando o mapa de telas chegar. Ainda não está instalado nem aprovado como decisão. Até lá, `App.tsx` e a tela demonstrativa do setup permanecem intactos.

## Estrutura incremental

| Local | Responsabilidade | Situação |
| --- | --- | --- |
| `App.tsx` | Entrada atual | Existente; não ampliar com os fluxos inteiros |
| `components/ui/` | Componentes Gluestack instalados | Manter caminho atual para evitar migração sem benefício |
| `global.css` | Tokens de cor e configuração NativeWind | Existente; valores não são identidade visual aprovada |
| `src/types/` | Tipos preliminares do domínio e demonstração | Adicionados nesta fundamentação |
| `src/features/` | Telas, estado e lógica de apresentação por funcionalidade | Criar quando houver implementação |
| `src/components/checklist/` | Componentes específicos reutilizáveis | Criar a partir das telas do Paper |
| `src/mocks/` | Catálogo, cenários e operações simuladas | Criar junto ao primeiro fluxo funcional |
| `src/theme/` | Escalas e convenções compartilhadas além das cores | Criar após mapear o design; evitar duplicar `global.css` |
| `app/` | Rotas e layouts finos | Criar somente se Expo Router for adotado |
| `docs/` | Produto, decisões, arquitetura e plano de validação | Documentação de continuidade |

Não criar pastas vazias, camada de API genérica, repositórios abstratos ou configuração de infraestrutura antecipadamente. Se uma funcionalidade precisar de regras locais, mantê-las em funções puras próximas da feature; extrair apenas quando houver reutilização concreta.

## Dependências e estado

Direção pretendida: entradas de navegação → features → componentes reutilizáveis. Regras locais dependem de tipos e dados, sem importar componentes, navegação ou SDKs externos. Tipos não dependem de UI.

Na demonstração, um estado compartilhado simples (Context + reducer, se suficiente) deve manter listas e rascunhos coerentes entre telas. Componentes recebem dados e ações; não carregam mocks ou acessam serviços diretamente. Alterações são imutáveis. O catálogo é referência; uma edição pessoal não deve modificá-lo.

Separar rascunho de quiz/edição da lista confirmada. Voltar ou cancelar não pode aplicar alterações parciais silenciosamente. Identificadores estáveis distinguem listas, categorias e itens; duplicar uma lista exige novas identidades e cópia dos objetos aninhados. Não usar nomes ou posições de arrays como identidade.

Os tipos em `src/types/index.ts` são uma proposta de representação para discutir com Gabriel e Bruno, não contratos de API ou banco. As opções do quiz são provisórias e não prescrevem labels, ordem, obrigatoriedade ou controles visuais. Validação em tempo de execução será necessária quando os comportamentos forem implementados; TypeScript sozinho não valida entradas.

## Regras locais a implementar depois

- Progresso deriva de itens concluídos / total de itens. Quantidade não cria conclusão parcial. Lista vazia mostra 0 de 0, sem divisão por zero. A privacidade não altera o progresso pessoal.
- Quantidade deve ser positiva e finita; decidir inteiros, frações e unidades antes do formulário final. Não inferir quantidades clínicas ou recomendações médicas.
- Geração combina base recorrente e sugestões condicionais. Hospedagem e transporte são escolhas fornecidas; clima pode combinar frio, calor e chuva. Não consultar previsão automaticamente.
- Adaptação mantém propostas separadas da lista, com motivo e estado pendente/aceita/rejeitada. Aplicar uma proposta uma única vez; rejeitar não altera conteúdo. Confirmar só após revisar pendências. Se a base mudar durante a revisão, recalcular ou invalidar propostas, preservando as escolhas explicitamente.
- Mudança de camping próprio para hotel pode sugerir retirar barraca. A presença da barraca, sozinha, não autoriza remoção automática de um item personalizado.
- Reutilização e cópia não compartilham referências mutáveis com o original. A política de reiniciar conclusão ao reaproveitar será validada antes da UI; uma cópia recebida nunca herda o progresso do autor.

## Fronteira de compartilhamento

Não serializar `Checklist` inteiro para compartilhar. Construir um novo `ShareableChecklist` com uma lista explícita de campos permitidos, depois de resolver a política de visibilidade. Não incluir conclusão, IDs pessoais de itens, preferências privadas ou contexto da viagem por conveniência. O contexto pode revelar dados pessoais e não está incluído no conteúdo mínimo acordado.

Categorias sem itens visíveis devem ser omitidas da projeção proposta, evitando expor nomes de categorias privadas. A política de precedência e os padrões ainda exigem aprovação; enquanto não definidos, não implementar um filtro com defaults implícitos.

Uma prévia e sua publicação simulada devem usar a mesma projeção. O tipo público não garante sozinho privacidade: a transformação e os testes precisam verificar exclusão real de campos, inclusive em texto/imagem. Copiar do compartilhado só pode usar o conteúdo que chegou ao destinatário, sem recuperar itens privados da lista original presente nos mocks.

Manter uma fotografia da última publicação simulada separada da lista pessoal atual. Edições locais não mudam essa fotografia até uma nova publicação simulada bem-sucedida. Isso permite discutir pendência e falha sem decidir se o produto real atualizará links automaticamente ou por novas versões.

## Design e componentes

Reutilizar `Box`, `Text`, `Heading`, `VStack`, `Button` e provider existentes. Componentes candidatos após receber o Paper: `ChecklistItem`, `ChecklistSection`, `QuizOption` e `AdaptationSuggestion`. Criar variantes quando o mesmo padrão aparecer; evitar implementar todos preventivamente.

Mapear papéis semânticos já existentes: `background`/`foreground` para base, `card` para superfície, `muted`/`muted-foreground` para conteúdo secundário, `primary` para ação principal, `border` para contorno e `destructive` para ação destrutiva. Os valores atuais são provisórios. Após o Paper, documentar escala de tipografia, espaçamento, raios, dimensões de controles e estados antes de espalhar valores pelas telas.

Conclusão, seleção, privacidade, foco, desabilitado e erro precisam de indicação além da cor. Prever leitor de tela, textos ampliados, teclado, áreas de toque e confirmação/recuperação de exclusão conforme o desenho. Não confundir neutralidade de média fidelidade com ausência de estados acessíveis.

## Fronteira futura com Bruno

Ao existir integração concreta, substituir operações simuladas próximas às features por adaptadores que recebam e devolvam os tipos acordados. Não acoplar telas a tabelas ou respostas brutas. Manter derivação de progresso e regras de apresentação independentes de rede.

Bruno avaliará armazenamento e migrações, identificação, publicação e versionamento, leitura pública, deep links, fila offline/retries, conflitos, backup e recuperação. A demonstração não escolhe esses serviços. O payload público deverá ser validado também na infraestrutura; o filtro de UI não pode ser a única garantia de privacidade.
