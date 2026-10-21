---

description: "Task list for Home Econverse com Vitrine de Produtos e Modal"
---

# Tasks: Home Econverse com Vitrine de Produtos e Modal

**Input**: Design documents from `/specs/001-home-vitrine-produtos/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: incluídos — a constituição (VI) exige testes para a lógica não trivial.

**Organization**: tarefas agrupadas por user story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: user story (US1…US5)

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Criar projeto Vite React + TS na raiz (`package.json`, `tsconfig*.json`, `vite.config.ts`, `index.html`, `src/main.tsx`) preservando `README.md`, `.specify/`, `.claude/` e `specs/`
- [X] T002 Instalar `sass`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom` e configurar `test` em `vite.config.ts` + `src/setupTests.ts` (polyfill de `HTMLDialogElement.showModal/close` e `matchMedia`)
- [X] T003 [P] Configurar oxlint (plugins react, typescript, jsx-a11y, vitest) + Prettier e scripts `dev`, `build`, `preview`, `typecheck`, `lint`, `test` em `package.json`
- [X] T004 [P] Ativar `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters` em `tsconfig.app.json`
- [X] T005 [P] Atualizar `.gitignore` (node_modules, dist, coverage, .env*)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [X] T006 Criar tokens Sass (cores, tipografia, sombras, raios, breakpoints, container) em `src/styles/_tokens.scss` conforme research.md#design-tokens
- [X] T007 [P] Criar mixins (`container`, `respond-below`, `visually-hidden`, `focus-ring`, `reset-button`) em `src/styles/_mixins.scss`
- [X] T008 Criar `src/styles/global.scss` (reset, box-sizing, fontes base, `:focus-visible`) e importar em `src/main.tsx`
- [X] T009 [P] Configurar Google Fonts (Poppins 300–700, Work Sans 400–600, Outfit 600) com preconnect e meta tags SEO/OG/Twitter, `lang="pt-BR"`, `theme-color` e favicon em `index.html` + `public/favicon.svg`
- [X] T010 Exportar assets do Figma via API (ícones SVG do header/benefícios/categorias/redes sociais/setas/fechar/mais/menos; logo SVG; banner hero, parceiros, marca e foto de produto em PNG/JPG) para `src/assets/icons/` e `src/assets/images/`
- [X] T011 [P] Definir tipos `Product`, `RawProduct`, `ProductsResponse`, `ProductsState` em `src/types/product.ts`
- [X] T012 [P] Implementar `formatCurrency`, `installmentLabel`, `padQuantity` em `src/utils/format.ts`
- [X] T013 [P] Testes de `src/utils/format.test.ts` (149990 → "R$ 1.499,90"; 2x de 749,95; 520 → "R$ 5,20"; pad "01")
- [X] T014 [P] Criar componentes base `Button`, `SectionTitle`, `Container`, `Icon` em `src/components/ui/`

**Checkpoint**: base pronta.

---

## Phase 3: User Story 1 — Ver a vitrine de produtos (P1) 🎯 MVP

**Goal**: vitrine com dados do catálogo, abas e carrossel.

**Independent Test**: cards exibem dados do JSON; setas navegam; abas alternam.

### Tests for User Story 1

- [X] T015 [P] [US1] Testes do serviço (validação, descarte de itens inválidos, fallback para snapshot, erro) em `src/services/productService.test.ts`
- [X] T016 [P] [US1] Testes do `useCarousel` (perPage por breakpoint, limites, reajuste) em `src/hooks/useCarousel.test.ts`
- [X] T017 [P] [US1] Testes de `ProductShowcase` (render dos cards, loading/erro/retry, abas vazias, setas desabilitadas) em `src/components/ProductShowcase/ProductShowcase.test.tsx`

### Implementation for User Story 1

- [X] T018 [US1] Proxy `/api/produtos` → endpoint oficial em `server.proxy` e `preview.proxy` de `vite.config.ts`; snapshot em `public/data/produtos.json`
- [X] T019 [US1] Implementar `fetchProducts` (URL via `VITE_PRODUCTS_URL`, validação, fallback, `AbortSignal`) em `src/services/productService.ts`
- [X] T020 [US1] Implementar `useProducts` (estados + `retry`) em `src/hooks/useProducts.ts`
- [X] T021 [US1] Implementar `useCarousel` em `src/hooks/useCarousel.ts`
- [X] T022 [P] [US1] Implementar `ProductCard` (`article`, foto lazy, descrição 2 linhas, preço "de" opcional, parcelas, frete, COMPRAR) em `src/components/ProductCard/`
- [X] T023 [US1] Implementar `ProductShowcase` (título com linhas, variante abas/“Ver todos”, trilho, setas, estados) em `src/components/ProductShowcase/`
- [X] T024 [US1] Compor as 3 vitrines em `src/App.tsx` com `useProducts` único compartilhado

**Checkpoint**: MVP da vitrine funcional.

---

## Phase 4: User Story 2 — Modal de detalhes do produto (P1)

**Goal**: clicar em produto abre modal com dados dele.

