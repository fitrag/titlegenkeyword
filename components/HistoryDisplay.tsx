import React from 'react';
import { Clock, Trash2, Eye } from 'lucide-react';
import { HistoryItem } from '../services/historyService';
import { useI18n } from '../hooks/useI18n';

interface KeywordGroup {
    title: string;
    keywords: string[];
}

interface HistoryDisplayProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    onDelete: (id: string) => void;
    onClearAll: () => void;
}

const HistoryListItem: React.FC<{ item: HistoryItem; onSelect: () => void; onDelete: () => void }> = ({ item, onSelect, onDelete }) => {
    const { language, t } = useI18n();
    const date = new Date(item.timestamp);
    const formattedDate = date.toLocaleString(language, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    const titles = item.groups.map(g => g.title).join(', ');
    const displayTitle = titles.length > 70 ? `${titles.substring(0, 70)}...` : titles;

    const numTitles = item.groups.length;
    const totalKeywords = item.groups.reduce((acc, group) => acc + group.keywords.length, 0);

    return (
        <li className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex-grow mb-3 sm:mb-0 mr-4 min-w-0">
                <div className="flex items-center flex-wrap text-sm text-gray-500 mb-1.5 gap-x-3 gap-y-1">
                    <div className="flex items-center">
                        <Clock size={14} className="mr-1.5" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-medium text-gray-700">{numTitles}</span>
                        <span className="ml-1">{t(numTitles > 1 ? 'history.metaTitles' : 'history.metaTitle')}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-medium text-gray-700">{totalKeywords}</span>
                        <span className="ml-1">{t(totalKeywords > 1 ? 'history.metaKeywords' : 'history.metaKeyword')}</span>
                    </div>
                </div>
                <p className="font-semibold text-gray-800 break-words">{displayTitle}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <button
                    onClick={onSelect}
                    className="flex items-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
                    aria-label={t('history.viewButtonTooltip')}
                >
                    <Eye size={16} />
                    <span>{t('history.viewButton')}</span>
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    aria-label={t('history.deleteButtonTooltip')}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </li>
    );
};


export const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history, onSelect, onDelete, onClearAll }) => {
    const { t } = useI18n();

    if (history.length === 0) {
        return (
             <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in text-center">
                <h2 className="text-lg font-semibold text-gray-900">{t('history.title')}</h2>
                <p className="mt-4 text-gray-500">Your generation history is empty.</p>
            </div>
        )
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in space-y-5">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{t('history.title')}</h2>
                <button
                    onClick={onClearAll}
                    className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
                >
                    <Trash2 size={16} />
                    <span>{t('history.clearAllButton')}</span>
                </button>
            </div>
            <ul className="space-y-3">
                {history.map(item => (
                    <HistoryListItem
                        key={item.id}
                        item={item}
                        onSelect={() => onSelect(item)}
                        onDelete={() => onDelete(item.id)}
                    />
                ))}
            </ul>
        </div>
    );
};