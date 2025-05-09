import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModalInterface } from '../../modal/context';
import { BiPlus, BiCopy, BiSave } from 'react-icons/bi';
import useStore from '../../stores/store';
import Modal, { ModalProps } from '../../modal/Modal';
import { stringifyWithFunctions } from '../../utils/serialazation';
import api from '../../utils/axiosInstance';
import useAuthStore from '../../stores/userStore';

const JsonPreviewModal = ({ id }: ModalInterface) => {
    const { formSchema } = useStore();
    const { isAuthenticated, user } = useAuthStore();

    const [searchParams] = useSearchParams(); // 👈 get search params
    const schemaId = searchParams.get('schemaId'); // 👈 schemaId if exists

    const [copied, setCopied] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleCopy = () => {
        if (formSchema) {
            navigator.clipboard.writeText(stringifyWithFunctions(formSchema));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSave = async () => {
        if (!formSchema || !isAuthenticated || !user) return;
        setSaving(true);
        try {
            if (schemaId) {
                // Update existing schema
                await api.put(`/schemas/${schemaId}`, {
                    data: formSchema,
                });
            } else {
                // Create new schema
                await api.post('/schemas', {
                    data: formSchema,
                    title: 'Schema ' + Date.now().toString(),
                    key: 'schema_' + Date.now().toString(),
                    description: '',
                });
            }
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
            console.error('Save failed', error);
        } finally {
            setSaving(false);
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
            <div className="flex justify-between items-center mb-2">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                    <BiCopy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy JSON'}
                </button>

                {isAuthenticated && user && (
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        <BiSave className="w-4 h-4" />
                        {saving
                            ? schemaId
                                ? 'Updating...'
                                : 'Saving...'
                            : saveSuccess
                                ? schemaId
                                    ? 'Updated!'
                                    : 'Saved!'
                                : schemaId
                                    ? 'Update Schema'
                                    : 'Save Schema'}
                    </button>
                )}
            </div>

            <pre className="bg-gray-100 p-2 rounded max-h-[60vh] overflow-auto text-sm">
                {formSchema ? stringifyWithFunctions(formSchema, 2) : 'No schema available'}
            </pre>
        </Modal>
    );
};

export default JsonPreviewModal;
