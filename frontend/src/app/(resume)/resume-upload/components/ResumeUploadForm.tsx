// components/ResumeUploadForm.tsx
"use client";
import { useRef } from "react";
import { Button1, Button2 } from "@/global-components/Button";
import UploadStatus from "./UploadStatus";
import ResumePreviewModal from "./ResumePreviewModal";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { setFile, removeFile, setUploadSuccess, setShowPreview, setShowJobRoleModal, setSelectedResumeId, reuseExistingResume } from "@/features/resume/resumeSlice"
import { uploadResume } from "@/features/resume/resumeSlice";
import JobRoleModal from "./JobRoleModal";
import { generateQuestions } from "@/features/questions/questionSlice";
import { useRouter } from "next/navigation";

const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export default function ResumeUploadForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { errorMessage, resumes, isUploadingResume, selectedResumeId, file, uploadSuccess, showPreview, showJobRoleModal } = useAppSelector((state) => state.resume);

    const selectedResume = resumes.find(resume => resume._id === selectedResumeId);

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
        if (file) {
            const result = await dispatch(uploadResume({ file }));
            if (uploadResume.fulfilled.match(result)) {
                dispatch(setUploadSuccess(true));
                dispatch(setShowJobRoleModal(true));
                dispatch(removeFile());
                dispatch(setUploadSuccess(false));
            }
        } else if (selectedResumeId) {
            const result = await dispatch(reuseExistingResume(selectedResumeId));
            if (reuseExistingResume.fulfilled.match(result)) {
                dispatch(setUploadSuccess(true));
                dispatch(setShowJobRoleModal(true));
                dispatch(setSelectedResumeId(null)); // ✅ Clear selected resume
                dispatch(setUploadSuccess(false));
            }
        }
    }

        async function handleJobRoleSubmit(role: string) {
            const res = await dispatch(generateQuestions({ jobRole: role, interviewId: localStorage.getItem("interviewId") ?? "", resumeId: localStorage.getItem("resumeId") ?? "" }))
            if (generateQuestions.fulfilled.match(res)) {
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
                    {!file && selectedResume ? (
                        <div className="flex flex-col items-center w-full">
                            <div className="flex items-center space-x-2 mb-5">
                                <span className="text-purple-600 font-semibold">{selectedResume.fileName}</span>
                                <Button2 onClick={() => dispatch(setSelectedResumeId(null))}>Remove</Button2>
                            </div>
                            <Button1 onClick={handleUpload} disabled={isUploadingResume}>
                                {isUploadingResume ? "Uploading Resume..." : "Submit Resume"}
                            </Button1>
                        </div>
                    ) : !file ? (
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
                            <Button1 onClick={handleUpload} disabled={isUploadingResume}>
                                {isUploadingResume ? "Uploading Resume..." : "Submit Resume"}
                            </Button1>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <UploadStatus
                        isUploadingResume={isUploadingResume}
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
