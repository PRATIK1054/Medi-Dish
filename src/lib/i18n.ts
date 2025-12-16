
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import mr from '@/locales/mr.json';

const translations = { 
  en, 
  hi, 
  mr,
  // The following languages are supported by the AI but don't have static translations yet.
  // The app will fall back to English for UI elements.
  ta: en,
  te: en,
  kn: en,
  pa: en,
  bn: en,
  gu: en,
  ml: en,
  or: en,
  as: en,
};

export type Locale = keyof typeof translations;

export type I18n = {
  t: (key: string, values?: Record<string, string | number>) => string;
  locale: Locale;
}

export const getI18n = async (locale: Locale): Promise<I18n> => {
  const t = (key: string, values?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let text = translations[locale] as any;
    for (const k of keys) {
      if (text && typeof text === 'object' && k in text) {
        text = text[k];
      } else {
        // Fallback to English if key not found
        let fallbackText = translations['en'] as any;
        for (const fk of keys) {
            if (fallbackText && typeof fallbackText === 'object' && fk in fallbackText) {
                fallbackText = fallbackText[fk];
            } else {
                return key;
            }
        }
        text = fallbackText;
        break;
      }
    }

    if (typeof text === 'string' && values) {
      return text.replace(/\{\{(\w+)\}\}/g, (_, g) => String(values[g] || g));
    }
    
    return typeof text === 'string' ? text : key;
  };
  return { t, locale };
};
