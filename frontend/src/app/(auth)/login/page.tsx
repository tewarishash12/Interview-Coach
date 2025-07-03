// app/login/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { CardLayout } from "@/global-components/Card";
import { Button1 } from "@/global-components/Button";
import { InputField } from "@/global-components/Input";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginUser } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, errorMessage } = useAppSelector((state) => state.auth)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const result = await dispatch(loginUser({email,password}))
        if(loginUser.fulfilled.match(result)){
            router.push("/")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <CardLayout className="w-full max-w-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Login</h2>
                <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
                    <InputField
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputField
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button1
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging In" :"Login"}
                    </Button1>
                </form>
                {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
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