**Independent Test**: abrir, alterar quantidade, fechar (X, backdrop, Esc), foco restaurado.

### Tests for User Story 2

- [X] T025 [P] [US2] Testes de `QuantitySelector` (limites 1–99, pad) em `src/components/ProductModal/QuantitySelector.test.tsx`
- [X] T026 [P] [US2] Testes de `ProductModal` + integração com a vitrine (abre com produto clicado, reinicia quantidade, fecha por X/Esc/backdrop) em `src/components/ProductModal/ProductModal.test.tsx`

### Implementation for User Story 2

- [X] T027 [P] [US2] Implementar `QuantitySelector` em `src/components/ProductModal/QuantitySelector.tsx`
- [X] T028 [US2] Implementar `ProductModal` com `<dialog>` (showModal, backdrop .54, trava de scroll, restauração de foco) em `src/components/ProductModal/`
- [X] T029 [US2] Ligar `onSelectProduct` das vitrines ao estado `selectedProduct` em `src/App.tsx`

**Checkpoint**: US1 + US2 entregam os requisitos centrais do teste.

---

## Phase 5: User Story 3 — Home completa conforme layout (P2)

**Goal**: todas as seções do Figma pixel a pixel a 1440px + adaptação responsiva.

**Independent Test**: comparação visual com `design/ref-home-1440.png`.

- [X] T030 [P] [US3] `TopBar` (benefícios com ícones e destaques) em `src/components/layout/TopBar/`
- [X] T031 [P] [US3] `Header` (logo, busca com `role="search"`, ícones pedidos/favoritos/conta/carrinho) em `src/components/layout/Header/`
- [X] T032 [P] [US3] `MainNav` (menu + "Assinatura" com coroa, sombra) em `src/components/layout/MainNav/`
- [X] T033 [P] [US3] `HeroBanner` (h1, gradiente, "50% Off", botão "Ver produto") em `src/components/HeroBanner/`
- [X] T034 [P] [US3] `CategoryShortcuts` (7 categorias, Tecnologia ativa) em `src/components/CategoryShortcuts/`
- [X] T035 [P] [US3] `PartnersBanners` (2 banners por bloco, CONFIRA) em `src/components/PartnersBanners/`
- [X] T036 [P] [US3] `BrandsSection` ("Navegue por marcas", 5 círculos) em `src/components/BrandsSection/`
- [X] T037 [P] [US3] `Footer` (logo, texto, redes, 3 colunas de links, divisor, linha final) em `src/components/layout/Footer/`
- [X] T038 [US3] Compor ordem final das seções em `src/App.tsx` (`header`, `main`, `footer`)
- [X] T039 [US3] Estilos responsivos (≤1279, ≤959, ≤599px) em todos os módulos; sem rolagem horizontal até 360px
- [X] T040 [US3] Estados hover/focus de abas, setas, botões, links e categorias

---

## Phase 6: User Story 4 — Newsletter (P3)

- [X] T041 [P] [US4] Testes de validação/sucesso em `src/components/Newsletter/Newsletter.test.tsx`
- [X] T042 [US4] Implementar `Newsletter` (form, labels ocultos, erros por campo, `role="status"`) em `src/components/Newsletter/`

---

## Phase 7: User Story 5 — SEO e acessibilidade (P3)

- [X] T043 [US5] Injetar JSON-LD `ItemList` dos produtos após carregar o catálogo em `src/components/ProductShowcase/ProductsJsonLd.tsx`
- [X] T044 [US5] Revisar hierarquia de títulos (h1 único, h2 por seção), `alt`, `aria-label`, landmarks
- [X] T045 [P] [US5] `public/robots.txt`

---

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T046 Comparação visual automatizada a 1440px (screenshot Playwright vs `design/ref-home-1440.png` e `ref-popup-1440.png`) e ajustes de pixel
- [X] T047 [P] Otimizar imagens (dimensões, compressão) e `width/height` explícitos
- [X] T048 Rodar `typecheck`, `lint`, `test`, `build` sem erros
- [X] T049 Reescrever `README.md` (sobre o teste, stack, como instalar/rodar/testar/build, decisões: CORS/proxy, preço em centavos, abas, Spec Kit)
- [X] T050 Executar validação do `quickstart.md`

---

## Dependencies & Execution Order

- Setup (T001–T005) → Foundational (T006–T014) → US1 → US2 → US3 → US4/US5 → Polish.
- US2 depende de US1 (o modal abre a partir do card). US3, US4 e US5 dependem apenas da fase
  Foundational e podem ser feitas em paralelo após US1.
- Dentro de cada story: testes primeiro (devem falhar), depois implementação.

## Parallel Example: User Story 1

```text
T015 productService.test.ts  |  T016 useCarousel.test.ts  |  T017 ProductShowcase.test.tsx
T022 ProductCard (em paralelo com T019–T021)
```

## Implementation Strategy

1. MVP: Setup + Foundational + US1 + US2 (requisitos centrais do teste).
2. Incremento: US3 (página completa pixel a pixel).
3. Extras: US4, US5, Polish e README.
