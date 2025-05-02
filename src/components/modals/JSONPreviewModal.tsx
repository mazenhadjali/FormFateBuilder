import React from 'react'
import { ModalInterface } from '../../modal/context'
import { BiPlus } from 'react-icons/bi'
import useStore from '../../store'
import Modal, { ModalProps } from '../../modal/Modal'
import { stringifyWithFunctions } from '../../utils/serialazation'

const JsonPreviewModal = ({ id }: ModalInterface) => {
    const { formSchema } = useStore();

    const modalProps: ModalProps = {
        close: { label: "Close", hidden: false },
        submit: { label: "Submit", hidden: true },
        cancel: { hidden: true },
        title: "Add New Field",
        Icon: BiPlus,
    }

    // function stringifyWithFunctions(obj: any): string {
    //     const jsonWithFunctions = JSON.stringify(obj, (key, value) => {
    //         if (typeof value === 'function') {
    //             return value.toString();
    //         }
    //         return value;
    //     }, 2);

    //     const jsFormatted = jsonWithFunctions
    //         .replace(/"([^"]+)":/g, '$1:') // remove quotes from keys
    //         .replace(/"(function[^\"]*)"/gs, (_, fn) => fn.replace(/\\"/g, '"').replace(/\\n/g, '\n')) // unquote and cleanup functions
    //         .replace(/\\n/g, '\n')         // turn \n into real newlines
    //         .replace(/\\"/g, '"');         // unescape double quotes

    //     return js_beautify(jsFormatted, { indent_size: 2 });
    // }



    return (
        <React.Fragment>
            <Modal key={id} {...modalProps}>
                <div className='p-1 my-2'>
                    {formSchema && (
                        <div className='overflow-x-auto'>
                            <pre className='overflow-x-auto'>
                                {stringifyWithFunctions(formSchema)}
                            </pre>
                        </div>
                    )}
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default JsonPreviewModal
