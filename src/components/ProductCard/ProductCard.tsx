import type { MouseEvent } from 'react';
import type { Product } from '../../types/product';
import { formatCurrency, installmentLabel } from '../../utils/format';
import { Button } from '../ui/Button/Button';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  product: Product;
  onSelect: (product: Product, trigger: HTMLElement) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { productName, descriptionShort, photo, price, previousPrice } = product;

  const handleSelect = (event: MouseEvent<HTMLElement>) => {
    onSelect(product, event.currentTarget);
  };

  return (
    <article className={styles.card}>
      <img
        className={styles.photo}
        src={photo}
        alt={productName}
        width={278}
        height={228}
        loading="lazy"
        decoding="async"
      />

      <h3 className={styles.title}>
        {/* O ::after deste botão cobre o card: clicar em qualquer ponto abre o modal. */}
        <button
          type="button"
          className={styles.titleButton}
          onClick={handleSelect}
          aria-haspopup="dialog"
        >
          {descriptionShort}
        </button>
      </h3>

      <div className={styles.prices}>
        {previousPrice !== undefined ? (
          <s className={styles.previousPrice}>
            <span className="sr-only">De </span>
            {formatCurrency(previousPrice)}
          </s>
        ) : (
          <span className={styles.previousPrice} aria-hidden="true" />
        )}
        <p className={styles.price}>
          {previousPrice !== undefined && <span className="sr-only">Por </span>}
          {formatCurrency(price)}
        </p>
        <p className={styles.installments}>{installmentLabel(price)}</p>
        <p className={styles.shipping}>Frete grátis</p>
      </div>

      <Button
        variant="primary"
        className={styles.buy}
        onClick={handleSelect}
        aria-haspopup="dialog"
        aria-label={`Comprar ${productName}`}
      >
        Comprar
      </Button>
    </article>
  );
}
