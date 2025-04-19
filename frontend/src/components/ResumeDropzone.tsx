'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ResumeDropzone: React.FC = () => {
    const [fileName, setFileName] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setFileName(file.name);

            // TODO: Integrate backend upload logic here
            // Example:
            // const formData = new FormData();
            // formData.append('resume', file);
            // await resumeService.uploadResume(formData);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="text-gray-600 dark:text-gray-300">Drop your resume here...</p>
            ) : fileName ? (
                <p className="text-green-600 dark:text-green-400">Uploaded: {fileName}</p>
            ) : (
                <p className="text-gray-600 dark:text-gray-300">
                    Drag & drop your resume here or click to upload (PDF/DOCX)
                </p>
            )}
        </div>
    );
};

export default ResumeDropzone;