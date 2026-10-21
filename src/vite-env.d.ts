/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL alternativa do catálogo de produtos (padrão: proxy `/api/produtos`). */
  readonly VITE_PRODUCTS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
