/* eslint-disable @typescript-eslint/no-explicit-any */
import { blockFieldInterface, booleanFieldInterface, checkboxFieldInterface, customFieldInterface, dataUrlFieldInterface, dateFieldInterface, radioFieldInterface, selectFieldInterface, simpleNumberFieldInterface, simpleTextFieldInterface, textAreaFieldInterface, timeFieldInterface } from 'formfatecore'

// Union of all field types for generic modifiers
export type AnyField =
    | simpleTextFieldInterface
    | dateFieldInterface
    | timeFieldInterface
    | dataUrlFieldInterface
    | selectFieldInterface
    | radioFieldInterface
    | simpleNumberFieldInterface
    | booleanFieldInterface
    | checkboxFieldInterface
    | customFieldInterface
    | blockFieldInterface
    | textAreaFieldInterface;


// ----------------------------------------
// Factory functions
// ----------------------------------------
export function createSimpleTextField(): simpleTextFieldInterface {
    return { type: 'text', placeholder: 'Enter text', title: 'Text Field', required: false };
}
export function createSimplePasswordField(): simpleTextFieldInterface {
    return { type: 'password', placeholder: 'Enter password', title: 'Password Field', required: false };
}
// email
export function createEmailField(): simpleTextFieldInterface {
    return { type: 'email', placeholder: 'Enter email', title: 'Email Field', required: false };
}

export function createDateField(): dateFieldInterface {
    return { type: 'date', placeholder: 'YYYY-MM-DD', title: 'Date Field', required: false };
}
export function createTimeField(): timeFieldInterface {
    return { type: 'time', placeholder: 'HH:MM', title: 'Time Field', required: false };
}
export function createDataUrlField(): dataUrlFieldInterface {
    return { type: 'url', placeholder: 'https://example.com', title: 'Data URL Field', required: false };
}
export function createSelectField(): selectFieldInterface {
    return {
        type: 'select',
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ], title: 'Select Field', required: false
    };
}
export function createRadioField(): radioFieldInterface {
    return {
        type: 'radio', options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ], title: 'Radio Field', required: false
    };
}
export function createSimpleNumberField(): simpleNumberFieldInterface {
    return { type: 'number', placeholder: 'Enter number', title: 'Number Field', required: false };
}
export function createBooleanField(): booleanFieldInterface {
    return { type: 'boolean', placeholder: 'true/false', title: 'Boolean Field', required: false };
}
export function createTextAreaField(): textAreaFieldInterface {
    return { type: 'textarea', placeholder: 'Enter text', title: 'Text Area Field', required: false };
}
export function createBlockField(): blockFieldInterface {
    return { type: 'block', title: 'Block Field' , properties: {} };
}
