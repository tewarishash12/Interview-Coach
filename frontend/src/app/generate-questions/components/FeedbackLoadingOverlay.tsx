// components/FeedbackLoadingOverlay.tsx
export default function FeedbackLoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow p-8 flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <div className="text-gray-700 font-semibold text-lg">Evaluating your answer…</div>
            </div>
        </div>
    );
}
