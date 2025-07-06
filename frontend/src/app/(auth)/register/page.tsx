// app/register/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { CardLayout } from "@/global-components/Card";
import { Button1 } from "@/global-components/Button";
import { InputField } from "@/global-components/Input";
import { useAppDispatch, useAppSelector } from "@/store";
import { registerUser } from "@/features/auth/authSlice";

export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const { isRegisteringIn, errorMessage, successMessage } = useAppSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await dispatch(registerUser({ name, email, password }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <CardLayout className="w-full max-w-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Register</h2>
                <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
                    <InputField
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        disabled={isRegisteringIn}
                    >
                        {isRegisteringIn ? "Registering..." : "Register"}
                    </Button1>
                </form>
                {successMessage && (
                    <div className="text-green-600 mt-2">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
                <div className="mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-purple-600 hover:underline">
                        Login
                    </Link>
                </div>
            </CardLayout>
        </div>
    );
}
