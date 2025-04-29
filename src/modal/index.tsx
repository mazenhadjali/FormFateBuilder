import React from 'react';

export type ModalProps = {
    close: {
        hidden?: boolean;
        onClose: () => void;
        label: string;
    };
    submit: {
        hidden?: boolean;
        onSubmit: () => void;
        label: string;
    };
    cancel: {
        hidden?: boolean;
        onCancel: () => void;
        label: string;
    };
    title: string;
    Icon?: React.ElementType;
    children?: React.ReactNode;
};

function Modal({ close, submit, cancel, title, Icon, children }: ModalProps) {
    return (
        <React.Fragment>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
                                        {Icon && <Icon className="h-6 w-6 text-indigo-500" aria-hidden="true" />}
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">{title}</h3>
                                        <div className="mt-2">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 sm:gap-2">
                                {!submit.hidden && (
                                    <button
                                        type="button"
                                        onClick={submit.onSubmit}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                                    >
                                        {submit.label}
                                    </button>
                                )}
                                {!cancel.hidden && (
                                    <button
                                        type="button"
                                        onClick={cancel.onCancel}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
                                    >
                                        {cancel.label}
                                    </button>
                                )}
                                {!close.hidden && (
                                    <button
                                        type="button"
                                        onClick={close.onClose}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        {close.label}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Modal;
