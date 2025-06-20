import React, { useCallback, useState } from 'react';
import CodeEditor from './CodeEditor';
import { getNthPosition } from '../../utils/helpers';

interface KeyValue {
    key: string;
    value: string;
}

interface OptionsUrl {
    url: string;
    method?: 'GET' | 'POST';
    headers?: Record<string, string>;
    params?: Record<string, string>;
    body?: string;
    mapper?: any;
}

interface Props {
    field: { optionsUrl?: OptionsUrl };
    setField: (value: any) => void;
}

const OptionsUrlField: React.FC<Props> = ({ field, setField }) => {
    const hasOptionsUrl = field.optionsUrl !== undefined;
    const [optionsUrl, setOptionsUrl] = useState(field.optionsUrl)
    const [headers, setHeaders] = React.useState<KeyValue[]>(Object.entries(optionsUrl?.headers || {}).map(([key, value]) => ({ key, value })));
    const [params, setParams] = React.useState<KeyValue[]>(Object.entries(optionsUrl?.params || {}).map(([key, value]) => ({ key, value })));
    const [mapperCode, setMapperCode] = React.useState(() => {
        if (!optionsUrl?.mapper) return '';
        const fnStr = optionsUrl?.mapper.toString();
        if (fnStr.startsWith('function')) {
            return fnStr.trim().substring(getNthPosition(fnStr, '{', 2) + 1, fnStr.lastIndexOf('}')).trim();
        } else {
            const arrowIndex = getNthPosition(fnStr, '{', 2);
            if (arrowIndex !== -1) {
                return fnStr.substring(arrowIndex + 1, fnStr.lastIndexOf('}')).trim();
            }
            return fnStr.trim();
        }
    })

    const updateField = useCallback((key: keyof OptionsUrl, value: any) => {
        setField({
            ...field,
            optionsUrl: {
                ...optionsUrl,
                [key]: value
            }
        });

        setOptionsUrl(prev => {
            const updated = {
                ...prev,
                [key]: value
            };
            // Ensure 'url' is always defined (fallback to empty string if missing)
            return {
                url: updated.url ?? '',
                method: updated.method,
                headers: updated.headers,
                params: updated.params,
                body: updated.body,
                mapper: updated.mapper
            };
        });

    }, [field, optionsUrl, setField]);

    const handleSaveCode = (formattedCode: string) => {
        try {
            const mapperFunction = new Function('{response, formValues}', formattedCode);
            setMapperCode(mapperFunction);
            setField(prev => ({
                ...prev,
                optionsUrl: {
                    ...optionsUrl,
                    mapper: mapperFunction
                }
            }));
        } catch (error: any) {
            console.error('Error updating validator:', error);
            alert('Failed to update validator: ' + error.message);
        }
    };

    const handleKeyValueChange = (list: KeyValue[], setList: React.Dispatch<React.SetStateAction<KeyValue[]>>, index: number, key: 'key' | 'value', value: string) => {
        const updated = [...list];
        updated[index][key] = value;
        setList(updated);
    };

    const syncKeyValueToField = (key: 'headers' | 'params', list: KeyValue[]) => {
        const record = list.reduce((acc, { key, value }) => {
            if (key.trim()) acc[key] = value;
            return acc;
        }, {} as Record<string, string>);
        updateField(key, record);
    };

    const addKeyValue = (setList: React.Dispatch<React.SetStateAction<KeyValue[]>>) => {
        setList(prev => [...prev, { key: '', value: '' }]);
    };

    const removeKeyValue = (setList: React.Dispatch<React.SetStateAction<KeyValue[]>>, index: number) => {
        setList(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4 border border-gray-300 rounded-xl p-4 bg-white shadow-md my-4 mx-auto">
            <div className="container flex justify-between items-center flex-wrap">
                <label className="text-base font-medium text-gray-800">Options URL</label>
                <button
                    type="button"
                    onClick={() => setField({ ...field, optionsUrl: hasOptionsUrl ? undefined : {} })}
                    className={`rounded-lg px-2 py-1 font-semibold transition focus:outline-none focus:ring-2 ${hasOptionsUrl ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400' : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'}`}
                >
                    {hasOptionsUrl ? 'Remove' : 'Set'}
                </button>
            </div>

            {hasOptionsUrl && (
                <div>
                    <div>
                        <label className="block text-sm mb-1">URL</label>
                        <input
                            type="text"
                            value={optionsUrl?.url}
                            onChange={(e) => updateField('url', e.target.value)}
                            placeholder="https://api.example.com"
                            className="w-full rounded-lg border px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Method</label>
                        <select
                            value={optionsUrl?.method}
                            onChange={(e) => updateField('method', e.target.value as 'GET' | 'POST')}
                            className="w-full rounded-lg border px-3 py-2 text-sm"
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                        </select>
                    </div>

                    {[{ label: 'Headers', list: headers, setList: setHeaders, fieldKey: 'headers' }, { label: 'Params', list: params, setList: setParams, fieldKey: 'params' }].map(({ label, list, setList, fieldKey }) => (
                        <div key={fieldKey}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{label}</span>
                                <button
                                    type="button"
                                    onClick={() => addKeyValue(setList)}
                                    className="text-blue-600 text-xs hover:underline"
                                >
                                    + Add
                                </button>
                            </div>
                            {list.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={item.key}
                                        onChange={(e) => handleKeyValueChange(list, setList, index, 'key', e.target.value)}
                                        onBlur={() => syncKeyValueToField(fieldKey as 'headers' | 'params', list)}
                                        placeholder="Key"
                                        className="flex-1 rounded-lg border px-2 py-1 text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={item.value}
                                        onChange={(e) => handleKeyValueChange(list, setList, index, 'value', e.target.value)}
                                        onBlur={() => syncKeyValueToField(fieldKey as 'headers' | 'params', list)}
                                        placeholder="Value"
                                        className="flex-1 rounded-lg border px-2 py-1 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeKeyValue(setList, index)}
                                        className="text-red-500 text-xs hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}

                    {optionsUrl?.method === 'POST' && (
                        <div>
                            <label className="block text-sm mb-1">Body (JSON)</label>
                            <textarea
                                value={optionsUrl?.body || ''}
                                onChange={(e) => updateField('body', e.target.value)}
                                placeholder='{"key":"value"}'
                                className="w-full rounded-lg border px-3 py-2 text-sm"
                                rows={3}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-base font-medium text-gray-800 mb-1">
                            Mapper Function
                        </label>
                        <span className="block text-xs text-gray-500 mb-2">
                            Provide JavaScript code using <code>{'({response, formValues})'}</code>
                        </span>
                        <CodeEditor
                            initialValue={mapperCode}
                            onSave={handleSaveCode}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptionsUrlField;
