import { useModal } from '../modal/context';

type CreateFieldButtonProps = {
    blockIdentifierType: "root" | "block";
    blockIdentifier?: string;
}
function CreateFieldButton({ blockIdentifierType, blockIdentifier }: CreateFieldButtonProps) {
    const { pushModal } = useModal();

    const onSubmit = () => {
        pushModal({ type: 'createField', params: { blockIdentifierType, blockIdentifier } });
    }

    return (
        <div className='flex items-center justify-around my-1'>
            <button onClick={onSubmit} className="inline-flex items-center px-2 py-1  font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Create Field
            </button>
        </div>
    )
}

export default CreateFieldButton