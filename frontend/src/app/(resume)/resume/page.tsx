"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { getAllResumes } from "@/features/resume/resumeSlice";
import { ResumeListHeader } from "./components/ResumeListHeader";
import { ResumeGrid } from "./components/ResumeGrid";

export default function ResumeListPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllResumes());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <ResumeListHeader />
            <ResumeGrid />
        </div>
    );
}
