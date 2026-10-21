import { useCallback, useEffect, useState } from 'react';

/** Itens visíveis por largura de tela (max-width → itens). Ordem: do menor para o maior. */
export const CAROUSEL_BREAKPOINTS: ReadonlyArray<readonly [maxWidth: number, perPage: number]> = [
  [599, 1],
  [959, 2],
  [1279, 3],
];
export const CAROUSEL_DEFAULT_PER_PAGE = 4;

function getPerPage(): number {
  if (typeof window === 'undefined' || !window.matchMedia) return CAROUSEL_DEFAULT_PER_PAGE;
  for (const [maxWidth, perPage] of CAROUSEL_BREAKPOINTS) {
    if (window.matchMedia(`(max-width: ${maxWidth}px)`).matches) return perPage;
  }
  return CAROUSEL_DEFAULT_PER_PAGE;
}

/** Acompanha quantos itens cabem por página conforme os breakpoints. */
export function usePerPage(): number {
  const [perPage, setPerPage] = useState(getPerPage);

  useEffect(() => {
    const queries = CAROUSEL_BREAKPOINTS.map(([maxWidth]) =>
      window.matchMedia(`(max-width: ${maxWidth}px)`),
    );
    const update = () => setPerPage(getPerPage());
    queries.forEach((query) => query.addEventListener('change', update));
    return () => queries.forEach((query) => query.removeEventListener('change', update));
  }, []);

  return perPage;
}

export interface CarouselState {
  page: number;
  pageCount: number;
  perPage: number;
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
  reset: () => void;
}

/** Paginação da vitrine: avança uma página inteira por vez, sem passar dos limites. */
export function useCarousel(total: number, perPage: number): CarouselState {
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const [rawPage, setPage] = useState(0);
  // Reajusta a página caso a quantidade de itens ou de páginas diminua.
  const page = Math.min(rawPage, pageCount - 1);

  const prev = useCallback(() => setPage((current) => Math.max(0, current - 1)), []);
  const next = useCallback(
    () => setPage((current) => Math.min(pageCount - 1, current + 1)),
    [pageCount],
  );
  const reset = useCallback(() => setPage(0), []);

  return {
    page,
    pageCount,
    perPage,
    canPrev: page > 0,
    canNext: page < pageCount - 1,
    prev,
    next,
    reset,
  };
}
