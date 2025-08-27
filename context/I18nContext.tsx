import React, { createContext, useState, useEffect, useCallback } from 'react';

interface I18nContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string, options?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<string>(localStorage.getItem('language') || 'en');
    const [translations, setTranslations] = useState<Record<string, any>>({});

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const response = await fetch(`/i18n/${language}.json`);
                if (!response.ok) {
                    throw new Error(`Could not load ${language}.json`);
                }
                const data = await response.json();
                setTranslations(data);
            } catch (error) {
                console.error('Failed to load translations:', error);
                // Fallback to English if loading fails
                const response = await fetch(`/i18n/en.json`);
                const data = await response.json();
                setTranslations(data);
            }
        };

        fetchTranslations();
    }, [language]);

    const setLanguage = (lang: string) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = useCallback((key: string, options?: Record<string, string | number>): string => {
        const keys = key.split('.');
        let result = translations;
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) {
                return key; // Return the key itself if not found
            }
        }

        if (typeof result === 'string' && options) {
            // FIX: Explicitly type accumulator 'acc' as string to fix type inference issue.
            return Object.entries(options).reduce((acc: string, [optKey, optValue]) => {
                return acc.replace(`{${optKey}}`, String(optValue));
            }, result);
        }

        return typeof result === 'string' ? result : key;
    }, [translations]);

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
};
