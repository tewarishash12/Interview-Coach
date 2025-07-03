import { Button2 } from "@/global-components/Button";

export default function UploadStatus({
    loading,
    errorMessage,
    onRetry,
    success
}: {
    loading: boolean;
    errorMessage: string | null;
    success: boolean;
    onRetry: () => void;
}) {
    if (!loading && !errorMessage && !success) return null;

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-purple-500">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="font-medium">Uploading...</span>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex items-center space-x-2 text-green-600 font-medium">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Upload successful! Redirecting...</span>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="flex items-center space-x-2 text-red-500">
                <span className="font-medium">Upload failed. {errorMessage}</span>
                <Button2 onClick={onRetry}>Retry</Button2>
            </div>
        );
    }

    return null;
}   