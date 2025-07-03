import { InterviewQuestion, Feedback } from "@/features/interview/interview.types";

const SCORE_LABELS: {
    key: keyof Feedback,
    label: string,
    invert?: boolean,
    optional?: boolean,
}[]= [
    { key: "toneScore", label: "Tone Score" },
    { key: "grammarScore", label: "Grammar Score" },
    { key: "relevanceScore", label: "Relevance" },
    { key: "keywordDensity", label: "Keyword Density" },
    { key: "spellingErrors", label: "Spelling Errors", invert: true },
    { key: "totalTokens", label: "Total Tokens", optional: true },
];

function getAvg(
    questions: InterviewQuestion[],
    key: keyof InterviewQuestion["feedback"]
): number {
    const vals: number[] = questions
        .map(q => q.feedback?.[key])
        .filter((v): v is number => typeof v === "number");

    if (!vals.length) return 0;

    return vals.reduce((a: number, b: number) => a + b, 0) / vals.length;
}

export default function InterviewScoreBreakdown({
    questions,
}: {
    questions: InterviewQuestion[];
}) {
    return (
        <div className="bg-white rounded-md shadow p-6 border border-gray-200">
            <div className="text-xl font-semibold text-gray-900 mb-4">Score Breakdown</div>
            <div className="space-y-4">
                {SCORE_LABELS.map(({ key, label, invert, optional }) => {
                    const avg = getAvg(questions, key);
                    if (optional && !avg) return null;

                    const percent = invert
                        ? 100 - Math.min(avg, 100)
                        : Math.min(avg, 100);

                    return (
                        <div key={key}>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-700">{label}</span>
                                <span className="text-gray-700 font-semibold">{avg.toFixed(1)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-md h-2">
                                <div
                                    className="bg-purple-500 h-2 rounded-md transition-all"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
