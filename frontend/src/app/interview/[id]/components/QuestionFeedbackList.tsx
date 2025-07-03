import { InterviewQuestion } from "@/features/interview/interview.types";
import QuestionFeedbackCard from "./QuestionFeedbackCard";

export default function QuestionFeedbackList({ questions }:{questions: InterviewQuestion[]}) {
    return (
        <div className="space-y-4">
            <div className="text-xl font-semibold text-gray-900 mb-2">Questions & Feedback</div>
            {questions.map((q, idx) => (
                <QuestionFeedbackCard key={idx} question={q} index={idx + 1} />
            ))}
        </div>
    );
}
