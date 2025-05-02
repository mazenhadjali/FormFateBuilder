/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import clsx from 'clsx'

interface Props {
    field: { title?: string }
    setField: (value: any) => void
}

const TitleField: React.FC<Props> = ({ field, setField }) => {
    const hasTitle = field.title !== undefined

    return (
        <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-white shadow-sm my-2">
            <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-800">
                    Title
                </label>
                <button
                    type="button"
                    onClick={() =>
                        setField({ ...field, title: hasTitle ? undefined : '' })
                    }
                    className={clsx(
                        'rounded-lg px-2 py-1 font-semibold transition focus:outline-none focus:ring-2', {
                        // when a title exists, show a “Remove” button in red
                        'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400': hasTitle,
                        // otherwise, show a “Set” button in green
                        'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400': !hasTitle,
                    }
                    )}
                >
                    {hasTitle ? 'Remove' : 'Set'}
                </button>
            </div>

            {hasTitle && (
                <input
                    type="text"
                    value={field.title}
                    onChange={(e) =>
                        setField({ ...field, title: e.target.value })
                    }
                    placeholder="Enter title..."
                    className="
            block w-full rounded-lg border border-gray-300
            px-3 py-2 text-gray-900 placeholder-gray-400
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent
            transition
          "
                />
            )}
        </div>
    )
}

export default TitleField
