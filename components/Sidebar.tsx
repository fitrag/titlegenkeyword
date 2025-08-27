import React from 'react';
import { LayoutGrid, History, Settings, X, Tag } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { View } from '../pages/GeneratorPage';

interface SidebarProps {
    activeView: View;
    setActiveView: (view: View) => void;
    isOpen: boolean;
    onClose: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
            isActive
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
        }`}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, onClose }) => {
    const { t } = useI18n();

    const handleNavClick = (view: View) => {
        setActiveView(view);
        // Close sidebar on navigation on smaller screens
        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    return (
        <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between p-4 border-b lg:hidden">
                 <a href="#/" className="flex items-center space-x-2">
                    <Tag className="h-6 w-6 text-black" />
                    <span className="text-lg font-semibold text-black">Keyword AI</span>
                </a>
                 <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:text-black" aria-label={t('sidebar.closeMenu')}>
                     <X size={24} />
                 </button>
             </div>
            <nav className="p-4 space-y-2">
                <NavItem
                    icon={<LayoutGrid size={20} />}
                    label={t('sidebar.generator')}
                    isActive={activeView === 'generator'}
                    onClick={() => handleNavClick('generator')}
                />
                <NavItem
                    icon={<History size={20} />}
                    label={t('sidebar.history')}
                    isActive={activeView === 'history'}
                    onClick={() => handleNavClick('history')}
                />
                <NavItem
                    icon={<Settings size={20} />}
                    label={t('sidebar.settings')}
                    isActive={activeView === 'settings'}
                    onClick={() => handleNavClick('settings')}
                />
            </nav>
        </aside>
    );
};