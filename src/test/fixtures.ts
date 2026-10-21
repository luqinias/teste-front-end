import type { Product } from '../types/product';

export function makeProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `p-${index + 1}`,
    productName: `Produto ${index + 1}`,
    descriptionShort: `Descrição do produto ${index + 1}`,
    photo: `https://example.com/foto-${index + 1}.png`,
    price: (index + 1) * 10000,
  }));
}
