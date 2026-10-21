import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { makeProducts } from '../../test/fixtures';
import type { Product } from '../../types/product';
import { ProductShowcase } from '../ProductShowcase/ProductShowcase';
import { ProductModal } from './ProductModal';

const products = makeProducts(6);

/** Integração vitrine + modal, como em App. */
function Harness() {
  const [selected, setSelected] = useState<Product | null>(null);
  return (
    <>
      <ProductShowcase
        id="vitrine"
        title="Produtos relacionados"
        variant="see-all"
        state={{ status: 'success', products }}
        onRetry={vi.fn()}
        onSelectProduct={(product) => setSelected(product)}
      />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}

const getDialog = () => screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement;

describe('ProductModal', () => {
  it('abre com os dados do produto clicado', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(getDialog().open).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Descrição do produto 2' }));

    const dialog = getDialog();
    expect(dialog.open).toBe(true);
    const modal = within(dialog);
    expect(modal.getByRole('heading', { name: 'Produto 2' })).toBeInTheDocument();
    expect(modal.getByText('R$ 200,00')).toBeInTheDocument();
    expect(modal.getByText('Descrição do produto 2')).toBeInTheDocument();
    expect(modal.getByRole('img', { name: 'Produto 2' })).toHaveAttribute(
      'src',
      'https://example.com/foto-2.png',
    );
    expect(modal.getByRole('link', { name: /Veja mais detalhes do produto/ })).toBeInTheDocument();
    expect(modal.getByRole('button', { name: 'Comprar' })).toBeInTheDocument();
  });

  it('fecha pelo botão X e reinicia a quantidade ao abrir outro produto', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: 'Comprar Produto 1' }));
    const modal = within(getDialog());
    await user.click(modal.getByRole('button', { name: 'Aumentar quantidade' }));
    expect(modal.getByText('02')).toBeInTheDocument();

    await user.click(modal.getByRole('button', { name: 'Fechar detalhes do produto' }));
    expect(getDialog().open).toBe(false);

    await user.click(screen.getByRole('button', { name: 'Comprar Produto 3' }));
    expect(getDialog().open).toBe(true);
    expect(within(getDialog()).getByRole('heading', { name: 'Produto 3' })).toBeInTheDocument();
    expect(within(getDialog()).getByText('01')).toBeInTheDocument();
  });

  it('fecha ao clicar no fundo escurecido (backdrop)', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Comprar Produto 1' }));

    fireEvent.click(getDialog());
    expect(getDialog().open).toBe(false);
  });

  it('fecha com Esc (evento nativo close do <dialog>)', () => {
    const onClose = vi.fn();
    render(<ProductModal product={products[0] ?? null} onClose={onClose} />);
    expect(getDialog().open).toBe(true);

    // O navegador fecha o <dialog> com Esc e dispara "close"; simulamos esse comportamento.
    getDialog().close();
    expect(onClose).toHaveBeenCalled();
  });

  it('trava a rolagem da página enquanto aberto', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'Comprar Produto 1' }));
    expect(document.body).toHaveClass('is-scroll-locked');

    await user.click(
      within(getDialog()).getByRole('button', { name: 'Fechar detalhes do produto' }),
    );
    expect(document.body).not.toHaveClass('is-scroll-locked');
  });
});
