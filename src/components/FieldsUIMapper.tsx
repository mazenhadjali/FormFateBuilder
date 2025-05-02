import React from 'react';
import CreateFieldButton from './CreateFieldButton';
import DeleteFieldButton from './DeleteFieldButton';
import { FormDefinition } from 'formfatecore';
import FieldCard from './FieldCard';

type Props = {
    schema: FormDefinition;
};


function FieldsUIMapper({ schema }: Props) {

    const renderFields = (properties: Record<string, FormDefinition['properties']>): React.ReactNode => {
        return Object.entries(properties).map(([key, value]) => {

            if (value.type === 'block') {
                return (
                    <div key={key} className="p-4 border rounded mb--4 ">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                            <label className="block text-sm font-medium mb-1" htmlFor={key}>
                                {key}
                            </label>
                        </div>
                        {value.description && (<p className="text-sm text-gray-600 mb-2">{value.description}</p>)}
                        <div className="flex justify-end items-center p-2 gap-1">
                            <DeleteFieldButton identifier={key} identifierType='block' />
                            <CreateFieldButton blockIdentifierType='block' blockIdentifier={key} />
                        </div>
                        <div>{renderFields(value.properties)}</div>

                    </div>
                );
            }

            return <FieldCard key={key} id={key} field={value} />;
        });
    };

    return <>{renderFields(schema.properties)}</>;
}

export default FieldsUIMapper;
