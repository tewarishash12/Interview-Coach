import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Header = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">InterviewCoach</Link>
            <nav className="space-x-4">
                {isAuthenticated ? (
                    <>
                        <Link href="/dashboard" className="text-gray-700 dark:text-gray-200">Dashboard</Link>
                        <button className="text-red-500">Logout</button> {/* TODO: wire logout logic */}
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-gray-700 dark:text-gray-200">Login</Link>
                        <Link href="/register" className="text-blue-500">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;