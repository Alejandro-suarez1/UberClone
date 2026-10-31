// AI-assisted: see docs/AI_LOG.md #A-14
import es from './es';
import en from './en';
import tripEs from './trip.es';
import tripEn from './trip.en';

const dictionaries = {
  es: { ...es, ...tripEs },
  en: { ...en, ...tripEn },
};

export const SUPPORTED_LANGUAGES = Object.keys(dictionaries);
export const DEFAULT_LANGUAGE = 'es';

function lookup(dictionary, key) {
  return key.split('.').reduce((node, part) => (node && typeof node === 'object' ? node[part] : undefined), dictionary);
}

export function translate(lang, key, params) {
  let text = lookup(dictionaries[lang] || dictionaries[DEFAULT_LANGUAGE], key);
  if (typeof text !== 'string') text = lookup(dictionaries[DEFAULT_LANGUAGE], key);
  if (typeof text !== 'string') return key;
  if (params) {
    Object.keys(params).forEach((name) => {
      text = text.split(`{${name}}`).join(String(params[name]));
    });
  }
  return text;
}
