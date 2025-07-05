"use client";
import { CardLayout } from "@/global-components/Card";
import { Button1, Button2 } from "@/global-components/Button";
import VoiceRecorder from "./VoiceRecorder";
import { useAppDispatch, useAppSelector } from "@/store";
import { answerFeedback, goToNextQuestion, setShowConfirm } from "@/features/questions/questionSlice";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";
import FeedbackLoadingOverlay from "./FeedbackLoadingOverlay";
import { resetTranscription } from "@/features/audio/audioSlice";

export default function SingleQuestionCard() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { questions, showConfirm, current } = useAppSelector((state) => state.question);
    const { isLoadingAudio, transcribe } = useAppSelector((state) => state.audio);
    const question = questions[current];

    function handleSkip() {
        dispatch(setShowConfirm(true));
    }

    if (!question) {
        return <div>Loading question...</div>;
    }

    async function confirmSkip() {
        dispatch(setShowConfirm(false));

        const data = { question: question.question, expectedKeywords: question.expectedKeywords || [], transcript: 'unattempted', interviewId: localStorage.getItem('interviewId') ?? '' };
        await dispatch(answerFeedback(data));
        if (current + 1 < questions.length) {
            dispatch(goToNextQuestion());
        } else {
            // Last question, save the interview
            router.push(`/interview/${localStorage.getItem("interviewId")}`);
        }
    }

    // Feedback slice would be present inside onSubmit
    async function handleSubmit() {
        if (!transcribe)
            return alert("Record you answer before clicking submit");

        const data = { question: question.question, expectedKeywords: question.expectedKeywords || [], transcript: transcribe, interviewId: localStorage.getItem('interviewId') ?? '' };

        const res = await dispatch(answerFeedback(data));
        if (answerFeedback.fulfilled.match(res)) {
            if (current + 1 < questions.length) {
                dispatch(goToNextQuestion());
                dispatch(resetTranscription());
            } else {
                router.push(`/interview/${localStorage.getItem("interviewId")}`); // Change to your target route
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
                    disabled={isLoadingAudio}>
                    Submit Answer
                </Button1>
            </div>

            {showConfirm && (
                <ConfirmationModal
                    onConfirm={confirmSkip}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            {isLoadingAudio && <FeedbackLoadingOverlay />}
        </CardLayout>
    );
}
