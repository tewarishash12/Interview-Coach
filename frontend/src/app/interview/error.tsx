"use client"
import { fetchUserInterviews } from "@/features/interview/interviewSlice";
import { Button2 } from "@/global-components/Button";
import { useAppDispatch } from "@/store";

export default function ErrorState() {
    const dispatch = useAppDispatch();

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center justify-between mb-6">
            <Button2 onClick={() => dispatch(fetchUserInterviews())}>Retry</Button2>
        </div>
    );
}
