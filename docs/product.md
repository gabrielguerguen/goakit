# Fundamentos do Goakit

## Fonte e recorte

Referência principal: [Briefing app checklists para festivais](https://docs.google.com/document/d/1bDFO0IcOABNzh1txCChQS_F3TNGzH141BjY0kG8kkes/edit), de Gabriel Guerguen, consultado em 10/10/2026. O briefing orienta o produto; as instruções de Gabriel nesta conversa delimitam a entrega atual. Este documento é uma síntese de trabalho, não uma cópia nem uma substituição do briefing. Mudanças futuras na fonte exigem revisão desta síntese.

**Agora: primeiro bloco de UI a partir das telas do Paper recebidas: início/listas, checklist e adicionar/editar/remover itens.** Veja [estado da implementação](implementation.md). A fundamentação continua orientando os demais fluxos.

**Próxima etapa: interface navegável, com dados fictícios e estado em memória.** Bruno implementará infraestrutura e integrações em uma etapa posterior. Persistência, links públicos e contas reais não fazem parte do protótipo. O critério de fechar e reabrir mantendo dados, presente no briefing, pertence ao produto final e não ao aceite desta demonstração.

## Problema e hipótese de valor

Preparar uma viagem para um festival envolve lembrar itens e ajustar a bagagem ao contexto. Uma lista genérica pode omitir necessidades ou acumular itens desnecessários. Ao reaproveitá-la, a pessoa precisa entender o que mudou sem perder suas escolhas.

Hipótese a validar: uma sugestão contextual, editável e reaproveitável reduz o esforço de preparação. Compartilhar o conhecimento de uma lista, preservando a autonomia de quem copia, pode torná-la útil para amigos e para a comunidade de psytrance.

O público inicial inclui Gabriel, seus amigos, iniciantes e frequentadores experientes. Monetização não orienta esta fase. A utilidade da base de itens e a compreensão dos fluxos ainda precisam ser observadas; não são resultados comprovados.

## Princípios do produto

- **Controle pessoal:** uma sugestão é explicada e pode ser rejeitada. Adaptações não alteram a lista silenciosamente.
- **Progresso individual:** cada pessoa tem sua lista e sua preparação. Conclusão é binária; não há etapas de comprar, separar ou embalar.
- **Cópia independente:** compartilhar transmite conteúdo, não cria edição colaborativa ou sincronização entre listas.
- **Privacidade verificável:** a prévia corresponde ao conteúdo compartilhável; itens ocultos e progresso pessoal não fazem parte dele.
- **Uso sem conta:** criar e usar listas não exige identificação. Publicar um link passa pela experiência de identificação.
- **Simulação honesta:** estados de publicação, conta e conexão são demonstrativos e devem ser identificados como tal.

## Vocabulário

| Conceito | Significado |
| --- | --- |
| Contexto da viagem | Duração, clima informado, hospedagem, transporte e sensibilidade térmica |
| Catálogo | Referência fictícia para gerar sugestões; não é a lista pessoal |
| Checklist pessoal | Categorias, itens, quantidades, conclusão e escolhas de privacidade |
| Adaptação | Proposta de adicionar, remover ou ajustar quantidade, com motivo e decisão |
| Conteúdo compartilhável | Projeção contendo somente nomes e quantidades visíveis, organizada por categoria |
| Publicação | Versão compartilhável usada para demonstrar o que o destinatário consultaria |
| Cópia | Nova lista, com identidade própria, sem vínculo de atualização com a origem |

## Fluxos a implementar após o design

| Fluxo | Resultado esperado na demonstração |
| --- | --- |
| Minhas listas | Consultar exemplos ou um estado vazio deliberadamente selecionável |
| Quiz → sugestão | Informar contexto; gerar lista por regras locais simples; revisar antes de usar |
| Preparação | Adicionar, editar, excluir, alterar quantidade e concluir itens; progresso acompanha alterações |
| Reaproveitar | Informar novo contexto, avaliar propostas e criar lista independente |
| Privacidade → prévia | Configurar categoria e exceções por item; verificar itens e quantidades expostos |
| Compartilhar | Alternar prévias de link, imagem JPG e texto, com feedback simulado |
| Publicar link | Percorrer identificação/cadastro fictício e estados de publicação |
| Receber → copiar | Consultar conteúdo compartilhado e escolher cópia direta ou quiz de adaptação |

O produto final prevê consulta de link no navegador e instalação do app para copiar e marcar. Nesta fase, representar a experiência de destinatário dentro do protótipo; não construir uma aplicação web completa nem um redirecionamento real para lojas.

## Limites

Não implementar backend, banco, autenticação real, recuperação de conta, sincronização, backup, publicação em lojas, hospedagem ou integrações com clima, festivais e redes sociais. Não coletar senhas reais na simulação.

Divisão de equipamentos entre amigos, edição colaborativa, listas e regras oficiais de festivais, perfis públicos, influenciadores e afiliados ficam para evolução. Não sugerir que o catálogo fictício representa recomendações oficiais de segurança ou de saúde.

O app completo deverá funcionar offline com persistência. O protótipo futuro funcionará com estado em memória durante a sessão, sem prometer recuperação após reinício. Publicação pendente e falhas serão cenários visuais controlados, não uma fila real de sincronização.
