import { FormDefinition } from 'formfatecore';
import DeleteFieldButton from './DeleteFieldButton';
import UpdateFieldButton from './UpdateFieldButton';

type Props = { id: string; field: FormDefinition['properties'] }

const FieldCard = ({ id, field }: Props) => {
    if (field.type === 'block') return null;

    return (
        <div className="[&:has(button:hover)]:border-blue-300 border-2 border-gray-300 py-1 px-3 rounded shadow mb-4 transition">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium mb-1" htmlFor={id}>
                    <span className='text-gray-500'>Title: </span>
                    <span>{field.title}</span>
                </label>
                <label className="block text-xs font-medium mb-1" htmlFor={id}>
                    <span className='text-gray-500'>Identifier:</span>
                    <span>{id}</span>
                </label>
            </div>
            <div className='flex justify-start items-center p-2 gap-1'>
                <UpdateFieldButton identifier={id} identifierType='field' />
                <DeleteFieldButton identifier={id} identifierType='field' />
            </div>
        </div>
    );
};

export default FieldCard