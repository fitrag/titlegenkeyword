import React, { useState, useLayoutEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface TourStep {
    targetId: string;
    title: string;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

interface PopoverPosition {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    transform?: string;
}

export const OnboardingTour: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const { t } = useI18n();

    const tourSteps: TourStep[] = [
        {
            targetId: 'hero-section',
            title: t('tour.step1Title'),
            content: t('tour.step1Content'),
            position: 'bottom',
        },
        {
            targetId: 'how-it-works-section',
            title: t('tour.step2Title'),
            content: t('tour.step2Content'),
            position: 'bottom',
        },
        {
            targetId: 'features-section',
            title: t('tour.step3Title'),
            content: t('tour.step3Content'),
            position: 'top',
        },
        {
            targetId: 'get-started-tour-target',
            title: t('tour.step4Title'),
            content: t('tour.step4Content'),
            position: 'bottom',
        }
    ];

    const currentStep = tourSteps[stepIndex];

    const updatePosition = useCallback(() => {
        const element = document.getElementById(currentStep.targetId);
        if (element) {
            setTargetRect(element.getBoundingClientRect());
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentStep.targetId]);


    useLayoutEffect(() => {
        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [stepIndex, updatePosition]);

    const handleNext = () => {
        if (stepIndex < tourSteps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            // On the final step, navigate and then close the tour.
            onClose();
            window.location.hash = '#/generator';
        }
    };
    
    const handlePrev = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };
    
    const popoverPosition: PopoverPosition = {};
    if (targetRect) {
        const { top, left, width, height, bottom, right } = targetRect;
        const position = currentStep.position || 'bottom';

        switch (position) {
            case 'top':
                popoverPosition.bottom = window.innerHeight - top + 16;
                popoverPosition.left = left + width / 2;
                popoverPosition.transform = 'translateX(-50%)';
                break;
            case 'left':
                popoverPosition.top = top + height / 2;
                popoverPosition.right = window.innerWidth - left + 16;
                popoverPosition.transform = 'translateY(-50%)';
                break;
             case 'right':
                popoverPosition.top = top + height / 2;
                popoverPosition.left = right + 16;
                popoverPosition.transform = 'translateY(-50%)';
                break;
            default: // bottom
                popoverPosition.top = bottom + 16;
                popoverPosition.left = left + width / 2;
                popoverPosition.transform = 'translateX(-50%)';
        }
    }


    return (
        <div className="fixed inset-0 z-50 animate-fade-in" role="dialog" aria-modal="true">
            {/* Clickable overlay to close the tour */}
            <div className="fixed inset-0 bg-transparent" onClick={onClose}></div>

            {/* Highlighter with glowing border and shadow backdrop */}
            {targetRect && (
                <div
                    className="fixed rounded-lg transition-all duration-300 ease-in-out pointer-events-none border-2 animate-pulse-glow shadow-[0_0_0_9999px_rgba(0,0,0,0.75)]"
                    style={{
                        borderColor: 'rgba(255, 255, 255, 0.4)', // Start color for animation
                        top: targetRect.top - 8,
                        left: targetRect.left - 8,
                        width: targetRect.width + 16,
                        height: targetRect.height + 16,
                    }}
                ></div>
            )}

            {/* Popover */}
            {targetRect && (
                <div
                    className="fixed w-72 bg-white rounded-lg shadow-2xl p-5 transition-all duration-300 ease-in-out"
                    style={popoverPosition}
                    role="document"
                >
                    <button onClick={onClose} className="absolute top-2 right-2 p-1 text-gray-500 hover:text-black" aria-label={t('tour.close')}>
                        <X size={20} />
                    </button>
                    <h3 className="text-lg font-bold text-black mb-2">{currentStep.title}</h3>
                    <p className="text-sm text-gray-600">{currentStep.content}</p>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500">
                            {stepIndex + 1} / {tourSteps.length}
                        </span>
                        <div className="flex gap-2">
                             <button
                                onClick={handlePrev}
                                disabled={stepIndex === 0}
                                className="p-2 text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={t('tour.prev')}
                            >
                                <ChevronLeft size={20}/>
                            </button>
                             <button
                                onClick={handleNext}
                                className="bg-black text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                {stepIndex === tourSteps.length - 1 ? t('tour.finish') : t('tour.next')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};