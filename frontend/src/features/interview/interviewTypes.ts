// features/interview/interviewTypes.ts

export interface QuestionItem {
    question: string;
    answer?: string;
    feedback?: string;
    score?: number;
}

export interface Interview {
    _id?: string;
    user: string;
    jobRole: string;
    questions: QuestionItem[];
    conductedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface InterviewState {
    interviews: Interview[];
    currentInterview: Interview | null;
    generatedQuestions: string[];
    loading: boolean;
    error: string | null;
}
