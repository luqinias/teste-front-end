# Research: Home Econverse com Vitrine de Produtos e Modal

## R1. Ferramenta de build

- **Decision**: Vite 8 + `@vitejs/plugin-react`, TypeScript strict.
- **Rationale**: setup mínimo, HMR rápido, suporte nativo a Sass e CSS Modules, `vite preview`
  para servir o build com o mesmo proxy.
- **Alternatives considered**: Next.js (SSR melhoraria SEO, mas adiciona complexidade a um
  teste de página única); CRA (descontinuado).

## R2. Consumo do JSON sem CORS

- **Finding**: `GET https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`
  responde `200 application/json` **sem** `Access-Control-Allow-Origin` → `fetch` direto do
  navegador é bloqueado. As imagens (`<img>`) não precisam de CORS.
- **Decision**: o app busca `/api/produtos`; `vite.config.ts` define `server.proxy` e
  `preview.proxy` para o endpoint oficial. Se a requisição falhar (ex.: hospedagem estática sem
  proxy), o serviço tenta `/data/produtos.json` (snapshot no `public/`) e registra aviso no
  console. A URL é configurável por `VITE_PRODUCTS_URL`.
- **Rationale**: mantém o consumo em tempo de execução do endpoint oficial (constituição) e
  garante que o avaliador veja a vitrine em qualquer forma de execução.
- **Alternatives considered**: proxy CORS público (dependência externa instável); embutir o
  JSON no bundle (não "consome" o link pedido).

## R3. Unidade do preço

