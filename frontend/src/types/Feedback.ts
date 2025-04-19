// types/Feedback.ts

export interface FeedbackResult {
    tone: string;                  // e.g., "neutral", "positive", "negative"
    grammarScore: number;         // 0-100
    keywordRelevance: number;     // % match with expected keywords
}

export interface EvaluateFeedbackRequest {
    transcript: string;
    expectedKeywords: string[];
}
