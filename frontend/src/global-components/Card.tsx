import { CardProps } from "@/global-components/typechecker/types";

export function CardLayout({children, className =""}:CardProps) {
    return (
        <div className={`bg-white rounded-md shadow border border-gray-200 ${className}`}>
            {children}
        </div>
    )
}
