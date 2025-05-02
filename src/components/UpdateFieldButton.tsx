import { useModal } from "../modal/context";

type UpdateFieldButtonProps = {
    identifier: string;
    identifierType: "block" | "field";
}
function UpdateFieldButton({ identifier, identifierType }: UpdateFieldButtonProps) {
    const { pushModal } = useModal();

    const onSubmit = () => {
        pushModal({
            type: 'updateField', params: {
                identifier,
                identifierType
            }
        })
    }

    return (
        <div className='flex items-center justify-around my-1'>
            <button onClick={onSubmit} className="inline-flex items-center px-2 py-1 font-medium text-sm text-white bg-orange-400 border rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 transition">
                {identifierType === "block" ? "Update Block" : "Update Field"}
            </button>
        </div>
    )
}

export default UpdateFieldButton