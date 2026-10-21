import facebookIcon from '../../../assets/icons/facebook.svg';
import instagramIcon from '../../../assets/icons/instagram.svg';
import linkedinIcon from '../../../assets/icons/linkedin.svg';
import logo from '../../../assets/icons/logo-footer.svg';
import { slugify } from '../../../utils/format';
import styles from './Footer.module.scss';

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: instagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: facebookIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: linkedinIcon },
];

const COLUMNS = [
  { title: 'Institucional', links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'] },
  { title: 'Ajuda', links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'] },
  {
    title: 'Termos',
    links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'],
    variant: 'terms',
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.about}>
          <a href="/" className={styles.logo} aria-label="Econverse — página inicial">
            <img src={logo} alt="Econverse" width={164} height={48} loading="lazy" />
          </a>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <ul className={styles.social} aria-label="Redes sociais">
            {SOCIAL.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={`${label} (abre em nova aba)`}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={icon} alt="" width={24} height={24} loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <nav className={styles.columns} aria-label="Links institucionais">
          {COLUMNS.map(({ title, links, variant }) => (
            <div key={title} className={styles.column}>
              <h2 className={styles.columnTitle}>{title}</h2>
              <ul className={`${styles.links} ${variant === 'terms' ? styles.linksTerms : ''}`}>
                {links.map((link) => (
                  <li key={link}>
                    <a href={`/${slugify(link)}`} className={styles.link}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </footer>
  );
}
