import crownIcon from '../../../assets/icons/crown.svg';
import { slugify } from '../../../utils/format';
import styles from './MainNav.module.scss';

const LINKS = [
  { label: 'Todas categorias' },
  { label: 'Supermercado' },
  { label: 'Livros' },
  { label: 'Moda' },
  { label: 'Lançamentos' },
  { label: 'Ofertas do dia', highlight: true },
];

export function MainNav() {
  return (
    <nav className={styles.nav} aria-label="Categorias da loja">
      <ul className={styles.list}>
        {LINKS.map(({ label, highlight }) => (
          <li key={label}>
            <a
              href={`/categoria/${slugify(label)}`}
              className={`${styles.link} ${highlight ? styles.highlight : ''}`}
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <a href="/assinatura" className={`${styles.link} ${styles.subscription}`}>
            <img src={crownIcon} alt="" width={20} height={20} />
            Assinatura
          </a>
        </li>
      </ul>
    </nav>
  );
}
