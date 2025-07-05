"use client";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "@/store";
import { fetchUserInterviews } from "@/features/interview/interviewSlice";
import { InterviewListHeader } from "./components/InterviewListHeader";
import { InterviewGrid } from "./components/InterviewGrid";

export default function InterviewListPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserInterviews());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <InterviewListHeader />
            <Suspense fallback={<div>Loading Interview&apos;s</div>}>
                <InterviewGrid />
            </Suspense>
        </div>
    );
}
