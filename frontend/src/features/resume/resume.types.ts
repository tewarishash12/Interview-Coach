export interface ResumeUpload {
    file:File
}

export interface ResumeUploadResponse {
    message:string;
    resumeId:string;
    extractedText: string;
    resume:Resume;
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
    loading:boolean;
    errorMessage:string | null;
    file: File | null;
    resumeText: string;
    uploadSuccess: boolean;
    showPreview: boolean;
    showJobRoleModal: boolean;
    resumeId?:string;
    resume?: File;
}