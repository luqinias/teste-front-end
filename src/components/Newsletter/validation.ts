export interface FormValues {
  name: string;
  email: string;
  acceptedTerms: boolean;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const INITIAL_VALUES: FormValues = { name: '', email: '', acceptedTerms: false };
export const FIELD_IDS: Record<keyof FormValues, string> = {
  name: 'newsletter-name',
  email: 'newsletter-email',
  acceptedTerms: 'newsletter-terms',
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateNewsletter(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Informe seu nome.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Informe um e-mail válido.';
  if (!values.acceptedTerms) errors.acceptedTerms = 'É preciso aceitar os termos.';
  return errors;
}
