// components/ResumeUploadForm.tsx
"use client";
import { useRef } from "react";
import { Button1, Button2 } from "@/global-components/Button";
import UploadStatus from "./UploadStatus";
import ResumePreviewModal from "./ResumePreviewModal";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { setFile, removeFile, setResumeText, setUploadSuccess, setShowPreview, setShowJobRoleModal, setResumeId } from "@/features/resume/resumeSlice"
import { uploadResume } from "@/features/resume/resumeSlice";
import JobRoleModal from "./JobRoleModal";
import { generateQuestions, setJobRole, setResumeMongoId } from "@/features/questions/questionSlice";
import { useRouter } from "next/navigation";

const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export default function ResumeUploadForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { errorMessage, loading, file, uploadSuccess, showPreview, showJobRoleModal, resumeText } = useAppSelector((state) => state.resume);

    const inputRef = useRef<HTMLInputElement>(null);

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        const resume = e.dataTransfer.files[0];
        if (resume && ACCEPTED_TYPES.includes(resume.type)) 
            dispatch(setFile(resume));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const resume = e.target.files?.[0];
        if (resume && ACCEPTED_TYPES.includes(resume.type)) dispatch(setFile(resume))
    }

    function clearFile() {
        dispatch(removeFile());
    }

    async function handleUpload() {
        if (!file) return;

        const result = await dispatch(uploadResume({ file }));
        if (uploadResume.fulfilled.match(result)) {
            dispatch(setUploadSuccess(true));
            dispatch(setResumeText(result.payload.extractedText));
            dispatch(setResumeId(result.payload.resumeId));
            dispatch(setResumeMongoId(result.payload.resumeId))
            dispatch(setShowJobRoleModal(true));
            setTimeout(() => setUploadSuccess(false), 3000);
        }
    }

    async function handleJobRoleSubmit(role: string) {
        const res = await dispatch(generateQuestions({ resumeText, jobRole: role }))
        if (generateQuestions.fulfilled.match(res)) {
            dispatch(setJobRole(role));
            dispatch(setShowJobRoleModal(false));
            router.push("/generate-questions");
        }
    }

    return (
        <div>
            <div
                className={`border-2 border-dashed rounded-md px-6 py-23 flex flex-col items-center justify-center transition 
                ${file ? "border-purple-500 bg-purple-50" : "border-gray-300 bg-white"}
                `}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => inputRef.current?.click()}
                style={{ cursor: "pointer" }}
            >
                {!file ? (
                    <>
                        <div className="text-3xl mb-2 text-purple-400">📄</div>
                        <div className="text-gray-700 font-semibold mb-1">Drag & drop your resume here</div>
                        <div className="text-sm text-gray-500 mb-3">or click to browse (.pdf, .docx)</div>
                        <input
                            ref={inputRef}
                            type="file"
                            accept=".pdf,.docx"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center w-full">
                        <div className="flex items-center space-x-2 mb-5">
                            <span className="text-purple-600 font-semibold">{file.name}</span>
                            <Button2 onClick={clearFile}>Remove</Button2>
                            <Button2 onClick={() => dispatch(setShowPreview(true))}>Preview</Button2>
                        </div>
                        <Button1 onClick={handleUpload} disabled={loading}>
                            Submit
                        </Button1>
                    </div>
                )}
            </div>

            <div className="mt-4">
                <UploadStatus
                    loading={loading}
                    errorMessage={errorMessage}
                    success={uploadSuccess}
                    onRetry={handleUpload}
                />
            </div>

            {showPreview && file && (
                <ResumePreviewModal file={file} onClose={() => dispatch(setShowPreview(false))} />
            )}

            {showJobRoleModal && (
                <JobRoleModal
                    onSubmit={handleJobRoleSubmit}
                    onClose={() => dispatch(setShowJobRoleModal(false))}
                />
            )}
        </div>
    );
}
