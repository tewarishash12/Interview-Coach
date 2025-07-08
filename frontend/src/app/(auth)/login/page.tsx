// app/login/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CardLayout } from "@/global-components/Card";
import { Button1 } from "@/global-components/Button";
import { InputField } from "@/global-components/Input";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearMessages, loginUser } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoggingIn, errorMessage, successMessage } = useAppSelector((state) => state.auth)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        dispatch(clearMessages());
    },[dispatch])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = await dispatch(loginUser({ email, password }))
        if (loginUser.fulfilled.match(result)) {
            dispatch(clearMessages());
            router.push("/")
        }
        setTimeout(()=>{
            clearMessages();
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <CardLayout className="w-full max-w-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Login</h2>
                <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
                    <InputField
                        name="email"
                        type="email"
                        placeholder="johndoe@xyz.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputField
                        name="password"
                        type="password"
                        placeholder="john@123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button1
                        type="submit"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? "Logging In" : "Login"}
                    </Button1>
                </form>
                {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
                <div className="mt-4 text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-purple-600 hover:underline">
                        Register
                    </Link>
                </div>
            </CardLayout>
        </div>
    );
}
