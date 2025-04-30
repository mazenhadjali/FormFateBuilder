import React, { useContext } from 'react'
import { ModalContext } from './context';
import SelectionModal from '../components/modals/SelectionModal';



const ModalContainer: React.FC = () => {
    const context = useContext(ModalContext);
    if (!context || context.modals.length === 0) return null;

    const { modals } = context;
    const { id, type, params } = modals[modals.length - 1];

    switch (type) {
        case 'createField':
            return (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <SelectionModal key={id} id={id} params={params} type={type} />
                </React.Suspense>
            );
        default:
            return null;
    }

}

export default ModalContainer