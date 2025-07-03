import QuestionProgressIndicator from "@/app/generate-questions/components/QuestionProgressGenerator";
import SingleQuestionCard from "@/app/generate-questions/components/SingleQuestionCard";

export default function GenerateQuestionsPage() {

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-xl space-y-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Practice Session</h1>
                    <p className="text-gray-700 text-lg">
                        Answer each question using your voice. Your responses will be analyzed for feedback.
                    </p>
                </div>
                <QuestionProgressIndicator />
                <SingleQuestionCard />
            </div>
        </div>
    );
}
