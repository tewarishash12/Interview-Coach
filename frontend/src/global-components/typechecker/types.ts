export type ButtonProps  = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
    className ?: string;
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
    className?: string;
}