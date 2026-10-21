const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/** Formata um valor em centavos como moeda brasileira: 149990 → "R$ 1.499,90". */
export function formatCurrency(cents: number): string {
  // Intl usa espaço não separável após "R$"; normalizamos para um espaço comum.
  return currencyFormatter.format(cents / 100).replace(/\s/u, ' ');
}

/** Texto de parcelamento sem juros: "ou 2x de R$ 749,95 sem juros". */
export function installmentLabel(cents: number, installments = 2): string {
  const value = Math.round(cents / installments);
  return `ou ${installments}x de ${formatCurrency(value)} sem juros`;
}

/** Quantidade com dois dígitos: 1 → "01". */
export function padQuantity(value: number): string {
  return String(value).padStart(2, '0');
}

/** Gera um slug simples para ids e chaves: "IPHONE 13 MINI 1" → "iphone-13-mini-1". */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
