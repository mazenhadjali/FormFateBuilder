// ValidatorField.tsx
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import clsx from 'clsx';

interface Props {
    field: { validator?: (value: string) => boolean | string };
    setField: (value: any) => void;
}

const ValidatorField: React.FC<Props> = ({ field, setField }) => {
    const hasValidator = field.validator !== undefined

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
            <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-800">Validator Function</label>
                <button
                    type="button"
                    onClick={() => setField({ ...field, validator: hasValidator ? undefined : '' })}
                    className={clsx(
                        'rounded-lg px-2 py-1 font-semibold transition focus:outline-none focus:ring-2',
                        {
                            'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400': hasValidator,
                            'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400': !hasValidator,
                        }
                    )}
                >
                    {hasValidator ? 'Remove' : 'Set'}
                </button>
            </div>
            {hasValidator && (
                <div className="">
                    <label className="block text-base font-medium text-gray-800 mb-1">
                        Validator Function
                    </label>
                    <span>{'(value , formValues) => {'} </span>
                    <CodeEditor initialValue={validatorCode} onSave={handleSave} />
                </div>
            )}

        </div>
    );
};

export default ValidatorField;
