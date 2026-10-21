export type ShowcaseCategoryId =
  'celular' | 'acessorios' | 'tablets' | 'notebooks' | 'tvs' | 'ver-todos';

export interface ShowcaseCategory {
  id: ShowcaseCategoryId;
  label: string;
  /** O catálogo não tem categoria: todos os itens são celulares (clarificação 2026-10-21). */
  showsCatalog: boolean;
}

export const SHOWCASE_CATEGORIES: readonly ShowcaseCategory[] = [
  { id: 'celular', label: 'Celular', showsCatalog: true },
  { id: 'acessorios', label: 'Acessórios', showsCatalog: false },
  { id: 'tablets', label: 'Tablets', showsCatalog: false },
  { id: 'notebooks', label: 'Notebooks', showsCatalog: false },
  { id: 'tvs', label: 'TVs', showsCatalog: false },
  { id: 'ver-todos', label: 'Ver todos', showsCatalog: true },
];

export const DEFAULT_CATEGORY: ShowcaseCategoryId = 'celular';

export const tabId = (prefix: string, id: ShowcaseCategoryId) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string) => `${prefix}-panel`;
