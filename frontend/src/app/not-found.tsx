// app/not-found.tsx
"use client";
import { Button1 } from "@/global-components/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
            <div className="bg-white rounded-md shadow border border-gray-200 px-8 py-12 flex flex-col items-center">
                <div className="text-7xl mb-4">🔎</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</div>
                <div className="text-gray-700 mb-6 text-center max-w-md">
                    Sorry, we couldn&apos;t find the page you were looking for.<br />
                    Please check the URL or return to the homepage.
                </div>
                <Button1 onClick={() => router.push("/")}>Go Home</Button1>
            </div>
        </div>
    );
}
