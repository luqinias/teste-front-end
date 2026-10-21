# Data Model: Home Econverse com Vitrine de Produtos e Modal

## Product

Origem: catálogo oficial (`products[]`), contrato em
[contracts/produtos.schema.json](./contracts/produtos.schema.json).

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | string | Derivado no cliente (índice + slug do nome); estável por carregamento, usado como `key` |
| `productName` | string | Obrigatório, não vazio após `trim` |
| `descriptionShort` | string | Obrigatório (pode repetir o nome) |
| `photo` | string (URL) | Obrigatório, URL `http(s)` |
| `price` | number (centavos) | Inteiro ≥ 0 |
| `previousPrice` | number (centavos) \| undefined | Opcional; ausente no catálogo atual → linha "de" omitida |

Validação: itens que não atendem às regras são descartados (com aviso no console); se a
resposta não tiver `products` como array, o serviço lança `ProductsResponseError`.

Derivados (funções puras em `utils/format.ts`):

- `formatCurrency(cents)` → `"R$ 1.499,90"`
- `installmentLabel(cents, n = 2)` → `"ou 2x de R$ 749,95 sem juros"`

## ShowcaseCategory

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | `'celular' \| 'acessorios' \| 'tablets' \| 'notebooks' \| 'tvs' \| 'ver-todos'` | Fixo |
| `label` | string | Exibido em caixa alta |
| `showsCatalog` | boolean | `true` para `celular` e `ver-todos` |

Estado: `activeCategory` (padrão `celular`). Trocar de aba reinicia o carrossel na página 0.

## ProductsState (hook `useProducts`)

```text
idle → loading → success(products[])
               ↘ error(message) → (retry) → loading
```

## CarouselState (hook `useCarousel`)

| Campo | Regra |
|-------|-------|
| `perPage` | 4 / 3 / 2 / 1 por breakpoint (1280 / 960 / 600) |
| `page` | 0 ≤ page ≤ `pageCount - 1`; reajustado quando `perPage` ou o total muda |
| `canPrev` / `canNext` | limites da lista |

## ModalState

| Campo | Regra |
|-------|-------|
| `selectedProduct` | `Product \| null`; `null` = fechado |
| `quantity` | inteiro 1–99, exibido com 2 dígitos; reinicia em 1 a cada abertura |

## NewsletterForm

| Campo | Regra |
|-------|-------|
| `name` | obrigatório, ≥ 2 caracteres após `trim` |
| `email` | obrigatório, formato e-mail |
| `acceptedTerms` | deve ser `true` |
| `status` | `idle \| invalid \| success`; sucesso limpa os campos (sem envio externo) |
