import { CardLayout } from "@/global-components/Card";
import { getAverageScores } from "@/utils/avgScore";
import { InterviewQuestion } from "@/features/interview/interview.types";

export function InterviewScoreCards({ questions }: { questions: InterviewQuestion[] }) {
    const avg = getAverageScores(questions);

    const cards = [
        { label: "Avg. Tone Score", value: avg.toneScore.toFixed(1) },
        { label: "Avg. Keyword Density", value: avg.keywordDensity.toFixed(1) },
        { label: "Avg. Relevance Score", value: avg.relevanceScore.toFixed(1) },
        { label: "Avg. Grammar Score", value: avg.grammarScore.toFixed(1) },
        { label: "Total Average Score", value: avg.averageScore.toFixed(1) }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {cards.map(card => (
                <CardLayout className="p-5" key={card.label}>
                    <div className="text-lg font-semibold text-gray-900">{card.label}</div>
                    <div className="text-2xl text-purple-600 font-bold mt-2">{card.value}</div>
                </CardLayout>
            ))}
        </div>
    );
}
