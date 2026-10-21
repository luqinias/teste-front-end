import hero from '../../assets/images/hero.webp';
import hero2x from '../../assets/images/hero@2x.webp';
import { Button } from '../ui/Button/Button';
import styles from './HeroBanner.module.scss';

export function HeroBanner() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img
        className={styles.background}
        src={hero}
        srcSet={`${hero} 1440w, ${hero2x} 2880w`}
        sizes="100vw"
        alt=""
        width={1440}
        height={390}
        fetchPriority="high"
      />
      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          Venha conhecer nossas promoções
        </h1>
        <p className={styles.subtitle}>
          <strong>50% Off</strong> nos produtos
        </p>
        <Button href="#produtos-relacionados" variant="accent" className={styles.cta}>
          Ver produto
        </Button>
      </div>
    </section>
  );
}
