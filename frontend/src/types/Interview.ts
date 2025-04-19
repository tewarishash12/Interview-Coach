// types/Interview.ts
export interface QuestionFeedback {
    question: string;
    answer: string;
    feedback?: string;
    score?: number;
}

export interface CreateInterviewRequest {
    questions: string[];
    responses: string[];
    feedbacks?: string[];
    scores?: number[];
    jobRole?: string;
}

export interface Interview {
    _id: string;
    user: string; // Backend will replace with userId
    jobRole?: string;
    questions: QuestionFeedback[];
    createdAt: string;
}
