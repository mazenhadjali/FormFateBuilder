import React, { useState } from 'react';
import { ModalInterface } from '../../modal/context';
import { BiPlus, BiCopy } from 'react-icons/bi';
import useStore from '../../store';
import Modal, { ModalProps } from '../../modal/Modal';
import { stringifyWithFunctions } from '../../utils/serialazation';

const JsonPreviewModal = ({ id }: ModalInterface) => {
    const { formSchema } = useStore();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (formSchema) {
            navigator.clipboard.writeText(stringifyWithFunctions(formSchema));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const modalProps: ModalProps = {
        close: { label: 'Close', hidden: false },
        submit: { label: 'Submit', hidden: true },
        cancel: { hidden: true },
        title: 'Add New Field',
        Icon: BiPlus,
    };

    return (
        <Modal key={id} {...modalProps}>
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                    <BiCopy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy JSON'}
                </button>
            </div>
            <pre className="bg-gray-100 p-2 rounded max-h-[60vh] overflow-auto text-sm">
                {formSchema ? stringifyWithFunctions(formSchema) : 'No schema available'}
            </pre>
        </Modal>
    );
};

export default JsonPreviewModal;
