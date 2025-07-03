"use client"
import { useAppSelector } from "@/store";
import { InterviewCard } from "./InterviewCard";
import { EmptyState } from "./EmptyState";

export function InterviewGrid() {
    const { interviews } = useAppSelector((state)=> state.interview)

    if(interviews.length === 0)
        return <EmptyState />

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interviews.map((interview) => (
                <InterviewCard key={interview._id} interview={interview} />
            ))}
        </div>
    );
}