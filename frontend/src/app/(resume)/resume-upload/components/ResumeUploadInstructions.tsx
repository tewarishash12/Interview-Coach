export default function ResumeUploadInstructions() {
    return (
        <div className="h-[40vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-xl font-semibold text-gray-900 mb-1">
                    Upload Your Resume
                </div>
                <div className="text-gray-700">
                    Upload your resume in <span className="font-medium text-purple-600">PDF</span> or <span className="font-medium text-purple-600">DOCX</span> format.
                    <br />
                    We&apos;ll analyze your resume and generate role-specific interview questions.
                </div>
            </div>
        </div>
    );
}
