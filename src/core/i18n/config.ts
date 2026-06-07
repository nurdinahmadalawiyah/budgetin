import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '@/core/i18n/locales/en';
import id from '@/core/i18n/locales/id';

export const supportedLocales = ['id', 'en'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

const translations = {
  en,
  id,
} as const;

export const i18n = new I18n(translations);

i18n.enableFallback = true;
i18n.defaultLocale = 'id';

function resolveFromLocaleTag(languageTag?: string | null): SupportedLocale | null {
  if (!languageTag) {
    return null;
  }

  const normalizedTag = languageTag.toLowerCase();

  if (normalizedTag.startsWith('id')) {
    return 'id';
  }

  if (normalizedTag.startsWith('en')) {
    return 'en';
  }

  return null;
}

export function getDeviceLocale(): SupportedLocale {
  for (const locale of getLocales()) {
    const fromLanguageCode = resolveFromLocaleTag(locale.languageCode);

    if (fromLanguageCode) {
      return fromLanguageCode;
    }

    const fromLanguageTag = resolveFromLocaleTag(locale.languageTag);

    if (fromLanguageTag) {
      return fromLanguageTag;
    }
  }

  return 'id';
}

export function setI18nLocale(locale: SupportedLocale) {
  i18n.locale = locale;
}

setI18nLocale(getDeviceLocale());
