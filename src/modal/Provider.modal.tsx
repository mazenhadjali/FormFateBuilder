import { ReactNode, useState } from "react";
import { ModalInterface, ModalContext } from "./context";
import ModalContainer from "./ModalContainer";

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState<ModalInterface[]>([]);

    const pushModal = (modal: ModalInterface) => {
        const id = crypto.randomUUID();
        setModals(prev => [...prev, { ...modal, id }]);
        return id;
    };

    const closeModal = (id?: string) => {
        setModals(prev => {
            if (!id) {
                return prev.slice(0, -1);
            }
            return prev.filter((modal: ModalInterface) => modal.id !== id);
        });
    };

    return (
        <ModalContext.Provider value={{ modals, pushModal, closeModal }}>
            {children}
            <ModalContainer />
        </ModalContext.Provider>
    );
};