"use client";
import { useEffect, useRef, useState } from "react";
import interviewTips from "@/utils/interviewtips.json"; // Adjust path as needed

function getRandomTipIndex(exclude: number, max: number) {
    let idx = Math.floor(Math.random() * max);
    while (idx === exclude && max > 1) {
        idx = Math.floor(Math.random() * max);
    }
    return idx;
}

export default function Loading() {
    const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * interviewTips.length));
    const [animate, setAnimate] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setAnimate(true);
            setTimeout(() => {
                setTipIndex((prev) => getRandomTipIndex(prev, interviewTips.length));
                setAnimate(false);
            }, 500); // Animation duration
        }, 3000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [tipIndex]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                <div className="mb-8">
                    <svg className="animate-spin h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                </div>
                <div className="relative h-24 w-80 flex items-center justify-center overflow-hidden">
                    <div
                        key={tipIndex}
                        className={`absolute w-full transition-transform duration-500 ease-in-out text-center px-6
                            ${animate ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
                            `}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <div className="text-lg font-semibold text-purple-700">Interview Tip</div>
                        <div className="text-gray-700 mt-2 text-base">{interviewTips[tipIndex].tip}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
