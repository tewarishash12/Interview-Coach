// components/Navbar.tsx
"use client";
import Link from "next/link";
import { Button1, Button2 } from "@/global-components/Button";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const { isAuthenticated, isLoggingOut } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    async function handleLogout() {
        const res = await dispatch(logoutUser());
        if (logoutUser.fulfilled.match(res))
            router.push("/")
    }

    return (
        <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-6">
                <Link href="/" className="text-2xl font-bold text-purple-600">
                    AI Interview Coach
                </Link>
                <div className="hidden md:flex space-x-4 text-gray-700 font-medium">
                    <Link href="/">Home</Link>
                    {isAuthenticated ?
                        (
                            <>
                                <Link href="/resume-upload">Resume Upload</Link>
                                <Link href="/resume">Resumes</Link>
                                <Link href="/interview">Interviews</Link>
                            </>
                        )
                        :
                        (
                            <>
                                <Link href="/dashboard">Dashboard</Link>
                                <Link href="/history">Practice History</Link>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="flex items-center space-x-2">
                {!isAuthenticated ? (
                    <>
                        <Link href="/login">
                            <Button2>Login</Button2>
                        </Link>
                        <Link href="/register">
                            <Button1>Register</Button1>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/profile">
                            <Button2>
                                Profile
                            </Button2>
                        </Link>
                        <Button1
                            onClick={handleLogout}
                        >
                            {isLoggingOut ? "Logging Out" : "Logout"}
                        </Button1>
                    </>
                )}
            </div>
        </nav>
    );
}
