import { Resume } from "@/features/resume/resume.types";
import { Button1, Button2 } from "@/global-components/Button";
import { CardLayout } from "@/global-components/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResumePreviewModal } from "./ResumePreviewModal";
import { useAppDispatch, useAppSelector } from "@/store";
import ResumeConfirmationModal from "./ResumeConfirmationModal";
import { deleteResume, setSelectedResumeId } from "@/features/resume/resumeSlice";
import { BsTrash } from "react-icons/bs"
import ResumeDeleteModal from "./ResumeDeleteModal";

const MAIN_LINK = process.env.NEXT_PUBLIC_MAIN_API_URL;

export function ResumeCard({ resume }: { resume: Resume }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoadingResumes } = useAppSelector((state) => state.resume)
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    function handleUseResume() {
        setShowConfirm(true);
    }

    function confirmUseResume() {
        dispatch(setSelectedResumeId(resume._id));
        router.push("/resume-upload");
    }

    const [previewResume, setPreviewResume] = useState<Resume | null>(null);

    function onPreview(resume: Resume | null) {
        setPreviewResume(resume);
    }

    function handleDelete() {
        setShowDelete(true);
    }

    function confirmDelete() {
        dispatch(deleteResume(resume._id));
        setShowDelete(false);
    }

    return (
        <CardLayout className="p-10 relative">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📄</span>
                <span className="font-semibold text-gray-900">{resume.fileName}</span>
            </div>
            <div className="text-sm text-gray-500 mb-4">📅 {new Date(resume.uploadedAt).toLocaleString()}</div>
            <div className="grid grid-cols-2 gap-2">
                <Button2 onClick={() => onPreview(resume)}>Preview</Button2>
                <Button2>
                    <Link
                        href={`${MAIN_LINK}${resume.filePath}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download
                    </Link>
                </Button2>
                <Button1
                    onClick={() => router.push(`/interview?resumeId=${resume._id}`)}
                    disabled={isLoadingResumes}
                >
                    {isLoadingResumes ? "Loading..." : "Go to Interview"}
                </Button1>
                <Button1 onClick={handleUseResume}>Use This Resume</Button1>
                {showConfirm && <ResumeConfirmationModal setShowConfirm={setShowConfirm} confirmUseResume={confirmUseResume} />}
            </div>
            <button
                className={`text-red-500 cursor-pointer text-lg font-bold rounded-md px-2 py-2 bg-gray-200 hover:bg-gray-300 absolute top-10 right-5`}
                onClick={handleDelete}
            >
                <BsTrash />
            </button>
            {showDelete && <ResumeDeleteModal setShowDelete={setShowDelete} confirmDelete={confirmDelete} />}

            <ResumePreviewModal resume={previewResume} />
        </CardLayout>
    );
}
