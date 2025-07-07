"use client"
import InterviewSummaryHeader from "./InterviewSummaryHeader";
import InterviewScoreBreakdown from "./InterviewScoreBreakdown";
import QuestionFeedbackList from "./QuestionFeedbackList";
import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { getInterviewById } from "@/features/interview/interviewSlice";
import { InterviewResponse } from "@/features/interview/interview.types";
import { useParams } from "next/navigation";
import { EmptyState } from "./EmptyStatePage";

export default function InterviewDetailContent() {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [interview, setInterview] = useState<InterviewResponse | null>(null);

    useEffect(() => {
        async function fetchInterview(id: string) {
            try {
                const res = await dispatch(getInterviewById(id)).unwrap(); 
                setInterview(res);
            } catch (err) {
                console.error("Failed to load interview:", err);
            }
        }

        if (id) fetchInterview(id as string);
    }, [dispatch, id])

    if(!interview)
        return <EmptyState />

    return (
        <div className="space-y-8">
            <InterviewSummaryHeader interview={interview} />
            <InterviewScoreBreakdown questions={interview?.questions??[]} />
            <QuestionFeedbackList questions={interview?.questions??[]} />
        </div>
    );
}
