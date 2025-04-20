"use client"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/user/userSlice"; // Import the loginUser thunk
import Button from "@/components/Button";
import { RootState, AppDispatch } from "@/store"; // Import RootState and AppDispatch
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch here
    const { isLoading, isError, errorMessage } = useSelector(
        (state: RootState) => state.user
    );
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Dispatch the loginUser thunk with email and password
        await dispatch(loginUser({ email, password }));
        router.push("/dashboard");
    };

    return (
        <form className="max-w-sm mx-auto space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold">Login</h2>
            {isError && errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
            )}
            <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
}
