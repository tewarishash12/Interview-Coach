// components/ConfirmationModal.tsx
import { CardLayout } from "@/global-components/Card";
import { Button1, Button2 } from "@/global-components/Button";

export default function ConfirmationModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <CardLayout className="p-5">
                <div className="text-xl font-semibold text-gray-900 mb-2">Skip Question?</div>
                <div className="text-gray-700 mb-4">
                    Are you sure you want to skip this question? <br />
                    <span className="text-sm text-gray-500">You won&apos;t be able to return.</span>
                </div>
                <div className="flex gap-3 justify-end">
                    <Button2 onClick={onCancel}>Cancel</Button2>
                    <Button1 onClick={onConfirm}>Yes, Skip</Button1>
                </div>
            </CardLayout>
        </div>
    );
}
