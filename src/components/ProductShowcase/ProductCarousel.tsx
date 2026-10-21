import type { CSSProperties } from 'react';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { useCarousel, usePerPage } from '../../hooks/useCarousel';
import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductShowcase.module.scss';

interface ProductCarouselProps {
  products: Product[];
  label: string;
  onSelectProduct: (product: Product, trigger: HTMLElement) => void;
}

export function ProductCarousel({ products, label, onSelectProduct }: ProductCarouselProps) {
  const perPage = usePerPage();
  const { page, pageCount, canPrev, canNext, prev, next } = useCarousel(products.length, perPage);

  const trackStyle = {
    '--per-page': perPage,
    '--page': page,
  } as CSSProperties;

  return (
    <div
      className={styles.carousel}
      role="group"
      aria-roledescription="carrossel"
      aria-label={label}
    >
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={prev}
        disabled={!canPrev}
        aria-label="Produtos anteriores"
      >
        <img src={arrowLeft} alt="" width={8} height={13} />
      </button>

      <div className={styles.viewport}>
        <ul className={styles.track} style={trackStyle}>
          {products.map((product, index) => {
            const visible = Math.floor(index / perPage) === page;
            return (
              <li key={product.id} className={styles.slide} aria-hidden={!visible} inert={!visible}>
                <ProductCard product={product} onSelect={onSelectProduct} />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={next}
        disabled={!canNext}
        aria-label="Próximos produtos"
      >
        <img src={arrowRight} alt="" width={8} height={13} />
      </button>

      <p className="sr-only" aria-live="polite">
        {`Página ${page + 1} de ${pageCount}`}
      </p>
    </div>
  );
}
