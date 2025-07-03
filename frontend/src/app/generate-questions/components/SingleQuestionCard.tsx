"use client";
import { CardLayout } from "@/global-components/Card";
import { Button1, Button2 } from "@/global-components/Button";
import VoiceRecorder from "./VoiceRecorder";
import { useAppDispatch, useAppSelector } from "@/store";
import { answerFeedback, goToNextQuestion, saveAnswer, saveInterview, setShowConfirm, setSkippedQuestions } from "@/features/questions/questionSlice";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";
import FeedbackLoadingOverlay from "./FeedbackLoadingOverlay";
import { resetTranscription } from "@/features/audio/audioSlice";

export default function SingleQuestionCard() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { jobRole, resumeId, questions, showConfirm, current } = useAppSelector((state) => state.question);
    const { isLoading, transcribe } = useAppSelector((state) => state.audio);
    const question = questions[current];

    function handleSkip() {
        dispatch(setShowConfirm(true));
    }

    function confirmSkip() {
    dispatch(setShowConfirm(false));
    dispatch(setSkippedQuestions());

    if (current + 1 < questions.length) {
        // Not the last question
        dispatch(goToNextQuestion());
    } else {
        // Last question, save the interview
        dispatch(saveInterview({ questions, jobRole, resumeId }));
        router.push("/");
    }
}

    // Feedback slice would be present inside onSubmit
    async function handleSubmit() {
        if (!transcribe)
            return alert("Record you answer before clicking submit");

        dispatch(saveAnswer(transcribe))
        const data = { question: question.question, expectedKeywords: question.expectedKeywords || [], transcript: transcribe };

        const res = await dispatch(answerFeedback(data));
        if (answerFeedback.fulfilled.match(res)) {
            if (current + 1 < questions.length) {
                dispatch(goToNextQuestion());
                dispatch(resetTranscription());
            } else {
                dispatch(saveInterview({questions,jobRole,resumeId}))
                router.push("/"); // Change to your target route
            }
        }
    }

    return (
        <CardLayout className="p-10">
            <div className="mb-4">
                <div className="text-xl font-semibold text-gray-900 mb-2">Question {current + 1}</div>
                <div className="text-gray-700 mb-4">{question.question}</div>
                <VoiceRecorder
                />
            </div>
            <div className="flex justify-around mt-6">
                <Button2 onClick={handleSkip}>Skip Question</Button2>
                <Button1
                    onClick={handleSubmit}
                    disabled={isLoading}>
                    Submit Answer
                </Button1>
            </div>

            {showConfirm && (
                <ConfirmationModal
                    onConfirm={confirmSkip}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            {isLoading && <FeedbackLoadingOverlay />}
        </CardLayout>
    );
}
