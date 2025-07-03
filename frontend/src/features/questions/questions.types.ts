export interface Feedback {
    tone: string,
    toneScore: number,
    keywordDensity: number,
    grammarScore: number,
    relevanceScore: number,
    totalTokens: number,
    spellingErrors: number,
}

export interface InterviewQuestions {
    id: number;
    question: string;
    expectedKeywords: string[];
    answer: string;
    feedback: Feedback;
    score: number;
}

export interface InitialQuestionState {
    jobRole: string;
    resumeId:string;
    questions: InterviewQuestions[];
    isLoading: boolean;
    errorMessage: string | null;
    current: number;
    showConfirm: boolean;
    showFeedback:boolean;
}

export interface FeedbackRequest {
    question: string;
    transcript: string;
    expectedKeywords: string[];
}

export interface InterviewRequest {
    questions: InterviewQuestions[];
    jobRole: string;
    resumeId: string;
}

export interface InterviewResponse {
    _id: string;
    user: string;
    resume: string;
    jobRole: string;
    questions: InterviewQuestions[];
    status: "completed" | "incomplete";
    conductedAt: string;
    __v?: number;
}
