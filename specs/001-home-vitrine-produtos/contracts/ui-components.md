# UI Component Contracts

Contratos públicos (props/eventos) dos componentes com comportamento. Componentes puramente
estáticos (TopBar, Header, MainNav, HeroBanner, CategoryShortcuts, PartnersBanners,
BrandsSection, Footer) não recebem props obrigatórias.

## ProductShowcase

```ts
interface ProductShowcaseProps {
  title: string;                         // "Produtos relacionados"
  headingId: string;                     // id do h2 (aria-labelledby)
  variant: 'tabs' | 'see-all';           // abas (vitrine 1) ou link "Ver todos" (2 e 3)
  state: ProductsState;                  // loading | error | success
  onRetry: () => void;
  onSelectProduct: (product: Product, trigger: HTMLElement) => void;
}
```

- `variant='tabs'`: renderiza `role="tablist"` com 6 abas, `celular` ativa.
- Setas: `button` com `aria-label` "Produtos anteriores"/"Próximos produtos", `disabled` nos
  limites.
- Estados: loading (placeholders 304×500), error (mensagem + "Tentar novamente"), vazio.

## ProductCard

```ts
interface ProductCardProps {
  product: Product;
  onSelect: (product: Product, trigger: HTMLElement) => void;
}
```

- Renderiza `<article>`; foto, descrição e botão "COMPRAR" disparam `onSelect`.
- Foto: `alt={productName}`, `loading="lazy"`, `width/height` fixos.

## ProductModal

```ts
interface ProductModalProps {
  product: Product | null;               // null = fechado
  onClose: () => void;
}
```

- `<dialog aria-labelledby>` aberto com `showModal()` quando `product` ≠ null.
- Fecha por botão "Fechar" (`aria-label`), clique no backdrop e `Esc` (evento `cancel`).
- Contém `QuantitySelector` (1–99) e botão "COMPRAR".

## QuantitySelector

```ts
interface QuantitySelectorProps {
  value: number;
  min?: number;                          // default 1
  max?: number;                          // default 99
  onChange: (value: number) => void;
}
```

- Botões "Diminuir quantidade"/"Aumentar quantidade" desabilitados nos limites; valor exibido
  com `aria-live="polite"` e 2 dígitos.

## Newsletter

- `<form noValidate>` com `label` (visualmente oculto) para nome e e-mail, checkbox de termos,
  mensagens de erro por campo (`aria-describedby`) e mensagem de sucesso (`role="status"`).
