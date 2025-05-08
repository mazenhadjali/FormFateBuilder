import React, { useState } from 'react'
import { ModalInterface } from '../../modal/context'
import { BiPlus } from 'react-icons/bi'
import Modal, { ModalProps } from '../../modal/Modal'
import { getField } from '../../utils/schemaUpdator'
import TitleField from '../settings/TitleField'
import useStore from '../../stores/store'
import PlaceholderField from '../settings/PlaceholderField'
import RequiredField from '../settings/RequiredField'
import DefaultField from '../settings/DefaultField'
import ValidatorField from '../settings/ValidatorField'
import { stringifyWithFunctions } from '../../utils/serialazation'
import ClassNameField from '../settings/ClassNameField'
import OptionsField from '../settings/OptionsField'
import OptionsUrlField from '../settings/OptionsUrlField'
import FilterField from '../settings/FilterField'

const ModificationModal = ({ id, params: { identifier, identifierType } }: ModalInterface) => {
    const { formSchema, updateField } = useStore();

    const [field, setField] = useState(getField(formSchema, identifier, identifierType === "block"));

    const onSave = async (): Promise<void> => {
        await updateField(identifierType, identifier, field);
        // no need to return anything
    };

    const modalProps: ModalProps = {
        close: { label: "Close", hidden: false },
        submit: { label: "Save", hidden: false, onSubmit: onSave },
        cancel: { hidden: true },
        title: "Add New Field",
        Icon: BiPlus,
    }

    return (
        <React.Fragment>
            <Modal key={id} {...modalProps}>
                <div>
                    <TitleField field={field} setField={setField} />
                    <PlaceholderField field={field} setField={setField} />
                    <RequiredField field={field} setField={setField} />
                    <DefaultField field={field} setField={setField} />
                    <ClassNameField field={field} setField={setField} />
                    {(field.type === "select" || field.type === "radio") && <OptionsField field={field} setField={setField} />}
                    {(field.type === "select" || field.type === "radio") && <OptionsUrlField field={field} setField={setField} />}
                    {(field.type === "select" || field.type === "radio") && <FilterField field={field} setField={setField} />}
                    <ValidatorField field={field} setField={setField} />
                </div>
                <pre className='p-1 my-2'>
                    {
                        field && stringifyWithFunctions(field)
                    }
                </pre>
            </Modal>
        </React.Fragment>
    )
}

export default ModificationModal;