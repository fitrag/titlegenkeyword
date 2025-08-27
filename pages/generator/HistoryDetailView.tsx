import React, { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { HistoryItem } from '../../services/historyService';
import { useI18n } from '../../hooks/useI18n';

interface HistoryDetailViewProps {
    item: HistoryItem;
    onUse: (item: HistoryItem) => void;
}

const KeywordPill: React.FC<{ keyword: string }> = ({ keyword }) => (
    <div className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
        {keyword}
    </div>
);

export const HistoryDetailView: React.FC<HistoryDetailViewProps> = ({ item, onUse }) => {
    const { t } = useI18n();
    const [allCopied, setAllCopied] = useState(false);

    const allKeywords = item.groups.flatMap(group => group.keywords);
    const uniqueKeywords = [...new Set(allKeywords)];
    
    const handleCopyAll = () => {
        navigator.clipboard.writeText(uniqueKeywords.join(', '));
        setAllCopied(true);
        setTimeout(() => setAllCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {item.groups.map((group, index) => (
                <div key={index} className={index > 0 ? "border-t border-gray-200 pt-4" : ""}>
                    <h3 className="text-base font-semibold text-gray-800 break-all pr-4 mb-3">{group.title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {group.keywords.map((keyword, kwIndex) => (
                            <KeywordPill key={kwIndex} keyword={keyword} />
                        ))}
                    </div>
                </div>
            ))}
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                    onClick={handleCopyAll}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm font-bold py-3 px-4 rounded-lg transition-colors ${
                        allCopied
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                 <button
                    onClick={() => onUse(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                    <span>{t('history.useInGeneratorButton')}</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};