import React from 'react';
import CreateFieldButton from './CreateFieldButton';

type Field =
    | {
        type: 'text' | 'password';
        title: string;
        placeholder?: string;
        default?: string;
        required?: boolean;
    }
    | BlockField;

type BlockField = {
    type: 'block';
    title: string;
    description?: string;
    properties: Record<string, Field>;
};

type Props = {
    schema: { properties: Record<string, Field> };
};

const FieldCard = ({ id, field }: { id: string; field: Field }) => {
    if (field.type === 'block') return null;

    return (
        <div className="border p-4 rounded shadow mb-4" key={id}>
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium mb-1" htmlFor={id}>
                    {field.title}
                </label>
                <label className="block text-sm font-medium mb-1" htmlFor={id}>
                    {id}
                </label>
            </div>

        </div>
    );
};

function FieldsUIMapper({ schema }: Props) {
    const renderFields = (
        properties: Record<string, Field>,
        pathPrefix = ''
    ): React.ReactNode => {
        return Object.entries(properties).map(([key, value]) => {
            const fieldId = `${pathPrefix}${key}`;

            if (value.type === 'block') {
                return (
                    <div key={fieldId} className="p-4 border rounded mb-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                            <label className="block text-sm font-medium mb-1" htmlFor={fieldId}>
                                {fieldId}
                            </label>
                        </div>

                        {value.description && (<p className="text-sm text-gray-600 mb-2">{value.description}</p>)}
                        <div>{renderFields(value.properties, `${fieldId}.`)}</div>
                        <CreateFieldButton blockIdentifierType='block' blockIdentifier={key} />
                    </div>
                );
            }

            return <FieldCard key={fieldId} id={key} field={value} />;
        });
    };

    return <>{renderFields(schema.properties)}</>;
}

export default FieldsUIMapper;
