import { InputFieldProps } from "@/global-components/typechecker/types";

export function InputField({
    name,
    type,
    placeholder ='',
    value,
    onChange,
    required = false
}: InputFieldProps) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
    )
}

export function CheckBox() {
    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                className="form-checkbox rounded-md text-purple-500 border-gray-300" />
        </label>
    );
}