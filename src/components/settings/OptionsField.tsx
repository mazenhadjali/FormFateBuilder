import React from 'react'

interface Option { label: string; value: string; }

interface Props { field: { options?: Option[] }; setField: (value: any) => void }

const OptionsField: React.FC<Props> = ({ field, setField }) => {
    const options = field.options || []

    const addOption = () => {
        setField(prev => ({
            ...prev,
            options: prev.options ? [...prev.options, { label: '', value: '' }] : [{ label: '', value: '' }],
        }))
    }

    const updateOption = (index: number, key: 'label' | 'value', value: string) => {
        const updatedOptions = [...options]
        updatedOptions[index][key] = value
        setField({ ...field, options: updatedOptions })
    }

    const removeOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index)
        setField({ ...field, options: updatedOptions })
    }

    const clearOptions = () => {
        setField({ ...field, options: undefined })
    }

    const hasOptions = options.length > 0

    return (
        <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-white shadow-sm my-2">
            <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-800">Options</label>
                <button
                    type="button"
                    onClick={hasOptions ? clearOptions : addOption}
                    className={`rounded-lg px-2 py-1 font-semibold transition focus:outline-none focus:ring-2 ${hasOptions
                        ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
                        : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
                        }`}
                >
                    {hasOptions ? 'Clear All' : 'Add Option'}
                </button>
            </div>

            {hasOptions &&
                options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={option.label}
                            onChange={(e) => updateOption(index, 'label', e.target.value)}
                            placeholder="Label"
                            className="flex-1 rounded-lg border border-gray-300 px-2 py-1"
                        />
                        <input
                            type="text"
                            value={option.value}
                            onChange={(e) => updateOption(index, 'value', e.target.value)}
                            placeholder="Value"
                            className="flex-1 rounded-lg border border-gray-300 px-2 py-1"
                        />
                        <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="rounded-lg bg-red-500 text-white px-2 py-1 hover:bg-red-600 transition"
                        >
                            Remove
                        </button>
                    </div>
                ))}

            {hasOptions && (
                <button
                    type="button"
                    onClick={addOption}
                    className="mt-2 w-full rounded-lg bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 transition"
                >
                    Add Another Option
                </button>
            )}
        </div>
    )
}

export default OptionsField
