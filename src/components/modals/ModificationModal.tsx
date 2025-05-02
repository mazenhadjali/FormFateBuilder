import React, { useState } from 'react'
import { ModalInterface } from '../../modal/context'
import { BiPlus } from 'react-icons/bi'
import useStore from '../../store'
import Modal, { ModalProps } from '../../modal/Modal'
import { getField } from '../../utils/schemaUpdator'

const ModificationModal = ({ id, params: { identifier, identifierType } }: ModalInterface) => {
    const { formSchema } = useStore();

    const [field, setField] = useState(getField(formSchema, identifier, identifierType === "block"));

    const modalProps: ModalProps = {
        close: { label: "Close", hidden: false },
        submit: { label: "Submit", hidden: true },
        cancel: { hidden: true },
        title: "Add New Field",
        Icon: BiPlus,
    }

    return (
        <React.Fragment>
            <Modal key={id} {...modalProps}>
                <pre className='p-1 my-2'>
                    {JSON.stringify(field, null, 2)}
                </pre>
            </Modal>
        </React.Fragment>
    )
}

export default ModificationModal;