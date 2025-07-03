import { useAppSelector } from "@/store";
import { ResumeCard } from "./ResumeCard";
import { EmptyState } from "./EmptyStatePage";

export function ResumeGrid() {
    const {resumes} = useAppSelector((state)=>state.resume);

    if(resumes.length===0)
        return <EmptyState />

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
                <ResumeCard key={resume._id} resume={resume} />
            ))}
        </div>
    );
}
