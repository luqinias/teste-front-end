import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  fetchProducts,
  parseProducts,
  PRODUCTS_FALLBACK_URL,
  PRODUCTS_URL,
  ProductsResponseError,
} from './productService';

const validItem = {
  productName: 'IPHONE 13 MINI 1',
  descriptionShort: 'IPHONE 13 MINI 1',
  photo: 'https://example.com/foto.png',
  price: 149990,
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('parseProducts', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  it('converte itens válidos e gera ids únicos', () => {
    const products = parseProducts({ success: true, products: [validItem, validItem] });
    expect(products).toHaveLength(2);
    expect(products[0]).toMatchObject({ ...validItem, id: '0-iphone-13-mini-1' });
    expect(products[1]?.id).toBe('1-iphone-13-mini-1');
  });

  it('descarta itens fora do contrato', () => {
    const products = parseProducts({
      products: [
        validItem,
        { ...validItem, price: '10' },
        { ...validItem, productName: '  ' },
        { ...validItem, photo: 'javascript:alert(1)' },
        null,
      ],
    });
    expect(products).toHaveLength(1);
  });

  it('lança erro quando a resposta não tem lista de produtos', () => {
    expect(() => parseProducts({ success: false })).toThrow(ProductsResponseError);
  });
});

describe('fetchProducts', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it('busca o catálogo oficial', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ products: [validItem] }));
    const products = await fetchProducts();
    expect(fetchMock).toHaveBeenCalledWith(PRODUCTS_URL, expect.anything());
    expect(products).toHaveLength(1);
  });

  it('usa o snapshot local quando o catálogo falha', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({}, 502))
      .mockResolvedValueOnce(jsonResponse({ products: [validItem] }));
    const products = await fetchProducts();
    expect(fetchMock).toHaveBeenLastCalledWith(PRODUCTS_FALLBACK_URL, expect.anything());
    expect(products).toHaveLength(1);
  });

  it('propaga o erro quando catálogo e snapshot falham', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(fetchProducts()).rejects.toThrow('Failed to fetch');
  });
});
