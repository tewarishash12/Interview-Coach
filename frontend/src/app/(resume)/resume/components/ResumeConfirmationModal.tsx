"use client"

import { Button1, Button2 } from '@/global-components/Button'
import React from 'react'

interface ResumeConfirmationModalProps {
    setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    confirmUseResume: () => void;
}

export default function ResumeConfirmationModal({ setShowConfirm, confirmUseResume }: ResumeConfirmationModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                <h2 className="text-xl font-semibold mb-4">Use This Resume?</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to use this resume to generate interview questions?</p>
                <div className="flex justify-end gap-4">
                    <Button2 onClick={() => setShowConfirm(false)}>Cancel</Button2>
                    <Button1 onClick={confirmUseResume}>Confirm</Button1>
                </div>
            </div>
        </div>
    )
}
