// src/stores/schemasStore.ts
import { create } from "zustand";
import api from "../utils/axiosInstance";

export type Schema = {
    _id: string;
    title: string;
    description?: string;
};

type SchemasStore = {
    schemas: Schema[];
    loading: boolean;
    error: string | null;
    fetchSchemas: () => Promise<void>;
    deleteSchema: (id: string) => Promise<void>;
    setSchemas: (schemas: Schema[]) => void;
};

export const useSchemasStore = create<SchemasStore>((set) => ({
    schemas: [],
    loading: false,
    error: null,
    fetchSchemas: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/schemas");
            set({ schemas: response.data });
        } catch (error) {
            console.error("Error fetching schemas:", error);
            set({ error: "Failed to load schemas" });
        } finally {
            set({ loading: false });
        }
    },
    deleteSchema: async (id) => {
        try {
            await api.delete(`/schemas/${id}`);
            set((state) => ({
                schemas: state.schemas.filter((schema) => schema._id !== id),
            }));
        } catch (error) {
            console.error("Error deleting schema:", error);
            alert("Failed to delete schema");
        }
    },
    setSchemas: (schemas) => set({ schemas }),
}));
