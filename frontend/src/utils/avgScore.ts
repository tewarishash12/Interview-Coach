import { InterviewQuestion, Feedback } from "@/features/interview/interview.types";

export function getAverageScores(questions: InterviewQuestion[]) {
    const keys: (keyof Feedback)[] = [
        "toneScore",
        "grammarScore",
        "relevanceScore",
        "keywordDensity",
        "spellingErrors"
    ];
    const avgScores: Record<string, number> = {};

    keys.forEach(key => {
        const vals = questions.map(q => q.feedback?.[key]).filter((v): v is number => typeof v === "number");
        avgScores[key] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    });

    // Calculate total average score
    const scores = questions.map(q => q.score).filter((v): v is number => typeof v === "number");
    avgScores["averageScore"] = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    return avgScores;
}
