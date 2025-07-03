import { Button1 } from "@/global-components/Button";
import { useRouter } from "next/navigation";

export function EmptyState() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="text-3xl mb-4">📄</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">You haven&apos;t uploaded any resumes yet.</div>
            <div className="text-gray-700 mb-4">Upload your resume to start practicing interviews.</div>
            <Button1 onClick={() => router.push("/resume-upload")}>Upload Resume</Button1>
        </div>
    );
}
