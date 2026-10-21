import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Product } from '../../types/product';
import { formatCurrency, slugify } from '../../utils/format';
import { Button } from '../ui/Button/Button';
import styles from './ProductModal.module.scss';
import { QuantitySelector } from './QuantitySelector';

export interface ProductModalProps {
  /** Produto exibido; `null` mantém o modal fechado. */
  product: Product | null;
  onClose: () => void;
}

const TITLE_ID = 'product-modal-title';
const DESCRIPTION_ID = 'product-modal-description';

export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);
  // Mantém o último produto durante o fechamento para não piscar conteúdo vazio.
  const [displayed, setDisplayed] = useState<Product | null>(product);

  if (product && product !== displayed) {
    setDisplayed(product);
    setQuantity(1);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product && !dialog.open) {
      dialog.showModal();
      document.body.classList.add('is-scroll-locked');
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  useEffect(() => () => document.body.classList.remove('is-scroll-locked'), []);

  const handleClose = () => {
    document.body.classList.remove('is-scroll-locked');
    onClose();
  };

  // Clique fora da caixa (no ::backdrop) tem o próprio <dialog> como alvo.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) handleClose();
  };

  return (
    // Clique no backdrop fecha o modal; pelo teclado, o Esc nativo do <dialog> faz o mesmo.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={TITLE_ID}
      aria-describedby={DESCRIPTION_ID}
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      {displayed && (
        <div className={styles.content}>
          <button
            type="button"
            className={styles.close}
            onClick={handleClose}
            aria-label="Fechar detalhes do produto"
          >
            <span aria-hidden="true" />
          </button>

          <img
            className={styles.photo}
            src={displayed.photo}
            alt={displayed.productName}
            width={247}
            height={192}
          />

          <div className={styles.info}>
            <h2 id={TITLE_ID} className={styles.name}>
              {displayed.productName}
            </h2>
            <p className={styles.price}>{formatCurrency(displayed.price)}</p>

            <p id={DESCRIPTION_ID} className={styles.description}>
              {displayed.descriptionShort}
            </p>
            <a href={`/produto/${slugify(displayed.productName)}`} className={styles.details}>
              Veja mais detalhes do produto &gt;
            </a>

            <div className={styles.actions}>
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <Button variant="accent" className={styles.buy}>
                Comprar
              </Button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
