import ResumeUploadForm from "@/app/(resume)/resume-upload/components/ResumeUploadForm";
import ResumeUploadInstructions from "@/app/(resume)/resume-upload/components/ResumeUploadInstructions";
import { CardLayout } from "@/global-components/Card";

export default function ResumeUploadPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
            <div className="w-full max-w-7xl min-h-[80vh] flex flex-col items-center space-y-10">
                <CardLayout className="w-full h-[40vh]">
                    <ResumeUploadForm />
                </CardLayout>
                <CardLayout className="w-full h-[40vh]">
                    <ResumeUploadInstructions />
                </CardLayout>
            </div>
        </div>
    );
}