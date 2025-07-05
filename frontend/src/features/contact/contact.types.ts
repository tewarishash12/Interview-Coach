export interface InitialContactState {
    isSendingResponse: boolean;
    errorMessage: string | null;
}

export interface ContactRequest {
    subject:string;
    content:string;
    attachments: FileList | null;
}