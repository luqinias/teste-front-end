import bebidas from '../../assets/images/categories/bebidas.png';
import esportes from '../../assets/images/categories/esportes.png';
import ferramentas from '../../assets/images/categories/ferramentas.png';
import moda from '../../assets/images/categories/moda.png';
import saude from '../../assets/images/categories/saude.png';
import supermercado from '../../assets/images/categories/supermercado.png';
import tecnologia from '../../assets/images/categories/tecnologia.png';
import { slugify } from '../../utils/format';
import styles from './CategoryShortcuts.module.scss';

const CATEGORIES = [
  { label: 'Tecnologia', icon: tecnologia, active: true },
  { label: 'Supermercado', icon: supermercado },
  { label: 'Bebidas', icon: bebidas },
  { label: 'Ferramentas', icon: ferramentas },
  { label: 'Saúde', icon: saude },
  { label: 'Esportes e Fitness', icon: esportes },
  { label: 'Moda', icon: moda },
];

export function CategoryShortcuts() {
  return (
    <nav className={styles.categories} aria-label="Compre por categoria">
      <ul className={styles.list}>
        {CATEGORIES.map(({ label, icon, active }) => (
          <li key={label}>
            <a
              href={`/categoria/${slugify(label)}`}
              className={`${styles.item} ${active ? styles.active : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className={styles.box}>
                <img src={icon} alt="" width={61} height={61} />
              </span>
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
