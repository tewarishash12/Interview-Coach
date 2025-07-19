export interface ResumeUpload {
    file:File
}

export interface ResumeUploadResponse {
    message:string;
    resume:Resume;
    resumeId:string,
    interviewId:string;
}

export interface Resume {
    _id: string;
    fileName: string;
    filePath: string;
    extractedText?: string;
    uploadedAt: string;
}

export interface ResumeState {
    resumes: Resume[];
    isUploadingResume:boolean;
    isLoadingResumes:boolean;
    errorMessage:string | null;
    selectedResumeId: string | null;
    file: File | null;
    uploadSuccess: boolean;
    showPreview: boolean;
    showJobRoleModal: boolean;
}