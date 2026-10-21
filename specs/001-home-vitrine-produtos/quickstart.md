# Quickstart & Validation: Home Econverse com Vitrine de Produtos e Modal

## Pré-requisitos

- Node.js ≥ 20 e npm ≥ 10
- Acesso à internet (catálogo, fotos e Google Fonts)

## Setup e execução

```bash
npm install
npm run dev        # http://localhost:5173
```

Build de produção:

```bash
npm run build
npm run preview    # http://localhost:4173 (mesmo proxy do catálogo)
```

## Verificações automatizadas

```bash
npm run typecheck
npm run lint
npm test
```

Esperado: todos sem erros.

## Cenários de validação manual

| # | Passo | Resultado esperado | Ref. |
|---|-------|--------------------|------|
| 1 | Abrir a página a 1440px | Seções na ordem do layout; comparar com `design/ref-home-1440.png` | US3, SC-001 |
| 2 | Observar a 1ª vitrine | 4 cards com dados do catálogo; ex.: produto `149990` → "R$ 1.499,90" e "ou 2x de R$ 749,95 sem juros" | US1, FR-002 |
| 3 | Clicar na seta direita até o fim | Todos os 10 produtos aparecem; seta direita desabilita no fim | FR-004, SC-002 |
| 4 | Clicar na aba TABLETS, depois VER TODOS | Estado vazio; depois catálogo completo | US1-4 |
| 5 | Clicar em um card | Modal com foto, nome, preço e descrição daquele produto; comparar com `design/ref-popup-1440.png` | US2, FR-006 |
| 6 | Usar −/+ no modal | Quantidade 01…99, sem passar dos limites | FR-007 |
| 7 | Fechar com Esc, X e clique fora | Modal fecha e foco volta ao card | FR-008 |
| 8 | Repetir 2–7 só com teclado | Fluxo completo possível | SC-006 |
| 9 | Bloquear o catálogo (DevTools → Network block `/api/produtos`) | Vitrine usa snapshot local; bloqueando também `/data/produtos.json`, mostra erro + "Tentar novamente" | Edge cases |
| 10 | Redimensionar 1280 → 360px | Sem rolagem horizontal; vitrine 4→3→2→1 cards | FR-013 |
| 11 | Newsletter: enviar vazio, e-mail inválido, sem termos e válido | Erros por campo; sucesso exibe confirmação e limpa | US4 |
| 12 | Lighthouse (SEO e Acessibilidade) | ≥ 90 | SC-005 |
