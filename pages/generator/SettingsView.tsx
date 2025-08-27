import React, { useState, useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { AlertTriangle, Clock, Trash2, CheckCircle } from 'lucide-react';
import { ApiKeyHistoryItem } from '../../services/apiKeyService';

interface SettingsViewProps {
    apiKey: string;
    onApiKeyChange: (key: string) => void;
    apiKeyHistory: ApiKeyHistoryItem[];
    onSelectApiKey: (key: string) => void;
    onDeleteApiKey: (key: string) => void;
    onClearApiHistory: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
    apiKey, 
    onApiKeyChange,
    apiKeyHistory,
    onSelectApiKey,
    onDeleteApiKey,
    onClearApiHistory
}) => {
    const { t, language } = useI18n();
    const [currentApiKey, setCurrentApiKey] = useState(apiKey);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setCurrentApiKey(apiKey);
    }, [apiKey]);

    const handleSave = () => {
        onApiKeyChange(currentApiKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const formatApiKey = (key: string) => {
        if (key.length < 8) return '****';
        return `${key.slice(0, 4)}...${key.slice(-4)}`;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">{t('settings.title')}</h2>
                <p className="mt-1 text-sm text-gray-600">{t('settings.description')}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
                <label htmlFor="api-key-input" className="block text-base font-semibold text-gray-900 mb-2">
                    {t('settings.apiKeyLabel')}
                </label>
                <p className="text-sm text-gray-500 mb-3">{t('settings.apiKeyDescription')}</p>
                <div className="flex items-center gap-2">
                    <input
                        id="api-key-input"
                        type="password"
                        value={currentApiKey}
                        onChange={(e) => setCurrentApiKey(e.target.value)}
                        placeholder={t('settings.apiKeyPlaceholder')}
                        className="flex-grow w-full p-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition duration-200"
                    />
                    <button
                        onClick={handleSave}
                        className={`font-bold py-3 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                            saved 
                            ? 'bg-green-600 text-white' 
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                    >
                        {saved ? t('settings.apiKeySaved') : t('settings.apiKeySaveButton')}
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold text-gray-900">
                        {t('settings.apiKeyHistoryTitle')}
                    </h3>
                    {apiKeyHistory.length > 0 && (
                        <button
                            onClick={onClearApiHistory}
                            className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
                        >
                            <Trash2 size={16} />
                            <span>{t('settings.clearApiHistoryButton')}</span>
                        </button>
                    )}
                </div>
                <p className="text-sm text-gray-500 mb-4">{t('settings.apiKeyHistoryDescription')}</p>
                {apiKeyHistory.length > 0 ? (
                    <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {apiKeyHistory.map((item) => (
                            <li key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex-grow mb-2 sm:mb-0 mr-4">
                                    <p className="font-mono text-sm text-gray-800 font-semibold">{formatApiKey(item.key)}</p>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <Clock size={12} className="mr-1.5" />
                                        <span>{t('settings.lastUsedLabel')}: {new Date(item.lastUsed).toLocaleString(language)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {item.key === apiKey ? (
                                        <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600 py-2 px-3">
                                            <CheckCircle size={16} />
                                            {t('settings.activeKeyLabel')}
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => onSelectApiKey(item.key)}
                                            className="text-sm font-semibold py-2 px-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            {t('settings.useKeyButton')}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onDeleteApiKey(item.key)}
                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        aria-label={t('settings.deleteApiKeyTooltip')}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-4 px-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">{t('settings.noApiHistory')}</p>
                    </div>
                )}
            </div>

             <div className="flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-sm font-semibold text-yellow-800">{t('settings.securityWarningTitle')}</h3>
                    <p className="text-sm text-yellow-700 mt-1">{t('settings.securityWarning')}</p>
                </div>
            </div>
        </div>
    );
};