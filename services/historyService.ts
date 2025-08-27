
export interface KeywordGroup {
    title: string;
    keywords: string[];
}

export interface HistoryItem {
    id: string;
    timestamp: number;
    groups: KeywordGroup[];
}

const HISTORY_KEY = 'keyword-generation-history';

export const getHistory = (): HistoryItem[] => {
    try {
        const storedHistory = localStorage.getItem(HISTORY_KEY);
        if (storedHistory) {
            return JSON.parse(storedHistory);
        }
    } catch (error) {
        console.error("Failed to parse history from localStorage", error);
    }
    return [];
};

export const saveHistory = (history: HistoryItem[]): void => {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
        console.error("Failed to save history to localStorage", error);
    }
};

export const addToHistory = (groups: KeywordGroup[]): HistoryItem[] => {
    const currentHistory = getHistory();
    const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        timestamp: Date.now(),
        groups,
    };
    // Add new item to the beginning and limit history to 20 items
    const updatedHistory = [newHistoryItem, ...currentHistory].slice(0, 20);
    saveHistory(updatedHistory);
    return updatedHistory;
};

export const clearHistory = (): void => {
    try {
        localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
        console.error("Failed to clear history from localStorage", error);
    }
}