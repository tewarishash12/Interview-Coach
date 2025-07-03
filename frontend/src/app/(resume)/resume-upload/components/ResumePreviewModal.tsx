// components/ResumePreviewModal.tsx
import { CardLayout } from "@/global-components/Card";
import { Button2 } from "@/global-components/Button";

export default function ResumePreviewModal({
    file,
    onClose
}: {
    file: File;
    onClose: () => void;
}) {
    const isPDF = file.name.endsWith(".pdf");
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <CardLayout className="p-5">
                <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold text-gray-900">Resume Preview</div>
                    <Button2 onClick={onClose}>Close</Button2>
                </div>
                <div className="bg-gray-100 rounded-md p-4 min-h-[200px] flex items-center justify-center">
                    {isPDF ? (
                        <CardLayout className="text-sm w-full py-10 px-5 text-gray-700">This feature is under development and will be available soon</CardLayout>
                    ) : (
                        <span className="text-sm text-gray-700">Uploaded: <b>{file.name}</b></span>
                    )}
                </div>
            </CardLayout>
        </div>
    );
}
