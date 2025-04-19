import React, { useEffect } from 'react';

type ToastProps = {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const colorMap = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    return (
        <div
            className={`fixed bottom-5 right-5 text-white px-4 py-2 rounded shadow-lg z-50 ${colorMap[type]}`}
        >
            {message}
        </div>
    );
};

export default Toast;