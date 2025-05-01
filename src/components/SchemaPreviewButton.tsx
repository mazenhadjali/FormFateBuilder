import { useModal } from '../modal/context';

function SchemaPreviewButton() {
    const { pushModal } = useModal();

    const onSubmit = () => {
        pushModal({ type: 'jsonPreview', params: {} });
    }

    return (
        <div className='flex items-center justify-around my-1'>
            <button onClick={onSubmit} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                JSON Preview
            </button>
        </div>
    )
}

export default SchemaPreviewButton