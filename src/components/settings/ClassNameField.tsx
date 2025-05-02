import React from 'react'

interface Props {
    field: { className?: string }
    setField: (value: any) => void
}

const ClassNameField: React.FC<Props> = ({ field, setField }) => {
    const hasClassName = field.className !== undefined

    return (
        <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-white shadow-sm my-2">
            <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-800">ClassName</label>
                <button
                    type="button"
                    onClick={() => setField({ ...field, className: hasClassName ? undefined : '' })}
                    className={`rounded-lg px-2 py-1 font-semibold transition focus:outline-none focus:ring-2 ${hasClassName
                        ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
                        : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
                        }`}
                >
                    {hasClassName ? 'Remove' : 'Set'}
                </button>
            </div>

            {hasClassName && (
                <input
                    type="text"
                    value={field.className}
                    onChange={(e) => setField({ ...field, className: e.target.value })}
                    placeholder="Enter classname..."
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
            )}
        </div>
    )
}

export default ClassNameField
