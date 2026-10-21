import { useState } from 'react';
import type { Product, ProductsState } from '../../types/product';
import { SectionTitle } from '../ui/SectionTitle/SectionTitle';
import { CategoryTabs } from './CategoryTabs';
import {
  DEFAULT_CATEGORY,
  panelId,
  SHOWCASE_CATEGORIES,
  tabId,
  type ShowcaseCategoryId,
} from './categories';
import { ProductCarousel } from './ProductCarousel';
import styles from './ProductShowcase.module.scss';

export interface ProductShowcaseProps {
  id: string;
  title: string;
  /** `tabs`: abas de categoria (vitrine 1); `see-all`: link "Ver todos" (vitrines 2 e 3). */
  variant: 'tabs' | 'see-all';
  state: ProductsState;
  onRetry: () => void;
  onSelectProduct: (product: Product, trigger: HTMLElement) => void;
}

const LOADING_PLACEHOLDERS = 4;

export function ProductShowcase({
  id,
  title,
  variant,
  state,
  onRetry,
  onSelectProduct,
}: ProductShowcaseProps) {
  const [category, setCategory] = useState<ShowcaseCategoryId>(DEFAULT_CATEGORY);
  const headingId = `${id}-title`;
  const activeCategory = SHOWCASE_CATEGORIES.find((item) => item.id === category);
  const showsCatalog = variant === 'see-all' || activeCategory?.showsCatalog === true;

  const renderContent = () => {
    if (state.status === 'loading') {
      return (
        <div className={styles.placeholders} aria-busy="true">
          <span className="sr-only">Carregando produtos…</span>
          {Array.from({ length: LOADING_PLACEHOLDERS }, (_, index) => (
            <div key={index} className={styles.placeholder} aria-hidden="true" />
          ))}
        </div>
      );
    }

    if (state.status === 'error') {
      return (
        <div className={styles.message} role="alert">
          <p>{state.message}</p>
          <button type="button" className={styles.retry} onClick={onRetry}>
            Tentar novamente
          </button>
        </div>
      );
    }

    const products = showsCatalog ? state.products : [];
    if (products.length === 0) {
      return (
        <p className={styles.message} role="status">
          Nenhum produto nesta categoria.
        </p>
      );
    }

    return (
      <ProductCarousel
        // Reinicia a paginação ao trocar de aba.
        key={category}
        products={products}
        label={title}
        onSelectProduct={onSelectProduct}
      />
    );
  };

  return (
    <section id={id} className={styles.showcase} aria-labelledby={headingId}>
      <div className={styles.container}>
        <SectionTitle id={headingId} withLines>
          {title}
        </SectionTitle>

        {variant === 'tabs' ? (
          <>
            <CategoryTabs idPrefix={id} active={category} onChange={setCategory} />
            <div
              id={panelId(id)}
              role="tabpanel"
              aria-labelledby={tabId(id, category)}
              className={styles.panel}
            >
              {renderContent()}
            </div>
          </>
        ) : (
          <>
            <a href="/produtos" className={styles.seeAll}>
              Ver todos
            </a>
            <div className={`${styles.panel} ${styles.panelSeeAll}`}>{renderContent()}</div>
          </>
        )}
      </div>
    </section>
  );
}
