import React, { useState, useEffect } from 'react';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { OnboardingTour } from '../components/OnboardingTour';
import { useI18n } from '../hooks/useI18n';

export const LandingPage: React.FC = () => {
    const [isTourOpen, setIsTourOpen] = useState(false);
    const { t } = useI18n();

    useEffect(() => {
        const tourViewed = sessionStorage.getItem('onboardingTourViewed');
        if (!tourViewed) {
            const timer = setTimeout(() => setIsTourOpen(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleCloseTour = () => {
        setIsTourOpen(false);
        sessionStorage.setItem('onboardingTourViewed', 'true');
    };

    return (
        <>
            <div className="max-w-4xl mx-auto space-y-20">
                {/* Hero Section */}
                <div id="hero-section" className="text-center animate-fade-in space-y-4">
                    <h1 className="text-4xl sm:text-6xl font-bold text-black tracking-tighter">
                        {t('landing.heroTitle')}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('landing.heroSubtitle')}
                    </p>
                    <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
                        <a id="get-started-tour-target" href="#/generator" className="inline-block bg-black text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-lg">
                            {t('landing.getStartedButton')}
                        </a>
                         <button onClick={() => setIsTourOpen(true)} className="font-semibold text-gray-600 hover:text-black transition-colors">
                            {t('landing.tourButton')}
                        </button>
                    </div>
                </div>

                {/* How It Works Section */}
                <div id="how-it-works-section">
                    <HowItWorksSection />
                </div>

                {/* Features Section */}
                <div id="features-section">
                    <FeaturesSection />
                </div>
            </div>
            {isTourOpen && <OnboardingTour onClose={handleCloseTour} />}
        </>
    );
};
