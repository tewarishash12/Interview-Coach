export interface Resume {
    _id: string;
    user: string; // User ID or populated User object depending on how you're fetching it
    fileName: string;
    filePath: string;
    extractedText?: string;
    uploadedAt: string; // ISO Date string
    createdAt: string;
    updatedAt: string;
}