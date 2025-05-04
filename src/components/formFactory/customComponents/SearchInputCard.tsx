import React from "react";
import { useFormField } from "react-form-fate";
import { ControllerRenderProps } from "react-hook-form";
import { MdSearch } from "react-icons/md";

export interface SearchInputProps {
    fieldConfig: {
        title?: string;
        placeholder?: string;
        className?: string;
        [key: string]: unknown;
    };
    field: ControllerRenderProps;
}

export const SearchInputCard: React.FC<SearchInputProps> = ({ field, fieldConfig }) => {
    const { error } = useFormField();

    return (
        <div className={`p-4 bg-white rounded-2xl shadow-md ${fieldConfig.className || ""}`}>
            {fieldConfig.title && (
                <label
                    htmlFor={field.name}
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    {fieldConfig.title}
                </label>
            )}

            <div className={`relative`}>
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    {...field}
                    type="search"
                    placeholder={fieldConfig.placeholder || "Search..."}
                    className={`w-full pl-10 pr-4 py-2 border ${error ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 ${error ? "focus:ring-red-400" : "focus:ring-blue-400"
                        } transition`}
                />
            </div>

            {error?.message && (
                <p className="mt-2 text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
};

export default SearchInputCard;
