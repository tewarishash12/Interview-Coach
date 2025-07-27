// components/ResumeDeleteModal.tsx
import React from "react";

interface ResumeDeleteModalProps {
    setShowDelete: (val: boolean) => void;
    confirmDelete: () => void;
}

export default function ResumeDeleteModal({
    setShowDelete,
    confirmDelete,
}: ResumeDeleteModalProps) {
    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4 w-sm lg:w-xl">
                <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
                <p className="text-sm text-gray-600">
                    Are you sure you want to delete this resume? This action cannot be undone.
                </p>
                <p className='text-red-600 font-bold'>
                    {"(Warning: This will remove all the interview's associated with this resume as well. And this action cannot be undone)"}
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowDelete(false)}
                        className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
