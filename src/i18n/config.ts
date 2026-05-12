import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ptBR from './locales/pt-BR.json';
import es from './locales/es.json';
import {
  getInitialLanguage,
  isAppLanguage,
  persistLanguage,
  type AppLanguage,
} from '@/lib/i18nLocale';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    'pt-BR': { translation: ptBR },
    es: { translation: es },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  if (isAppLanguage(lng)) persistLanguage(lng);
});

export function setAppLanguage(lng: AppLanguage) {
  void i18n.changeLanguage(lng);
}

export default i18n;
