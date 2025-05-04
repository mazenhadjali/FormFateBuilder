import React from 'react'
import { MdDelete } from "react-icons/md";

interface Option { label: string; value: string }

interface Props { field: { options?: Option[] }, setField: (value: any) => void }

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
        <div className="space-y-4 border border-gray-300 rounded-xl p-4 bg-white shadow-md my-4 mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Options</h2>
                <button
                    type="button"
                    onClick={hasOptions ? clearOptions : addOption}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${hasOptions
                        ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
                        : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
                        }`}
                >
                    {hasOptions ? 'Clear All' : 'Add Option'}
                </button>
            </div>

            {hasOptions &&
                options.map((option, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end border-b border-gray-300 pb-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Label</label>
                            <input
                                type="text"
                                value={option.label}
                                onChange={(e) => updateOption(index, 'label', e.target.value)}
                                placeholder="Label"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Value</label>
                            <input
                                type="text"
                                value={option.value}
                                onChange={(e) => updateOption(index, 'value', e.target.value)}
                                placeholder="Value"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="flex justify-end sm:justify-center sm:items-center">
                            <button
                                type="button"
                                onClick={() => removeOption(index)}
                                className="rounded-full bg-white text-red-600 p-2 text-sm hover:bg-red-500 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center gap-2 border border-red-500 max-md:w-full"
                            >
                                <MdDelete />
                                <span className=' font-semibold'>Remove</span>
                            </button>
                        </div>
                    </div>
                ))}

            {hasOptions && (
                <button
                    type="button"
                    onClick={addOption}
                    className="w-full rounded-lg bg-blue-500 text-white px-4 py-2 text-sm hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add Another Option
                </button>
            )}
        </div>
    )
}

export default OptionsField