- **Decision**: `price` em centavos. `formatCurrency(149990)` → `"R$ 1.499,90"` via
  `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.
- **Rationale**: o modal do Figma mostra "R$ 1.499,90", idêntico ao produto de `price: 149990`.
- Parcelamento: `ou 2x de {formatCurrency(Math.round(price / 2))} sem juros`.
- Nota: `Intl` gera espaço não separável (U+00A0) entre "R$" e o número; testes comparam
  normalizando espaços.

## R4. Carrossel da vitrine

- **Decision**: implementação própria com trilho `display:flex` + `transform: translateX`
  por página; `useCarousel` calcula itens por página via `matchMedia`
  (≥1280px: 4; ≥960px: 3; ≥600px: 2; <600px: 1) e expõe `next/prev/canNext/canPrev`.
  Navegação por página (avança 4 no desktop); setas desabilitadas nos limites.
- **Rationale**: sem libs; previsível e testável.
- **Alternatives**: `scroll-snap` nativo (bom em mobile, mas setas/estado ficam mais frágeis).

## R5. Modal

- **Decision**: elemento nativo `<dialog>` com `showModal()` (foco preso, `Esc` e camada top
  layer nativos), `::backdrop` `rgba(0,0,0,.54)`; fechamento por clique no backdrop; restaura
  foco ao gatilho; trava rolagem do `body` enquanto aberto.
- **Rationale**: semântica e acessibilidade nativas com pouco código.
- **Alternatives**: portal + `div role="dialog"` com focus-trap manual (mais código).
- jsdom não implementa `showModal`; os testes fazem polyfill mínimo no `setupTests`.

## R6. Abas da vitrine

- **Decision**: `role="tablist"`/`tab`/`tabpanel`; categorias `celular` e `ver-todos` mostram
  todo o catálogo; demais exibem "Nenhum produto nesta categoria" (clarificação 2026-10-21).

## R7. Fontes e ícones

- **Decision**: Google Fonts — Poppins (300, 400, 500, 600, 700), Work Sans (400, 500, 600),
  Outfit (600) com `display=swap` e `preconnect`. Ícones exportados do Figma como SVG
  (`/v1/images?format=svg`) e importados como arquivos; imagens raster exportadas em PNG 2x e
  convertidas/comprimidas.
- **Rationale**: fidelidade exata às fontes do layout.

## R8. SEO

- **Decision**: `<title>`, meta description, canonical, Open Graph/Twitter, `lang="pt-BR"`,
  `theme-color`, um único `h1` (título do banner), `h2` por seção, JSON-LD `ItemList` de
  produtos gerado após carregar o catálogo, `alt` descritivo, `width/height` em imagens.

## R9b. Lint e formatação

- **Decision**: oxlint (padrão do template Vite atual) com plugins `react`, `typescript`,
  `jsx-a11y` e `vitest`; Prettier para formatação.
- **Rationale**: análise rápida, regras de acessibilidade incluídas, zero configuração extra.
- **Alternatives considered**: ESLint flat config (mais lento, mesma cobertura para o escopo).

## R9. Testes

- **Decision**: Vitest + Testing Library + user-event, ambiente jsdom. Cobertura de
  `utils/format`, `productService` (validação/fallback), `useCarousel`, `ProductShowcase`
  (render a partir de dados mockados, abas, setas) e `ProductModal` (abrir, quantidade, fechar).

## Design Tokens

Extraídos do Figma (`Teste Front-End Jr (Copy)`, frame `Home` 1440×4660) via REST API.

### Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `$color-primary` | `#3442B5` | títulos de seção, aba ativa, botão COMPRAR do card, "Frete grátis", link do modal |
| `$color-primary-alt` | `#3019B2` | destaques do header ("Ofertas do dia", "100% segura"…), categoria ativa |
| `$color-accent` | `#F7CA11` | logo, botões "Ver produto", "CONFIRA", "INSCREVER", COMPRAR do modal, "50% Off" |
| `$color-dark` | `#271C47` | logo texto, fundo newsletter, texto de botões amarelos, "01" |
| `$color-text` | `#3F3F40` | textos do card, preços, rodapé |
| `$color-text-tab` | `#3B3B3B` | abas inativas |
| `$color-muted` | `#9F9F9F` | header (ícones, menu, busca), descrição do modal |
| `$color-strike` | `#808080` | preço "de" |
| `$color-category-text` | `#4E4E4E` | rótulos das categorias |
| `$color-footer-text` | `rgba(34,34,34,.71)` | links do rodapé |
| `$color-input-placeholder` | `#676767` | placeholders newsletter |
| `$color-surface-alt` | `#F4F4F4` | cards de categoria, fundo do rodapé |
| `$color-search-bg` | `#F6F5F2` | campo de busca |
| `$color-border` | `#BDBDBD` | abas |
| `$color-line` | `#DEDEDE` | linhas do título de seção |
| `$color-divider` | `#F0F0F0` | linhas do header |
| `$color-input-border` | `#E7E7E7` | inputs newsletter |
| `$color-qty-border` | `#D9D9D9` | seletor de quantidade |
| `$color-close` | `#707070` | "X" do modal |
| `$color-overlay` | `rgba(0,0,0,.54)` | backdrop do modal |

### Tipografia (família peso tamanho/altura-de-linha)

