/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
interface Props {
    field: { required?: boolean }
    setField: (value: any) => void
}

const RequiredField: React.FC<Props> = ({ field, setField }) => {
    const isRequired = field.required === true

    return (
        <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-white shadow-sm my-2">
            <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-800">
                    Required {isRequired ? '(True)' : '(False)'}
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isRequired}
                        onChange={() => setField({ ...field, required: !isRequired })}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>

                </label>
            </div>
        </div>
    )
}

export default RequiredField
