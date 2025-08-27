import React from 'react';
import { Tag, Menu } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface HeaderProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    showMenuButton: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen, showMenuButton }) => {
    const { language, setLanguage, t } = useI18n();

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'id' : 'en';
        setLanguage(newLang);
    };

    return (
        <header className={`bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 transition-all duration-300 ease-in-out ${isSidebarOpen && showMenuButton ? "lg:ml-64" : "lg:ml-0"}`}>
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {showMenuButton && (
                         <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                            className="p-2 -ml-2 text-gray-600 hover:text-black"
                            aria-label={t('sidebar.openMenu')}
                        >
                            <Menu size={24} />
                        </button>
                    )}
                     <a href="#/" className="flex items-center space-x-3">
                        <Tag className="h-7 w-7 text-black" />
                        <span className="text-xl font-semibold text-black tracking-wide">Keyword AI</span>
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button 
                            onClick={toggleLanguage}
                            className="font-semibold text-gray-600 hover:text-black transition-colors text-sm w-10 h-10 flex items-center justify-center border rounded-lg"
                            aria-label={t('header.switchLanguageTooltip')}
                        >
                            {language.toUpperCase()}
                        </button>
                        <div className="absolute top-full mt-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-x-1/2 left-1/2">
                            {t('header.switchLanguageTooltip')}
                        </div>
                    </div>
                     <div className="relative group">
                        <a href="#/generator" className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm">
                            {t('header.getStarted')}
                        </a>
                         <div className="absolute top-full mt-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-x-1/2 left-1/2">
                            {t('header.getStartedTooltip')}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};