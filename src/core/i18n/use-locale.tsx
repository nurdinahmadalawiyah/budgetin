import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AppState } from 'react-native';

import { i18n, getDeviceLocale, setI18nLocale, type SupportedLocale } from '@/core/i18n/config';
import {
  formatCurrency as formatCurrencyValue,
  formatDate as formatDateValue,
  formatNumber as formatNumberValue,
  formatPercent as formatPercentValue,
} from '@/core/i18n/formatters';

type TranslationOptions = Record<string, string | number | boolean | null | undefined>;

type I18nContextValue = {
  formatCurrency: (value: number, currency?: string) => string;
  formatDate: (value: Date | number | string, options?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatPercent: (value: number, options?: Intl.NumberFormatOptions) => string;
  locale: SupportedLocale;
  setLocale: (locale?: SupportedLocale) => void;
  t: (scope: string, options?: TranslationOptions) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function translate(scope: string, options?: TranslationOptions) {
  const result = i18n.t(scope, options);

  return typeof result === 'string' ? result : String(result);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => getDeviceLocale());

  useEffect(() => {
    setI18nLocale(locale);
  }, [locale]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState !== 'active') {
        return;
      }

      const deviceLocale = getDeviceLocale();

      setLocaleState((current) => (current === deviceLocale ? current : deviceLocale));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const setLocale = useCallback((nextLocale?: SupportedLocale) => {
    setLocaleState(nextLocale ?? getDeviceLocale());
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      formatCurrency: (value, currency) => formatCurrencyValue(value, locale, currency),
      formatDate: (value, options) => formatDateValue(value, locale, options),
      formatNumber: (value, options) => formatNumberValue(value, locale, options),
      formatPercent: (value, options) => formatPercentValue(value, locale, options),
      locale,
      setLocale,
      t: translate,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useLocale must be used inside I18nProvider');
  }

  return context;
}

export function useTranslation() {
  return useLocale();
}
