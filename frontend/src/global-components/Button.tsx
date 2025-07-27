import { ButtonProps } from "@/global-components/typechecker/types"

export function Button1({ children, type="submit",  disabled=false, ...props }: ButtonProps) {
    return (
        <button
        type={type}
        disabled={disabled}
        {...props}
        className={`text-white border border-white rounded-md px-4 py-2 font-semibold  transition cursor-pointer
        ${disabled ? "bg-gray-500 hover:bg-gray-400" : "bg-purple-500 hover:bg-purple-400"}`}>
            {children}
        </button>
    )
}

export function Button2({ children, type="submit",  disabled=false, ...props }: ButtonProps) {
    return (
        <button 
        type={type}
        disabled={disabled}
        {...props}
        className={`text-purple-500 border border-purple-500 rounded-md px-4 py-2 font-semibold  transition cursor-pointer
        ${disabled ? "bg-gray-500 hover:bg-gray-400" : "bg-white hover:bg-gray-100"}`}>
            {children}
        </button>
    )
}

