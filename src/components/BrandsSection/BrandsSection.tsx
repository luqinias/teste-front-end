import logo from '../../assets/icons/logo.svg';
import { SectionTitle } from '../ui/SectionTitle/SectionTitle';
import styles from './BrandsSection.module.scss';

const BRANDS = Array.from({ length: 5 }, (_, index) => ({ id: index + 1, name: 'Econverse' }));

export function BrandsSection() {
  return (
    <section className={styles.brands} aria-labelledby="brands-title">
      <SectionTitle id="brands-title">Navegue por marcas</SectionTitle>
      <ul className={styles.list}>
        {BRANDS.map(({ id, name }) => (
          <li key={id}>
            <a
              href={`/marcas/${id}`}
              className={styles.brand}
              aria-label={`Ver produtos da marca ${name}`}
            >
              <img src={logo} alt="" width={117} height={35} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
