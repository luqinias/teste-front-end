import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './Newsletter.module.scss';
import {
  FIELD_IDS,
  INITIAL_VALUES,
  validateNewsletter,
  type FormErrors,
  type FormValues,
} from './validation';

export function Newsletter() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSuccess(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateNewsletter(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(FIELD_IDS) as Array<keyof FormValues>).find(
      (field) => nextErrors[field],
    );
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }
    // Sem serviço de inscrição definido no teste: confirmação apenas local.
    setValues(INITIAL_VALUES);
    setSuccess(true);
  };

  const errorId = (field: keyof FormValues) => `newsletter-${field}-error`;

  return (
    <section className={styles.newsletter} aria-labelledby="newsletter-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 id="newsletter-title" className={styles.title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.text}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor={FIELD_IDS.name} className="sr-only">
                Nome
              </label>
              <input
                id={FIELD_IDS.name}
                name="name"
                type="text"
                className={styles.input}
                placeholder="Digite seu nome"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? errorId('name') : undefined}
              />
              {errors.name && (
                <span id={errorId('name')} className={styles.error}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor={FIELD_IDS.email} className="sr-only">
                E-mail
              </label>
              <input
                id={FIELD_IDS.email}
                name="email"
                type="email"
                className={styles.input}
                placeholder="Digite seu e-mail"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? errorId('email') : undefined}
              />
              {errors.email && (
                <span id={errorId('email')} className={styles.error}>
                  {errors.email}
                </span>
              )}
            </div>

            <button type="submit" className={styles.submit}>
              Inscrever
            </button>
          </div>

          <div className={styles.terms}>
            <input
              id={FIELD_IDS.acceptedTerms}
              name="acceptedTerms"
              type="checkbox"
              className={styles.checkbox}
              checked={values.acceptedTerms}
              onChange={handleChange}
              aria-invalid={Boolean(errors.acceptedTerms)}
              aria-describedby={errors.acceptedTerms ? errorId('acceptedTerms') : undefined}
            />
            <label htmlFor={FIELD_IDS.acceptedTerms}>Aceito os termos e condições</label>
            {errors.acceptedTerms && (
              <span id={errorId('acceptedTerms')} className={styles.error}>
                {errors.acceptedTerms}
              </span>
            )}
          </div>

          <p className={styles.success} role="status">
            {success && 'Inscrição realizada com sucesso! Obrigado por assinar.'}
          </p>
        </form>
      </div>
    </section>
  );
}
