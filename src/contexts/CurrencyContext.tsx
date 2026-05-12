import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { getInitialCurrency, persistCurrency, type AppCurrency } from '@/lib/appCurrency';

type CurrencyContextValue = {
  currency: AppCurrency;
  setCurrency: (code: AppCurrency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<AppCurrency>(getInitialCurrency);

  const setCurrency = useCallback((code: AppCurrency) => {
    setCurrencyState(code);
    persistCurrency(code);
  }, []);

  const value = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return ctx;
}
