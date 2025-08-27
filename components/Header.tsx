import React from 'react';
import { Tag } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

export const Header: React.FC = () => {
    const { language, setLanguage, t } = useI18n();

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'id' : 'en';
        setLanguage(newLang);
    };

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                 <a href="#/" className="flex items-center space-x-3">
                    <Tag className="h-7 w-7 text-black" />
                    <span className="text-xl font-semibold text-black tracking-wide">Keyword AI</span>
                </a>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleLanguage}
                        className="font-semibold text-gray-600 hover:text-black transition-colors text-sm w-10 h-10 flex items-center justify-center border rounded-lg"
                        aria-label="Switch language"
                    >
                        {language.toUpperCase()}
                    </button>
                    <a href="#/generator" className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm">
                        {t('header.getStarted')}
                    </a>
                </div>
            </div>
        </header>
    );
};