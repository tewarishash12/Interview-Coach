import { Resume } from "@/features/resume/resume.types";
import { Button1, Button2 } from "@/global-components/Button";
import { CardLayout } from "@/global-components/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResumePreviewModal } from "./ResumePreviewModal";
const MAIN_LINK = process.env.NEXT_PUBLIC_MAIN_API_URL;

export function ResumeCard({ resume }: { resume: Resume }) {
    const router = useRouter();

    const [previewResume, setPreviewResume] = useState<Resume | null>(null);

    function onPreview(resume: Resume | null) {
        setPreviewResume(resume);
    }

    return (
        <CardLayout className="p-10">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📄</span>
                <span className="font-semibold text-gray-900">{resume.fileName}</span>
            </div>
            <div className="text-sm text-gray-500 mb-4">📅 {new Date(resume.uploadedAt).toLocaleString()}</div>
            <div className="flex gap-2">
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
                <Button1 onClick={() => router.push(`/interview/${resume._id}`)}>Go to Interview</Button1>
            </div>
            <ResumePreviewModal resume={previewResume} />
        </CardLayout>
    );
}
