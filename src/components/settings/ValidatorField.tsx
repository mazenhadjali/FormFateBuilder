import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface Props {
    field: { validator?: (value: string) => boolean | string };
    setField: (value: any) => void;
}

const ValidatorField: React.FC<Props> = ({ field, setField }) => {
    const [validatorCode, setValidatorCode] = useState(() => {
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

    const handleSave = () => {
        try {
            const validatorFunction = new Function('value', validatorCode);
            validatorFunction('test'); // test run
            setField({ ...field, validator: validatorFunction });
            alert('Validator updated successfully!');
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
            <CodeMirror
                value={validatorCode}
                height="200px"
                extensions={[javascript({ jsx: true })]}
                onChange={(value) => setValidatorCode(value)}
                basicSetup={{ lineNumbers: true, foldGutter: true }}
            />
            <div className="mt-2 flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ValidatorField;
