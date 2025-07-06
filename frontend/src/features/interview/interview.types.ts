export interface Feedback {
    tone: string;
    toneScore: number;
    keywordDensity: number;
    grammarScore: number;
    relevanceScore: number;
    totalTokens: number;
    spellingErrors: number;
}

export interface InterviewQuestion {
    _id: string;
    question: string;
    expectedKeywords: string[];
    answer: string;
    feedback: Feedback;
    score: number;
}

export interface InterviewResponse {
    _id: string;
    user: string;
    resume: string;
    questions: InterviewQuestion[];
    jobRole: string;
    status: "incomplete" | "completed";
    conductedAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface InitialInterviewState {
    interviews: InterviewResponse[];
    isLoadingInterviews: boolean;
    isLoadingInterview: boolean;
    errorMessage: string | null;
}