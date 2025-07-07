import { InterviewResponse } from "@/features/interview/interview.types";

export default function InterviewSummaryHeader({ interview }:{interview:InterviewResponse}) {
    const avgScore = interview?.questions?.length
        ? (interview.questions.reduce((acc, q) => acc + (q.score ?? 0), 0) / interview.questions.length).toFixed(1)
        : "N/A";
    const statusColor = interview.status === "completed"
        ? "bg-green-500 text-white"
        : "bg-gray-200 text-gray-700";

    return (
        <div className="bg-white rounded-md shadow p-6 border border-gray-200 flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-xl font-semibold text-gray-900">{interview.jobRole}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                    {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </span>
            </div>
            <div className="text-gray-700 text-sm flex gap-4">
                <span>📅 {new Date(interview.conductedAt).toLocaleDateString()}</span>
                <span>📊 Avg. Score: <span className="font-bold">{avgScore}</span></span>
            </div>
        </div>
    );
}
