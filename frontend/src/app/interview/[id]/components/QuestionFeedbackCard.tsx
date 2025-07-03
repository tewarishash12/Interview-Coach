import { InterviewQuestion } from "@/features/interview/interview.types";
import { useState } from "react";

export default function QuestionFeedbackCard({ question, index }:{question:InterviewQuestion; index:number}) {
    const [open, setOpen] = useState(false);

    const { question: qText, answer, feedback, score, expectedKeywords } = question;

    // For keyword highlighting
    const spoken = (answer || "").toLowerCase();
    const keywords = expectedKeywords || [];

    return (
        <div className="bg-white rounded-md shadow border border-gray-200">
            <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen((o) => !o)}
            >
                <span className="font-semibold text-gray-900">
                    {index}. {qText}
                </span>
                <span className="text-gray-500 text-sm">{open ? "▲" : "▼"}</span>
            </button>
            {open && (
                <div className="px-6 pb-4 space-y-3">
                    <div>
                        <span className="text-sm text-gray-500 font-semibold">Your Answer:</span>
                        <div className="text-gray-700 mt-1">{answer || <span className="italic text-gray-400">No answer provided.</span>}</div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 font-semibold">AI Feedback:</span>
                        <div className="text-gray-700 mt-1">
                            Tone: <span className="font-semibold">{feedback?.tone ?? "N/A"}</span>
                            <span className="mx-2">|</span>
                            Grammar: <span className="font-semibold">{feedback?.grammarScore ?? "N/A"}</span>
                            <span className="mx-2">|</span>
                            Relevance: <span className="font-semibold">{feedback?.relevanceScore ?? "N/A"}</span>
                            <span className="mx-2">|</span>
                            Keyword Density: <span className="font-semibold">{feedback?.keywordDensity ?? "N/A"}</span>
                            <span className="mx-2">|</span>
                            Spelling Errors: <span className="font-semibold">{feedback?.spellingErrors ?? "N/A"}</span>
                            <span className="mx-2">|</span>
                            Total Tokens: <span className="font-semibold">{feedback?.totalTokens ?? "N/A"}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 font-semibold">Score:</span>
                        <span className="text-purple-500 font-bold ml-2">{score ?? "N/A"}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 font-semibold">Expected Keywords:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {keywords.map((kw, i) => {
                                const found = spoken.includes(kw.toLowerCase());
                                return (
                                    <span
                                        key={kw + i}
                                        className={`px-2 py-1 rounded text-xs font-semibold ${found
                                                ? "bg-green-100 text-green-700 border border-green-300"
                                                : "bg-red-100 text-red-700 border border-red-300"
                                            }`}
                                    >
                                        {kw}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
