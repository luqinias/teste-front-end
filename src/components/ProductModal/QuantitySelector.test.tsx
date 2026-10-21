import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { QuantitySelector } from './QuantitySelector';

function Controlled({ initial = 1, max = 99 }: { initial?: number; max?: number }) {
  const [value, setValue] = useState(initial);
  return <QuantitySelector value={value} max={max} onChange={setValue} />;
}

describe('QuantitySelector', () => {
  it('exibe a quantidade com dois dígitos e incrementa/decrementa', async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    expect(screen.getByText('01')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade' }));
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade' }));
    expect(screen.getByText('03')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade' }));
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('não passa dos limites mínimo e máximo', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Controlled />);
    expect(screen.getByRole('button', { name: 'Diminuir quantidade' })).toBeDisabled();
    unmount();

    render(<Controlled initial={98} max={99} />);
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade' }));
    expect(screen.getByText('99')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aumentar quantidade' })).toBeDisabled();
  });
});
