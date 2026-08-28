import React, { createContext, useState, useContext, ReactNode } from 'react';
import { en, hi } from '../locales';

type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextType>({ 
  lang: 'en', 
  toggleLang: () => {}, 
  t: (path) => path 
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = lang === 'en' ? en : hi;
    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key];
      } else {
        return path;
      }
    }
    return result || path;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
