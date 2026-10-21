import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Newsletter } from './Newsletter';
import { validateNewsletter } from './validation';

describe('validateNewsletter', () => {
  it('aceita dados válidos', () => {
    expect(
      validateNewsletter({ name: 'Ana', email: 'ana@exemplo.com', acceptedTerms: true }),
    ).toEqual({});
  });

  it('aponta nome, e-mail e termos inválidos', () => {
    expect(validateNewsletter({ name: ' ', email: 'ana@', acceptedTerms: false })).toEqual({
      name: expect.any(String),
      email: expect.any(String),
      acceptedTerms: expect.any(String),
    });
  });
});

describe('Newsletter', () => {
  it('exibe erros por campo ao enviar vazio', async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    await user.click(screen.getByRole('button', { name: 'Inscrever' }));

    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument();
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
    expect(screen.getByText('É preciso aceitar os termos.')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toHaveFocus();
  });

  it('confirma a inscrição e limpa o formulário com dados válidos', async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    await user.type(screen.getByLabelText('Nome'), 'Ana Souza');
    await user.type(screen.getByLabelText('E-mail'), 'ana@exemplo.com');
    await user.click(screen.getByLabelText('Aceito os termos e condições'));
    await user.click(screen.getByRole('button', { name: 'Inscrever' }));

    expect(screen.getByRole('status')).toHaveTextContent('Inscrição realizada com sucesso');
    expect(screen.getByLabelText('Nome')).toHaveValue('');
    expect(screen.getByLabelText('Aceito os termos e condições')).not.toBeChecked();
  });
});
