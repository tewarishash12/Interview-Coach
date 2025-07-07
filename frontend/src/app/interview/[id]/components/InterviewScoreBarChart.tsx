"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { getAverageScores } from "@/utils/avgScore";
import { InterviewQuestion } from "@/features/interview/interview.types";

export function InterviewScoreBarChart({ questions }: { questions: InterviewQuestion[] }) {
    const avg = getAverageScores(questions);
    const data = [
        { name: "Tone", value: avg.toneScore },
        { name: "Grammar", value: avg.grammarScore },
        { name: "Relevance", value: avg.relevanceScore },
        { name: "Keyword Density", value: avg.keywordDensity },
        { name: "Spelling Errors", value: avg.spellingErrors },
        { name: "Total Avg Score", value: avg.averageScore }
    ];

    return (
        <div className="bg-white rounded-md shadow p-4 border border-gray-200 mb-8">
            <div className="text-xl font-semibold text-gray-900 mb-4">Score Overview</div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical" className="p-1">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
