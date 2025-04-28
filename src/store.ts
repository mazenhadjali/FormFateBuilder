/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { FormFateProps } from 'react-form-fate';

interface SystemStore {
    formSchema: FormFateProps['formDefinition'];
    setFormSchema: (formSchema: FormFateProps['formDefinition']) => void;
    addField: (fields: FormFateProps['formDefinition']['properties']) => void;
}

const useStore = create<SystemStore>()((set) => ({
    formSchema: {
        name: '',
        properties: {
            firstName: {
                type: 'text',
                title: 'First Name',
                description: 'Enter your first name',
                default: '',
                required: true,
            },
            lastName: {
                type: 'text',
                title: 'Last Name',
                description: 'Enter your last name',
                default: '',
                required: true,
            },
            email: {
                type: 'text',
                title: 'Email',
                description: 'Enter your email address',
                default: '',
                required: true,
            },
        },
        buttons: [
            {
                type: 'submit',
                label: 'Submit',
            },
            {
                type: 'reset',
                label: 'Reset',
                variant: 'secondary',
            },
        ],
    },
    setFormSchema: (formSchema) => set({ formSchema }),
    addField: (fields) =>
        set((state) => ({
            formSchema: {
                ...state.formSchema,
                properties: {
                    ...state.formSchema.properties,
                    ...fields,
                },
            },
        })),
    clearAllFields: () =>
        set(() => ({
            formSchema: {
                name: '',
                properties: {},
                buttons: [],
            },
        })),
    removeField: (fieldName: string) =>
        set((state) => {
            const { [fieldName]: _, ...rest } = state.formSchema.properties;
            return {
                formSchema: {
                    ...state.formSchema,
                    properties: rest,
                },
            };
        }),
}));

export default useStore;
