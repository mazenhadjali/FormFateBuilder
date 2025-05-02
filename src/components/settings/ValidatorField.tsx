// ValidatorField.tsx
import React, { useState } from 'react';
import CodeEditor from '../CodeEditor';

interface Props {
    field: { validator?: (value: string) => boolean | string };
    setField: (value: any) => void;
}

const ValidatorField: React.FC<Props> = ({ field, setField }) => {
    const [validatorCode] = useState(() => {
        if (!field.validator) return '';
        const fnStr = field.validator.toString();
        if (fnStr.startsWith('function')) {
            return fnStr.trim().substring(fnStr.indexOf('{') + 1, fnStr.lastIndexOf('}'));
        } else {
            const arrowIndex = fnStr.indexOf('{');
            if (arrowIndex !== -1) {
                return fnStr.substring(arrowIndex + 1, fnStr.lastIndexOf('}')).trim();
            }
            return fnStr;
        }
    });

    const handleSave = (formattedCode: string) => {
        try {
            const validatorFunction = new Function('value', 'formValues', formattedCode);
            validatorFunction('test'); // test run
            setField({ ...field, validator: validatorFunction });
        } catch (error: any) {
            console.error('Error updating validator:', error);
            alert('Failed to update validator: ' + error.message);
        }
    };

    return (
        <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-white shadow-sm my-2">
            <label className="block text-base font-medium text-gray-800 mb-1">
                Validator Function
            </label>
            <span>{'(value , formValues) => {'} </span>
            <CodeEditor initialValue={validatorCode} onSave={handleSave} />
        </div>
    );
};

export default ValidatorField;
