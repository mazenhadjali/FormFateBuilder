import { createBlockField, createDataUrlField, createDateField, createEmailField, createRadioField, createSelectField, createSimpleNumberField, createSimplePasswordField, createSimpleTextField, createTextAreaField, createTimeField } from "./fieldFactories";

export const fieldTypes = [
    {
        label: "Text", value: "text",
        factory: () => createSimpleTextField()
    },
    {
        label: "Radio", value: "radio",
        factory: () => createRadioField()
    },
    {
        label: "Select", value: "select",
        factory: () => createSelectField()
    },
    {
        label: "Textarea", value: "textarea",
        factory: () => createTextAreaField()
    },
    {
        label: "Number", value: "number",
        factory: () => createSimpleNumberField()
    },
    {
        label: "Date", value: "date",
        factory: () => createDateField()
    },
    {
        label: "Time", value: "time",
        factory: () => createTimeField()
    },
    {
        label: "URL", value: "url",
        factory: () => createDataUrlField()
    },
    {
        label: "Email", value: "email",
        factory: () => createEmailField()
    },
    {
        label: "Password", value: "password",
        factory: () => createSimplePasswordField()
    },
    {
        label: "Block", value: "block",
        factory: () => createBlockField()
    }
]