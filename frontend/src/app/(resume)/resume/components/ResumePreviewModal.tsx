import { CardLayout } from "@/global-components/Card";
import { Button2 } from "@/global-components/Button";
import { Resume } from "@/features/resume/resume.types";
import { useEffect, useState } from "react";
const MAIN_LINK = process.env.NEXT_PUBLIC_MAIN_API_URL;

export function ResumePreviewModal({ resume }: {resume: Resume | null}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(!!resume);
    }, [resume]);

    function onClose() {
        setIsOpen(false);
    }

    if (!isOpen || !resume) return null;

    const isPdf = resume.fileName.toLowerCase().endsWith(".pdf");

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <CardLayout className="p-5 min-w-6xl">
                <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-gray-900">{resume.fileName}</div>
                    <Button2 onClick={onClose}>Close</Button2>
                </div>
                {isPdf ? (
                    <iframe
                        src={`${MAIN_LINK}${resume.filePath}`}
                        title="Resume PDF Preview"
                        className="w-full h-96 rounded border"
                    />
                ) : (
                    <div className="text-gray-700 text-center py-10">Preview available only for PDF files.</div>
                )}
            </CardLayout>
        </div>
    );
}
