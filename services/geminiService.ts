import { GoogleGenAI } from "@google/genai";

export const generateKeywords = async (title: string, count: number, apiKey: string): Promise<string[]> => {
    if (!apiKey) {
        throw new Error("API_KEY is missing.");
    }
    
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Based on the following title for a microstock image/vector, generate exactly ${count} SEO-friendly and highly searchable single-word keywords in English. These keywords will be used for metadata on platforms like Adobe Stock, Vecteezy, and Freepik. The keywords should be relevant, specific, and cover concepts, themes, and objects related to the title. Each keyword in the list must be a single word.

Title: "${title}"

Provide the output as a valid JSON array of ${count} single-word strings, and nothing else.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
                topP: 0.9,
            },
        });

        const responseText = response.text.trim();
        // The response might be wrapped in markdown backticks for JSON, so we strip them.
        const jsonString = responseText.replace(/^```json\s*/, '').replace(/```$/, '');
        
        const keywords = JSON.parse(jsonString);

        if (Array.isArray(keywords) && keywords.every(k => typeof k === 'string')) {
            return keywords;
        } else {
            throw new Error("API returned data in an unexpected format.");
        }
    } catch (error) {
        console.error("Error generating keywords with Gemini:", error);
        throw new Error("Failed to parse keywords from the AI. The response might be invalid.");
    }
};