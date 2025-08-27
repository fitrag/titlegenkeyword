import React from 'react';
import { Sparkles } from 'lucide-react';
import { Spinner } from './Spinner';
import { useI18n } from '../hooks/useI18n';

interface KeywordInputProps {
    title: string;
    setTitle: (title: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    keywordCount: number;
    setKeywordCount: (count: number) => void;
}

export const KeywordInput: React.FC<KeywordInputProps> = ({ title, setTitle, onGenerate, isLoading, keywordCount, setKeywordCount }) => {
    const { t } = useI18n();

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in">
            <label htmlFor="title-input" className="block text-base font-semibold text-gray-900 mb-2">
                {t('keywordInput.label')}
            </label>
            <p className="text-sm text-gray-500 mb-3">{t('keywordInput.description')}</p>
            <textarea
                id="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('keywordInput.placeholder')}
                className="w-full h-28 p-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition duration-200 resize-none"
                disabled={isLoading}
            />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="w-full sm:w-auto">
                    <label htmlFor="keyword-count" className="block text-sm font-medium text-gray-600 mb-1.5">
                        {t('keywordInput.countLabel')}
                    </label>
                     <input
                        id="keyword-count"
                        type="number"
                        value={keywordCount}
                        onChange={(e) => setKeywordCount(parseInt(e.target.value, 10) || 0)}
                        min="5"
                        max="50"
                        className="w-full sm:w-32 p-3 bg-white border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                        disabled={isLoading}
                    />
                </div>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Spinner />
                            {t('keywordInput.buttonGenerating')}
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            {t('keywordInput.buttonGenerate')}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};