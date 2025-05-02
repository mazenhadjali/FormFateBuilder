import useStore from '../store';

type DeleteFieldButtonProps = {
    identifier: string;
    identifierType: "block" | "field";
}
function DeleteFieldButton({ identifier, identifierType }: DeleteFieldButtonProps) {
    const { removeField } = useStore();

    const onSubmit = () => {
        removeField(identifier);
    }

    return (
        <div className='flex items-center justify-around my-1'>
            <button onClick={onSubmit} className="inline-flex items-center px-2 py-1 font-medium text-sm text-white bg-red-600 border rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition">
                {identifierType === "block" ? "Delete Block" : "Delete Field"}
            </button>
        </div>
    )
}

export default DeleteFieldButton