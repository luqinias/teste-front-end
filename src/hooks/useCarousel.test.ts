import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useCarousel, usePerPage } from './useCarousel';

describe('useCarousel', () => {
  it('pagina de 4 em 4 e respeita os limites', () => {
    const { result } = renderHook(() => useCarousel(10, 4));
    expect(result.current).toMatchObject({ page: 0, pageCount: 3, canPrev: false, canNext: true });

    act(() => result.current.prev());
    expect(result.current.page).toBe(0);

    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current).toMatchObject({ page: 2, canPrev: true, canNext: false });

    act(() => result.current.next());
    expect(result.current.page).toBe(2);

    act(() => result.current.reset());
    expect(result.current.page).toBe(0);
  });

  it('desabilita a navegação quando os itens cabem em uma página', () => {
    const { result } = renderHook(() => useCarousel(3, 4));
    expect(result.current).toMatchObject({ pageCount: 1, canPrev: false, canNext: false });
  });

  it('trata lista vazia como uma única página', () => {
    const { result } = renderHook(() => useCarousel(0, 4));
    expect(result.current).toMatchObject({ page: 0, pageCount: 1, canNext: false });
  });

  it('reajusta a página quando o número de páginas diminui', () => {
    const { result, rerender } = renderHook(({ perPage }) => useCarousel(10, perPage), {
      initialProps: { perPage: 1 },
    });
    act(() => {
      for (let i = 0; i < 9; i += 1) result.current.next();
    });
    expect(result.current.page).toBe(9);

    rerender({ perPage: 4 });
    expect(result.current).toMatchObject({ page: 2, canNext: false });
  });
});

describe('usePerPage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function stubWidth(width: number) {
    vi.stubGlobal('matchMedia', (query: string) => {
      const max = Number(/max-width:\s*(\d+)px/.exec(query)?.[1]);
      return {
        matches: width <= max,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });
  }

  it.each([
    [1440, 4],
    [1280, 4],
    [1024, 3],
    [768, 2],
    [375, 1],
  ])('em %ipx exibe %i itens', (width, expected) => {
    stubWidth(width);
    const { result } = renderHook(() => usePerPage());
    expect(result.current).toBe(expected);
  });
});
