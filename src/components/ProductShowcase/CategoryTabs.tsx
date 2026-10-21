import { useRef, type KeyboardEvent } from 'react';
import { panelId, SHOWCASE_CATEGORIES, tabId, type ShowcaseCategoryId } from './categories';
import styles from './ProductShowcase.module.scss';

interface CategoryTabsProps {
  idPrefix: string;
  active: ShowcaseCategoryId;
  onChange: (id: ShowcaseCategoryId) => void;
}

/** Abas da vitrine (padrão WAI-ARIA Tabs, com setas/Home/End para navegar). */
export function CategoryTabs({ idPrefix, active, onChange }: CategoryTabsProps) {
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const total = SHOWCASE_CATEGORIES.length;
    const nextIndex = (index + total) % total;
    const category = SHOWCASE_CATEGORIES[nextIndex];
    if (!category) return;
    onChange(category.id);
    tabsRef.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const actions: Record<string, () => void> = {
      ArrowRight: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(SHOWCASE_CATEGORIES.length - 1),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className={styles.tabs} role="tablist" aria-label="Categorias de produtos">
      {SHOWCASE_CATEGORIES.map((category, index) => {
        const selected = category.id === active;
        return (
          <button
            key={category.id}
            ref={(element) => {
              tabsRef.current[index] = element;
            }}
            id={tabId(idPrefix, category.id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(idPrefix)}
            tabIndex={selected ? 0 : -1}
            className={`${styles.tab} ${selected ? styles.tabActive : ''}`}
            onClick={() => onChange(category.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
