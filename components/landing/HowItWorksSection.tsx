import React from 'react';
import { Pencil, WandSparkles, ClipboardList } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';


const Step: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-4">
        <div className="flex items-center justify-center h-16 w-16 mb-4 bg-gray-100 rounded-full">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


export const HowItWorksSection: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="text-center animate-fade-in">
             <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
                {t('landing.howItWorksTitle')}
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                <Step 
                    icon={<Pencil className="w-8 h-8 text-black"/>}
                    title={t('landing.step1Title')}
                    description={t('landing.step1Description')}
                />
                <Step 
                    icon={<WandSparkles className="w-8 h-8 text-black"/>}
                    title={t('landing.step2Title')}
                    description={t('landing.step2Description')}
                />
                 <Step 
                    icon={<ClipboardList className="w-8 h-8 text-black"/>}
                    title={t('landing.step3Title')}
                    description={t('landing.step3Description')}
                />
            </div>
        </div>
    );
}
