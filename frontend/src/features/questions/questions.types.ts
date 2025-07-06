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
}

export interface InitialQuestionState {
    jobRole: string;
    questions: InterviewQuestions[];
    isLoadingQuestions: boolean;
    isLoadingFeedback:boolean;
    errorMessage: string | null;
    current: number;
    showConfirm: boolean;
    showFeedback:boolean;
}

export interface FeedbackRequest {
    question: string;
    transcript: string;
    expectedKeywords: string[];
    interviewId:string;
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
