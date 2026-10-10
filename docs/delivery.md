# Plano de implementação e validação

## Entrega atual

Fundamentação de produto, organização proposta, registro de decisões, instruções para continuidade e tipos preliminares. Não implementa novos fluxos, fixtures, geração de listas, filtro de privacidade, navegação, autenticação ou publicação. A tela do setup permanece como demonstração técnica.

## Quando as telas do Paper chegarem

1. Relacionar cada tela e estado ao fluxo em `product.md`; identificar lacunas, perguntas abertas e componentes existentes antes de programar.
2. Acordar decisões que afetam o primeiro fluxo: versões, navegação, campos mínimos da lista e quantidades. Registrar tokens e variantes a partir do design, mantendo a identidade provisória.
3. Implementar estrutura e checklist funcional com dados centralizados e edição em memória. Validar coerência de progresso e retorno entre telas.
4. Acrescentar quiz e geração local; depois reaproveitamento e revisão de adaptações.
5. Definir privacidade antes de implementar prévias, identificação e publicação simulada. Acrescentar experiência de destinatário e cópia independente.
6. Executar cenários abaixo e registrar limitações para Bruno. Verificar em Android e iOS antes de afirmar validação mobile; exportar bundles não substitui isso.

Cada entrega deve funcionar com os fluxos que anuncia, sem botões que pareçam conectados a serviços inexistentes. O protótipo pode ter um seletor de cenários claramente demonstrativo para vazio, offline e falha; o formato desse controle depende do design.

## Cenários de aceite para o futuro protótipo

| Cenário | Evidência esperada |
| --- | --- |
| Nenhuma lista | Estado vazio permite iniciar quiz; exemplos podem ser restaurados sem reiniciar o app |
| Quiz | Avançar/voltar preserva rascunho; contexto usado fica compreensível; geração não requer rede |
| Editar lista | Nome e quantidade válidos são aplicados; cancelar preserva o original; erro não corrompe estado |
| Concluir | Marcar/desmarcar atualiza o contador; quantidade >1 continua binária |
| Remover último item | Lista fica vazia sem erro ou percentual inválido |
| Reaproveitar | Original preservado; sugestões têm motivo; somente aceitas afetam a nova lista |
| Rejeitar proposta | Conteúdo não muda; retorno entre telas preserva decisão durante a sessão |
| Aplicar novamente | Proposta aceita não duplica item nem aplica ajuste duas vezes |
| Item personalizado | Preservado conforme política acordada; adaptação não o remove silenciosamente |
| Categoria e exceções | Exercitar categoria visível/oculta × item herdado/visível/oculto conforme Q01/Q02 |
| Prévia de link, JPG e texto | Mesmos itens e quantidades permitidos; sem progresso nem conteúdo privado |
| Publicar link | Identificação fictícia indicada; nunca solicita senha real nem gera URL pública |
| Offline/falha | Edição local preservada; pendência visível; última publicação simulada permanece; retry não perde dados |
| Tornar privado após publicar | Prévia atual oculta item; publicação anterior permanece até atualização simulada; explicar essa diferença |
| Consultar e copiar | Destinatário acessa apenas projeção pública; pode copiar diretamente ou passar pelo quiz |
| Editar cópia | Alterações não afetam original e vice-versa; não herda progresso pessoal do autor |
| Reiniciar | Dados podem voltar ao cenário inicial; limitação de memória explicitada nos testes |

“JPG”, “link” e “texto” nesta fase descrevem opções/prévias e feedback; exportação de arquivo, área de transferência, share sheet e endereço público não estão implicitamente incluídos. Decidir separadamente se algum recurso nativo local for necessário para testes.

## Verificações técnicas proporcionais

Documentação: revisar consistência e links internos. Tipos: `npm run typecheck`. Mudanças de componentes, estilos ou navegação: checar dependências e exportar bundles, além de testar os estados nos dispositivos disponíveis.

Quando as regras forem implementadas, criar testes de comportamento para fronteiras relevantes: filtro público sem campos privados/progresso, cópia sem referências compartilhadas, adaptação aplicada uma única vez e progresso em lista vazia. Não criar testes que apenas reproduzam os tipos ou o conteúdo estático dos documentos.

## O que observar com pessoas

Conseguem entender o contexto da lista, ajustar uma sugestão e terminar a preparação? Diferenciam lista pessoal, prévia e versão publicada? Entendem por que uma adaptação apareceu e que podem rejeitá-la? Sabem que a cópia é independente? Onde a base de itens exige correção? Na experiência simulada de destinatário, a instalação interromperia a intenção de copiar?

São perguntas de pesquisa, não métricas já atingidas. Não adicionar analytics real para respondê-las nesta fase.

## Passagem para Bruno

Entregar lista dos fluxos realmente implementados, cenários fictícios reproduzíveis, decisões resolvidas/pendentes, tipos revisados e inventário das operações simuladas. Distinguir o que foi testado em aparelho, apenas exportado e ainda não verificado.

Discutir explicitamente: armazenamento e migrações, identidade de publicação, payload público mínimo, controle de versões, retirada de conteúdo privado, operações pendentes, falhas/retries, acesso público e deep links, recuperação e eventual sincronização. Sem prometer prazo, arquitetura ou fornecedor antes dessa avaliação.
