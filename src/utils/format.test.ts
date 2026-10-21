import { describe, expect, it } from 'vitest';
import { formatCurrency, installmentLabel, padQuantity, slugify } from './format';

describe('formatCurrency', () => {
  it('formata centavos em reais', () => {
    expect(formatCurrency(149990)).toBe('R$ 1.499,90');
    expect(formatCurrency(15000)).toBe('R$ 150,00');
    expect(formatCurrency(520)).toBe('R$ 5,20');
    expect(formatCurrency(0)).toBe('R$ 0,00');
  });
});

describe('installmentLabel', () => {
  it('divide o preço em 2x sem juros por padrão', () => {
    expect(installmentLabel(149990)).toBe('ou 2x de R$ 749,95 sem juros');
  });

  it('arredonda para o centavo mais próximo', () => {
    expect(installmentLabel(4550, 3)).toBe('ou 3x de R$ 15,17 sem juros');
  });
});

describe('padQuantity', () => {
  it('exibe sempre dois dígitos', () => {
    expect(padQuantity(1)).toBe('01');
    expect(padQuantity(12)).toBe('12');
  });
});

describe('slugify', () => {
  it('remove acentos e caracteres especiais', () => {
    expect(slugify('Iphone 11 PRO MAX Branco 1')).toBe('iphone-11-pro-max-branco-1');
    expect(slugify(' Acessórios & TVs ')).toBe('acessorios-tvs');
  });
});
