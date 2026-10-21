# Implementation Plan: Home Econverse com Vitrine de Produtos e Modal

**Branch**: `001-home-vitrine-produtos` | **Date**: 2026-10-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-home-vitrine-produtos/spec.md`

## Summary

Página única (Home) em React + TypeScript reproduzindo pixel a pixel o frame `Home` (1440px)
do Figma, com vitrine de produtos alimentada em tempo de execução pelo JSON oficial e modal de
detalhes do produto (frame `Popup`). Estilos em SCSS Modules com design tokens extraídos via
API do Figma; carrossel, modal e formulários implementados sem bibliotecas de UI. Como o
endpoint do catálogo não envia cabeçalhos CORS, o acesso passa por proxy do Vite (dev e
preview) com fallback para um snapshot local do JSON (ver [research.md](./research.md)).

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Node.js ≥ 20 (ambiente: Node 24)

**Primary Dependencies**: React 19, ReactDOM 19; build Vite 8; Sass (dart-sass) 1.x

**Storage**: N/A (estado em memória; sem persistência)

**Testing**: Vitest + @testing-library/react + @testing-library/user-event + jsdom

**Target Platform**: Navegadores modernos (Chrome, Firefox, Safari, Edge — 2 últimas versões)

**Project Type**: Web app front-end estático (SPA de página única)

**Performance Goals**: produtos visíveis ≤ 2s; LCP < 2,5s em banda larga; imagens otimizadas
(WebP/JPEG comprimidos, `loading="lazy"` abaixo da dobra)

**Constraints**: pixel-perfect a 1440px; sem bibliotecas de UI/CSS/carrossel; sem `any`;
adaptação fluida até 360px sem rolagem horizontal

**Scale/Scope**: 1 página, ~15 componentes, 10 produtos no catálogo

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Como o plano atende | Status |
|-----------|--------------------|--------|
| I. Fidelidade ao Layout | Tokens (cores, fontes, tamanhos, sombras, raios) extraídos da API do Figma em [research.md](./research.md#design-tokens); referências exportadas em `design/`; validação visual a 1440px no quickstart | ✅ |
| II. React + TS Estrito | `strict: true`, `noUncheckedIndexedAccess`; tipo `Product` + validação do JSON em `services/` | ✅ |
| III. Componentização | Um componente por bloco do layout + componentes base (`Button`, `SectionTitle`, `ProductCard`, `Modal`); dados só via hook `useProducts` | ✅ |
| IV. Sass, sem libs de UI | SCSS Modules + `styles/_tokens.scss`/`_mixins.scss`; carrossel e modal próprios | ✅ |
| V. Semântica/SEO/A11y | `header/nav/main/section/article/footer`, `<dialog>` nativo, meta tags + OG + JSON-LD `ItemList`, foco gerenciado | ✅ |
| VI. Qualidade Verificável | Scripts `typecheck`, `lint`, `test`, `build`; testes de formatação de preço, vitrine e modal | ✅ |

Pós-design (Phase 1): sem violações; nenhuma dependência de runtime além de React/ReactDOM.

## Project Structure

### Documentation (this feature)

```text
specs/001-home-vitrine-produtos/
├── plan.md              # Este arquivo
├── research.md          # Decisões técnicas + design tokens do Figma
├── data-model.md        # Entidades e regras de validação
├── quickstart.md        # Guia de execução e validação
├── contracts/
│   ├── produtos.schema.json   # Contrato do JSON do catálogo
│   └── ui-components.md       # Contratos (props/eventos) dos componentes
├── design/              # Exportações de referência do Figma (1440px)
├── checklists/
│   └── requirements.md
└── tasks.md             # /speckit-tasks
```

### Source Code (repository root)

```text
index.html                     # meta tags SEO/OG, lang pt-BR, preconnect fontes
vite.config.ts                 # proxy /api/produtos → endpoint oficial (dev e preview)
public/
├── favicon.svg
└── data/produtos.json         # snapshot de fallback do catálogo
src/
├── main.tsx
├── App.tsx                    # composição da Home
├── assets/
│   ├── icons/                 # SVGs exportados do Figma (header, categorias, social…)
│   └── images/                # banner, parceiros, marcas, logo
├── components/
│   ├── ui/                    # Button, SectionTitle, Container, Icon
│   ├── layout/                # TopBar, Header, MainNav, Footer
│   ├── HeroBanner/
│   ├── CategoryShortcuts/
│   ├── ProductShowcase/       # vitrine: título, abas, carrossel
│   ├── ProductCard/
│   ├── ProductModal/          # modal + QuantitySelector
│   ├── PartnersBanners/
│   ├── BrandsSection/
│   └── Newsletter/
├── hooks/
│   ├── useProducts.ts         # carregamento + estados loading/error/success
│   └── useCarousel.ts         # paginação responsiva da vitrine
├── services/
│   └── productService.ts      # fetch + validação + fallback
├── types/
│   └── product.ts
├── utils/
│   └── format.ts              # formatCurrency, installments, padQuantity
└── styles/
    ├── _tokens.scss           # cores, fontes, sombras, raios, breakpoints
    ├── _mixins.scss
    └── global.scss            # reset, @font-face/imports, base
tests/ (co-localizados como *.test.ts(x) junto aos módulos)
```

**Structure Decision**: projeto único front-end na raiz do repositório (o fork já é o
projeto). Componentes por pasta com `index.tsx` + `*.module.scss` + teste quando houver lógica.

## Complexity Tracking

Sem violações da constituição a justificar.
