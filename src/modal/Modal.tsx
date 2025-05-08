import React, { useState } from 'react';
import { useModal } from './context';
import Loader from '../components/Loader';

export type ModalProps = {
    close?: {
        hidden?: boolean;
        onClose?: () => void;
        label?: string;
    };
    submit?: {
        hidden?: boolean;
        onSubmit?: () => Promise<void>;
        label?: string;
    };
    cancel?: {
        hidden?: boolean;
        onCancel?: () => void;
        label?: string;
    };
    title: string;
    Icon?: React.ElementType;
    children?: React.ReactNode;
};

function Modal({ close, submit, cancel, title, Icon, children }: ModalProps) {
    const { closeModal } = useModal();
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        close?.onClose?.();
        closeModal();
    };

    const handleCancel = () => {
        cancel?.onCancel?.();
        closeModal();
    };

    const handleSubmit = async () => {
        if (submit?.onSubmit) {
            setLoading(true);
            try {
                await submit.onSubmit();
                closeModal();
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true" />
            <div className="relative bg-white rounded-lg shadow-xl sm:max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-6 w-6 text-indigo-500" aria-hidden="true" />}
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    </div>
                    <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                        onClick={handleClose}
                        aria-label="Close"
                        disabled={loading}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body with scroll */}
                <div className="px-4 py-2 overflow-y-auto flex-1">
                    {children}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                    {!submit?.hidden && (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading && (
                                <Loader size="sm" />
                            )}
                            {submit?.label}
                        </button>
                    )}
                    {!cancel?.hidden && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="inline-flex justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {cancel?.label}
                        </button>
                    )}
                    {!close?.hidden && (
                        <button
                            type="button"
                            onClick={handleClose}
                            className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {close?.label}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
