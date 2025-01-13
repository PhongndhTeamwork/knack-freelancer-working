import {create} from "zustand";


type AuthState = {
    token: string | null;
    setToken: (newToken: string) => void;
    removeToken: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    token:  null,
    setToken: (newToken: string) => {
        if(!newToken || newToken === "") return;
        localStorage.setItem("knackToken", newToken);
        set({token: newToken});
    },
    removeToken: () => {
        localStorage.removeItem("knackToken"); // Remove token from localStorage
        set({token: null});
    },
}));

export default useAuthStore;
