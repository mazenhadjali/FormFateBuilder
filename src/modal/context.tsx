import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Modal, { ModalProps } from '.';

/**
 * Represents a modal instance in the stack
 */
interface Modal {
    id: string;
    content: ReactNode;
    params: ModalProps;
}

/**
 * Context API shape for modal operations
 */
interface ModalContextType {
    modals: Modal[];
    /** Opens a new modal with provided content, returns its ID */
    openModal: (content: ReactNode, params: ModalProps) => string;
    /** Closes a modal by ID or the topmost if no ID provided */
    closeModal: (id?: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * Provider wrapping your app to manage modal stack and rendering
 */
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState<Modal[]>([]);

    const openModal = (content: ReactNode, params: ModalProps) => {
        const id = crypto.randomUUID();
        setModals(prev => [...prev, { id, content, params }]);
        return id;
    };

    const closeModal = (id?: string) => {
        setModals(prev => {
            if (!id) {
                // Remove the topmost modal
                return prev.slice(0, -1);
            }
            // Remove specific modal by ID
            return prev.filter(modal => modal.id !== id);
        });
    };

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
            <ModalContainer />
        </ModalContext.Provider>
    );
};

/**
 * Hook to interact with the modal context
 */
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return {
        openModal: context.openModal,
        closeModal: context.closeModal,
    };
};

/**
 * Renders the topmost modal from the stack using a React portal
 */
const ModalContainer: React.FC = () => {
    const context = useContext(ModalContext);
    if (!context || context.modals.length === 0) return null;

    const { modals, closeModal } = context;
    const { id, content, params } = modals[modals.length - 1];

    const propos = { ...params, close: { ...params.close, onClose: () => { params.close.onClose(); closeModal(id); } } }

    return (
        <Modal {...propos}>
            {content}
        </Modal >
    );
};
