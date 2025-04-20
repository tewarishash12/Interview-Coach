'use client';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import { registerUser } from "@/features/user/userSlice";
import { AppDispatch, RootState } from "@/store"; // adjust path based on your setup
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { isLoading, isError, errorMessage } = useSelector(
        (state: RootState) => state.user
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(result)) {
            // Registration success — redirect to login or dashboard
            router.push("/login");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
            <h2 className="text-xl font-bold">Register</h2>

            <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            {isError && <p className="text-red-500">{errorMessage}</p>}

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
            </Button>
        </form>
    );
}