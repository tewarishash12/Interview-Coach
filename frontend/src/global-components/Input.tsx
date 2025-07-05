import { InputFieldProps, TextAreaFieldProps } from "@/global-components/typechecker/types";
import { forwardRef } from "react";

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
            name,
            type,
            placeholder = "",
            value,
            onChange,
            required = false,
            multiple = false,
            className = "",
        },
        ref
    ) => (
        <input
            ref={ref}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            multiple={multiple}
            className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
        />
    )
);

InputField.displayName = "InputField";

export function CheckBox() {
    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                className="form-checkbox rounded-md text-purple-500 border-gray-300" />
        </label>
    );
}

export function TextAreaField({
    name,
    placeholder = '',
    value,
    onChange,
    required = false,
    rows = 4,
}: TextAreaFieldProps) {
    return (
        <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full resize-none"
        />
    );
}