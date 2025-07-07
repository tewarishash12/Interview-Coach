import { InterviewQuestion } from "@/features/interview/interview.types";
import { InterviewScoreBarChart } from "./InterviewScoreBarChart";
import { InterviewScoreCards } from "./InterviewScoreCards";

export default function InterviewDashboard({ questions }:{questions:InterviewQuestion[]}) {
    return (
        <div>
            <InterviewScoreCards questions={questions} />
            <InterviewScoreBarChart questions={questions} />
        </div>
    );
}
