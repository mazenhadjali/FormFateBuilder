import { customFieldsTypes } from "../components/formFactory/components";
import { createBlockField, createDataUrlField, createDateField, createEmailField, createRadioField, createSelectField, createSimpleNumberField, createSimplePasswordField, createSimpleTextField, createTextAreaField, createTimeField } from "./fieldFactories";

export const fieldTypes = [
    {
        label: "Text", type: "text",
        factory: () => createSimpleTextField()
    },
    {
        label: "Radio", type: "radio",
        factory: () => createRadioField()
    },
    {
        label: "Select", type: "select",
        factory: () => createSelectField()
    },
    {
        label: "Textarea", type: "textarea",
        factory: () => createTextAreaField()
    },
    {
        label: "Number", type: "number",
        factory: () => createSimpleNumberField()
    },
    {
        label: "Date", type: "date",
        factory: () => createDateField()
    },
    {
        label: "Time", type: "time",
        factory: () => createTimeField()
    },
    {
        label: "URL", type: "url",
        factory: () => createDataUrlField()
    },
    {
        label: "Email", type: "email",
        factory: () => createEmailField()
    },
    {
        label: "Password", type: "password",
        factory: () => createSimplePasswordField()
    },
    {
        label: "Block", type: "block",
        factory: () => createBlockField()
    },
    ...customFieldsTypes
]