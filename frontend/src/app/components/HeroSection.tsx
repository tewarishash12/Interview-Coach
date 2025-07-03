// components/HeroSection.tsx
"use client";
import { Button1, Button2 } from "@/global-components/Button";
import { useAppSelector } from "@/store";

export default function HeroSection() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <section className="bg-purple-50 py-16 px-4 text-center h-[60vh] flex items-center justify-center flex-col">
            {isAuthenticated ? <LoggedInView /> : <NonLoggedInView />}
        </section>
    );
}

export function NonLoggedInView() {
    return (
        <>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
                Ace Your Next Interview with AI Coaching
            </h1>
            <p className="text-xl text-gray-700 mb-10">
                Practice real interview questions, get instant feedback, and land your dream job.
            </p>
            <div className="flex justify-center gap-4 ">
                <Button1>Start Practicing</Button1>
                <Button2>See Features</Button2>
            </div>
        </>
    );
}

export function LoggedInView() {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Welcome back {user?.name}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
                Ready to continue your journey? Pick up where you left off or explore new challenges.
            </p>
            <div className="flex justify-center gap-4">
                <Button1>Resume Practice</Button1>
                <Button2>View Dashboard</Button2>
            </div>
        </>
    );
}