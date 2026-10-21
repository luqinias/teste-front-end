/** Item como vem do catálogo oficial (contrato: specs/.../contracts/produtos.schema.json). */
export interface RawProduct {
  productName: string;
  descriptionShort: string;
  photo: string;
  /** Preço em centavos: 149990 = R$ 1.499,90. */
  price: number;
}

export interface ProductsResponse {
  success?: boolean;
  products: unknown[];
}

/** Produto validado, pronto para a interface. */
export interface Product extends RawProduct {
  id: string;
  /** Preço anterior em centavos; ausente no catálogo atual. */
  previousPrice?: number;
}

export type ProductsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: Product[] };
