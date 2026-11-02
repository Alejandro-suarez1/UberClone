// AI-assisted: see docs/AI_LOG.md #A-15
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, translate } from '../i18n';

const LANGUAGE_KEY = 'pref.language';
const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY)
      .then((saved) => {
        if (saved && SUPPORTED_LANGUAGES.includes(saved)) setLangState(saved);
      })
      .catch(() => {});
  }, []);

  const setLang = useCallback((next) => {
    if (!SUPPORTED_LANGUAGES.includes(next)) return;
    setLangState(next);
    AsyncStorage.setItem(LANGUAGE_KEY, next).catch(() => {});
  }, []);

  const t = useCallback((key, params) => translate(lang, key, params), [lang]);

  const value = useMemo(() => ({ t, lang, setLang }), [t, lang, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>');
  return ctx;
}
