import React, { useState, useCallback, useEffect } from 'react';
import { KeywordInput } from '../components/KeywordInput';
import { KeywordDisplay } from '../components/KeywordDisplay';
import { generateKeywords } from '../services/geminiService';
import { useI18n } from '../hooks/useI18n';
import { HistoryItem, getHistory, addToHistory, saveHistory, clearHistory } from '../services/historyService';
import { HistoryDisplay } from '../components/HistoryDisplay';
import { Sidebar } from '../components/Sidebar';
import { SettingsView } from './generator/SettingsView';
import { Modal } from '../components/Modal';
import { HistoryDetailView } from './generator/HistoryDetailView';
import { 
    getActiveApiKey, 
    setActiveApiKey, 
    getApiKeyHistory, 
    saveApiKeyHistory, 
    recordApiKeyUsage, 
    clearApiKeyHistory as clearApiHistory 
} from '../services/apiKeyService';
import type { ApiKeyHistoryItem } from '../services/apiKeyService';

declare const Swal: any;

export interface KeywordGroup {
    title: string;
    keywords: string[];
}

export type View = 'generator' | 'history' | 'settings';

interface GeneratorPageProps {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ isSidebarOpen, closeSidebar }) => {
    const { t } = useI18n();
    
    // View management state
    const [activeView, setActiveView] = useState<View>('generator');
    
    // Shared state
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [apiKey, setApiKey] = useState<string>('');
    const [apiKeyHistory, setApiKeyHistory] = useState<ApiKeyHistoryItem[]>([]);
    const [viewingHistoryItem, setViewingHistoryItem] = useState<HistoryItem | null>(null);

    // Generator-specific state
    const [title, setTitle] = useState<string>('');
    const [keywordGroups, setKeywordGroups] = useState<KeywordGroup[]>([]);
    const [keywordCount, setKeywordCount] = useState<number>(45);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setHistory(getHistory());
        setApiKey(getActiveApiKey());
        setApiKeyHistory(getApiKeyHistory());
    }, []);

    const handleApiKeyChange = (key: string) => {
        setApiKey(key);
        setActiveApiKey(key);
        if (key) {
            const updatedHistory = recordApiKeyUsage(key);
            setApiKeyHistory(updatedHistory);
        }
    };

    const handleGenerateKeywords = useCallback(async () => {
        if (!apiKey) {
            setError(t('generator.errorNoApiKey'));
            setActiveView('settings');
            return;
        }

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
            const keywordPromises = titles.map(t => generateKeywords(t, keywordCount, apiKey));
            const results = await Promise.all(keywordPromises);

            const updatedApiKeyHistory = recordApiKeyUsage(apiKey);
            setApiKeyHistory(updatedApiKeyHistory);

            const newGroups = titles.map((t, index) => ({
                title: t,
                keywords: results[index] || [],
            }));

            setKeywordGroups(newGroups);
            const updatedHistory = addToHistory(newGroups);
            setHistory(updatedHistory);

        } catch (err) {
            console.error(err);
            setError(t('generator.errorFailed'));
        } finally {
            setIsLoading(false);
        }
    }, [title, keywordCount, t, apiKey]);
    
    const handleViewHistoryItem = (item: HistoryItem) => {
        setViewingHistoryItem(item);
    };

    const handleUseHistoryItem = (item: HistoryItem) => {
        const titlesFromHistory = item.groups.map(g => g.title).join('\n');
        const countFromHistory = item.groups[0]?.keywords.length || 45;
        
        setTitle(titlesFromHistory);
        setKeywordGroups(item.groups);
        setKeywordCount(countFromHistory);
        setError(null);
        
        setViewingHistoryItem(null); // Close modal
        setActiveView('generator');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteHistoryItem = (id: string) => {
        Swal.fire({
            title: t('history.confirmDeleteItemTitle'),
            text: t('history.confirmDeleteItemText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: t('history.confirmDeleteButton'),
            cancelButtonText: t('history.cancelButton')
        }).then((result: any) => {
            if (result.isConfirmed) {
                const updatedHistory = history.filter(item => item.id !== id);
                setHistory(updatedHistory);
                saveHistory(updatedHistory);
            }
        });
    };

    const handleClearHistory = () => {
        Swal.fire({
            title: t('history.confirmClearAllTitle'),
            text: t('history.confirmClearAllText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: t('history.confirmDeleteButton'),
            cancelButtonText: t('history.cancelButton')
        }).then((result: any) => {
            if (result.isConfirmed) {
                setHistory([]);
                clearHistory();
            }
        });
    };

    const handleSelectApiKey = (key: string) => {
        handleApiKeyChange(key);
    };

    const handleDeleteApiKey = (key: string) => {
        Swal.fire({
            title: t('settings.confirmDeleteApiKeyTitle'),
            text: t('settings.confirmDeleteApiKeyText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: t('history.confirmDeleteButton'),
            cancelButtonText: t('history.cancelButton')
        }).then((result: any) => {
            if (result.isConfirmed) {
                const updatedHistory = apiKeyHistory.filter(item => item.key !== key);
                setApiKeyHistory(updatedHistory);
                saveApiKeyHistory(updatedHistory);
            }
        });
    };

    const handleClearApiHistory = () => {
        Swal.fire({
            title: t('settings.confirmClearApiHistoryTitle'),
            text: t('settings.confirmClearApiHistoryText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: t('history.confirmDeleteButton'),
            cancelButtonText: t('history.cancelButton')
        }).then((result: any) => {
            if (result.isConfirmed) {
                setApiKeyHistory([]);
                clearApiHistory();
            }
        });
    };


    const renderActiveView = () => {
        switch (activeView) {
            case 'history':
                return (
                    <HistoryDisplay 
                        history={history}
                        onSelect={handleViewHistoryItem}
                        onDelete={handleDeleteHistoryItem}
                        onClearAll={handleClearHistory}
                    />
                );
            case 'settings':
                return <SettingsView 
                            apiKey={apiKey} 
                            onApiKeyChange={handleApiKeyChange}
                            apiKeyHistory={apiKeyHistory}
                            onSelectApiKey={handleSelectApiKey}
                            onDeleteApiKey={handleDeleteApiKey}
                            onClearApiHistory={handleClearApiHistory}
                        />;
            case 'generator':
            default:
                return (
                    <div className="space-y-8 max-w-4xl mx-auto">
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
                );
        }
    };

    return (
        <>
            <Sidebar 
                activeView={activeView} 
                setActiveView={setActiveView} 
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
            />
             {isSidebarOpen && (
                 <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" 
                    onClick={closeSidebar}
                 ></div>
            )}
            
            <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
                <main className="container mx-auto px-4 py-8 sm:py-12">
                    {renderActiveView()}
                </main>
            </div>
           
            {viewingHistoryItem && (
                <Modal
                    isOpen={!!viewingHistoryItem}
                    onClose={() => setViewingHistoryItem(null)}
                    title={t('history.modalTitle')}
                >
                    <HistoryDetailView 
                        item={viewingHistoryItem}
                        onUse={handleUseHistoryItem}
                    />
                </Modal>
            )}
        </>
    );
};
