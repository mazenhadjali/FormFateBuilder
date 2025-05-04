import { SearchInputCard } from "./customComponents";

// Define a strong type for the factory function output
interface ComponentFactoryOutput {
    type: string;
    title: string;
}

export interface CustomComponent {
    label: string;
    component: React.ElementType;
    type: string;
    factory: () => ComponentFactoryOutput;
}

export const customComponents: CustomComponent[] = [
    {
        label: "Custom Search Input",
        component: SearchInputCard,
        type: "search",
        factory: () => ({
            type: "search",
            title: "Search",
        }),
    },
];

// Build components map for FormFateProps
export const components: Record<string, React.ElementType> = customComponents.reduce(
    (acc, { type, component }) => {
        acc[type] = component;
        return acc;
    },
    {} as Record<string, React.ElementType>
);



// Extract field types with factory functions
export const customFieldsTypes = customComponents.map(({ label, type, factory }) => ({
    label,
    type,
    factory,
}));
