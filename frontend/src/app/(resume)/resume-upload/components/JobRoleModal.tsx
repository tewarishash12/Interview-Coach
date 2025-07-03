import { useState } from "react";
import { CardLayout } from "@/global-components/Card";
import { Button1, Button2 } from "@/global-components/Button";

export default function JobRoleModal({ onSubmit, onClose }: { onSubmit: (role: string) => void, onClose: () => void }) {
    const [role, setRole] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (role.trim()) {
            onSubmit(role.trim());
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <CardLayout className="p-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">What job role are you targeting?</h2>
                    <button
                        aria-label="Close"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    >x</button>
                </div>
                <p className="text-gray-700 mb-4">
                    Enter the job title or role you want to prepare for. This helps us generate the most relevant interview questions.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g. Frontend Developer, Data Analyst"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        autoFocus
                        required
                    />
                    <div className="flex gap-2 justify-end">
                        <Button2 type="button" onClick={onClose}>Cancel</Button2>
                        <Button1 type="submit">Continue</Button1>
                    </div>
                </form>
            </CardLayout>
        </div>
    );
}
