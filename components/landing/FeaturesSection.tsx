import React from 'react';
import { Cpu, Layers, Target } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white border border-gray-200 p-6 rounded-lg text-center shadow-sm">
         <div className="flex justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export const FeaturesSection: React.FC = () => {
    const { t } = useI18n();
    return (
         <div className="text-center animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                {t('landing.featuresTitle')}
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Feature 
                    icon={<Cpu className="w-10 h-10 text-black" />}
                    title={t('landing.feature1Title')}
                    description={t('landing.feature1Description')}
                />
                <Feature 
                    icon={<Layers className="w-10 h-10 text-black" />}
                    title={t('landing.feature2Title')}
                    description={t('landing.feature2Description')}
                />
                 <Feature 
                    icon={<Target className="w-10 h-10 text-black" />}
                    title={t('landing.feature3Title')}
                    description={t('landing.feature3Description')}
                />
            </div>
        </div>
    );
};
