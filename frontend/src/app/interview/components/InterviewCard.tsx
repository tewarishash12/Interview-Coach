"use client"
import { CardLayout } from "@/global-components/Card";
import { Button1 } from "@/global-components/Button";
import { useRouter } from "next/navigation";
import { InterviewResponse } from "@/features/interview/interview.types";

export function InterviewCard({ interview }: { interview: InterviewResponse }) {
    const router = useRouter();
    const avgScore = interview.questions && interview.questions.length
        ? (interview.questions.reduce((acc, q) => acc + (q.score ?? 0), 0) / interview.questions.length).toFixed(1)
        : "N/A";

    return (
        <CardLayout className="p-5">
            <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <span className="font-semibold text-gray-900">{interview.jobRole}</span>
            </div>
            <div className="text-sm text-gray-500 mb-2">Conducted At: 📅 {new Date(interview.conductedAt).toLocaleString()}</div>
            
            <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-700">📊 Avg. Score:</span>
                <span className="font-semibold text-gray-900">{avgScore}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                    ${interview.status ==="incomplete" ? "bg-amber-400 text-gray-50" : "bg-emerald-400 text-gray-700"}
                    `}>
                    {interview.status}
                </span>
            </div>
            <Button1 onClick={() => router.push(`/interview/${interview._id}`)}>
                View Details
            </Button1>
        </CardLayout>
    );
}
