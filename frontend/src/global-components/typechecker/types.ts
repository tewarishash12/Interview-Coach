export type ButtonProps  = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
    className ?: string;
}

export interface TextAreaFieldProps {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    rows?: number;
}

export type CardProps = {
    children: React.ReactNode
    className ?: string;
}

export type InputFieldProps = {
    name: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    multiple?: boolean
    className?: string;
}