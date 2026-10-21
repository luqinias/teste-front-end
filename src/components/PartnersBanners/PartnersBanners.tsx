import partners from '../../assets/images/parceiros.webp';
import partners2x from '../../assets/images/parceiros@2x.webp';
import { Button } from '../ui/Button/Button';
import styles from './PartnersBanners.module.scss';

interface PartnersBannersProps {
  id: string;
}

const BANNERS = [
  { title: 'Parceiros', text: 'Lorem ipsum dolor sit amet, consectetur' },
  { title: 'Parceiros', text: 'Lorem ipsum dolor sit amet, consectetur' },
];

export function PartnersBanners({ id }: PartnersBannersProps) {
  return (
    <section className={styles.partners} aria-label="Parceiros">
      <ul className={styles.list}>
        {BANNERS.map(({ title, text }, index) => {
          const titleId = `${id}-${index}-title`;
          return (
            <li key={titleId}>
              <article className={styles.banner} aria-labelledby={titleId}>
                <img
                  className={styles.image}
                  src={partners}
                  srcSet={`${partners} 634w, ${partners2x} 1268w`}
                  sizes="(max-width: 959px) 100vw, 634px"
                  alt=""
                  width={634}
                  height={350}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.content}>
                  <h2 id={titleId} className={styles.title}>
                    {title}
                  </h2>
                  <p className={styles.text}>{text}</p>
                  <Button href="/parceiros" variant="accent" className={styles.cta}>
                    Confira
                  </Button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
