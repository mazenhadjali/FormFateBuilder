import React, { useContext } from 'react'
import { ModalContext } from './context';
import SelectionModal from '../components/modals/SelectionModal';
import JsonPreviewModal from '../components/modals/JSONPreviewModal';
import ModificationModal from '../components/modals/ModificationModal';
import Loader from '../components/Loader';



const ModalContainer: React.FC = () => {
    const context = useContext(ModalContext);
    if (!context || context.modals.length === 0) return null;

    const { modals } = context;
    const { id, type, params } = modals[modals.length - 1];

    switch (type) {
        case 'createField':
            return (
                <React.Suspense fallback={<Loader />}>
                    <SelectionModal key={id} id={id} params={params} type={type} />
                </React.Suspense>
            );
        case 'jsonPreview':
            return (
                <React.Suspense fallback={<Loader />}>
                    <JsonPreviewModal key={id} id={id} params={params} type={type} />
                </React.Suspense>
            );
        case 'updateField':
            return (
                <React.Suspense fallback={<Loader />}>
                    <ModificationModal key={id} id={id} params={params} type={type} />
                </React.Suspense>
            );
        default:
            return null;
    }

}

export default ModalContainer