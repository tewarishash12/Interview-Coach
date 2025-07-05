"use client"
import { useAppSelector } from "@/store";
import { InterviewCard } from "./InterviewCard";
import { EmptyState } from "./EmptyState";
import { useSearchParams } from "next/navigation";

export function InterviewGrid() {
    const { interviews } = useAppSelector((state)=> state.interview);
    const searchParams = useSearchParams();
    const resumeId = searchParams.get("resumeId")

    const filteredInterviews = resumeId
    ? interviews.filter((interview) => interview.resume === resumeId)
    : interviews;
    
    console.log(filteredInterviews)

    if(filteredInterviews.length === 0)
        return <EmptyState />

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInterviews.map((interview) => (
                <InterviewCard key={interview._id} interview={interview} />
            ))}
        </div>
    );
}