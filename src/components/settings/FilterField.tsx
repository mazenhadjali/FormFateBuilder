import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import clsx from 'clsx';
import { getNthPosition } from '../../utils/helpers';

interface Props {
    field: { filterFunction?: (value: any, formValues?: any) => boolean };
    setField: (value: any) => void;
}

const FilterField: React.FC<Props> = ({ field, setField }) => {
    const hasFilter = field.filterFunction !== undefined;

    const [filterCode] = useState(() => {
        if (!field.filterFunction) return '';
        const fnStr = field.filterFunction.toString();
        if (fnStr.startsWith('function')) {
            return fnStr.trim().substring(getNthPosition(fnStr, '{', 2) + 1, fnStr.lastIndexOf('}')).trim();
        } else {
            const arrowIndex = getNthPosition(fnStr, '{', 2);
            if (arrowIndex !== -1) {
                return fnStr.substring(arrowIndex + 1, fnStr.lastIndexOf('}')).trim();
            }
            return fnStr.trim();
        }
    });

    const handleSave = (formattedCode: string) => {
        try {
            const filterFunction = new Function('{options, formValues}', formattedCode);
            setField({ ...field, filterFunction });
        } catch (error: any) {
            console.error('Error updating filter function:', error);
            alert('Failed to update filter function: ' + error.message);
        }
    };

    return (
        <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-white shadow-sm my-2">
            <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-800">Filter Function</label>
                <button
                    type="button"
                    onClick={() => setField({ ...field, filterFunction: hasFilter ? undefined : '' })}
                    className={clsx(
                        'rounded-lg px-2 py-1 font-semibold transition focus:outline-none focus:ring-2',
                        {
                            'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400': hasFilter,
                            'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400': !hasFilter,
                        }
                    )}
                >
                    {hasFilter ? 'Remove' : 'Set'}
                </button>
            </div>
            {hasFilter && (
                <div>
                    <span className="text-sm text-gray-500">{'({options, formValues})'}</span>
                    <CodeEditor initialValue={filterCode} onSave={handleSave} />
                </div>
            )}
        </div>
    );
};

export default FilterField;
