export interface ApiKeyHistoryItem {
    key: string;
    lastUsed: number;
}

const API_KEY_HISTORY_KEY = 'gemini-api-key-history';
const ACTIVE_API_KEY_KEY = 'gemini-api-key';

// --- Active Key Management ---

export const getActiveApiKey = (): string => {
    return localStorage.getItem(ACTIVE_API_KEY_KEY) || '';
};

export const setActiveApiKey = (key: string): void => {
    localStorage.setItem(ACTIVE_API_KEY_KEY, key);
};

// --- History Management ---

export const getApiKeyHistory = (): ApiKeyHistoryItem[] => {
    try {
        const stored = localStorage.getItem(API_KEY_HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse API key history", e);
        return [];
    }
};

export const saveApiKeyHistory = (history: ApiKeyHistoryItem[]): void => {
    try {
        localStorage.setItem(API_KEY_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.error("Failed to save API key history", e);
    }
};

export const recordApiKeyUsage = (key: string): ApiKeyHistoryItem[] => {
    if (!key) return getApiKeyHistory();
    let history = getApiKeyHistory();
    const existingIndex = history.findIndex(item => item.key === key);

    if (existingIndex > -1) {
        // Update timestamp and move to top
        const existingItem = history.splice(existingIndex, 1)[0];
        existingItem.lastUsed = Date.now();
        history.unshift(existingItem);
    } else {
        // Add new key to the top
        history.unshift({ key, lastUsed: Date.now() });
    }
    
    // Limit history size
    history = history.slice(0, 10);
    
    saveApiKeyHistory(history);
    return history;
};

export const clearApiKeyHistory = (): void => {
    localStorage.removeItem(API_KEY_HISTORY_KEY);
};