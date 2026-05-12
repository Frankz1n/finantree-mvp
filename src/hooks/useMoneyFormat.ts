import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatCurrency } from '@/lib/utils';
import { appLanguageToBcp47 } from '@/lib/i18nLocale';

/** Formata valores monetários com o idioma da UI e a moeda escolhida no perfil. */
export function useMoneyFormat() {
  const { i18n } = useTranslation();
  const { currency } = useCurrency();
  const locale = useMemo(() => appLanguageToBcp47(i18n.language), [i18n.language]);

  return useCallback(
    (amount: number) => formatCurrency(amount, locale, currency),
    [locale, currency],
  );
}
