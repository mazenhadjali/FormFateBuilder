import { useModal } from '../modal/context';
import { PiSelection } from 'react-icons/pi';

type Props = {}

function CreateFieldButton({ }: Props) {
    const { openModal } = useModal();

    const onclick = () => {
        openModal(<div>Field Selection</div>, {
            close: {
                onClose: () => console.log('Modal closed'),
                label: 'Close',
            },
            submit: {
                onSubmit: () => console.log('Field created'),
                label: 'Create Field',
            },
            cancel: {
                onCancel: () => console.log('Modal cancelled'),
                label: 'Cancel',
            },
            title: 'Create New Field',
            Icon: PiSelection
        });
    }
    return (
        <button onClick={onclick} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Create Field
        </button>
    )
}

export default CreateFieldButton