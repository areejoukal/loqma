// src/context/AppSettingsContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'loqma:settings';

const AppSettingsContext = createContext(null);

function readStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && (parsed.lang === 'ar' || parsed.lang === 'en') &&
        (parsed.mode === 'light' || parsed.mode === 'dark')) {
      return parsed;
    }
  } catch {
    /* تجاهل */
  }
  return null;
}

export function AppSettingsProvider({ children }) {
  const [lang, setLang] = useState(() => readStoredSettings()?.lang || 'ar');
  const [mode, setMode] = useState(() => readStoredSettings()?.mode || 'light');

  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, mode }));
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
  }, [lang, mode, direction]);

  const t = useMemo(() => {
    const dict = translations[lang] || translations.ar;
    return (key, ...args) => {
      const value = dict[key];
      if (typeof value === 'function') return value(...args);
      return value ?? key;
    };
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      mode,
      direction,
      isRtl: direction === 'rtl',
      setLang,
      setMode,
      toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      toggleMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
      t,
    }),
    [lang, mode, direction, t]
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) throw new Error('useAppSettings must be used inside AppSettingsProvider');
  return ctx;
}