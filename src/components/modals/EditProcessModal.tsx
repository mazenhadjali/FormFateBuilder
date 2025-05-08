import React, { useState } from 'react';
import { ModalInterface } from '../../modal/context';
import { BiPencil } from 'react-icons/bi';
import Modal, { ModalProps } from '../../modal/Modal';
import api from '../../utils/axiosInstance';
import { useSchemasStore } from '../../stores/schemasStore';

const EditProcessModal = ({ id, params: { schemaId, title: initialTitle, description: initialDescription } }: ModalInterface) => {
    const { fetchSchemas } = useSchemasStore(); // Optional: refetch schemas after editing

    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState(initialDescription || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const editProcess = async () => {
        if (!title.trim()) {
            setError('Title is required.');
            return Promise.reject();
        }
        setLoading(true);
        setError(null);

        try {
            await api.put(`/schemas/${schemaId}`, {
                title,
                description,
            });
            await fetchSchemas(); // Optional: refetch schemas to reflect the change
            return Promise.resolve();
        } catch (err) {
            console.error('Failed to update process info:', err);
            setError('Failed to update process info. Please try again.');
            return Promise.reject(err);
        } finally {
            setLoading(false);
        }
    };

    const modalProps: ModalProps = {
        close: { label: "Close", hidden: false },
        submit: { onSubmit: editProcess, label: loading ? "Saving..." : "Save", hidden: false },
        cancel: { hidden: true },
        title: "Edit Process Info",
        Icon: BiPencil,
    };

    return (
        <React.Fragment>
            <Modal key={id} {...modalProps}>
                <div className="p-1 my-2">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter process title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter process description"
                        ></textarea>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default EditProcessModal;
