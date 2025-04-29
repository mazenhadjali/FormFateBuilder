import { createContext, useContext } from 'react';


export interface ModalInterface {
    id?: string;
    type: string;
    params?: Record<string, unknown>;
}


export interface ModalContextType {
    modals: ModalInterface[];
    /** Opens a new modal with provided content, returns its ID */
    pushModal: (modal: ModalInterface) => void;
    /** Closes a modal by ID or the topmost if no ID provided */
    closeModal: (id?: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return {
        pushModal: context.pushModal,
        closeModal: context.closeModal,
    };
};