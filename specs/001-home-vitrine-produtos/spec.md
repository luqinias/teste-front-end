# Feature Specification: Home Econverse com Vitrine de Produtos e Modal

**Feature Branch**: `001-home-vitrine-produtos`

**Created**: 2026-10-21

**Status**: Draft

**Input**: User description: "Desenvolver a página (Home) conforme o layout do Figma 'Teste
Front-End Jr', montar a vitrine de produtos consumindo o JSON oficial de produtos e abrir um
modal com as principais informações do produto ao clicar nele. Respeitar o layout pixel a pixel,
sem bibliotecas de UI, com boas práticas de SEO e HTML semântico."

**Fontes do layout**: Figma `Teste Front-End Jr (Copy)` — frame `Home` (1440×4660) e frame
`Popup` (modal 769×299 sobre overlay). Imagem de apoio da vitrine fornecida pelo teste.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver a vitrine de produtos (Priority: P1)

Um visitante acessa a Home e vê as vitrines "Produtos relacionados", cada uma exibindo os
produtos vindos do catálogo oficial em cards com foto, descrição, preço "de", preço "por",
parcelamento, selo "Frete grátis" e botão "COMPRAR". O visitante pode navegar entre os
produtos pelas setas laterais.

**Why this priority**: é o núcleo do teste ("Montar a vitrine de produtos consumindo as
informações dos produtos em json").

**Independent Test**: abrir a página e verificar que os cards exibem os dados do catálogo
(nome/descrição, foto e preço corretos) e que as setas mudam os produtos visíveis.

**Acceptance Scenarios**:

1. **Given** o catálogo está disponível, **When** o visitante abre a Home, **Then** cada
   vitrine mostra 4 cards visíveis com foto, descrição, preço formatado em reais
   (ex.: `149990` → "R$ 1.499,90"), parcelamento "ou 2x de R$ X sem juros" calculado a partir
   do preço, "Frete grátis" e botão "COMPRAR".
2. **Given** a vitrine mostra os primeiros 4 produtos, **When** o visitante clica na seta
   direita, **Then** a vitrine avança e exibe os próximos produtos; a seta esquerda retorna.
3. **Given** a vitrine está no início ou no fim da lista, **When** o visitante tenta avançar
   além do limite, **Then** a navegação não quebra o layout (sem cards vazios ou deslocados).
4. **Given** a primeira vitrine, **When** o visitante clica em uma aba de categoria
   (CELULAR, ACESSÓRIOS, TABLETS, NOTEBOOKS, TVS, VER TODOS), **Then** a aba clicada fica em
   destaque; "CELULAR" e "VER TODOS" exibem todo o catálogo e as demais abas exibem a
   mensagem "Nenhum produto nesta categoria".

---

### User Story 2 - Ver detalhes do produto em um modal (Priority: P1)

Ao clicar em um produto da vitrine, o visitante vê um modal sobre a página escurecida com
foto, nome, preço, descrição curta, link "Veja mais detalhes do produto >", seletor de
quantidade e botão "COMPRAR". O modal pode ser fechado.

**Why this priority**: interação explicitamente exigida pelo teste.

**Independent Test**: clicar em qualquer card e verificar que o modal abre com os dados
daquele produto e fecha pelo "X", pelo clique no fundo escurecido e pela tecla Esc.

**Acceptance Scenarios**:

1. **Given** a vitrine carregada, **When** o visitante clica na foto ou descrição de um
   produto, **Then** abre o modal com foto, nome, preço e descrição curta **desse** produto.
2. **Given** o modal aberto, **When** o visitante clica em "+" ou "−", **Then** a
   quantidade muda, exibida com 2 dígitos ("01", "02"…), nunca abaixo de 01.
3. **Given** o modal aberto, **When** o visitante clica no "X", no fundo escurecido ou
   pressiona Esc, **Then** o modal fecha e o foco volta ao produto que o abriu.
4. **Given** o modal aberto, **When** o visitante navega com Tab, **Then** o foco permanece
   dentro do modal.
5. **Given** o modal de um produto foi fechado, **When** outro produto é clicado, **Then** o
   modal abre com os dados do novo produto e a quantidade reiniciada em 01.

---

### User Story 3 - Navegar pela Home completa conforme o layout (Priority: P2)

O visitante vê a Home completa e fiel ao layout: barra superior de benefícios, cabeçalho com
logo, busca e ícones (pedidos, favoritos, conta, carrinho), menu de categorias, banner
principal "Venha conhecer nossas promoções / 50% Off nos produtos / Ver produto", atalhos de
categorias com ícones (Tecnologia ativo, Supermercado, Bebidas, Ferramentas, Saúde, Esportes e
Fitness, Moda), três vitrines, dois blocos de banners "Parceiros / CONFIRA", "Navegue por
marcas", newsletter e rodapé com links institucionais, redes sociais e linha final.

**Why this priority**: o teste pede a página inteira "conforme o layout" e avalia
fidelidade, mas a vitrine e o modal são o comportamento central.

**Independent Test**: comparar a página renderizada a 1440px de largura com a exportação do
Figma, seção a seção.

**Acceptance Scenarios**:

1. **Given** viewport de 1440px, **When** a página é aberta, **Then** cada seção aparece na
   ordem, posição, tamanho, tipografia e cores do layout.
2. **Given** os elementos interativos (abas, setas, botões, links, campos), **When** o
   visitante passa o mouse ou foca via teclado, **Then** há indicação visual de interação.

---

### User Story 4 - Inscrever-se na newsletter (Priority: P3)

O visitante preenche nome e e-mail, marca "Aceito os termos e condições" e clica em
"INSCREVER".

**Why this priority**: compõe o layout, mas não há serviço de inscrição definido no teste.

**Independent Test**: preencher o formulário e verificar validação e mensagem de retorno.

**Acceptance Scenarios**:

1. **Given** campos vazios, e-mail inválido ou termos não aceitos, **When** clica em
   "INSCREVER", **Then** a inscrição não é concluída e o problema é indicado ao visitante.
2. **Given** dados válidos e termos aceitos, **When** clica em "INSCREVER", **Then** é exibida
   confirmação de inscrição e o formulário é limpo (sem envio a servidor externo).

---

### User Story 5 - Página encontrável e acessível (Priority: P3)

Mecanismos de busca e tecnologias assistivas compreendem a página: título e descrição
adequados, estrutura de títulos coerente, regiões semânticas e textos alternativos.

**Why this priority**: "Pontos Extras" do teste.

**Independent Test**: auditoria automatizada de SEO/acessibilidade e inspeção da estrutura.

**Acceptance Scenarios**:

1. **Given** a página publicada, **When** auditada, **Then** possui título, meta descrição,
   idioma pt-BR, um único título principal e imagens com texto alternativo.

---

### Edge Cases

- Catálogo indisponível ou com erro: a vitrine exibe mensagem amigável e opção de tentar
  novamente, sem quebrar o restante da página.
- Catálogo carregando: a vitrine exibe estado de carregamento ocupando o espaço dos cards.
- Catálogo vazio: a vitrine informa que não há produtos.
- Produto com foto que falha ao carregar: o card mantém suas dimensões e mostra o nome.
- Nomes/descrições longos: o texto é limitado a 2 linhas no card sem alterar a altura do card.
- Aba sem produtos (ACESSÓRIOS, TABLETS, NOTEBOOKS, TVS): mensagem "Nenhum produto nesta
  categoria" no lugar dos cards e setas desabilitadas.
- Menos de 4 produtos: os cards ficam alinhados à esquerda e as setas ficam desabilitadas.
- Quantidade no modal: mínimo 01; máximo 99.

## Clarifications

### Session 2026-10-21

- Q: O catálogo não informa preço "de"; o que exibir? → A: Omitir a linha quando ausente,
  mantendo a altura do card.
- Q: Como as abas da 1ª vitrine filtram, já que o catálogo não tem categoria? → A: CELULAR e
  VER TODOS exibem todo o catálogo (todos são celulares); as demais exibem estado vazio.
- Q: Qual o nível de responsividade? → A: Pixel-perfect a 1440px + adaptação fluida para
  tablet e mobile.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A página MUST obter a lista de produtos do catálogo oficial em tempo de execução
  a cada carregamento.
- **FR-002**: Cada card MUST exibir foto (`photo`), descrição (`descriptionShort`), preço
  (`price`, em centavos) formatado em reais, parcelamento em 2x sem juros calculado a partir
  do preço, "Frete grátis" e botão "COMPRAR".
- **FR-003**: Cada card MUST exibir o preço "de" riscado acima do preço atual somente quando
  o produto informar um preço anterior; como o catálogo atual não informa, a linha é omitida
  e o card mantém a altura do layout.
- **FR-004**: Cada vitrine MUST exibir 4 cards por vez e permitir navegar pelos demais com
  setas anterior/próximo, desabilitando a seta no limite da lista.
- **FR-005**: A primeira vitrine MUST exibir as abas de categoria do layout, com a aba
  "CELULAR" ativa por padrão; a segunda e a terceira MUST exibir o link "Ver todos".
- **FR-006**: Clicar na foto, na descrição ou no botão "COMPRAR" de um card MUST abrir o modal
  com foto, nome (`productName`), preço formatado e descrição curta do produto clicado.
- **FR-007**: O modal MUST ter seletor de quantidade (−/+, mínimo 01, máximo 99), botão
  "COMPRAR", link "Veja mais detalhes do produto >" e botão de fechar.
- **FR-008**: O modal MUST fechar pelo botão "X", pelo clique no fundo escurecido e pela tecla
  Esc; enquanto aberto, MUST manter o foco dentro dele e impedir a rolagem da página.
- **FR-009**: A página MUST reproduzir todas as seções do layout (barra de benefícios,
  cabeçalho, menu, banner principal, categorias, 3 vitrines, 2 blocos de parceiros, marcas,
  newsletter, rodapé) com dimensões, espaçamentos, fontes, cores, bordas e sombras do Figma.
- **FR-010**: O formulário de newsletter MUST validar nome obrigatório, e-mail válido e aceite
  dos termos, exibindo confirmação local em caso de sucesso.
- **FR-011**: A página MUST usar marcação semântica, hierarquia de títulos coerente, textos
  alternativos, idioma pt-BR e metadados de título, descrição e compartilhamento social.
- **FR-012**: Todos os elementos interativos MUST ser acessíveis por teclado com foco visível.
- **FR-013**: A página MUST ser fiel ao layout a 1440px e se adaptar de forma fluida a
  larguras menores (tablet e mobile, a partir de 360px) sem rolagem horizontal; a vitrine
  MUST reduzir os cards visíveis (4 → 3 → 2 → 1) conforme a largura.

### Key Entities

- **Produto**: item do catálogo — nome (`productName`), descrição curta
  (`descriptionShort`), URL da foto (`photo`) e preço em centavos (`price`).
- **Categoria da vitrine**: aba de filtro exibida na primeira vitrine (rótulo, estado ativo e
  se exibe o catálogo completo — CELULAR e VER TODOS — ou nenhum produto).
- **Inscrição na newsletter**: nome, e-mail e aceite dos termos (apenas local).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A 1440px de largura, cada seção da página difere do layout de referência em no
  máximo 2px de posição/tamanho e usa exatamente as fontes, tamanhos e cores especificados.
- **SC-002**: 100% dos produtos do catálogo são acessíveis pela navegação da vitrine.
- **SC-003**: Em 100% dos cliques em produtos, o modal mostra os dados do produto clicado.
- **SC-004**: Os produtos aparecem em até 2 segundos após a abertura da página em conexão
  banda larga comum.
- **SC-005**: Auditoria automatizada de SEO e de acessibilidade pontua 90 ou mais.
- **SC-006**: Todo o fluxo (navegar na vitrine, abrir modal, alterar quantidade, fechar) pode
  ser concluído apenas com teclado.

## Assumptions

- O Figma é a referência visual principal; onde a imagem de apoio da vitrine (cor rosa)
  diverge do Figma (azul `#3442B5`), prevalece o Figma, que é o "layout" citado no teste.
- `price` está em centavos: `149990` corresponde a "R$ 1.499,90", o mesmo valor mostrado
  no modal do layout.
- Os textos fixos do layout (banners, benefícios, rodapé, "Lorem ipsum") são mantidos como no
  Figma; links de menu, rodapé, "Ver produto", "CONFIRA" e marcas são navegação fictícia.
- O botão "COMPRAR" e o seletor de quantidade não integram carrinho real; não há checkout.
- As três vitrines usam o mesmo catálogo.
- A busca do cabeçalho é visual (campo funcional, sem resultados), pois não há API de busca.
- Não há envio de dados da newsletter a serviço externo.
