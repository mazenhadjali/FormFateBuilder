import React from 'react'
import clsx from 'clsx'

interface Props {
    field: { default?: string }
    setField: (value: any) => void
}

const DefaultField: React.FC<Props> = ({ field, setField }) => {
    const hasDefault = field.default !== undefined

    return (
        <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-white shadow-sm my-2">
            <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-800">Default Value</label>
                <button
                    type="button"
                    onClick={() => setField({ ...field, default: hasDefault ? undefined : '' })}
                    className={clsx(
                        'rounded-lg px-2 py-1 font-semibold transition focus:outline-none focus:ring-2',
                        {
                            'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400': hasDefault,
                            'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400': !hasDefault,
                        }
                    )}
                >
                    {hasDefault ? 'Remove' : 'Set'}
                </button>
            </div>

            {hasDefault && (
                <input
                    type="text"
                    value={field.default}
                    onChange={(e) => setField({ ...field, default: e.target.value })}
                    placeholder="Enter default value..."
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
            )}
        </div>
    )
}

export default DefaultField
