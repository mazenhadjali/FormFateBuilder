import { create } from 'zustand';
import api from '../utils/axiosInstance'; // Assuming you have an axiosInstance for API calls

interface User {
    id: string;
    name: string;
    email: string;
    [key: string]: any; // Extendable for other properties like role, avatar, etc.
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    setAuthenticated: (isAuthenticated: boolean) => void;
    fetchUser: () => Promise<void>; // New action to fetch user
}

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    setUser: (user) => set({ user, isAuthenticated: true }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
    setAuthenticated: (isAuthenticated) =>
        set((state) => ({
            isAuthenticated,
            user: isAuthenticated ? state.user : null,
        })),
    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/users/me');
            set({ user: response.data.user, isAuthenticated: true, loading: false });
        } catch (err) {
            set({ error: 'Failed to load profile', user: null, loading: false });
        }
    },
}));

export default useAuthStore;
