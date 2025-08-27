import React, { useState, useCallback } from 'react';
import { KeywordInput } from '../components/KeywordInput';
import { KeywordDisplay } from '../components/KeywordDisplay';
import { generateKeywords } from '../services/geminiService';
import { useI18n } from '../hooks/useI18n';

export interface KeywordGroup {
    title: string;
    keywords: string[];
}

export const GeneratorPage: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [keywordGroups, setKeywordGroups] = useState<KeywordGroup[]>([]);
    const [keywordCount, setKeywordCount] = useState<number>(45);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { t } = useI18n();

    const handleGenerateKeywords = useCallback(async () => {
        const titles = title.trim().split('\n').filter(t => t.trim() !== '');

        if (titles.length === 0) {
            setError(t('generator.errorNoTitle'));
            return;
        }
        if (keywordCount < 5 || keywordCount > 50) {
            setError(t('generator.errorInvalidCount'));
            return;
        }

        setIsLoading(true);
        setError(null);
        setKeywordGroups([]);

        try {
            const keywordPromises = titles.map(t => generateKeywords(t, keywordCount));
            
            const results = await Promise.all(keywordPromises);

            const newGroups = titles.map((t, index) => ({
                title: t,
                keywords: results[index] || [],
            }));

            setKeywordGroups(newGroups);

        } catch (err) {
            console.error(err);
            setError(t('generator.errorFailed'));
        } finally {
            setIsLoading(false);
        }
    }, [title, keywordCount, t]);

    return (
        <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">
                    {t('generator.title')}
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                    {t('generator.subtitle')}
                </p>
            </div>
            <div className="space-y-8">
                <KeywordInput
                    title={title}
                    setTitle={setTitle}
                    onGenerate={handleGenerateKeywords}
                    isLoading={isLoading}
                    keywordCount={keywordCount}
                    setKeywordCount={setKeywordCount}
                />
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center animate-fade-in">{error}</div>}
                <KeywordDisplay
                    groups={keywordGroups}
                    isLoading={isLoading}
                    count={title.trim().split('\n').filter(t => t.trim() !== '').length * keywordCount}
                />
            </div>
        </div>
    );
};
