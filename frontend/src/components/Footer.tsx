import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} InterviewCoach. All rights reserved.
        </footer>
    );
};

export default Footer;