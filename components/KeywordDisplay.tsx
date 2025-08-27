import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { KeywordGroup } from '../pages/GeneratorPage';
import { useI18n } from '../hooks/useI18n';

interface KeywordDisplayProps {
    groups: KeywordGroup[];
    isLoading: boolean;
    count: number;
}

const KeywordPill: React.FC<{ keyword: string }> = ({ keyword }) => (
    <div className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors">
        {keyword}
    </div>
);

const SkeletonPill: React.FC = () => (
    <div className="bg-gray-200 h-8 w-28 rounded-full animate-pulse"></div>
);

const KeywordResultGroup: React.FC<KeywordGroup> = ({ title, keywords }) => {
    const [copied, setCopied] = useState(false);
    const { t } = useI18n();

    const handleCopy = () => {
        navigator.clipboard.writeText(keywords.join(', '));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="border-t border-gray-200 pt-5">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-base font-semibold text-gray-800 break-all pr-4">{title}</h3>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg transition-colors whitespace-nowrap ${
                        copied
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            {t('keywordDisplay.copiedButton')}
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            {t('keywordDisplay.copyButton')}
                        </>
                    )}
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                    <KeywordPill key={index} keyword={keyword} />
                ))}
            </div>
        </div>
    );
};


export const KeywordDisplay: React.FC<KeywordDisplayProps> = ({ groups, isLoading, count }) => {
    const [allCopied, setAllCopied] = useState(false);
    const { t } = useI18n();

    const handleCopyAll = () => {
        const allKeywords = groups.flatMap(group => group.keywords);
        const uniqueKeywords = [...new Set(allKeywords)];
        navigator.clipboard.writeText(uniqueKeywords.join(', '));
        setAllCopied(true);
        setTimeout(() => setAllCopied(false), 2000);
    };

    if (!isLoading && groups.length === 0) {
        return null;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in space-y-5">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{t('keywordDisplay.title')}</h2>
                {!isLoading && groups.length > 1 && (
                     <button
                        onClick={handleCopyAll}
                        className={`flex items-center gap-2 text-sm font-bold py-2 px-4 rounded-lg transition-colors ${
                            allCopied
                                ? 'bg-green-100 text-green-700'
                                : 'bg-black text-white hover:bg-gray-800'
                        }`}
                    >
                        {allCopied ? (
                            <>
                                <Check className="w-4 h-4" />
                                {t('keywordDisplay.copiedButton')}
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                {t('keywordDisplay.copyAllButton')}
                            </>
                        )}
                    </button>
                )}
            </div>
            {isLoading ? (
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: count > 50 ? 50 : count }).map((_, index) => (
                        <SkeletonPill key={index} />
                    ))}
                </div>
            ) : (
                groups.map((group, index) => (
                    <KeywordResultGroup key={index} title={group.title} keywords={group.keywords} />
                ))
            )}
        </div>
    );
};
