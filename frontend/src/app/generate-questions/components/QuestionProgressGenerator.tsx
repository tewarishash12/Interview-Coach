"use client";
import { useAppSelector } from "@/store";

export default function QuestionProgressIndicator() {
    const {current} = useAppSelector((state)=> state.question)
    const totalQuestions = useAppSelector((state)=> state.question.questions.length);
    const percent = (current / totalQuestions) * 100;
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700 font-semibold">
                    Question {current+1} of {totalQuestions}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-md h-2">
                <div
                    className="bg-purple-500 h-2 rounded-md transition-all"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
