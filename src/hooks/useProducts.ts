import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import type { ProductsState } from '../types/product';

export interface UseProductsResult {
  state: ProductsState;
  retry: () => void;
}

/** Carrega o catálogo uma vez e expõe estados de carregamento, erro e sucesso. */
export function useProducts(): UseProductsResult {
  const [state, setState] = useState<ProductsState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal)
      .then((products) => setState({ status: 'success', products }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[catálogo]', error);
        setState({
          status: 'error',
          message: 'Não foi possível carregar os produtos no momento.',
        });
      });

    return () => controller.abort();
    // `attempt` não é lido no efeito: incrementá-lo é o gatilho para buscar de novo.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((value) => value + 1);
  }, []);

  return { state, retry };
}
