import minusIcon from '../../assets/icons/minus.svg';
import plusIcon from '../../assets/icons/plus.svg';
import { padQuantity } from '../../utils/format';
import styles from './ProductModal.module.scss';

export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ value, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  return (
    <div className={styles.quantity} role="group" aria-label="Quantidade">
      <button
        type="button"
        className={styles.quantityButton}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
      >
        <img src={minusIcon} alt="" width={20} height={20} />
      </button>
      <output className={styles.quantityValue} aria-live="polite">
        {padQuantity(value)}
      </output>
      <button
        type="button"
        className={styles.quantityButton}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
      >
        <img src={plusIcon} alt="" width={20} height={20} />
      </button>
    </div>
  );
}
