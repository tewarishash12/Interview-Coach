"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CardLayout } from "@/global-components/Card";
import { useAppDispatch, useAppSelector } from "@/store";
import { verifyEmail } from "@/features/auth/authSlice";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isVerifyingToken } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) return;

        async function mailVerification() {
            try {
                await dispatch(verifyEmail(token ??'')).unwrap();
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            } catch (error) {
                console.error("❌ Verification failed:", error);
            }
        }

        mailVerification();
    }, [searchParams, dispatch, router]);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <CardLayout className="p-8 max-w-md w-full flex flex-col items-center gap-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</div>
                {isVerifyingToken && (
                    <div className="flex flex-col items-center gap-4">
                        <svg className="animate-spin h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <div className="text-gray-700 text-base">Verifying your email, please wait...</div>
                    </div>
                )}
            </CardLayout>
        </section>
    );
}
