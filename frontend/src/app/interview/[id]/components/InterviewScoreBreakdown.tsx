import { InterviewQuestions } from "@/features/questions/questions.types";
import { InterviewScoreBarChart } from "./InterviewScoreBarChart";
import { InterviewScoreCards } from "./InterviewScoreCards";

export default function InterviewDashboard({ questions }:{questions:InterviewQuestions[]}) {
    return (
        <div>
            <InterviewScoreCards questions={questions} />
            <InterviewScoreBarChart questions={questions} />
        </div>
    );
}
