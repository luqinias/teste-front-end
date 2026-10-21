import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { makeProducts } from '../../test/fixtures';
import type { ProductsState } from '../../types/product';
import { ProductShowcase, type ProductShowcaseProps } from './ProductShowcase';

function renderShowcase(overrides: Partial<ProductShowcaseProps> = {}) {
  const props: ProductShowcaseProps = {
    id: 'vitrine',
    title: 'Produtos relacionados',
    variant: 'tabs',
    state: { status: 'success', products: makeProducts(10) },
    onRetry: vi.fn(),
    onSelectProduct: vi.fn(),
    ...overrides,
  };
  render(<ProductShowcase {...props} />);
  return props;
}

// Cards fora da página atual ficam aria-hidden e são ignorados por getAllByRole.
const visibleCards = () => screen.getAllByRole('article');
const allCards = () => screen.queryAllByRole('article', { hidden: true });

describe('ProductShowcase', () => {
  it('exibe título e 4 cards visíveis com dados do catálogo', () => {
    renderShowcase();

    expect(
      screen.getByRole('heading', { level: 2, name: 'Produtos relacionados' }),
    ).toBeInTheDocument();
    expect(allCards()).toHaveLength(10);
    expect(visibleCards()).toHaveLength(4);

    const first = visibleCards()[0];
    if (!first) throw new Error('card não encontrado');
    const card = within(first);
    expect(card.getByRole('img', { name: 'Produto 1' })).toHaveAttribute(
      'src',
      'https://example.com/foto-1.png',
    );
    expect(card.getByText('Descrição do produto 1')).toBeInTheDocument();
    expect(card.getByText('R$ 100,00')).toBeInTheDocument();
    expect(card.getByText('ou 2x de R$ 50,00 sem juros')).toBeInTheDocument();
    expect(card.getByText('Frete grátis')).toBeInTheDocument();
    expect(card.getByRole('button', { name: 'Comprar Produto 1' })).toBeInTheDocument();
  });

  it('navega entre as páginas pelas setas, respeitando os limites', async () => {
    const user = userEvent.setup();
    renderShowcase();

    const prev = screen.getByRole('button', { name: 'Produtos anteriores' });
    const next = screen.getByRole('button', { name: 'Próximos produtos' });
    expect(prev).toBeDisabled();

    await user.click(next);
    expect(within(visibleCards()[0]!).getByText('Descrição do produto 5')).toBeInTheDocument();

    await user.click(next);
    expect(visibleCards()).toHaveLength(2);
    expect(next).toBeDisabled();

    await user.click(prev);
    expect(within(visibleCards()[0]!).getByText('Descrição do produto 5')).toBeInTheDocument();
  });

  it('abas sem produtos exibem estado vazio e "Ver todos" volta ao catálogo', async () => {
    const user = userEvent.setup();
    renderShowcase();

    const celular = screen.getByRole('tab', { name: 'Celular' });
    expect(celular).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('tab', { name: 'Tablets' }));
    expect(screen.getByRole('tab', { name: 'Tablets' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Nenhum produto nesta categoria.')).toBeInTheDocument();
    expect(allCards()).toHaveLength(0);

    await user.click(screen.getByRole('tab', { name: 'Ver todos' }));
    expect(allCards()).toHaveLength(10);
  });

  it('permite trocar de aba pelo teclado', async () => {
    const user = userEvent.setup();
    renderShowcase();

    screen.getByRole('tab', { name: 'Celular' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Acessórios' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Acessórios' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Ver todos' })).toHaveFocus();
  });

  it('variante "Ver todos" não exibe abas', () => {
    renderShowcase({ variant: 'see-all' });
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todos' })).toBeInTheDocument();
  });

  it('dispara onSelectProduct ao clicar no card ou em COMPRAR', async () => {
    const user = userEvent.setup();
    const { onSelectProduct } = renderShowcase();

    await user.click(screen.getByRole('button', { name: 'Descrição do produto 2' }));
    expect(onSelectProduct).toHaveBeenLastCalledWith(
      expect.objectContaining({ id: 'p-2' }),
      expect.any(HTMLElement),
    );

    await user.click(screen.getByRole('button', { name: 'Comprar Produto 3' }));
    expect(onSelectProduct).toHaveBeenLastCalledWith(
      expect.objectContaining({ id: 'p-3' }),
      expect.any(HTMLElement),
    );
  });

  it('exibe carregamento e erro com opção de tentar novamente', async () => {
    const user = userEvent.setup();
    const loading: ProductsState = { status: 'loading' };
    const { rerender } = render(
      <ProductShowcase
        id="v"
        title="Produtos relacionados"
        variant="see-all"
        state={loading}
        onRetry={vi.fn()}
        onSelectProduct={vi.fn()}
      />,
    );
    expect(screen.getByText('Carregando produtos…')).toBeInTheDocument();

    const onRetry = vi.fn();
    rerender(
      <ProductShowcase
        id="v"
        title="Produtos relacionados"
        variant="see-all"
        state={{ status: 'error', message: 'Falhou' }}
        onRetry={onRetry}
        onSelectProduct={vi.fn()}
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Falhou');
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
