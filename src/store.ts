/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { FormFateProps } from 'react-form-fate';
import { updateSchema } from './utils/schemaUpdator';
import { FormDefinition } from 'formfatecore';

interface SystemStore {
    formSchema: FormFateProps['formDefinition'];
    setFormSchema: (formSchema: FormFateProps['formDefinition']) => void;
    addField: (identifierType: string, identifier: string, fields: FormDefinition['properties']) => void;
}

const useStore = create<SystemStore>()((set) => ({
    formSchema: {
        name: '',
        properties: {
            firstName: {
                type: 'text',
                title: 'First Name',
                placeholder: 'Enter your first name',
                default: '',
                required: true,
            },
            lastName: {
                type: 'text',
                title: 'Last Name',
                placeholder: 'Enter your last name',
                default: '',
                required: true,
            },
            email: {
                type: 'text',
                title: 'Email',
                placeholder: 'Enter your email address',
                default: '',
                required: true,
            },
            passwordBlock: {
                type: 'block',
                title: 'Password',
                description: 'Enter your password',
                properties: {
                    password: {
                        type: 'password',
                        title: 'Password',
                        placeholder: 'Enter your password',
                        default: '',
                        required: true,
                    },
                    confirmPassword: {
                        type: 'password',
                        title: 'Confirm Password',
                        placeholder: 'Re-enter your password',
                        default: '',
                        required: true,
                    },
                },
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
    addField: (identifierType, identifier, fields) =>
        set((state) => ({
            formSchema: updateSchema(state.formSchema, identifierType, identifier, fields),
            // formSchema: {
            //     ...state.formSchema,
            //     properties: {
            //         ...state.formSchema.properties,
            //         ...fields,
            //     },
            // },
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
