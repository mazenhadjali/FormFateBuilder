import { FormDefinition } from 'formfatecore';

type Props = { id: string; field: FormDefinition['properties'] }

const FieldCard = ({ id, field }: Props) => {
    if (field.type === 'block') return null;

    return (
        <div className="border p-4 rounded shadow mb-4" key={id}>
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium mb-1" htmlFor={id}>
                    {field.title}
                </label>
                <label className="block text-xs font-medium mb-1" htmlFor={id}>
                    <span className='text-gray-500'>Identifier: </span>
                    <span>{id}</span>
                </label>
            </div>
        </div>
    );
};

export default FieldCard