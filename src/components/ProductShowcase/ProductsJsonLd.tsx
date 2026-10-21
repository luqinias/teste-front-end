import type { Product } from '../../types/product';

interface ProductsJsonLdProps {
  products: Product[];
}

/** Dados estruturados (schema.org ItemList) da vitrine para mecanismos de busca. */
export function ProductsJsonLd({ products }: ProductsJsonLdProps) {
  if (products.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Produtos relacionados',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.productName,
        description: product.descriptionShort,
        image: product.photo,
        offers: {
          '@type': 'Offer',
          price: (product.price / 100).toFixed(2),
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify não escapa "</script>"; substituímos "<" para evitar injeção.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
