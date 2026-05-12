export const CURRENCY_STORAGE_KEY = 'finantree_currency';

export const SUPPORTED_CURRENCIES = ['BRL', 'USD', 'EUR'] as const;
export type AppCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export function isAppCurrency(value: string | null | undefined): value is AppCurrency {
  return value === 'BRL' || value === 'USD' || value === 'EUR';
}

export function getInitialCurrency(): AppCurrency {
  try {
    const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (isAppCurrency(stored)) return stored;
  } catch {
    /* ignore */
  }
  return 'BRL';
}

export function persistCurrency(code: AppCurrency) {
  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
}
