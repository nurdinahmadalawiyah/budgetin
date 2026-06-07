import { SupportedLocale } from '@/core/i18n/config';

function getDefaultCurrency(locale: SupportedLocale) {
  return locale === 'id' ? 'IDR' : 'USD';
}

export function formatCurrency(
  value: number,
  locale: SupportedLocale,
  currency = getDefaultCurrency(locale),
) {
  return new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
    style: 'currency',
  }).format(value);
}

export function formatDate(
  value: Date | number | string,
  locale: SupportedLocale,
  options?: Intl.DateTimeFormatOptions,
) {
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatNumber(
  value: number,
  locale: SupportedLocale,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatPercent(
  value: number,
  locale: SupportedLocale,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
    style: 'percent',
    ...options,
  }).format(value);
}
