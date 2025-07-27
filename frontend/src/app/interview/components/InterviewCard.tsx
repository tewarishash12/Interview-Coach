"use client"
import { CardLayout } from "@/global-components/Card";
import { Button1 } from "@/global-components/Button";
import { useRouter } from "next/navigation";
import { InterviewResponse } from "@/features/interview/interview.types";
import { useAppDispatch, useAppSelector } from "@/store";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import InterviewDeleteModal from "./InterviewDeleteModal";
import { deleteInterview } from "@/features/interview/interviewSlice";

export function InterviewCard({ interview }: { interview: InterviewResponse }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [showDelete, setShowDelete] = useState(false);
    const { isLoadingInterview } = useAppSelector((state) => state.interview)
    const avgScore = interview.questions && interview.questions.length
        ? (interview.questions.reduce((acc, q) => acc + (q.score ?? 0), 0) / interview.questions.length).toFixed(1)
        : "N/A";

    function handleDelete() {
        setShowDelete(true);
    }

    function confirmDelete() {
        dispatch(deleteInterview(interview._id));
        setShowDelete(false);
    }

    return (
        <CardLayout className="p-5 relative">
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
                    ${interview.status === "incomplete" ? "bg-amber-400 text-gray-50" : "bg-emerald-400 text-gray-700"}
                    `}>
                    {interview.status}
                </span>
            </div>
            <Button1
                disabled={isLoadingInterview}
                onClick={() => router.push(`/interview/${interview._id}`)}
            >
                {isLoadingInterview ? "Loading Interview..." : "View Details"}
            </Button1>
            <button
                className={`text-red-500 cursor-pointer text-lg font-bold rounded-md px-2 py-2 bg-gray-200 hover:bg-gray-300 absolute top-10 right-5`}
                onClick={handleDelete}
            >
                <BsTrash />
            </button>

            {showDelete && <InterviewDeleteModal setShowDelete={setShowDelete} confirmDelete={confirmDelete} />}
        </CardLayout>
    );
}
