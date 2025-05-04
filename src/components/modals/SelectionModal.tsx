import React, { useRef, useState } from 'react'
import { ModalInterface } from '../../modal/context'
import { BiPlus } from 'react-icons/bi'
import useStore from '../../store'
import clsx from 'clsx'
import { fieldTypes } from '../../utils/fieldTypes'
import Modal, { ModalProps } from '../../modal/Modal'


const SelectionModal = ({ id, params: { blockIdentifierType, blockIdentifier } }: ModalInterface) => {

    const { addField } = useStore();

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const identifierRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<Record<string, boolean>>({
        identifier: false,
        typeSelected: false,
    })

    const closeModal = () => {
        // Close modal logic here
    }
    const addSelectedField = () => {
        return new Promise<void>((resolve, reject) => {
            const identifier: string = identifierRef.current?.value || "";
            console.log(identifier);

            let hasError = false;
            const newErrors: Record<string, boolean> = { ...errors };

            // Identifier validation
            if (!identifier || identifier.trim() === "" || !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(identifier)) {
                newErrors.identifier = true;
                identifierRef.current?.focus();
                hasError = true;
            } else {
                newErrors.identifier = false;
            }

            // Type selection validation
            if (!selectedOption) {
                newErrors.typeSelected = true;
                hasError = true;
            } else {
                newErrors.typeSelected = false;
            }

            setErrors(newErrors);

            if (hasError) {
                return reject(new Error("Validation failed"));
            }

            try {
                addField(
                    blockIdentifierType,
                    blockIdentifier,
                    { [identifier]: fieldTypes.find((field) => field.type === selectedOption)?.factory() }
                );
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };



    const modalProps: ModalProps = {
        close: { onClose: closeModal, label: "Close", hidden: false },
        submit: { onSubmit: addSelectedField, label: "Submit", hidden: false },
        cancel: { hidden: true },
        title: "Add New Field",
        Icon: BiPlus,
    }

    return (
        <React.Fragment>
            <Modal key={id} {...modalProps} >
                <div className='p-1 my-2'>
                    <h3 className="font-medium leading-6 text-gray-900">Set Field identifier</h3>
                    <p className="mt-1 text-sm text-gray-500">{blockIdentifierType}</p>
                    <p className="mt-1 text-sm text-gray-500">{blockIdentifier}</p>
                    {/* identifier input  */}
                    <div className="mt-2">
                        <input type="text" name="identifier" id="identifier" placeholder="Identifier name"
                            className="block w-full rounded-md border border-gray-400 placeholder-gray-400 p-2 shadow-sm sm:text focus:ring-gray-600"
                            required
                            ref={identifierRef}
                            title='Field identifier'
                        />
                    </div>
                    <span className={clsx("text-sm text-red-500", { "hidden": !errors.identifier })}>
                        Only alphanumeric characters and underscores are allowed.
                    </span>
                </div>

                <div className={clsx(
                    "container p-2 grid grid-cols-1 gap-4 mx-auto mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border rounded-md",
                    { "border-red-400": errors.typeSelected },
                    { "border-gray-200": !errors.typeSelected }
                )}>
                    {
                        fieldTypes.map(({ label, type }, index) => (
                            <div key={index} className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                                <input id={"radio-element-" + index} type="radio" value={type} name="bordered-radio"
                                    checked={selectedOption === type}
                                    onChange={() => setSelectedOption(type)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2"
                                />
                                <label htmlFor={"radio-element-" + index} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 capitalize">{label}</label>
                            </div>
                        ))
                    }
                </div>
            </Modal>
        </React.Fragment >

    )
}

export default SelectionModal