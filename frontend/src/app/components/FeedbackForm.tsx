"use client";
import { useRef, useState } from "react";
import { Button1 } from "@/global-components/Button";
import { CardLayout } from "@/global-components/Card";
import { InputField, TextAreaField } from "@/global-components/Input";
import { useAppDispatch, useAppSelector } from "@/store";
import { sendFeedback } from "@/features/contact/contactSlice";

export default function FeedbackForm() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { isSendingResponse } = useAppSelector((state) => state.contact);
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [attachments, setAttachments] = useState<FileList | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await dispatch(sendFeedback({ subject, content, attachments }));

        console.log("Form submitted", { subject, content, attachments });

        setSubject("");
        setContent("");
        setAttachments(null);
        if (fileInputRef.current)
            fileInputRef.current.value = ""; // ✅ Clears the actual input field
    };

    // Handler for file input change
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAttachments(e.target.files);
    };

    if (!isAuthenticated)
        return null;

    return (
        <section className="py-16 px-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Contact Us</h2>
            <CardLayout className="p-5">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Subject
                        </label>
                        <InputField
                            name="subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter subject"
                            required
                            className="max-w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <TextAreaField
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={5}
                            placeholder="Write your complaint or suggestion here"
                        />
                    </div>

                    <div>
                        <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                            Attachments (optional)
                        </label>
                        <InputField
                            name="attachments"
                            type="file"
                            multiple={true}
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="mt-1 block w-full text-gray-700"
                        />
                        {attachments && attachments.length > 5 && (
                            <p className="text-red-500 text-sm mt-2">
                                You can only upload up to 5 files.
                            </p>
                        )}

                        {attachments && attachments.length > 0 && (
                            <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                                {Array.from(attachments).map((file, idx) => (
                                    <li key={idx}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Button1
                        type="submit"
                        disabled={isSendingResponse || (attachments?.length ?? 0) > 5}
                    >
                        {isSendingResponse ? "Sending Mail..." : "Send Feedback"}
                    </Button1>
                </form>
            </CardLayout>
        </section>

    );
}
