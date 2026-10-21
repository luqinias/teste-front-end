import creditCardIcon from '../../../assets/icons/credit-card.svg';
import shieldIcon from '../../../assets/icons/shield-check.svg';
import truckIcon from '../../../assets/icons/truck.svg';
import styles from './TopBar.module.scss';

const BENEFITS = [
  {
    icon: shieldIcon,
    content: (
      <>
        Compra <strong>100% segura</strong>
      </>
    ),
  },
  {
    icon: truckIcon,
    content: (
      <>
        <strong>Frete grátis</strong> acima de R$ 200
      </>
    ),
  },
  {
    icon: creditCardIcon,
    content: (
      <>
        <strong>Parcele</strong> suas compras
      </>
    ),
  },
];

export function TopBar() {
  return (
    <div className={styles.topBar}>
      <ul className={styles.list} aria-label="Benefícios">
        {BENEFITS.map(({ icon, content }, index) => (
          <li key={index} className={styles.item}>
            <img src={icon} alt="" width={20} height={20} />
            <span>{content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
