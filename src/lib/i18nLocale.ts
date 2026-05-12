import type { Locale } from 'date-fns';
import { enUS, es, ptBR } from 'date-fns/locale';

export const LANGUAGE_STORAGE_KEY = 'finantree_language';

export const SUPPORTED_LANGUAGES = ['en', 'pt-BR', 'es'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isAppLanguage(value: string | null | undefined): value is AppLanguage {
  return value === 'en' || value === 'pt-BR' || value === 'es';
}

export function getInitialLanguage(): AppLanguage {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isAppLanguage(stored)) return stored;
  } catch {
    /* ignore */
  }

  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en';
  if (nav.startsWith('pt')) return 'pt-BR';
  if (nav.startsWith('es')) return 'es';
  return 'en';
}

export function persistLanguage(lng: AppLanguage) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  } catch {
    /* ignore */
  }
}

/** BCP 47 locale for `Intl` and number formatting */
export function appLanguageToBcp47(lng: string): string {
  if (lng === 'pt-BR') return 'pt-BR';
  if (lng === 'es') return 'es';
  return 'en-US';
}

export function getDateFnsLocale(lng: string): Locale {
  if (lng === 'pt-BR') return ptBR;
  if (lng === 'es') return es;
  return enUS;
}
