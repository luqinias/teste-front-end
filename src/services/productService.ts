import type { Product, ProductsResponse, RawProduct } from '../types/product';
import { slugify } from '../utils/format';

/**
 * Endpoint do catálogo. Em dev/preview, `/api/produtos` é um proxy (vite.config.ts) para
 * https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json,
 * que não envia cabeçalhos CORS.
 */
export const PRODUCTS_URL: string = import.meta.env.VITE_PRODUCTS_URL ?? '/api/produtos';

/** Snapshot local usado quando o catálogo remoto não está acessível (ex.: hospedagem estática). */
export const PRODUCTS_FALLBACK_URL = `${import.meta.env.BASE_URL}data/produtos.json`;

export class ProductsResponseError extends Error {
  override name = 'ProductsResponseError';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isRawProduct(value: unknown): value is RawProduct {
  if (!isRecord(value)) return false;
  const { productName, descriptionShort, photo, price } = value;
  return (
    typeof productName === 'string' &&
    productName.trim().length > 0 &&
    typeof descriptionShort === 'string' &&
    typeof photo === 'string' &&
    /^https?:\/\//i.test(photo) &&
    typeof price === 'number' &&
    Number.isFinite(price) &&
    price >= 0
  );
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  return isRecord(value) && Array.isArray(value.products);
}

/** Valida a resposta do catálogo e converte para `Product[]`, descartando itens inválidos. */
export function parseProducts(payload: unknown): Product[] {
  if (!isProductsResponse(payload)) {
    throw new ProductsResponseError('Resposta do catálogo em formato inesperado.');
  }

  return payload.products.flatMap((item, index) => {
    if (!isRawProduct(item)) {
      console.warn('[catálogo] item ignorado por estar fora do contrato:', item);
      return [];
    }
    const product: Product = {
      id: `${index}-${slugify(item.productName)}`,
      productName: item.productName.trim(),
      descriptionShort: item.descriptionShort.trim(),
      photo: item.photo,
      price: Math.round(item.price),
    };
    return [product];
  });
}

async function requestJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new ProductsResponseError(`Falha ao carregar o catálogo (HTTP ${response.status}).`);
  }
  return response.json();
}

/** Busca o catálogo oficial; se indisponível, usa o snapshot local. */
export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    return parseProducts(await requestJson(PRODUCTS_URL, signal));
  } catch (error) {
    if (signal?.aborted) throw error;
    console.warn('[catálogo] endpoint indisponível, usando snapshot local.', error);
    return parseProducts(await requestJson(PRODUCTS_FALLBACK_URL, signal));
  }
}