| Elemento | Estilo |
|----------|--------|
| Barra de benefícios | Poppins 500 12/18, destaque 600 `$color-primary-alt` |
| Busca placeholder | Poppins 500 14/21 |
| Menu principal | Poppins 600 12/18 uppercase, gap 91px |
| Hero título | Poppins 600 48/50 branco |
| Hero subtítulo | Poppins 400 32/48 branco; "50% Off" 700 `$color-accent` |
| Botão "Ver produto" | Poppins 600 16/24 `$color-dark`, 206×50, raio 5 |
| Categoria rótulo | Poppins 500 14/21 `#4E4E4E`; ativo 600 `$color-primary-alt` |
| Título de seção | Poppins 700 30/45 `$color-primary` |
| "Ver todos" | Poppins 700 15/22.5 `$color-text` |
| Abas | Poppins 400 16/16 uppercase `#3B3B3B`; ativa 700 `$color-primary` |
| Card descrição | Poppins 300 15/22.5 `$color-text` |
| Card preço "de" | Poppins 400 16/24 `#808080` riscado |
| Card preço | Poppins 700 20/30 `$color-text` |
| Card parcelas / frete | Poppins 400 12/18 (`$color-text` / `$color-primary`) |
| Botão COMPRAR card | Poppins 700 14/21 uppercase branco sobre `$color-primary`, 276×44, raio 4 |
| Parceiros título | Poppins 700 40/60 branco |
| Parceiros texto | Poppins 400 16/24 branco |
| Botão CONFIRA | Poppins 700 16/24 uppercase, ls 1.28px, 145×48, raio 6 |
| Newsletter título | Outfit 600 32/38.4 branco |
| Newsletter texto | Poppins 300 14/18 branco |
| Inputs | Poppins 400 14/18 `#676767`, 233×42, raio 8, padding 12/24 |
| Botão INSCREVER | Poppins 600 14 `#161615`, 157×42, raio 8 |
| Rodapé texto | Poppins 300 14/21 `$color-text` |
| Rodapé títulos | Poppins 700 16/16 `$color-footer-text` |
| Rodapé links | Work Sans 400 14/16 (Termos: Poppins 400 14/16) |
| Linha final | Poppins 300 13/19.5 `$color-text` |
| Modal nome | Poppins 400 20/20 ls 1px `$color-text` |
| Modal preço | Poppins 600 20/20 ls 1px |
| Modal descrição | Work Sans 500 10/15 ls .5px `$color-muted` |
| Modal link | Work Sans 600 11/11 ls .55px `$color-primary` |
| Modal quantidade | Poppins 500 16/16 `$color-dark` |
| Modal COMPRAR | Poppins 700 14/21 uppercase `$color-dark` sobre `$color-accent`, 188×36, raio 6 |

### Sombras e raios

| Token | Valor |
|-------|-------|
| `$shadow-card` | `0 3px 19px rgba(0,0,0,.22)` — card de produto (304×500, raio 10) |
| `$shadow-category` | `0 4px 11px rgba(0,0,0,.13)` — categoria inativa (128×128, raio 10, `#F4F4F4`) |
| `$shadow-category-active` | `0 2px 9px rgba(0,0,0,.22)` — categoria ativa (fundo branco) |
| `$shadow-arrow` | `0 4px 4px rgba(0,0,0,.25)` — setas 32×32 circulares |
| `$shadow-brand` | `0 7px 20px rgba(0,0,0,.13)` — círculos de marca 211×211 |
| `$shadow-header-nav` | `0 8px 16px rgba(57,48,19,.12)` — barra do menu |

### Medidas de layout (a 1440px)

- Container 1280px (margem 80px). Header: barra 32px + linha 72px + menu 40px = 144px.
  Logo 139×41; busca 630×48 raio 10 em x=405; ícones 24–32px, gap 32px.
- Hero 1440×390; gradiente preto à esquerda (966px, transparente→preto 85%, opacidade .8).
- Categorias: 7 itens de 128×128 (ícone 61px), gap 42px, largura total 1160px, topo y=573.
- Vitrine: título y+0 com linhas de 360px; abas 6×214×40 (sobreposição 1px); cards 304×500,
  gap 18px, largura total 1270px; setas a 38px/1369px; padding interno do card 13px.
- Parceiros: 2 banners 634×350 raio 20, gap 13px; texto em x+44.
- Marcas: título centralizado, 5 círculos 211px, gap 42px.
- Newsletter 1440×162 `#271C47`; rodapé 1440×282 `#F4F4F4` padding 42/80, gap 90, divisor
  vertical 198px; linha final 47px.
- Espaçamento vertical entre seções ≈ 90px (ex.: categorias fim 744 → vitrine 834).
- Modal 769×299 raio 6; imagem 247×192 em (56,56); coluna de texto em x=390 largura 328;
  fechar 15×13 em (725,17).
