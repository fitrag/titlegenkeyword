import React from 'react';
import { useI18n } from '../hooks/useI18n';

export const Footer: React.FC = () => {
    const { t } = useI18n();
    return (
        <footer className="bg-transparent mt-16">
            <div className="container mx-auto px-4 py-6 text-center text-gray-500 border-t border-gray-200">
                <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
                <p className="mt-2 text-sm">{t('footer.createdBy')}</p>
            </div>
        </footer>
    );
};