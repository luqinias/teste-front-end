import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  id: string;
  children: string;
  /** Exibe as linhas decorativas laterais (vitrines). */
  withLines?: boolean;
}

export function SectionTitle({ id, children, withLines = false }: SectionTitleProps) {
  return (
    <div className={`${styles.wrapper} ${withLines ? styles.withLines : ''}`}>
      {withLines && <span className={styles.line} aria-hidden="true" />}
      <h2 id={id} className={styles.title}>
        {children}
      </h2>
      {withLines && <span className={styles.line} aria-hidden="true" />}
    </div>
  );
}
